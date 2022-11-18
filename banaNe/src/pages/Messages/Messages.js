import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import FloatingButton from '../../components/FloatingButton';
import ContentInputModal from '../../components/Modal/ContentInputModal/ContentInputModal';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import styles from './Messages.style';
import parseContentData from '../../utils/parseContentData';
import MessageCard from '../../components/card/MessageCard/MessageCard';
import {showMessage} from 'react-native-flash-message';

const initialFormValues = {
  usermail: '',
  password: '',
  repassword: '',
};
const Messages = () => {
  const [inputModalVisible, setInputModalVisible] = useState(false);

  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    database()
      .ref('messages/')
      .on('value', snapshot => {
        const contentData = snapshot.val();

        const parsedData = parseContentData(contentData || {});
        setContentList(parsedData);
      });
  }, []);

  function handleInputToggle() {
    setInputModalVisible(!inputModalVisible);
  }

  function handleSendContent(content) {
    handleInputToggle();

    sendContent(content);
  }
  const sendContent = content => {
    const usermail = auth().currentUser.email;

    const contentObj = {
      text: content,
      username: usermail.split('@')[0],
      date: new Date().toISOString(),
      dislike: 0,
    };

    database().ref('messages/').push(contentObj);
  };

  function handleBanane(item) {
    database()
      .ref(`messages/${item.id}/`)
      .update({dislike: item.dislike + 1});
  }

  function handleDelete(x) {
    if (auth().currentUser.email.split('@')[0] == x.username) {
      console.log('first');
      database().ref(`messages/${x.id}/`).remove();
    }

    showMessage({
      message: 'Mesaj Size Ait Değil',
      type: 'danger',
    });
  }

  const renderContent = ({item}) => (
    <MessageCard
      ondelete={() => handleDelete(item)}
      message={item}
      onBanane={() => handleBanane(item)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList data={contentList} renderItem={renderContent} />
      <FloatingButton icon={'plus'} onPress={handleInputToggle} />

      <ContentInputModal
        visible={inputModalVisible}
        onClose={handleInputToggle}
        onSend={handleSendContent}
      />
    </View>
  );
};

export default Messages;

import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import Modal from 'react-native-modal';
import Button from '../../Button';
import styles from './ContentInputModal.style';

const ContentInputModal = ({visible, onClose, onSend}) => {
  const [text, setText] = useState(null);

  function handleSend() {
    if (!text) {
      return;
    }
    onSend(text);
    setText(null);
  }

  return (
    <Modal
      style={styles.modal}
      isVisible={visible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      swipeDirection="down"
      onBackButtonPress={onClose}>
      <View style={styles.container}>
        <View style={styles.input_container}>
          <TextInput
            placeholder="Darla Hadi Milleti"
            onChangeText={setText}
            multiline
          />
        </View>
        <Button text="Gönder" onPress={() => onSend(text)} />
      </View>
    </Modal>
  );
};

export default ContentInputModal;

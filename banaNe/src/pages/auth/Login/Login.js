import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import styles from './Login.style';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import {showMessage, hideMessage} from 'react-native-flash-message';
import authErrorMessageParser from '../../../utils/authErrorMessageParser';

const initialFormValues = {
  usermail: '',
  password: '',
};
const LoginPage = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    navigation.navigate('SignPage');
  };

  async function handleFormSubmit(formValues) {
    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(
        formValues.usermail,
        formValues.password,
      );
      setLoading(false);
      console.log(formValues);
    } catch (error) {
      console.log(error)
      showMessage({
        message: authErrorMessageParser(error.code),
        type: 'danger',
      });
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bana Ne?</Text>
      <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
        {({values, handleChange, handleSubmit}) => (
          <>
            <Input
              onChangeText={handleChange('usermail')}
              value={values.usermail}
              placeholder={'E-Posta Giriniz'}
              iconName="email"
            />
            <Input
              onChangeText={handleChange('password')}
              value={values.password}
              placeholder={'Şifre Giriniz'}
              isSecure
              iconName="key"
            />
            <Button text="Giriş Yap" loading={loading} onPress={handleSubmit} />
          </>
        )}
      </Formik>
      <Button theme="secondary" loading={loading} text="Kayıt Ol" onPress={handleSignUp} />
    </View>
  );
};

export default LoginPage;

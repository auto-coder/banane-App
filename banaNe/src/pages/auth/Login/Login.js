import React from 'react';
import {View, Text} from 'react-native';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import styles from './Login.style';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
const initialFormValues = {
  usermail: '',
  password: '',
};
const LoginPage = ({navigation}) => {
  const handleSignUp = () => {
    navigation.navigate('SignPage');
  };
  async function handleFormSubmit(formValues) {
    try {
      await auth().signInWithEmailAndPassword(
        formValues.usermail,
        formValues.password,
      );
      console.log(formValues);
    } catch (error) {
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
            />
            <Input
              onChangeText={handleChange('password')}
              value={values.password}
              placeholder={'Şifre Giriniz'}
            />
            <Button text="Giriş Yap" onPress={handleSubmit} />
          </>
        )}
      </Formik>
      <Button theme="secondary" text="Kayıt Ol" onPress={handleSignUp} />
    </View>
  );
};

export default LoginPage;

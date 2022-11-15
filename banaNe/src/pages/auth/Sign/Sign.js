import React from 'react';
import {View, Text} from 'react-native';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import styles from './Sign.style';
import {Formik} from 'formik';

const initialFormValues = {
  usermail: '',
  password: '',
  repassword: '',
};
const SignPage = ({navigation}) => {
  const handleLogin = () => {
    navigation.navigate('LoginPage');
  };
  const handleFormSubmit = formValues => {
    console.log(formValues);
  };
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
            <Input
              onChangeText={handleChange('password')}
              value={values.repassword}
              placeholder={'Şifre Tekrar Giriniz'}
            />
            <Button text="Kayıt Ol" onPress={handleSubmit} />
          </>
        )}
      </Formik>
      <Button text="Geri" onPress={handleLogin} />
    </View>
  );
};

export default SignPage;

import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import styles from './Sign.style';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import {showMessage, hideMessage} from 'react-native-flash-message';
import authErrorMessageParser from '../../../utils/authErrorMessageParser';

const initialFormValues = {
  usermail: '',
  password: '',
  repassword: '',
};
const SignPage = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    navigation.navigate('LoginPage');
  };

  const handleFormSubmit = async formValues => {
    if (formValues.password !== formValues.repassword) {
      showMessage({
        message: 'Şifreler Uyuşmuyor',
        type: 'danger',
      });
      return;
    }

    try {
      if (formValues.usermail == '' || formValues.password == '') {
        showMessage({
          message: 'Boş Bırakılamaz',
          type: 'danger',
        });
      } else {
        await auth().createUserWithEmailAndPassword(
          formValues.usermail,
          formValues.password,
        );
        showMessage({
          message: 'Başarılı',
          type: 'success',
        });
        setLoading(false);
        navigation.navigate('LoginPage');
      }
    } catch (error) {
      showMessage({
        message: authErrorMessageParser(error.code),
        type: 'danger',
      });
      setLoading(false);
    }
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
              iconName="email"
            />
            <Input
              onChangeText={handleChange('password')}
              value={values.password}
              placeholder={'Şifre Giriniz'}
              iconName="key"
              isSecure
            />
            <Input
              onChangeText={handleChange('repassword')}
              value={values.repassword}
              placeholder={'Şifre Tekrar Giriniz'}
              iconName="key"
              isSecure
            />
            <Button text="Kayıt Ol" loading={loading} onPress={handleSubmit} />
          </>
        )}
      </Formik>
      <Button text="Geri" theme="secondary" onPress={handleLogin} />
    </View>
  );
};

export default SignPage;

import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './FloatingButton.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../styles/colors';

const Button = ({onPress, icon}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name={icon} color={colors.darkGreen} size={30} />
    </TouchableOpacity>
  );
};

export default Button;

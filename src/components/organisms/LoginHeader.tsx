import React from 'react';
import { View, Image } from 'react-native';
import { images } from '../../assets/images/images';
import { globalStyles } from '../../styles/globalStyles';

const LoginHeader: React.FC = () => {
  return (
    <View>
      <Image source={images.logo} style={globalStyles.logo} />
    </View>
  );
};

export default LoginHeader;

// Header.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const Header: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Little Lemon</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image
          source={require('./assets/images/Logo.png')}
          style={styles.logo}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logo: {
    width: 50,
    height: 50,
  },
};

export default Header;

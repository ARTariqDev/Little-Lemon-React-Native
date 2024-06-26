import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Onboarding: React.FC = ({ navigation }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isFirstNameValid, setIsFirstNameValid] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

  useEffect(() => {
    const nameRegex = /^[A-Za-z]+$/;
    setIsFirstNameValid(nameRegex.test(firstName));

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  }, [firstName, email]);

  const handleNext = async () => {
    try {
      await AsyncStorage.setItem('onboardingCompleted', JSON.stringify(true));
      navigation.replace('Profile');
    } catch (error) {
      console.error('Error saving onboarding status to AsyncStorage', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Little Lemon</Text>
        <Image
          source={require('Little Lemon React Native/Little-Lemon-React-Native/assets/images/Logo.png')}
          style={styles.logo}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      {!isFirstNameValid && firstName !== '' && (
        <Text style={styles.errorText}>Please enter a valid name.</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {!isEmailValid && email !== '' && (
        <Text style={styles.errorText}>Please enter a valid email address.</Text>
      )}

      <Button
        title="Next"
        onPress={handleNext}
        disabled={!isFirstNameValid || !isEmailValid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logo: {
    width: 50,
    height: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
});

export default Onboarding;

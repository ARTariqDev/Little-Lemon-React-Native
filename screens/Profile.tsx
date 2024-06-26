import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const Profile: React.FC = ({ navigation }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [orderStatuses, setOrderStatuses] = useState<boolean>(false);
  const [passwordChanges, setPasswordChanges] = useState<boolean>(false);
  const [specialOffers, setSpecialOffers] = useState<boolean>(false);
  const [newsletter, setNewsletter] = useState<boolean>(false);

  useEffect(() => {
    const loadProfile = async () => {
      const profileData = await AsyncStorage.getItem('profile');
      if (profileData) {
        const profile = JSON.parse(profileData);
        setFirstName(profile.firstName);
        setLastName(profile.lastName);
        setEmail(profile.email);
        setPhoneNumber(profile.phoneNumber);
        setAvatar(profile.avatar);
        setOrderStatuses(profile.orderStatuses);
        setPasswordChanges(profile.passwordChanges);
        setSpecialOffers(profile.specialOffers);
        setNewsletter(profile.newsletter);
      }
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    const profile = {
      firstName,
      lastName,
      email,
      phoneNumber,
      avatar,
      orderStatuses,
      passwordChanges,
      specialOffers,
      newsletter,
    };
    await AsyncStorage.setItem('profile', JSON.stringify(profile));
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('profile');
    navigation.replace('Onboarding');
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Personal information</Text>
        <TouchableOpacity onPress={pickImage}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.placeholderAvatar}>
              <Text style={styles.placeholderText}>
                {firstName.charAt(0)}
                {lastName.charAt(0)}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      <Text style={styles.sectionHeader}>Email notifications</Text>
      <View style={styles.switchContainer}>
        <Text>Order statuses</Text>
        <Switch value={orderStatuses} onValueChange={setOrderStatuses} />
      </View>
      <View style={styles.switchContainer}>
        <Text>Password changes</Text>
        <Switch value={passwordChanges} onValueChange={setPasswordChanges} />
      </View>
      <View style={styles.switchContainer}>
        <Text>Special offers</Text>
        <Switch value={specialOffers} onValueChange={setSpecialOffers} />
      </View>
      <View style={styles.switchContainer}>
        <Text>Newsletter</Text>
        <Switch value={newsletter} onValueChange={setNewsletter} />
      </View>

      <Button title="Save changes" onPress={handleSave} />
      <Button title="Log out" onPress={handleLogout} color="red" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeholderAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 36,
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default Profile;

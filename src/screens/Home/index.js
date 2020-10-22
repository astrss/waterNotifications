import React, {useCallback, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import styles from './styles';

const Home = () => {
  // useEffect(() => {
  //   async function requestUserPermission() {
  //     const authStatus = await messaging().requestPermission();
  //     const enabled =
  //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  //     if (enabled) {
  //       console.log('Authorization status:', authStatus);
  //     }
  //   }
  //   requestUserPermission();
  // }, []);

  const handleSignOut = useCallback(async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View>
      <Button title="Sign out" onPress={handleSignOut} />
      <Text>test</Text>
    </View>
  );
};

export default Home;

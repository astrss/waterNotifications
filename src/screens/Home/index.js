import React, {useCallback, useEffect, useState, useRef} from 'react';
import {
  KeyboardAvoidingView,
  Button,
  Text,
  TextInput,
  Animated,
  Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import PushNotification from 'react-native-push-notification';
import BackgroundFetch from 'react-native-background-fetch';
import {
  NOTIFICATION_TIME,
  ANIMATION_DURATION,
  PIXEL_HEIGHT,
  ALL_DAY_VALUE,
} from '../../constants';
import styles from './styles';

const Home = () => {
  const water = useRef(new Animated.Value(0)).current;
  const [notificationValue, setNotificationValue] = useState(10);
  const [amountWater, setAmountWater] = useState('');
  const [selectedAmountWater, setSelectedAmountWater] = useState('');

  useEffect(() => {
    Animated.timing(water, {
      toValue: notificationValue * PIXEL_HEIGHT,
      duration: ANIMATION_DURATION,
      useNativeDriver: false,
    }).start();
  }, [water, notificationValue]);

  useEffect(() => {
    if (selectedAmountWater) {
      BackgroundFetch.configure(
        {
          minimumFetchInterval: NOTIFICATION_TIME, // minutes
        },
        () => {
          if (notificationValue) {
            PushNotification.localNotification({
              title: 'Remind',
              message: `Drink a ${selectedAmountWater} milliliter of water`,
            });
          }
          setNotificationValue(notificationValue + 1);
          if (notificationValue === ALL_DAY_VALUE) {
            setNotificationValue(1);
          }
          BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
        },
        (error) => {
          console.warn('Background fetch failed to start with error: ' + error);
        },
      );
    }
    return () => {
      BackgroundFetch.stop();
    };
  }, [notificationValue, selectedAmountWater]);

  const handleSelectAmountWater = useCallback(() => {
    setNotificationValue(0);
    setSelectedAmountWater(amountWater);
  }, [amountWater, setNotificationValue]);

  const handleChangeInput = useCallback(
    (setText) => (text) => {
      setText(text);
    },
    [],
  );

  const handleSignOut = useCallback(async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      enabled={Platform.OS === 'ios'}>
      <Button title="Sign out" onPress={handleSignOut} />
      <TextInput
        style={styles.amountOfWater}
        onChangeText={handleChangeInput(setAmountWater)}
        placeholder="amount of milliliters of water"
        value={amountWater}
      />
      <Button
        title="accept amount of water"
        onPress={handleSelectAmountWater}
      />
      <Text>{notificationValue}</Text>
      <Animated.View
        style={
          (styles.animatedWater,
          {
            height: water,
          })
        }
      />
    </KeyboardAvoidingView>
  );
};

export default Home;

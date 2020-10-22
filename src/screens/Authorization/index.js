import React, {useState, useCallback} from 'react';
import {View, TextInput, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from './styles';

const Authorization = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleChangeInput = useCallback(
    (setText) => (text) => {
      setText(text);
    },
    [],
  );

  const handleSignIn = useCallback(async (emailProps, passwordProps) => {
    try {
      await auth().signInWithEmailAndPassword(emailProps, passwordProps);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.email}
        onChangeText={handleChangeInput(setEmail)}
        value={email}
      />
      <TextInput
        style={styles.password}
        onChangeText={handleChangeInput(setPassword)}
        value={password}
      />
      <Button title="Sign in" onPress={() => handleSignIn(email, password)} />
    </View>
  );
};

export default Authorization;

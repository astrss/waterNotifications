import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  amountOfWater: {
    width: 300,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
  },
  container: {
    display: 'flex',
    flex: 1,
  },
  animatedWater: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#00BFFF',
  },
});

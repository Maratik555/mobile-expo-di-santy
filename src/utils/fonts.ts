import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'Inter': require('../../assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
    'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
  });
};
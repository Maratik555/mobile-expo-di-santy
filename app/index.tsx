import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';

export default function SplashScreen() {
  const router = useRouter();
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();

    setTimeout(() => {
      setShowLogo(true);
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1500);
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <StatusBar style="dark" />
        <Animated.View
          style={[
            styles.square,
            {
              transform: [{ rotate }, { scale: scaleAnim }],
            },
          ]}
        />
        
        {showLogo && (
          <Animated.View style={{ opacity: opacityAnim }}>
            <View style={styles.logoContainer}>
                <Text style={styles.logoTextTop}>Ди</Text>
                <Text style={styles.logoTextBottom}>санти</Text>
            </View>
          </Animated.View>
        )}
      </View>

      <Pressable 
        style={styles.button}
        onPress={() => router.push('/catalog')}
      >
        <Text style={styles.buttonText}>Начать</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingBottom: 60,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: 193,
    height: 193,
    borderWidth: 3,
    borderColor: '#2AB2DB',
    backgroundColor: 'transparent',
    marginBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoTextTop: {
    fontSize: 62,
    fontWeight: 'bold',
    color: '#404040',
    textAlign: 'center',
  },
  logoTextBottom: {
    fontSize: 42,
    fontWeight: '700',
    color: '#404040',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#F97C00',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 25
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

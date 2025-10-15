import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';

export default function SplashScreen() {
  const router = useRouter();
  const [animationStarted, setAnimationStarted] = useState(false);

  // Анимации для кнопки
  const buttonTranslateY = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(1)).current;

  // Анимация для квадрата
  const squareTranslateX = useRef(new Animated.Value(-400)).current;
  const squareRotate = useRef(new Animated.Value(0)).current;

  // Анимации для текста
  const diTranslateX = useRef(new Animated.Value(-400)).current;
  const diOpacity = useRef(new Animated.Value(0)).current;
  const santiTranslateX = useRef(new Animated.Value(400)).current;
  const santiOpacity = useRef(new Animated.Value(0)).current;

  const handleStartPress = () => {
    if (animationStarted) return;
    setAnimationStarted(true);

    // Кнопка уходит вниз и исчезает
    Animated.parallel([
      Animated.timing(buttonTranslateY, {
        toValue: 200,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(buttonOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // Квадрат медленно перекатывается слева
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(squareTranslateX, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(squareRotate, {
          toValue: 4,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]).start();
    }, 300);

    // Текст "Ди" залетает слева внутрь квадрата
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(diTranslateX, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(diOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1500);

    // Текст "санти" вылетает справа внутрь квадрата
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(santiTranslateX, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(santiOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }, 2000);

    // Переход на следующий экран
    setTimeout(() => {
      router.push('/catalog');
    }, 3500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <StatusBar style="dark" />

        <View style={styles.animationContainer}>
          <Animated.View
            style={[
              styles.square,
              {
                transform: [
                  { translateX: squareTranslateX },
                  {
                    rotate: squareRotate.interpolate({
                      inputRange: [0, 4],
                      outputRange: ['0deg', '360deg'],
                    })
                  },
                ],
              },
            ]}
          >
            <Animated.View
              style={[
                styles.textContainer,
                {
                  transform: [{ translateX: diTranslateX }],
                  opacity: diOpacity,
                },
              ]}
            >
              <Text style={styles.logoTextTop}>Ди</Text>
            </Animated.View>

            <Animated.View
              style={[
                styles.textContainer,
                {
                  transform: [{ translateX: santiTranslateX }],
                  opacity: santiOpacity,
                },
              ]}
            >
              <Text style={styles.logoTextBottom}>санти</Text>
            </Animated.View>
          </Animated.View>
        </View>
      </View>

      <Animated.View
        style={[
          styles.buttonContainer,
          {
            transform: [{ translateY: buttonTranslateY }],
            opacity: buttonOpacity,
          },
        ]}
      >
        <Pressable
          style={styles.button}
          onPress={handleStartPress}
        >
          <Text style={styles.buttonText}>Начать</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: 193,
    height: 193,
    borderWidth: 3,
    borderColor: '#2AB2DB',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '100%',
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
  buttonContainer: {
    paddingHorizontal: 40,
    paddingBottom: 60,
  },
  button: {
    backgroundColor: '#F97C00',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

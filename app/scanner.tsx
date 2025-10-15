import { View, Text, StyleSheet, Pressable, Dimensions, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Svg, { Path, Rect, Line } from 'react-native-svg';
import { typography } from '../src/styles/typography';

const { width, height } = Dimensions.get('window');

export default function ScannerScreen() {
  const router = useRouter();

  return (
    <ImageBackground 
      source={require('../assets/кран.jpg')} 
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <Pressable 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path 
              d="M15 18L9 12L15 6" 
              stroke="#FFF" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </Svg>
        </Pressable>
        <Text style={styles.headerTitle}>Сканер штрих кодов</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Camera View Placeholder */}
      <View style={styles.cameraContainer}>
        {/* Scanning Frame */}
        <View style={styles.scanningArea}>
          {/* Corner Brackets */}
          
          {/* <View style={styles.cornerTopLeft} />
          <View style={styles.cornerTopRight} />
          <View style={styles.cornerBottomLeft} />
          <View style={styles.cornerBottomRight} /> */}
          
          {/* Barcode Illustration */}
          <View style={styles.barcodeContainer}>
            <Svg width="244" height="120" viewBox="0 0 244 120" fill="none">
<Path d="M-5.24536e-06 3.8147e-05L0 120L4.66521 120L4.6652 3.7943e-05L-5.24536e-06 3.8147e-05Z" fill="#242424"/>
<Path d="M6.5913 3.8147e-05L6.59131 120L9.35741 120L9.3574 3.80261e-05L6.5913 3.8147e-05Z" fill="#242424"/>
<Path d="M11.0776 3.8147e-05L11.0776 120L18.674 120L18.674 3.78149e-05L11.0776 3.8147e-05Z" fill="#242424"/>
<Path d="M20.4089 3.8147e-05L20.4089 120L21.386 120L21.386 3.81043e-05L20.4089 3.8147e-05Z" fill="#242424"/>
<Path d="M28.6997 3.8147e-05L28.6997 120L30.0828 120L30.0828 3.80865e-05L28.6997 3.8147e-05Z" fill="#242424"/>
<Path d="M32.8967 3.8147e-05L32.8967 120L36.9839 120L36.9839 3.79683e-05L32.8967 3.8147e-05Z" fill="#242424"/>
<Path d="M43.0876 3.8147e-05L43.0876 120L43.8927 120L43.8927 3.81118e-05L43.0876 3.8147e-05Z" fill="#242424"/>
<Path d="M46.6587 3.8147e-05L46.6587 120L52.184 120L52.184 3.79055e-05L46.6587 3.8147e-05Z" fill="#242424"/>
<Path d="M54.9504 3.8147e-05L54.9504 120L56.6225 120L56.6225 3.80739e-05L54.9504 3.8147e-05Z" fill="#242424"/>
<Path d="M61.8584 3.8147e-05L61.8584 120L63.0075 120L63.0075 3.80967e-05L61.8584 3.8147e-05Z" fill="#242424"/>
<Path d="M68.7671 3.8147e-05L68.7671 120L72.7992 120L72.7992 3.79707e-05L68.7671 3.8147e-05Z" fill="#242424"/>
<Path d="M75.6758 3.8147e-05L75.6758 120L81.201 120L81.201 3.79055e-05L75.6758 3.8147e-05Z" fill="#242424"/>
<Path d="M83.9597 3.8147e-05L83.9597 120L85.3428 120L85.3428 3.80865e-05L83.9597 3.8147e-05Z" fill="#242424"/>
<Path d="M89.4912 3.8147e-05L89.4912 120L90.4133 120L90.4133 3.81067e-05L89.4912 3.8147e-05Z" fill="#242424"/>
<Path d="M92.0239 3.8147e-05L92.0239 120L92.946 120L92.946 3.81067e-05L92.0239 3.8147e-05Z" fill="#242424"/>
<Path d="M96.3999 3.8147e-05L96.3999 120L97.7829 120L97.7829 3.80865e-05L96.3999 3.8147e-05Z" fill="#242424"/>
<Path d="M102.152 3.8147e-05L102.152 120L107.217 120L107.217 3.79256e-05L102.152 3.8147e-05Z" fill="#242424"/>
<Path d="M111.131 3.8147e-05L111.131 120L112.975 120L112.975 3.80664e-05L111.131 3.8147e-05Z" fill="#242424"/>
<Path d="M117.118 3.8147e-05L117.118 120L120.917 120L120.917 3.79809e-05L117.118 3.8147e-05Z" fill="#242424"/>
<Path d="M124.721 3.8147e-05L124.721 120L126.104 120L126.104 3.80865e-05L124.721 3.8147e-05Z" fill="#242424"/>
<Path d="M130.935 3.8147e-05L130.935 120L132.318 120L132.318 3.80865e-05L130.935 3.8147e-05Z" fill="#242424"/>
<Path d="M137.844 3.8147e-05L137.844 120L138.532 120L138.532 3.81169e-05L137.844 3.8147e-05Z" fill="#242424"/>
<Path d="M139.419 3.8147e-05L139.419 120L140.108 120L140.108 3.81169e-05L139.419 3.8147e-05Z" fill="#242424"/>
<Path d="M140.995 3.8147e-05L140.995 120L141.683 120L141.683 3.81169e-05L140.995 3.8147e-05Z" fill="#242424"/>
<Path d="M144.751 3.8147e-05L144.751 120L147.517 120L147.517 3.80261e-05L144.751 3.8147e-05Z" fill="#242424"/>
<Path d="M150.855 3.8147e-05L150.855 120L155.231 120L155.231 3.79557e-05L150.855 3.8147e-05Z" fill="#242424"/>
<Path d="M158.569 3.8147e-05L158.569 120L161.335 120L161.335 3.80261e-05L158.569 3.8147e-05Z" fill="#242424"/>
<Path d="M165.477 3.8147e-05L165.477 120L166.86 120L166.86 3.80865e-05L165.477 3.8147e-05Z" fill="#242424"/>
<Path d="M168.36 3.8147e-05L168.36 120L169.743 120L169.743 3.80865e-05L168.36 3.8147e-05Z" fill="#242424"/>
<Path d="M172.385 3.8147e-05L172.385 120L173.768 120L173.768 3.80865e-05L172.385 3.8147e-05Z" fill="#242424"/>
<Path d="M178.261 3.8147e-05L178.261 120L183.098 120L183.098 3.79355e-05L178.261 3.8147e-05Z" fill="#242424"/>
<Path d="M187.585 3.8147e-05L187.585 120L188.968 120L188.968 3.80865e-05L187.585 3.8147e-05Z" fill="#242424"/>
<Path d="M191.844 3.8147e-05L191.844 120L197.142 120L197.142 3.79154e-05L191.844 3.8147e-05Z" fill="#242424"/>
<Path d="M200.018 3.8147e-05L200.018 120L203.816 120L203.816 3.7981e-05L200.018 3.8147e-05Z" fill="#242424"/>
<Path d="M207.966 3.8147e-05L207.966 120L209.693 120L209.693 3.80715e-05L207.966 3.8147e-05Z" fill="#242424"/>
<Path d="M215.562 3.8147e-05L215.562 120L216.601 120L216.601 3.81016e-05L215.562 3.8147e-05Z" fill="#242424"/>
<Path d="M219.188 3.8147e-05L219.188 120L225.057 120L225.057 3.78904e-05L219.188 3.8147e-05Z" fill="#242424"/>
<Path d="M227.651 3.8147e-05L227.651 120L228.745 120L228.745 3.80991e-05L227.651 3.8147e-05Z" fill="#242424"/>
<Path d="M234.56 3.8147e-05L234.56 120L235.943 120L235.943 3.80865e-05L234.56 3.8147e-05Z" fill="#242424"/>
<Path d="M239.858 3.8147e-05L239.858 120L244 120L244 3.79659e-05L239.858 3.8147e-05Z" fill="#242424"/>
</Svg>
          </View>

          {/* Red scanning line */}
          <View style={styles.scanLine} />
        </View>

        {/* Vertical center line */}

        {/* Instruction text */}
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            Поместите штрих-код товара в область красной линии, чтобы быстро найти его в нашем каталоге
          </Text>
        </View>
      </View>

      {/* Close Button */}
      <View style={styles.bottomContainer}>
        <Pressable 
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <Text style={styles.closeButtonText}>Закрыть</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    ...typography.heading1,
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  placeholder: {
    width: 40,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  scanningArea: {
    width: 343,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  // cornerTopLeft: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   width: 40,
  //   height: 40,
  //   borderTopWidth: 3,
  //   borderLeftWidth: 3,
  //   borderColor: '#FFF',
  // },
  // cornerTopRight: {
  //   position: 'absolute',
  //   top: 0,
  //   right: 0,
  //   width: 40,
  //   height: 40,
  //   borderTopWidth: 3,
  //   borderRightWidth: 3,
  //   borderColor: '#FFF',
  // },
  // cornerBottomLeft: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   width: 40,
  //   height: 40,
  //   borderBottomWidth: 3,
  //   borderLeftWidth: 3,
  //   borderColor: '#FFF',
  // },
  // cornerBottomRight: {
  //   position: 'absolute',
  //   bottom: 0,
  //   right: 0,
  //   width: 40,
  //   height: 40,
  //   borderBottomWidth: 3,
  //   borderRightWidth: 3,
  //   borderColor: '#FFF',
  // },
  barcodeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 130,
    marginBottom: 200,
  },
  scanLine: {
    position: 'absolute',
    width: 343,
    height: 2,
    backgroundColor: '#FF0000',
    top: 0,
    marginTop: -1,
  },
  instructionContainer: {
    position: 'absolute',
    bottom: 130,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  instructionText: {
    ...typography.heading3,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    // fontSize: 14,
  },
  dimensionText: {
    color: '#FFF',
    fontSize: 14,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  closeButton: {
    backgroundColor: '#10366A',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    ...typography.heading3,
    color: '#FFF',
    fontSize: 18,
  },
});

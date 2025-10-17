import { View, Text, StyleSheet, ScrollView, Pressable, Modal, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { typography } from '../src/styles/typography';
import Svg, { Path } from 'react-native-svg';

export default function ProductScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isCharacteristicsOpen, setIsCharacteristicsOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('Чёрный');
  const [isAdded, setIsAdded] = useState(false);
  const [showToast, setShowToast] = useState(false);


  // const colors = ['Чёрный', 'Белый', 'Серебристый', 'Хром'];

  const handleAddToCart = () => {
    if (!isAdded) {
      setIsAdded(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../assets/умывальник.png')} 
            style={styles.productImage} 
            resizeMode="cover"
          />
          
          <Pressable 
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <Text style={styles.closeButtonText}><Svg width="9" height="9" viewBox="0 0 9 9" fill="none">
<Path d="M7.54594 7.54624L5.95495 5.95525L4.36396 4.36426L2.77297 2.77327L1.18198 1.18228M1.18198 7.54624L7.54594 1.18228" stroke="#10366A" strokeWidth="2" strokeLinecap="round"/>
</Svg></Text>
          </Pressable>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.infoSection}>
            <Text style={styles.category}>Умывальник</Text>
            
            <View style={styles.row}>
              <Text style={styles.productName}>DLA6-FW-304</Text>
              <Text style={styles.price}>3 250 ₽</Text>
            </View>
          </View>

          <Pressable 
            style={styles.colorSection}
            onPress={() => setIsColorOpen(!isColorOpen)}
          >
            <View style={styles.colorRow}>
              <Text style={styles.colorLabel}>Цвет: </Text>
              <Text style={styles.colorValue}>{selectedColor}</Text>
              {/* <Text style={styles.chevron}>{isColorOpen ? '▲' : '▼'}</Text> */}
              <Text style={styles.stock}>осталось 2шт на складе</Text>
            </View>
            
          </Pressable>

         {/* Выбор цвета на будущее вдруг */}
          {/* {isColorOpen && (
            <View style={styles.colorOptions}>
              {colors.map((color) => (
                <Pressable
                  key={color}
                  style={[
                    styles.colorOption,
                    selectedColor === color && styles.selectedColorOption
                  ]}
                  onPress={() => {
                    setSelectedColor(color);
                    setIsColorOpen(false);
                  }}
                >
                  <Text style={[
                    styles.colorOptionText,
                    selectedColor === color && styles.selectedColorOptionText
                  ]}>
                    {color}
                  </Text>
                </Pressable>
              ))}
            </View>
          )} */}

          <View>
            <Pressable 
              style={styles.collapsibleHeader}
              onPress={() => setIsDescriptionOpen(!isDescriptionOpen)}
            >
              <Text style={styles.collapsibleTitle}>Описание</Text>
              <Text style={styles.chevron}>{isDescriptionOpen ? <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
<Path d="M8 14L12 10L16 14" stroke="#10366A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</Svg> : <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
<Path d="M16 10L12 14L8 10" stroke="#10366A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</Svg>}</Text>
            </Pressable>
            
            {isDescriptionOpen && (
              <Text style={styles.description}>
                Повседневная практика показывает, что консультация с широким активом влечет за собой процесс внедрения и модернизации направлений прогрессивного развития.{'\n\n'}
                Идейные соображения высшего порядка, а также дальнейшее развитие различных форм деятельности играет важную роль в формировании соответствующий условий активизации.
              </Text>
            )}
          </View>

          <View>
            <Pressable 
              style={styles.collapsibleHeader}
              onPress={() => setIsCharacteristicsOpen(!isCharacteristicsOpen)}
            >
              <Text style={styles.collapsibleTitle}>Характеристики</Text>
              <Text style={styles.chevron}>{isCharacteristicsOpen ? <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
<Path d="M8 14L12 10L16 14" stroke="#10366A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</Svg> : <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
<Path d="M16 10L12 14L8 10" stroke="#10366A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</Svg>}</Text>
            </Pressable>
            
            {isCharacteristicsOpen && (
              <Text style={styles.description}>
                Повседневная практика показывает, что консультация с широким активом влечет за собой процесс внедрения и модернизации направлений прогрессивного развития.
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable 
          style={[styles.addToCartButton, isAdded && styles.addedButton]}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartText}>
            {isAdded ? 'Добавлено' : 'Добавить в корзину'}
          </Text>
        </Pressable>
      </View>

      {showToast && (
        <View style={styles.toastContainer}>
          <View style={styles.toast}>
            <Text style={styles.toastText}>
              Товар успешно{'\n'}добавлен в корзину
            </Text>
            <Pressable 
              style={styles.toastButton}
              onPress={() => {
                setShowToast(false);
                router.push('/cart');
              }}
            >
              <Text style={styles.toastButtonText}>Перейти</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  productImage: {
    width: '85%',
    height: '85%',
    marginTop: 80,
  },
  imageContainer: {
    height: 450,
    backgroundColor: '#FFF',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
  },
  closeButton: {
    position: 'absolute',
    top: 70,
    right: 30,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#10366A',
    fontWeight: 'bold',
  },
  contentContainer: {
    backgroundColor: '#E2EDFE',
    paddingHorizontal: 20,
    paddingTop: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingBottom: 200,
  },
  infoSection: {
    marginBottom: 15,
  },
  category: {
    // ...typography.heading3,
    color: '#6B83A4',
    marginBottom: 8,
    fontWeight: 500,
    lineHeight: 20,
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    // ...typography.text2,
    color: '#10366A',
    lineHeight: 20,
    fontSize: 18,
    fontWeight: 600,
  },
  price: {
    ...typography.price,
    color: '#404040',
    lineHeight: 20,
    fontSize: 18,
    fontWeight: 700,
  },
  colorSection: {
    marginBottom: 10,
    // paddingBottom: 15,
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10366A',
  },
  colorValue: {
    fontSize: 14,
    color: '#8C8C8C',
    flex: 1,
  },
  stock: {
    fontSize: 12,
    color: '#8C8C8C',
    lineHeight: 20,
    fontWeight: 600,
  },
  // colorOptions: {
  //   marginTop: 10,
  //   gap: 8,
  // },
  // colorOption: {
  //   backgroundColor: '#FFFFFF',
  //   borderRadius: 8,
  //   paddingVertical: 12,
  //   paddingHorizontal: 16,
  //   borderWidth: 1,
  //   borderColor: '#CBD5E1',
  // },
  // selectedColorOption: {
  //   backgroundColor: '#E8EEF7',
  //   borderColor: '#10366A',
  // },
  // colorOptionText: {
  //   fontSize: 14,
  //   color: '#4B5563',
  // },
  // selectedColorOptionText: {
  //   color: '#10366A',
  //   fontWeight: 'bold',
  // },
  // collapsibleSection: {
  //   marginBottom: 20,
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#CBD5E1',
  //   paddingBottom: 15,
  // },
  collapsibleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  collapsibleTitle: {
    // ...typography.heading3,
    color: '#10366A',
    lineHeight: 20,
    fontSize: 14,
    fontWeight: 600,
  },
  chevron: {
    // ...typography.text2,
    color: '#10366A',
    lineHeight: 20,
    fontSize: 14,
    fontWeight: 600,
  },
  description: {
    // ...typography.text2,
    color: '#4B5563',
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: -0.5,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#E2EDFE',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  addToCartButton: {
    backgroundColor: '#F97C00',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addedButton: {
    backgroundColor: '#6B83A4',
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  toastContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  toast: {
    flexDirection: 'row',
    backgroundColor: '#E2EDFE',
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    width: '100%',
  },
  toastText: {
    flex: 1,
    fontSize: 14,
    color: '#10366A',
    fontWeight: '500',
    textAlign: 'center',
  },
  toastButton: {
    backgroundColor: '#F97C00',
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginLeft: 10,
    borderRadius: 10,
  },
  toastButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
});

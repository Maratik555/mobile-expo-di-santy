import { View, Text, StyleSheet, ScrollView, Pressable, Modal, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { typography } from '../src/styles/typography';

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
            resizeMode="contain"
          />
          
          <Pressable 
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <Text style={styles.closeButtonText}>✕</Text>
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
            </View>
            <Text style={styles.stock}>осталось 2шт на складе</Text>
          </Pressable>

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

          <View style={styles.collapsibleSection}>
            <Pressable 
              style={styles.collapsibleHeader}
              onPress={() => setIsDescriptionOpen(!isDescriptionOpen)}
            >
              <Text style={styles.collapsibleTitle}>Описание</Text>
              <Text style={styles.chevron}>{isDescriptionOpen ? '▲' : '▼'}</Text>
            </Pressable>
            
            {isDescriptionOpen && (
              <Text style={styles.description}>
                Повседневная практика показывает, что консультация с широким активом влечет за собой процесс внедрения и модернизации направлений прогрессивного развития.{'\n\n'}
                Идейные соображения высшего порядка, а также дальнейшее развитие различных форм деятельности играет важную роль в формировании соответствующий условий активизации.
              </Text>
            )}
          </View>

          <View style={styles.collapsibleSection}>
            <Pressable 
              style={styles.collapsibleHeader}
              onPress={() => setIsCharacteristicsOpen(!isCharacteristicsOpen)}
            >
              <Text style={styles.collapsibleTitle}>Характеристики</Text>
              <Text style={styles.chevron}>{isCharacteristicsOpen ? '▲' : '▼'}</Text>
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
                router.push('/catalog');
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
    backgroundColor: '#F5F7FA',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    height: 350,
    backgroundColor: '#fff',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: '60%',
    height: '70%',
    backgroundColor: '#E0E7F0',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#2C2C2C',
  },
  contentContainer: {
    backgroundColor: '#E8EEF7',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 140,
  },
  infoSection: {
    marginBottom: 15,
  },
  category: {
    ...typography.heading3,
    color: '#6B7C93',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    ...typography.heading3,
    color: '#2B4B7C',
  },
  price: {
    ...typography.price,
    color: '#2C2C2C',
  },
  colorSection: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E1',
    paddingBottom: 15,
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  colorLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2B4B7C',
  },
  colorValue: {
    fontSize: 14,
    color: '#6B7C93',
    flex: 1,
  },
  stock: {
    fontSize: 12,
    color: '#8C9DB5',
  },
  colorOptions: {
    marginTop: 10,
    gap: 8,
  },
  colorOption: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  selectedColorOption: {
    backgroundColor: '#E8EEF7',
    borderColor: '#2B4B7C',
  },
  colorOptionText: {
    fontSize: 14,
    color: '#4B5563',
  },
  selectedColorOptionText: {
    color: '#2B4B7C',
    fontWeight: '600',
  },
  collapsibleSection: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E1',
    paddingBottom: 15,
  },
  collapsibleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  collapsibleTitle: {
    ...typography.heading3,
    color: '#2B4B7C',
  },
  chevron: {
    ...typography.text2,
    color: '#2B4B7C',
  },
  description: {
    ...typography.text2,
    color: '#4B5563',
    lineHeight: 20,
    marginTop: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#E8EEF7',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  addToCartButton: {
    backgroundColor: '#F97C00',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addedButton: {
    backgroundColor: '#7B92B2',
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
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
    backgroundColor: '#E8EEF7',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    width: '100%',
  },
  toastText: {
    flex: 1,
    fontSize: 14,
    color: '#2B4B7C',
    fontWeight: '500',
    textAlign: 'center',
  },
  toastButton: {
    backgroundColor: '#F97C00',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 10,
  },
  toastButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

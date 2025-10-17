import { View, Text, StyleSheet, FlatList, Pressable, Image, Modal, ScrollView, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Svg, { Path } from 'react-native-svg';
import { typography } from '../src/styles/typography';
import { useEffect, useRef, useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  category: string;
  code: string;
  color: string;
  price: number;
  quantity: number;
  stock: number;
}

type PaymentMethod = 'card' | 'cash';

export default function CartScreen() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Умывальник',
      category: 'Умывальник',
      code: 'DLA6-FW-304',
      color: 'Чёрный',
      price: 3250,
      quantity: 2,
      stock: 2,
    },
    {
      id: '2',
      name: 'Умывальник',
      category: 'Умывальник',
      code: 'DLA6-FW-304',
      color: 'Чёрный',
      price: 3250,
      quantity: 2,
      stock: 2,
    },
    {
      id: '3',
      name: 'Умывальник',
      category: 'Умывальник',
      code: 'DLA6-FW-304',
      color: 'Чёрный',
      price: 3250,
      quantity: 2,
      stock: 2,
    },
  ]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [clearModalVisible, setClearModalVisible] = useState(false);

  const slideAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(slideAnimation, {
      toValue: paymentMethod === 'cash' ? 1 : 0,
      useNativeDriver: false,
      tension: 50,
      friction: 7,
    }).start();
  }, [paymentMethod]);

  const handleQuantityChange = (id: string, delta: number) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, Math.min(item.stock, item.quantity + delta));
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
    setClearModalVisible(false);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateDiscount = () => Math.round(calculateSubtotal() * 0.05);

  const calculateTotal = () => calculateSubtotal() - calculateDiscount();

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemImageContainer}>
        <Image
          source={require('../assets/умывальник.png')}
          style={styles.itemImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.itemDetails}>
        <Text style={styles.itemCategory}>{item.category}</Text>
        <Text style={styles.itemCode}>{item.code}</Text>
        <View style={styles.itemColorRow}>
          <Text style={styles.itemColorLabel}>Цвет:</Text>
          <Text style={styles.itemColorValue}>{item.color}</Text>
        </View>
        <Text style={styles.itemStock}>осталось {item.stock} шт.</Text>

        <View style={styles.itemFooter}>
          <View style={styles.quantityControl}>
            <Pressable
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(item.id, -1)}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </Pressable>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <Pressable
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(item.id, 1)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </Pressable>
          </View>
          <Text style={styles.itemPrice}>{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</Text>
        </View>
      </View>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.headerEmpty}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path d="M15 18L9 12L15 6" stroke="#10366A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </Pressable>
          <Text style={styles.headerTitleEmpty}>Корзина</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.emptyContainer}>
          <Svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <Path d="M28 72H52C56.4183 72 60 68.4183 60 64V24L20 24V64C20 68.4183 23.5817 72 28 72Z" stroke="#10366A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M8 24H72" stroke="#10366A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M32 24V16C32 11.5817 35.5817 8 40 8V8C44.4183 8 48 11.5817 48 16V24" stroke="#10366A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
          <Text style={styles.emptyTitle}>Корзина пока пуста</Text>
          <Pressable style={styles.emptyButton} onPress={() => router.push('/catalog')}>
            <Text style={styles.emptyButtonText}>Перейти в каталог</Text>
          </Pressable>
        </View>

        <View style={styles.bottomNav}>
          <Pressable style={styles.navButton} onPress={() => router.push('/catalog')}>
            <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <Path d="M4 8H24M4 14H24M4 20H24" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </Pressable>
          <Pressable style={styles.navButton}>
            <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <Path d="M9 26H19C21.2091 26 23 24.2091 23 22V10L5 10V22C5 24.2091 6.79086 26 9 26Z" stroke="#2AB2DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M3 10H25" stroke="#2AB2DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M11 10V7C11 5.34315 12.3431 4 14 4V4C15.6569 4 17 5.34315 17 7V10" stroke="#2AB2DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </Pressable>
          <Pressable style={styles.navButton}>
            <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <Path d="M14 14C17.3137 14 20 11.3137 20 8C20 4.68629 17.3137 2 14 2C10.6863 2 8 4.68629 8 8C8 11.3137 10.6863 14 14 14Z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M4 26C4 21.5817 7.58172 18 12 18H16C20.4183 18 24 21.5817 24 26" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </Pressable>
        </View>
      </View>
    );
  }

  const slideInterpolate = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '50%'],
  });

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M15 18L9 12L15 6" stroke="#10366A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </Pressable>
        <Text style={styles.headerTitle}>Корзина</Text>
        <Pressable onPress={() => setClearModalVisible(true)}>
          <Text style={styles.clearButton}>Очистить</Text>
        </Pressable>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <View style={styles.itemImageContainer}>
              <Image
                source={require('../assets/умывальник.png')}
                style={styles.itemImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.itemDetails}>
              <Text style={styles.itemCategory}>{item.category}</Text>
              <Text style={styles.itemCode}>{item.code}</Text>
              <View style={styles.itemColorRow}>
                <Text style={styles.itemColorLabel}>Цвет:</Text>
                <Text style={styles.itemColorValue}>{item.color}</Text>
              </View>
              <Text style={styles.itemStock}>осталось {item.stock} шт.</Text>

              <View style={styles.itemFooter}>
                <View style={styles.quantityControl}>
                  <Pressable
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item.id, -1)}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </Pressable>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <Pressable
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item.id, 1)}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </Pressable>
                </View>
                <Text style={styles.itemPrice}>{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</Text>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Всего:</Text>
            <Text style={styles.summaryValue}>{calculateSubtotal().toLocaleString('ru-RU')} ₽</Text>
          </View>

          <Text style={styles.paymentMethodLabel}>Выберите способ оплаты</Text>

          <View style={styles.paymentMethodsContainer}>
            <Animated.View
              style={[
                styles.paymentMethodSlider,
                {
                  left: slideInterpolate,
                }
              ]}
            />
            <Pressable
              style={styles.paymentMethodButton}
              onPress={() => setPaymentMethod('card')}
            >
              <Text style={[
                styles.paymentMethodText,
                paymentMethod === 'card' && styles.paymentMethodTextActive
              ]}>
                Картой
              </Text>
            </Pressable>
            <Pressable
              style={styles.paymentMethodButton}
              onPress={() => setPaymentMethod('cash')}
            >
              <Text style={[
                styles.paymentMethodText,
                paymentMethod === 'cash' && styles.paymentMethodTextActive
              ]}>
                Наличными
              </Text>
            </Pressable>
          </View>

          
            <View style={styles.discountRow}>
              <Text style={styles.discountLabel}>Оплата наличными - 5%</Text>
              <Text style={styles.discountValue}>-{calculateDiscount().toLocaleString('ru-RU')} ₽</Text>
            </View>
          
        </View>
      </ScrollView>

      <View style={styles.fixedBottom}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Итого к оплате:</Text>
          <Text style={styles.totalValue}>{calculateTotal().toLocaleString('ru-RU')} ₽</Text>
        </View>

        <Pressable style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Далее</Text>
        </Pressable>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={clearModalVisible}
        onRequestClose={() => setClearModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setClearModalVisible(false)}
            >
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path d="M18 6L6 18M6 6L18 18" stroke="#10366A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </Svg>
            </Pressable>
            <Text style={styles.modalTitle}>Очистить корзину?</Text>
            <Text style={styles.modalSubtitle}>Все товары будут удалены из вашей корзины</Text>
            <Pressable style={styles.modalConfirmButton} onPress={handleClearCart}>
              <Text style={styles.modalConfirmButtonText}>Очистить</Text>
            </Pressable>
            <Pressable style={styles.modalCancelButton} onPress={() => setClearModalVisible(false)}>
              <Text style={styles.modalCancelButtonText}>Отменить</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.bottomNav}>
        <Pressable style={styles.navButton} onPress={() => router.push('/catalog')}>
          <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <Path d="M4 8H24M4 14H24M4 20H24" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </Pressable>
        <Pressable style={styles.navButton}>
          <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <Path d="M9 26H19C21.2091 26 23 24.2091 23 22V10L5 10V22C5 24.2091 6.79086 26 9 26Z" stroke="#2AB2DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M3 10H25" stroke="#2AB2DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M11 10V7C11 5.34315 12.3431 4 14 4V4C15.6569 4 17 5.34315 17 7V10" stroke="#2AB2DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </Pressable>
        <Pressable style={styles.navButton}>
          <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <Path d="M14 14C17.3137 14 20 11.3137 20 8C20 4.68629 17.3137 2 14 2C10.6863 2 8 4.68629 8 8C8 11.3137 10.6863 14 14 14Z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M4 26C4 21.5817 7.58172 18 12 18H16C20.4183 18 24 21.5817 24 26" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
  },
  headerEmpty: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#10366A',
  },
  headerTitleEmpty: {
    fontSize: 24,
    fontWeight: '600',
    color: '#10366A',
  },
  clearButton: {
    fontSize: 16,
    color: '#2AB2DB',
    fontWeight: '500',
  },
  placeholder: {
    width: 80,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#E2EDFE',
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
  },
  itemImageContainer: {
    width: 120,
    height: 140,
    backgroundColor: '#FFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemImage: {
    width: '80%',
    height: '80%',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemCategory: {
    fontSize: 14,
    color: '#6B83A4',
    marginBottom: 2,
  },
  itemCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10366A',
    marginBottom: 8,
  },
  itemColorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemColorLabel: {
    fontSize: 14,
    color: '#293FDB',
    fontWeight: '500',
    marginRight: 4,
  },
  itemColorValue: {
    fontSize: 14,
    color: '#8C8C8C',
  },
  itemStock: {
    fontSize: 12,
    color: '#8C8C8C',
    marginBottom: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#10366A',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#10366A',
    minWidth: 20,
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C2C2C',
  },
  summarySection: {
    backgroundColor: '#F3F6FE',
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2C',
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C2C2C',
  },
  paymentMethodLabel: {
    fontSize: 14,
    color: '#8C8C8C',
    marginBottom: 10,
  },
  paymentMethodsContainer: {
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: '#10366A',
    borderRadius: 30,
    padding: 4,
    marginBottom: 15,
  },
  paymentMethodSlider: {
    position: 'absolute',
    top: 4,
    width: '50%',
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 26,
    transform: [{ translateY: -4 }],
    paddingVertical: 4,
  },
  paymentMethodButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  paymentMethodTextActive: {
    color: '#10366A',
  },
  discountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  discountLabel: {
    fontSize: 14,
    color: '#8C8C8C',
  },
  discountValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
  },
  fixedBottom: {
    backgroundColor: '#F3F6FE',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 100,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2C',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C2C2C',
  },
  checkoutButton: {
    backgroundColor: '#F97C00',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 150,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#10366A',
    marginTop: 20,
    marginBottom: 30,
  },
  emptyButton: {
    borderWidth: 2,
    borderColor: '#F97C00',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 40,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F97C00',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 30,
    left: 80,
    right: 80,
    flexDirection: 'row',
    gap: 25,
    backgroundColor: '#10366A',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  navButton: {
    alignItems: 'center',
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 30,
    width: '100%',
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#10366A',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6B83A4',
    textAlign: 'center',
    marginBottom: 25,
  },
  modalConfirmButton: {
    backgroundColor: '#10366A',
    borderRadius: 10,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalConfirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  modalCancelButton: {
    borderWidth: 2,
    borderColor: '#F97C00',
    borderRadius: 10,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
  },
  modalCancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F97C00',
  },
});

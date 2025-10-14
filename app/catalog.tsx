import { View, Text, StyleSheet, FlatList, Pressable, TextInput, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Svg, { Path } from 'react-native-svg';
import { typography } from '../src/styles/typography';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'DLA6-FW-304',
    category: 'Умывальник',
    price: 3250,
    stock: 2,
  },
  {
    id: '2',
    name: 'DLA6-FW-304',
    category: 'Умывальник',
    price: 3250,
    stock: 2,
  },
  {
    id: '3',
    name: 'DLA6-FW-304',
    category: 'Умывальник',
    price: 3250,
    stock: 2,
  },
  {
    id: '4',
    name: 'DLA6-FW-304',
    category: 'Умывальник',
    price: 3250,
    stock: 2,
  },
];

export default function CatalogScreen() {
  const router = useRouter();

  const renderProduct = ({ item }: { item: Product }) => (
    <Pressable 
      style={styles.productCard}
      onPress={() => router.push(`/product?id=${item.id}`)}
    >
      <View style={styles.productImageContainer}>
        <Image 
          source={require('../assets/умывальник.png')} 
          style={styles.productImage} 
          resizeMode="contain"
        />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.price}>{item.price.toLocaleString('ru-RU')} ₽</Text>
        <View style={styles.stockRow}>
          <Text style={styles.stock}>осталось {item.stock} шт.</Text>
          <View style={styles.addButton}>
            <Svg width="11" height="12" viewBox="0 0 11 12" fill="none">
              <Path d="M5.5 10.0273V7.77734V5.52734V3.27734V1.02734M1 5.52734H10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </Svg>
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Каталог</Text>
        
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск товаров"
            placeholderTextColor="#8C9DB5"
          />
          <Pressable style={styles.scanButton}>
            <Text style={styles.scanIcon}>⊞</Text>
          </Pressable>
        </View>

        <View style={styles.filterRow}>
          <Pressable style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Сортировка по цене</Text>
          </Pressable>
          <Pressable style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Фильтры</Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={PRODUCTS}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
      />

      <View style={styles.bottomNav}>
        <Pressable style={styles.navButton}>
          <Text style={styles.navIcon}>📚</Text>
        </Pressable>
        <Pressable style={styles.navButton}>
          <Text style={styles.navIcon}>🛒</Text>
        </Pressable>
        <Pressable style={styles.navButton}>
          <Text style={styles.navIcon}>👤</Text>
        </Pressable>
      </View>
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
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#2B4B7C',
  },
  headerTitle: {
    ...typography.heading1,
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2C2C2C',
  },
  scanButton: {
    padding: 5,
  },
  scanIcon: {
    fontSize: 24,
    color: '#2B4B7C',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 10,
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#E8EEF7',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  filterButtonText: {
    ...typography.text2,
    color: '#2B4B7C',
  },
  addButtonText: {
    fontSize: 40,
    color: '#FFFFFF',
    margin: 0
  },
  list: {
    padding: 15,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 15,
    width: '48%',
    overflow: 'hidden',
  },
  productImageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#F0F4F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImagePlaceholder: {
    width: '80%',
    height: '80%',
    backgroundColor: '#E0E7F0',
  },
  productInfo: {
    padding: 12,
    backgroundColor: '#E8EEF7',
  },
  category: {
    ...typography.heading2,
    color: '#10366A',
    marginBottom: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  productName: {
    ...typography.text2,
    color: '#6B83A4',
    marginBottom: 6,
  },
  price: {
    ...typography.price,
    color: '#2C2C2C',
    marginBottom: 8,
  },
  stockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stock: {
    fontSize: 11,
    color: '#8C9DB5',
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F97C00',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 1,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    backgroundColor: '#2B4B7C',
    borderRadius: 25,
    paddingVertical: 15,
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  navButton: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
  },
});

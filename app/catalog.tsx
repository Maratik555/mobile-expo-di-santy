import { View, Text, StyleSheet, FlatList, Pressable, TextInput, Image, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Svg, { Path } from 'react-native-svg';
import { typography } from '../src/styles/typography';
import { useState } from 'react';

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
    price: 4500,
    stock: 5,
  },
  {
    id: '3',
    name: 'DLA6-FW-304',
    category: 'Умывальник',
    price: 2800,
    stock: 1,
  },
  {
    id: '4',
    name: 'DLA6-FW-304',
    category: 'Умывальник',
    price: 3900,
    stock: 3,
  },
  {
    id: '5',
    name: 'DLA6-FW-304',
    category: 'Умывальник',
    price: 4200,
    stock: 4,
  },
  {
    id: '6',
    name: 'DLA6-FW-304',
    category: 'Умывальник',
    price: 4500,
    stock: 6,
  },
];

type SortType = 'cheap' | 'expensive' | null;

export default function CatalogScreen() {
  const router = useRouter();
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortType>(null);
  const [appliedSort, setAppliedSort] = useState<SortType>(null);
  const [filterButtonActive, setFilterButtonActive] = useState(false);

  const getSortedProducts = () => {
    const sorted = [...PRODUCTS];
    if (appliedSort === 'cheap') {
      return sorted.sort((a, b) => a.price - b.price);
    } else if (appliedSort === 'expensive') {
      return sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  };

  const handleApplySort = () => {
    setAppliedSort(selectedSort);
    setSortModalVisible(false);
  };

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
            placeholderTextColor="#10366A"
          />
          <Pressable style={styles.scanButton}>
            <Text style={styles.scanIcon}>⊞</Text>
          </Pressable>
        </View>
      </View>
        <View style={styles.filterRow}>
          <Pressable 
            style={[
              styles.filterButton, 
              appliedSort && styles.sortButton,
              sortModalVisible && styles.activeFilterButton
            ]}
            onPress={() => {
              setSelectedSort(appliedSort);
              setSortModalVisible(true);
            }}
          >
            <Text style={[
              styles.filterButtonText, 
              appliedSort && styles.sortButtonText,
              sortModalVisible && styles.activeFilterButtonText
            ]}>Сортировка по цене</Text>
          </Pressable>
          <Pressable 
            style={[
              styles.filterButton,
              filterButtonActive && styles.activeFilterButton
            ]}
            onPress={() => {
              setFilterButtonActive(!filterButtonActive);
              // Здесь будет логика для фильтров
            }}
          >
            <Text style={[
              styles.filterButtonText,
              filterButtonActive && styles.activeFilterButtonText
            ]}>Фильтры</Text>
          </Pressable>
        </View>
      

      <FlatList
        data={getSortedProducts()}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={sortModalVisible}
        onRequestClose={() => setSortModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Сортировка по цене</Text>
              <Pressable 
                onPress={() => setSortModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </Pressable>
            </View>

            <Pressable 
              style={styles.radioOption}
              onPress={() => setSelectedSort('cheap')}
            >
              <View style={styles.radioButton}>
                {selectedSort === 'cheap' && <View style={styles.radioButtonInner} />}
              </View>
              <Text style={styles.radioText}>Сначала дешевые</Text>
            </Pressable>

            <Pressable 
              style={styles.radioOption}
              onPress={() => setSelectedSort('expensive')}
            >
              <View style={styles.radioButton}>
                {selectedSort === 'expensive' && <View style={styles.radioButtonInner} />}
              </View>
              <Text style={styles.radioText}>Сначала дорогие</Text>
            </Pressable>

            <Pressable 
              style={styles.applyButton}
              onPress={handleApplySort}
            >
              <Text style={styles.applyButtonText}>Применить</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

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
    backgroundColor: '#FFF',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  header: {
    paddingTop: 65,
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderRadius: 20,
    backgroundColor: '#10366A',
  },
  headerTitle: {
    ...typography.heading1,
    color: '#FFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 5,
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
    marginTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    gap: 15,
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#E2E9FE',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  sortButton: {
    backgroundColor: '#E2E9FE',
  },
  filterButtonText: {
    ...typography.text2,
    color: '#13356C',
  },
  sortButtonText: {
    color: '#13356C',
  },
  activeFilterButton: {
    backgroundColor: '#10366A',
  },
  activeFilterButtonText: {
    color: '#FFFFFF',
  },
  addButtonText: {
    fontSize: 40,
    color: '#FFF',
    margin: 0
  },
  list: {
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#E2EDFE',
    borderRadius: 15,
    marginBottom: 15,
    width: '48%',
    overflow: 'hidden',
    padding: 8,
  },
  productImageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 8,
  },
  productImagePlaceholder: {
    width: '80%',
    height: '80%',
    backgroundColor: '#E2EDFE',
  },
  productInfo: {
    paddingHorizontal: 4,
    paddingBottom: 4,
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
    color: '#8C8C8C',
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
  navIcon: {
    fontSize: 28,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E3A5F',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#10366A',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1E3A5F',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1E3A5F',
  },
  radioText: {
    fontSize: 16,
    color: '#1E3A5F',
  },
  applyButton: {
    backgroundColor: '#F97C00',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});

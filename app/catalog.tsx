import { View, Text, StyleSheet, FlatList, Pressable, TextInput, Image, Modal, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Svg, { Path, Line } from 'react-native-svg';
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

interface Filters {
  brand: string[];
  purpose: string[];
  color: string[];
}

const BRANDS = ['Dionos', 'Trigor', 'Другое'];
const PURPOSES = [
  'Ванна короткая',
  'Ванна длинная',
  'Умывальник',
  'Кухня длинная',
  'Ванна высокая',
  'Ванна средняя',
  'Умывальник2',
  'Кухня средняя'
];
const COLORS = [
  'Черный матовый',
  'Белый глянец',
  'Бронза',
  'Хром',
  'Черный',
  'Белый',
  'Золотой',
  'Серебристый'
];

export default function CatalogScreen() {
  const router = useRouter();
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortType>(null);
  const [appliedSort, setAppliedSort] = useState<SortType>(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter states
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    brand: [],
    purpose: [],
    color: [],
  });
  const [appliedFilters, setAppliedFilters] = useState<Filters>({
    brand: [],
    purpose: [],
    color: [],
  });
  const [showAllPurposes, setShowAllPurposes] = useState(false);
  const [showAllColors, setShowAllColors] = useState(false);

  const getFilteredAndSortedProducts = () => {
    let filtered = [...PRODUCTS];
    
    // Фильтрация по поисковому запросу
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product => 
        product.category.toLowerCase().includes(query) ||
        product.name.toLowerCase().includes(query)
      );
    }
    
    // Сортировка
    if (appliedSort === 'cheap') {
      return filtered.sort((a, b) => a.price - b.price);
    } else if (appliedSort === 'expensive') {
      return filtered.sort((a, b) => b.price - a.price);
    }
    return filtered;
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleApplySort = () => {
    setAppliedSort(selectedSort);
    setSortModalVisible(false);
  };

  const toggleFilter = (category: keyof Filters, value: string) => {
    setSelectedFilters(prev => {
      const current = prev[category];
      if (current.includes(value)) {
        return {
          ...prev,
          [category]: current.filter(item => item !== value),
        };
      } else {
        return {
          ...prev,
          [category]: [...current, value],
        };
      }
    });
  };

  const handleApplyFilters = () => {
    setAppliedFilters(selectedFilters);
    setFilterModalVisible(false);
  };

  const hasActiveFilters = () => {
    return appliedFilters.brand.length > 0 || 
           appliedFilters.purpose.length > 0 || 
           appliedFilters.color.length > 0;
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
          resizeMode="cover"
        />
      </View>
      <View style={styles.productInfo}>
        <View>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.price}>{item.price.toLocaleString('ru-RU')} ₽</Text>
        </View>
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
          <Text style={styles.searchIcon}><Svg width="21" height="20" viewBox="0 0 21 20" fill="none">
<Path d="M10.0271 17.4998C14.5038 17.4998 18.1328 13.9554 18.1328 9.58317C18.1328 5.21092 14.5038 1.6665 10.0271 1.6665C5.55044 1.6665 1.92139 5.21092 1.92139 9.58317C1.92139 13.9554 5.55044 17.4998 10.0271 17.4998Z" stroke="#0E376C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M18.986 18.3332L17.2795 16.6665" stroke="#0E376C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</Svg></Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск товаров"
            placeholderTextColor="#10366A"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.trim() ? (
            <Pressable style={styles.scanButton} onPress={handleClearSearch}>
              <Text><Svg width="9" height="9" viewBox="0 0 9 9" fill="none">
<Path d="M7.54594 7.54624L5.95495 5.95525L4.36396 4.36426L2.77297 2.77327L1.18198 1.18228M1.18198 7.54624L7.54594 1.18228" stroke="#10366A" strokeWidth="2" strokeLinecap="round"/>
</Svg></Text>
            </Pressable>
          ) : (
            <Pressable 
              style={styles.scanButton}
              onPress={() => router.push('/scanner')}
            >
              <Text style={styles.scanIcon}><Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
<Path d="M8 3H6C4.58579 3 3.87868 3 3.43934 3.43934C3 3.87868 3 4.58579 3 6V8" stroke="#10366A" strokeWidth="1.25" strokeLinecap="round"/>
<Path d="M8 21H6C4.58579 21 3.87868 21 3.43934 20.5607C3 20.1213 3 19.4142 3 18V16" stroke="#10366A" strokeWidth="1.25" strokeLinecap="round"/>
<Path d="M16 3H18C19.4142 3 20.1213 3 20.5607 3.43934C21 3.87868 21 4.58579 21 6V8" stroke="#10366A" strokeWidth="1.25" strokeLinecap="round"/>
<Path d="M16 21H18C19.4142 21 20.1213 21 20.5607 20.5607C21 20.1213 21 19.4142 21 18V16" stroke="#10366A" strokeWidth="1.25" strokeLinecap="round"/>
<Line x1="3.625" y1="12.375" x2="20.375" y2="12.375" stroke="#10366A" strokeWidth="1.25" strokeLinecap="round"/>
</Svg></Text>
            </Pressable>
          )}
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
              (hasActiveFilters() || filterModalVisible) && styles.activeFilterButton
            ]}
            onPress={() => {
              setSelectedFilters(appliedFilters);
              setFilterModalVisible(true);
            }}
          >
            <Text style={[
              styles.filterButtonText,
              (hasActiveFilters() || filterModalVisible) && styles.activeFilterButtonText
            ]}>Фильтры</Text>
          </Pressable>
        </View>
      

      {getFilteredAndSortedProducts().length > 0 ? (
        <>
          {searchQuery.trim() && (
            <View style={styles.searchResultsHeader}>
              <Text style={styles.searchResultsText}>Вот что мы нашли:</Text>
            </View>
          )}
          <FlatList
            data={getFilteredAndSortedProducts()}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.row}
          />
        </>
      ) : (
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
<Path d="M12 15.6001H18.6667" stroke="#10366A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M15.3334 27.9998C22.329 27.9998 28.0001 22.3288 28.0001 15.3332C28.0001 8.33756 22.329 2.6665 15.3334 2.6665C8.33781 2.6665 2.66675 8.33756 2.66675 15.3332C2.66675 22.3288 8.33781 27.9998 15.3334 27.9998Z" stroke="#10366A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M29.3334 29.3332L26.6667 26.6665" stroke="#10366A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
</Svg>
          </View>
          <Text style={styles.emptyTitle}>Ничего не нашлось</Text>
          <Text style={styles.emptySubtitle}>Проверьте, правильно ли введен запрос</Text>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={sortModalVisible}
        onRequestClose={() => setSortModalVisible(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setSortModalVisible(false)}
        >
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Сортировка по цене</Text>
              <Pressable 
                style={styles.closeButton}
                onPress={() => setSortModalVisible(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Svg width="9" height="9" viewBox="0 0 9 9" fill="none">
<Path d="M7.54594 7.54624L5.95495 5.95525L4.36396 4.36426L2.77297 2.77327L1.18198 1.18228M1.18198 7.54624L7.54594 1.18228" stroke="#10366A" strokeWidth="2" strokeLinecap="round"/>
</Svg>
              </Pressable>
            </View>

            <Pressable 
              style={styles.radioOption}
              onPress={() => setSelectedSort(selectedSort === 'cheap' ? null : 'cheap')}
            >
              <View style={[styles.radioButton, selectedSort === 'cheap' && styles.radioButtonActive]}>
                {selectedSort === 'cheap' && <View style={styles.radioButtonInner} />}
              </View>
              <Text style={styles.radioText}>Сначала дешевые</Text>
            </Pressable>

            <Pressable 
              style={styles.radioOption}
              onPress={() => setSelectedSort(selectedSort === 'expensive' ? null : 'expensive')}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <View style={[styles.radioButton, selectedSort === 'expensive' && styles.radioButtonActive]}>
                {selectedSort === 'expensive' && <View style={styles.radioButtonInner} />}
              </View>
              <Text style={styles.radioText}>Сначала дорогие</Text>
            </Pressable>

            <Pressable 
              style={styles.applyButton}
              onPress={handleApplySort}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.applyButtonText}>Применить</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.filterModalContent}>
            <View style={styles.modalHeaderFilter}>
              <Text style={styles.modalTitleFilter}>Фильтры</Text>
              <Pressable 
                style={styles.closeButtonFilter}
                onPress={() => setFilterModalVisible(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Svg width="9" height="9" viewBox="0 0 9 9" fill="none">
<Path d="M7.54594 7.54624L5.95495 5.95525L4.36396 4.36426L2.77297 2.77327L1.18198 1.18228M1.18198 7.54624L7.54594 1.18228" stroke="#10366A" strokeWidth="2" strokeLinecap="round"/>
</Svg>
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.filterScrollView}>
              {/* Бренд */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Бренд</Text>
                {BRANDS.map((brand) => (
                  <Pressable 
                    key={brand}
                    style={styles.checkboxOption}
                    onPress={() => toggleFilter('brand', brand)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <View style={[styles.checkbox, selectedFilters.brand.includes(brand) && styles.checkboxActive]}>
                      {selectedFilters.brand.includes(brand) && (
                        <View style={styles.checkboxInner} />
                      )}
                    </View>
                    <Text style={styles.checkboxText}>{brand}</Text>
                  </Pressable>
                ))}
              </View>
              {/* Назначение */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Назначение</Text>
                {(showAllPurposes ? PURPOSES : PURPOSES.slice(0, 4)).map((purpose, i) => (
                  <Pressable 
                    key={i}
                    style={styles.checkboxOption}
                    onPress={() => toggleFilter('purpose', purpose)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <View style={[styles.checkbox, selectedFilters.purpose.includes(purpose) && styles.checkboxActive]}>
                      {selectedFilters.purpose.includes(purpose) && (
                        <View style={styles.checkboxInner} />
                      )}
                    </View>
                    <Text style={styles.checkboxText}>{purpose}</Text>
                  </Pressable>
                ))}
                {PURPOSES.length > 4 && (
                  <Pressable onPress={() => setShowAllPurposes(!showAllPurposes)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
    {showAllPurposes ? (
    <>
      <Text style={styles.showMoreText}>Скрыть все назначения</Text>
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      style={{ transform: [{ translateY: 3 }]}}
      >
        <Path
          d="M8 14L12 10L16 14"
          stroke="#2AB2DB"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </>
    
  ) : (
    <>
      <Text style={styles.showMoreText}>Посмотреть все назначения</Text>
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      style={{ transform: [{ translateY: 3 }]}} 
      >
        <Path
          d="M16 10L12 14L8 10"
          stroke="#2AB2DB"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </>
  )}
  </View>
                  </Pressable>
                )}
              </View>

              {/* Цвет */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Цвет</Text>
                {(showAllColors ? COLORS : COLORS.slice(0, 4)).map((color, i) => (
                  <Pressable 
                    key={i}
                    style={styles.checkboxOption}
                    onPress={() => toggleFilter('color', color)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <View style={[styles.checkbox, selectedFilters.color.includes(color) && styles.checkboxActive]}>
                      {selectedFilters.color.includes(color) && (
                        <View style={styles.checkboxInner} />
                      )}
                    </View>
                    <Text style={styles.checkboxText}>{color}</Text>
                  </Pressable>
                ))}
                {COLORS.length > 4 && (
                  <Pressable onPress={() => setShowAllColors(!showAllColors)}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
    {showAllColors ? (
    <>
      <Text style={styles.showMoreText}>Скрыть все цвета</Text>
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      style={{ transform: [{ translateY: 3 }]}} 
      >
        <Path
          d="M8 14L12 10L16 14"
          stroke="#2AB2DB"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </>
    
  ) : (
    <>
      <Text style={styles.showMoreText}>Посмотреть все цвета</Text>
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      style={{ transform: [{ translateY: 3 }]}} 
      >
        <Path
          d="M16 10L12 14L8 10"
          stroke="#2AB2DB"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </>
  )}
  </View>
                  </Pressable>
                )}
              </View>
            </ScrollView>

            <Pressable 
              style={styles.applyButton}
              onPress={handleApplyFilters}
            >
              <Text style={styles.applyButtonText}>Применить</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.bottomNav}>
        <Pressable style={styles.navButton}>
          <Text><Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
<Path d="M12 9.7998V19.9998M12 9.7998C12 8.11965 12 7.27992 12.327 6.63818C12.6146 6.0737 13.0732 5.6146 13.6377 5.32698C14.2794 5 15.1196 5 16.7998 5H19.3998C19.9599 5 20.2401 5 20.454 5.10899C20.6422 5.20487 20.7948 5.35774 20.8906 5.5459C20.9996 5.75981 21 6.04004 21 6.6001V15.4001C21 15.9601 20.9996 16.2398 20.8906 16.4537C20.7948 16.6419 20.6425 16.7952 20.4543 16.8911C20.2406 17 19.961 17 19.402 17H16.5693C15.6301 17 15.1597 17 14.7334 17.1295C14.356 17.2441 14.0057 17.4317 13.701 17.6821C13.3568 17.965 13.096 18.3557 12.575 19.1372L12 19.9998M12 9.7998C12 8.11965 11.9998 7.27992 11.6729 6.63818C11.3852 6.0737 10.9263 5.6146 10.3618 5.32698C9.72004 5 8.87977 5 7.19961 5H4.59961C4.03956 5 3.75981 5 3.5459 5.10899C3.35774 5.20487 3.20487 5.35774 3.10899 5.5459C3 5.75981 3 6.04004 3 6.6001V15.4001C3 15.9601 3 16.2398 3.10899 16.4537C3.20487 16.6419 3.35774 16.7952 3.5459 16.8911C3.7596 17 4.03901 17 4.59797 17H7.43073C8.36994 17 8.83942 17 9.26569 17.1295C9.64306 17.2441 9.99512 17.4317 10.2998 17.6821C10.6426 17.9638 10.9017 18.3526 11.4185 19.1277L12 19.9998" stroke="#2AB2DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</Svg></Text>
        </Pressable>
        <Pressable style={styles.navButton}>
          <Text><Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
<Path d="M3 3H3.26835C3.74213 3 3.97943 3 4.17267 3.08548C4.34304 3.16084 4.48871 3.28218 4.59375 3.43604C4.71269 3.61026 4.75564 3.8429 4.84137 4.30727L7.00004 16L17.4218 16C17.875 16 18.1023 16 18.29 15.9199C18.4559 15.8492 18.5989 15.7346 18.7051 15.5889C18.8252 15.4242 18.8761 15.2037 18.9777 14.7631L18.9785 14.76L20.5477 7.95996L20.5481 7.95854C20.7023 7.29016 20.7796 6.95515 20.6947 6.69238C20.6202 6.46182 20.4635 6.26634 20.2556 6.14192C20.0184 6 19.6758 6 18.9887 6H5.5M18 21C17.4477 21 17 20.5523 17 20C17 19.4477 17.4477 19 18 19C18.5523 19 19 19.4477 19 20C19 20.5523 18.5523 21 18 21ZM8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20C9 20.5523 8.55228 21 8 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</Svg></Text>
        </Pressable>
        <Pressable style={styles.navButton}>
          <Text ><Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
<Path d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</Svg></Text>
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
    width: '90%',
    height: '90%',
  },
  header: {
    paddingTop: 65,
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
    marginBlock: 5,
    fontSize: 16,
    lineHeight: 20,
    color: '#2C2C2C',
  },
  scanButton: {
    padding: 5,
  },
  scanIcon: {
    fontSize: 24,
    color: '#2B4B7C',
  },
  searchResultsHeader: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  searchResultsText: {
    ...typography.heading3,
    color: '#8C8C8C',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 200,
  },
  emptyIconContainer: {
    marginBottom: 10,
  },
  emptyTitle: {
    ...typography.heading1,
    color: '#10366A',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  emptySubtitle: {
    ...typography.heading2,
    color: '#6B83A4',
    textAlign: 'center',
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
    backgroundColor: '#10366A',
  },
  filterButtonText: {
    ...typography.text2,
    color: '#13356C',
  },
  sortButtonText: {
    color: '#FFFFFF',
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
    gap: 10,
  },
  productCard: {
    backgroundColor: '#E2EDFE',
    borderRadius: 15,
    marginBottom: 10,
    flex: 1,
    maxWidth: '48%',
    // height: 263,
    overflow: 'hidden',
    padding: 8,
  },
  productImageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  productImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E2EDFE',
  },
  productInfo: {
    flex: 1,
    paddingHorizontal: 4,
    paddingTop: 4,
    paddingBottom: 4,
    justifyContent: 'space-between',
  },
  category: {
    color: '#10366A',
    marginBottom: 2,
    marginTop: 4,
    fontSize: 12,
    fontWeight: 600,
    // lineHeight: 20,
  },
  productName: {
    color: '#6B83A4',
    marginBottom: 3,
    fontSize: 12,
    fontWeight: 600,
    // lineHeight: 20,

  },
  price: {
    ...typography.price,
    color: '#2C2C2C',
    marginBottom: 4,
    fontSize: 14,
  },
  stockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stock: {
    fontSize: 10,
    fontWeight: 600,
    color: '#8C8C8C',
    // lineHeight: 20,
  },
  addButton: {
    width: 19,
    height: 19,
    borderRadius: 12,
    backgroundColor: '#F97C00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 30,
    left: 90,
    right: 90,
    flexDirection: 'row',
    gap: 35,
    backgroundColor: '#10366A',
    borderRadius: 20,
    paddingVertical: 20,
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
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    width: '100%',
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
  },
   modalHeaderFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    ...typography.heading1,
    paddingHorizontal: 60,
    fontWeight: '600',
    color: '#1E3A5F',
  },
  modalTitleFilter: {
    ...typography.heading1,
    paddingHorizontal: 125,
    fontWeight: '600',
    color: '#1E3A5F',
  },
  closeButtonFilter: {
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    // padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#10366A',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  radioButton: {
    width: 17,
    height: 17,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1E3A5F',
    marginRight: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonActive: {
    borderColor: '#2AB2DB',
  },
  radioButtonInner: {
    width: 9,
    height: 9,
    borderRadius: 6,
    backgroundColor: '#2AB2DB',
  },
  radioText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E3A5F',
  },
  applyButton: {
    backgroundColor: '#F97C00',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 30,
  },
  applyButtonText: {
    ...typography.heading1,
    fontWeight: '600',
    color: '#FFF',
  },
  filterModalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    paddingBottom: 40,
    height: '92%',
  },
  filterScrollView: {
    // maxHeight: 650,
  },
  filterSection: {
    marginTop: 10,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10366A',
    marginBottom: 15,
    marginHorizontal: 20,
  },
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    marginHorizontal: 7,
  },
  checkbox: {
    width: 17,
    height: 17,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1E3A5F',
    marginRight: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    borderColor: '#2AB2DB',
  },
  checkboxInner: {
    width: 9,
    height: 9,
    borderRadius: 6,
    backgroundColor: '#2AB2DB',
  },
  checkboxText: {
    fontSize: 16,
    color: '#10366A',
  },
  showMoreText: {
    fontSize: 14,
    color: '#2AB2DB',
    fontWeight: 500,
    lineHeight: 20,
    marginTop: 5,
    marginLeft: 20,
  },
});

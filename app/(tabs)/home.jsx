import { View, Text, StyleSheet, FlatList, TextInput, Dimensions, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../firebase.config';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

// const DUMMY_PRODUCTS = [
//   { id: '1', name: 'Floral Summer Dress', price: 299000, category: 'Dress', image: 'https://picsum.photos/200/300' },
//   { id: '2', name: 'Denim Jacket', price: 459000, category: 'Outerwear', image: 'https://picsum.photos/200/300' },
//   { id: '3', name: 'White Sneakers', price: 599000, category: 'Shoes', image: 'https://picsum.photos/200/300' },
//   { id: '4', name: 'Black Handbag', price: 899000, category: 'Bags', image: 'https://picsum.photos/200/300' },
//   { id: '5', name: 'Silk Scarf', price: 159000, category: 'Accessories', image: 'https://picsum.photos/200/300' },
//   { id: '6', name: 'Summer Hat', price: 129000, category: 'Accessories', image: 'https://picsum.photos/200/300' },
// ];

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 24; // 2 columns with padding

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [greeting, setGreeting] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 3 && hour < 12) return 'Good Morning';
      if (hour >= 12 && hour < 15) return 'Good Afternoon';
      if (hour >= 15 && hour < 18) return 'Good Evening';
      return 'Good Night';
    };
    setGreeting(getGreeting());
  }, []);

  // Fungsi untuk memfilter produk
  // useEffect(() => {
  //   if (searchQuery.trim() === '') {
  //     setFilteredProducts(DUMMY_PRODUCTS);
  //     return;
  //   }

  //   const query = searchQuery.toLowerCase().trim();
  //   const filtered = DUMMY_PRODUCTS.filter(product => {
  //     return (
  //       product.name.toLowerCase().includes(query) ||
  //       product.category.toLowerCase().includes(query) ||
  //       (product.description && product.description.toLowerCase().includes(query))
  //     );
  //   });

  //   setFilteredProducts(filtered);
  // }, [searchQuery]);

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const products = [];
      snapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      setFilteredProducts(products);
    });

    return () => unsubscribe();
  }, []);

  const renderProductCard = ({ item }) => (
    <TouchableOpacity 
      onPress={() => router.push({
        pathname: "/details",
        params: item
      })}
    >
      <View style={styles.card}>
        <Image 
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode="cover"
        />
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.productPrice}>
            Rp {item.price.toLocaleString('id-ID')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render jika tidak ada hasil pencarian
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="search-outline" size={48} color="#9ca3af" />
      <Text style={styles.emptyText}>No products found</Text>
      <Text style={styles.emptySubtext}>Try searching with different keywords</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>{greeting}, Boutiqers!</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyList}
      />
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => router.push("/addproduct")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  searchBar: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    fontFamily: 'Helvetica',
    color: '#111827',
  },
  productRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 9,
  },
  productImage: {
    width: '100%',
    height: 150,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: 'Helvetica-Bold'
  },
  productPrice: {
    fontSize: 16,
    color: 'blue',
    fontFamily: 'Helvetica-Bold'
  },
  category: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontFamily: 'Helvetica'
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 16,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#374151',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: 'Helvetica',
    color: '#6b7280',
    marginTop: 4,
  },
});

export default Home;

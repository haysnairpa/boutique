import { View, Text, StyleSheet, FlatList, TextInput, Dimensions, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { router } from 'expo-router';

const DUMMY_PRODUCTS = [
  { id: '1', name: 'Floral Summer Dress', price: 299000, category: 'Dress', image: 'https://picsum.photos/200/300' },
  { id: '2', name: 'Denim Jacket', price: 459000, category: 'Outerwear', image: 'https://picsum.photos/200/300' },
  { id: '3', name: 'White Sneakers', price: 599000, category: 'Shoes', image: 'https://picsum.photos/200/300' },
  { id: '4', name: 'Black Handbag', price: 899000, category: 'Bags', image: 'https://picsum.photos/200/300' },
  { id: '5', name: 'Silk Scarf', price: 159000, category: 'Accessories', image: 'https://picsum.photos/200/300' },
  { id: '6', name: 'Summer Hat', price: 129000, category: 'Accessories', image: 'https://picsum.photos/200/300' },
];

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 24; // 2 columns with padding

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [greeting, setGreeting] = useState('');

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

  const renderProductCard = ({ item }) => (
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
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>{greeting}, Aldi!</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={DUMMY_PRODUCTS}
        renderItem={renderProductCard}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        showsVerticalScrollIndicator={false}
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
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    fontFamily: 'Helvetica'
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
});

export default Home;

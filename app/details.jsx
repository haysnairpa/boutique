import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Details = () => {
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Detail Product</Text>
      </View>

      <Image 
        source={{ uri: params.image }} 
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.name}>{params.name}</Text>
        <Text style={styles.price}>Rp {Number(params.price).toLocaleString('id-ID')}</Text>
        
        <View style={styles.divider} />
        
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Category</Text>
              <Text style={styles.value}>{params.category}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Size</Text>
              <Text style={styles.value}>{params.size || '-'}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Material</Text>
              <Text style={styles.value}>{params.material || '-'}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Color</Text>
              <Text style={styles.value}>{params.color || '-'}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Stock</Text>
              <Text style={styles.value}>{params.stock || '0'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{params.description || 'No description available'}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 12,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  image: {
    width: '100%',
    height: 400,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: '#6366F1',
    marginBottom: 24,
  },
  infoSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Helvetica',
  },
  value: {
    fontSize: 14,
    color: '#111827',
    fontFamily: 'Helvetica-Bold',
  },
  descriptionSection: {
    gap: 8,
  },
  description: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    fontFamily: 'Helvetica',
  },
  detailsSection: {
    gap: 8,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: 'grey',
    marginBottom: 24,
  },
});

export default Details;
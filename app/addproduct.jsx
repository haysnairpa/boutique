import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AddProduct = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    size: '',
    material: '',
    color: '',
    stock: '',
    description: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Let's add your product!</Text>
      </View>
      
      <View style={styles.imageSection}>
        {image ? (
          <Image source={{ uri: image }} style={styles.previewImage} />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.imageButton}>
            <Text style={styles.buttonText}>Take photos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageButton}>
            <Text style={styles.buttonText}>Choose a file</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Product Name</Text>
          <TextInput 
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <TextInput 
            style={styles.input}
            value={formData.category}
            onChangeText={(text) => handleInputChange('category', text)}
          />
        </View>

        <View style={styles.rowContainer}>
          <View style={[styles.inputGroup, styles.flex1]}>
            <Text style={styles.label}>Price</Text>
            <TextInput 
              style={styles.input}
              keyboardType="numeric"
              value={formData.price}
              onChangeText={(text) => handleInputChange('price', text)}
            />
          </View>

          <View style={[styles.inputGroup, styles.flex1]}>
            <Text style={styles.label}>Size</Text>
            <TextInput 
              style={styles.input}
              value={formData.size}
              onChangeText={(text) => handleInputChange('size', text)}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Material</Text>
          <TextInput 
            style={styles.input}
            value={formData.material}
            onChangeText={(text) => handleInputChange('material', text)}
          />
        </View>

        <View style={styles.rowContainer}>
          <View style={[styles.inputGroup, styles.flex1]}>
            <Text style={styles.label}>Color</Text>
            <TextInput 
              style={styles.input}
              value={formData.color}
              onChangeText={(text) => handleInputChange('color', text)}
            />
          </View>

          <View style={[styles.inputGroup, styles.flex1]}>
            <Text style={styles.label}>Stock</Text>
            <TextInput 
              style={styles.input}
              keyboardType="numeric"
              value={formData.stock}
              onChangeText={(text) => handleInputChange('stock', text)}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput 
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={4}
            value={formData.description}
            onChangeText={(text) => handleInputChange('description', text)}
          />
        </View>

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={() => {
            // submit logic
            console.log('Product added:', formData);
          }}
        >
          <Text style={styles.submitButtonText}>Add Product</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  imagePlaceholder: {
    width: '100%',
    height: 280,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  previewImage: {
    width: '100%',
    height: 280,
    borderRadius: 12,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  imageButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  buttonText: {
    color: '#6366F1',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 15,
    fontFamily: 'Helvetica',
  },
  form: {
    backgroundColor: '#fff',
    gap: 20,
    paddingHorizontal: 20,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    fontFamily: 'Helvetica',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    backgroundColor: '#fff',
    fontFamily: 'Helvetica',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 24,
  },
  backButton: {
    marginRight: 12,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  submitButton: {
    backgroundColor: '#6366F1',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 32,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
  },
});

export default AddProduct;
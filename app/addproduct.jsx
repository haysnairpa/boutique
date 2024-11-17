import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase.config';
import { collection, addDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

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
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        alert('Sorry, we need camera permission to make this work!');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Error taking photo:', error);
      alert('Error taking photo');
    }
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        alert('Sorry, we need gallery permission to make this work!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Error picking image:', error);
      alert('Error picking image');
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    // Validasi setiap field
    Object.keys(formData).forEach(key => {
      if (!formData[key]) {
        tempErrors[key] = true;
        isValid = false;
      }
    });

    // Validasi khusus untuk image
    if (!image) {
      tempErrors.image = true;
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await addDoc(collection(db, 'products'), {
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        size: formData.size,
        material: formData.material,
        color: formData.color,
        stock: Number(formData.stock),
        description: formData.description,
        image: image,
        createdAt: new Date()
      });
      
      navigation.goBack();
    } catch (error) {
      console.error('Error adding product:', error);
    }
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
          <View style={[
            styles.imagePlaceholder,
            errors.image && styles.errorBorder
          ]} />
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
            <Text style={styles.buttonText}>Take photos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.buttonText}>Choose a file</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Product Name</Text>
          <TextInput 
            style={[
              styles.input,
              errors.name && styles.errorBorder
            ]}
            value={formData.name}
            onChangeText={(text) => {
              handleInputChange('name', text);
              setErrors(prev => ({...prev, name: false}));
            }}
          />
          {errors.name && (
            <Text style={styles.errorText}>Product name is required</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <TextInput 
            style={[
              styles.input,
              errors.category && styles.errorBorder
            ]}
            value={formData.category}
            onChangeText={(text) => {
              handleInputChange('category', text);
              setErrors(prev => ({...prev, category: false}));
            }}
          />
          {errors.category && (
            <Text style={styles.errorText}>Category is required</Text>
          )}
        </View>

        <View style={styles.rowContainer}>
          <View style={[styles.inputGroup, styles.flex1]}>
            <Text style={styles.label}>Price</Text>
            <TextInput 
              style={[
                styles.input,
                errors.price && styles.errorBorder
              ]}
              keyboardType="numeric"
              value={formData.price}
              onChangeText={(text) => {
                handleInputChange('price', text);
                setErrors(prev => ({...prev, price: false}));
              }}
            />
            {errors.price && (
              <Text style={styles.errorText}>Price is required</Text>
            )}
          </View>

          <View style={[styles.inputGroup, styles.flex1]}>
            <Text style={styles.label}>Size</Text>
            <TextInput 
              style={[
                styles.input,
                errors.size && styles.errorBorder
              ]}
              value={formData.size}
              onChangeText={(text) => {
                handleInputChange('size', text);
                setErrors(prev => ({...prev, size: false}));
              }}
            />
            {errors.size && (
              <Text style={styles.errorText}>Size is required</Text>
            )}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Material</Text>
          <TextInput 
            style={[
              styles.input,
              errors.material && styles.errorBorder
            ]}
            value={formData.material}
            onChangeText={(text) => {
              handleInputChange('material', text);
              setErrors(prev => ({...prev, material: false}));
            }}
          />
          {errors.material && (
            <Text style={styles.errorText}>Material is required</Text>
          )}
        </View>

        <View style={styles.rowContainer}>
          <View style={[styles.inputGroup, styles.flex1]}>
            <Text style={styles.label}>Color</Text>
            <TextInput 
              style={[
                styles.input,
                errors.color && styles.errorBorder
              ]}
              value={formData.color}
              onChangeText={(text) => {
                handleInputChange('color', text);
                setErrors(prev => ({...prev, color: false}));
              }}
            />
            {errors.color && (
              <Text style={styles.errorText}>Color is required</Text>
            )}
          </View>

          <View style={[styles.inputGroup, styles.flex1]}>
            <Text style={styles.label}>Stock</Text>
            <TextInput 
              style={[
                styles.input,
                errors.stock && styles.errorBorder
              ]}
              keyboardType="numeric"
              value={formData.stock}
              onChangeText={(text) => {
                handleInputChange('stock', text);
                setErrors(prev => ({...prev, stock: false}));
              }}
            />
            {errors.stock && (
              <Text style={styles.errorText}>Stock is required</Text>
            )}
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
          onPress={handleSubmit}
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
  errorBorder: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Helvetica',
  },
});

export default AddProduct;
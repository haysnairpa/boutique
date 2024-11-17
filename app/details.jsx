import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal } from 'react-native';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.config';

const Details = () => {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    name: params.name,
    category: params.category,
    price: params.price.toString(),
    size: params.size,
    material: params.material,
    color: params.color,
    stock: params.stock.toString(),
    description: params.description
  });

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'products', params.id));
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, 'products', params.id), {
        ...editData,
        price: Number(editData.price),
        stock: Number(editData.stock),
        updatedAt: new Date()
      });
      setShowEditModal(false);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating product:', error);
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
        <Text style={styles.headerText}>Detail Product</Text>
      </View>

      <Image 
        source={{ uri: params.image }} 
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.headerActions}>
          <Text style={styles.name}>{params.name}</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.editButton]} 
              onPress={handleEdit}
            >
              <Ionicons name="pencil" size={20} color="#6366F1" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.deleteButton]}
              onPress={handleDelete}
            >
              <Ionicons name="trash" size={20} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>
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

      {showEditModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showEditModal}
          onRequestClose={() => setShowEditModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Edit Product</Text>
                <TouchableOpacity onPress={() => setShowEditModal(false)}>
                  <Ionicons name="close" size={24} color="#111827" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalForm}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Product Name</Text>
                  <TextInput 
                    style={styles.input}
                    value={editData.name}
                    onChangeText={(text) => setEditData({...editData, name: text})}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Category</Text>
                  <TextInput 
                    style={styles.input}
                    value={editData.category}
                    onChangeText={(text) => setEditData({...editData, category: text})}
                  />
                </View>

                <View style={styles.rowContainer}>
                  <View style={[styles.inputGroup, styles.flex1]}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput 
                      style={styles.input}
                      keyboardType="numeric"
                      value={editData.price}
                      onChangeText={(text) => setEditData({...editData, price: text})}
                    />
                  </View>

                  <View style={[styles.inputGroup, styles.flex1]}>
                    <Text style={styles.label}>Size</Text>
                    <TextInput 
                      style={styles.input}
                      value={editData.size}
                      onChangeText={(text) => setEditData({...editData, size: text})}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Material</Text>
                  <TextInput 
                    style={styles.input}
                    value={editData.material}
                    onChangeText={(text) => setEditData({...editData, material: text})}
                  />
                </View>

                <View style={styles.rowContainer}>
                  <View style={[styles.inputGroup, styles.flex1]}>
                    <Text style={styles.label}>Color</Text>
                    <TextInput 
                      style={styles.input}
                      value={editData.color}
                      onChangeText={(text) => setEditData({...editData, color: text})}
                    />
                  </View>

                  <View style={[styles.inputGroup, styles.flex1]}>
                    <Text style={styles.label}>Stock</Text>
                    <TextInput 
                      style={styles.input}
                      keyboardType="numeric"
                      value={editData.stock}
                      onChangeText={(text) => setEditData({...editData, stock: text})}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Description</Text>
                  <TextInput 
                    style={[styles.input, styles.textArea]}
                    multiline
                    numberOfLines={4}
                    value={editData.description}
                    onChangeText={(text) => setEditData({...editData, description: text})}
                  />
                </View>

                <TouchableOpacity 
                  style={styles.updateButton}
                  onPress={handleUpdate}
                >
                  <Text style={styles.updateButtonText}>Update Product</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
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
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  editButton: {
    borderColor: '#6366F1',
  },
  deleteButton: {
    borderColor: '#EF4444',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: '100%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  modalForm: {
    padding: 20,
  },
  updateButton: {
    backgroundColor: '#6366F1',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  updateButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
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
  inputGroup: {
    gap: 6,
    marginBottom: 16,
  },
});

export default Details;
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, Modal, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // For storing and retrieving the token
import { MaterialIcons } from "@expo/vector-icons";

const API_URL = "http://10.0.2.2:3000/emergency/contacts"; // Update with your server IP

const EmergencyContactsScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadContacts();
  }, []);

  // Fetch contacts with authentication
  const loadContacts = async () => {
    const token = await AsyncStorage.getItem('authToken'); // Ensure it's 'authToken' here
    if (!token) {
      console.error("No authentication token found!");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to fetch contacts");
      const data = await response.json();
      setContacts(data);
      console.log('✅ Contacts fetched:', data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // Add or Update a Contact
  const addOrUpdateContact = async () => {
    if (!contactName || !contactPhone) {
      Alert.alert("Error", "Please enter name and phone number.");
      return;
    }

    const token = await AsyncStorage.getItem("authToken"); // Ensure it's 'authToken' here
    if (!token) {
      Alert.alert("Authentication Error", "You need to log in first.");
      return;
    }

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;

      const response = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ name: contactName, phone: contactPhone }),
      });

      if (!response.ok) throw new Error("Failed to save contact");

      loadContacts();
      closeModal();
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  };

  // Delete a contact
  const deleteContact = async (id) => {
    const token = await AsyncStorage.getItem("authToken"); // Ensure it's 'authToken' here
    if (!token) {
      Alert.alert("Authentication Error", "You need to log in first.");
      return;
    }

    Alert.alert("Delete Contact", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: async () => {
        try {
          const response = await fetch(`${API_URL}/${id}`, { 
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
          });

          if (!response.ok) throw new Error("Failed to delete contact");

          loadContacts();
        } catch (error) {
          console.error("Error deleting contact:", error);
        }
      }}],
    );
  };

  const openModalForEdit = (contact) => {
    setContactName(contact.name);
    setContactPhone(contact.phone);
    setEditingId(contact._id);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setContactName("");
    setContactPhone("");
    setEditingId(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Emergency Contacts</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <Text style={styles.contactText}>{item.name} - {item.phone}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={() => openModalForEdit(item)}>
                <MaterialIcons name="edit" size={24} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteContact(item._id)}>
                <MaterialIcons name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Contact</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput placeholder="Name" style={styles.input} value={contactName} onChangeText={setContactName} />
            <TextInput placeholder="Phone Number" style={styles.input} value={contactPhone} onChangeText={setContactPhone} keyboardType="phone-pad" />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={addOrUpdateContact}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 30 ,marginTop:30},
  contactItem: { flexDirection: "row", justifyContent: "space-between", backgroundColor: "#fff", padding: 15, borderRadius: 5, marginBottom: 10, elevation: 2 },
  contactText: { fontSize: 16 },
  actionButtons: { flexDirection: "row", gap: 15 },
  addButton: { backgroundColor: "#007BFF", padding: 15, alignItems: "center", borderRadius: 5, marginTop: 20 },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { width: "80%", backgroundColor: "#fff", padding: 20, borderRadius: 5, alignItems: "center" },
  input: { width: "100%", borderBottomWidth: 1, padding: 10, marginBottom: 10 },
  modalButtons: { flexDirection: "row", gap: 15, marginTop: 10 },
  saveButton: { backgroundColor: "#007BFF", padding: 10, borderRadius: 5 },
  cancelButton: { backgroundColor: "#FF3B30", padding: 10, borderRadius: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" }
});

export default EmergencyContactsScreen;

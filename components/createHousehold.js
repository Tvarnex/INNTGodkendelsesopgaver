import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch, StyleSheet, Alert } from 'react-native';
import { saveHouseholdData } from '../database'; // Adjust path as necessary
import HouseholdList from './householdList';
const CreateHousehold = ({ navigation }) => {
  const [numMembers, setNumMembers] = useState('');
  const [hasDishwasher, setHasDishwasher] = useState(false);
  const [numBathrooms, setNumBathrooms] = useState('');

  const handleNext = async () => {
    const household = {
      numMembers: parseInt(numMembers, 10), // Ensure number format
      hasDishwasher,
      numBathrooms: parseInt(numBathrooms, 10), // Ensure number format
    };

    const success = await saveHouseholdData(household);
    if (success) {
      navigation.navigate(HouseholdList); // Navigate only on successful save
    } else {
      Alert.alert('Fejl', 'Kunne ikke gemme husstand. Prøv igen.'); // Alert on failure
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Antal personer i husstanden:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={numMembers}
        onChangeText={setNumMembers}
      />
      
      <Text style={styles.label}>Antal badeværelser:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={numBathrooms}
        onChangeText={setNumBathrooms}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Har I opvaskemaskine?</Text>
        <Switch value={hasDishwasher} onValueChange={setHasDishwasher} />
      </View>

      {/* Use handleNext for onPress */}
      <Button title="Næste" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 18, marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }
});

export default CreateHousehold;

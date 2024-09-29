import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { fetchHouseholdData } from '../database'; // Adjust the import path

const HouseholdList = () => {
    const [households, setHouseholds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchHouseholdData(); // Await the data from fetchHouseholdData
                setHouseholds(data); // Update state with the fetched household data
            } catch (error) {
                console.error('Error fetching household data:', error);
            }
        };

        fetchData(); // Call the fetch function on component mount
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Husstandsliste</Text>
            <FlatList
                data={households}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.itemText}>Antal personer: {item.numMembers}</Text>
                        <Text style={styles.itemText}>Antal badeværelser: {item.numBathrooms}</Text>
                        <Text style={styles.itemText}>Opvaskemaskine: {item.hasDishwasher ? "Ja" : "Nej"}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 18,
    },
});

export default HouseholdList;

// database.js
import { ref, set, get } from "firebase/database";
import { db } from './config'; // Ensure this config is correct

export const saveHouseholdData = async (household) => {
    try {
        const householdRef = ref(db, 'households/' + Date.now()); // Use timestamp as unique ID
        await set(householdRef, household);
        console.log("Succesfully added to DB")
        return true; // Return true on success
        
    } catch (error) {
        console.error("Error saving household data:", error);
        return false; // Return false on error
    }
};


export const fetchHouseholdData = async () => {
    try {
        const householdRef = ref(db, 'households');
        const snapshot = await get(householdRef);
        if (snapshot.exists()) {
            const householdList = [];
            snapshot.forEach(childSnapshot => {
                householdList.push({
                    id: childSnapshot.key, // Firebase key as ID
                    ...childSnapshot.val(), // Get the household data
                });
            });
            return householdList;
        } else {
            console.log("No household data available");
            return []; // Return an empty array if no data found
        }
    } catch (error) {
        console.error("Error fetching household data:", error);
        throw error; // Rethrow the error for handling in the calling function
    }
};

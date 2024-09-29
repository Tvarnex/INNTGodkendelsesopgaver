import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateHousehold from './components/createHousehold';
import CreateTask from './components/createTask';
import TaskCalendar from './components/taskCalendar';
import HouseholdList from './components/householdList';
import Ionicons from 'react-native-vector-icons/Ionicons'; // For tab icons

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main App component with Tab Navigation
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="HouseholdList"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HouseholdList') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'CreateTask') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            } else if (route.name === 'TaskCalendar') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'HouseholdStack') {
              iconName = focused ? 'home' : 'home-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        {/* Tab for Household List */}
        <Tab.Screen 
          name="HouseholdList" 
          component={HouseholdList} 
          options={{ title: 'Husstandsliste' }} 
        />

        {/* Tab for Create Task */}
        <Tab.Screen 
          name="CreateTask" 
          component={CreateTask} 
          options={{ title: 'Opret Opgave' }} 
        />

        {/* Tab for Calendar */}
        <Tab.Screen 
          name="TaskCalendar" 
          component={TaskCalendar} 
          options={{ title: 'Kalender' }} 
        />

        {/* Tab for Household (with its own stack of screens) */}
        <Tab.Screen 
          name="HouseholdStack" 
          component={HouseholdStack} 
          options={{ title: 'Husstand' }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// Stack navigator for CreateHousehold screen
const HouseholdStack = () => {
  return (
    <Stack.Navigator initialRouteName="CreateHousehold">
      <Stack.Screen 
        name="CreateHousehold" 
        component={CreateHousehold} 
        options={{ title: 'Opret Husstand' }} 
      />
    </Stack.Navigator>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

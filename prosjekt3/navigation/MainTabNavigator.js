import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CalenderScreen from '../screens/CalenderScreen';
import ActivityScreen from '../screens/ActivityScreen';
import TodoScreen from '../screens/TodoScreen';
import ContactsScreen from '../screens/ContactsScreen';

// adding homescreen to navigator stack
const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

// adding calendar screen to navigator stack
const CalenderStack = createStackNavigator({
  Calender: CalenderScreen
});

CalenderStack.navigationOptions = {
  tabBarLabel: 'Calendar',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'
        ? `ios-calendar${focused ? ''
          : '-outline'}` : 'md-calendar'}
    />
  ),
};

// adding activity screen to navigator stack
const ActivityStack = createStackNavigator({
  Activity: ActivityScreen,
});

ActivityStack.navigationOptions = {
  tabBarLabel: 'Activity',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-heart${focused ? '' : '-outline'}` : 'md-heart'}
    />
  ),
};

// adding todo screen to navigator stack
const TodoStack = createStackNavigator({
  Todo: TodoScreen,
});

TodoStack.navigationOptions = {
  tabBarLabel: 'Todo',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-list${focused ? '' : '-outline'}` : 'md-list'}
    />
  ),
};

// adding contact screen to navigator stack
const ContactsStack = createStackNavigator({
  Contacts: ContactsScreen,
});

ContactsStack.navigationOptions = {
  tabBarLabel: 'Contacts',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-contacts${focused ? '' : '-outline'}` : 'md-contacts'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  CalenderStack,
  ActivityStack,
  TodoStack,
  ContactsStack,
});

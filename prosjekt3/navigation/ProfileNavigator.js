
import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CalenderScreen from '../screens/CalenderScreen';
import ActivityScreen from '../screens/ActivityScreen';
import TodoScreen from '../screens/TodoScreen';
import ContactsScreen from '../screens/ContactsScreen';
import ProfileScreen from '../screens/ProfilesScreen';


const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,

});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarOption: {
    showIcon: false,
    showLabel: false,
    renderIndicator: () => null,
    header: null,
    showTab: false,
    swipeEnabled: false,
    hideIndex: [5],
    hideIndex: ["5"],
    visible: false,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `ios-information-circle${focused ? '' : '-outline'}`
            : 'md-information-circle'
        }
      />
    ),
  };

  export default ProfileStack;
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,

} from 'react-native';
import PedometerHomescreen from '../components/PedometerHomescreen';
import TodoHomescreen from '../components/TodoHomescreen';
import AppointmentModalHomescreen from '../components/AppointmentInfoHomescreenModal';
import ProfileModal from '../components/ProfileModal';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  // header and styling of it
  static navigationOptions = {
    title: "Home",
    tabBarVisible: false,
    header: null, // removing the header
    headerStyle: { // styling the header
      backgroundColor: '#69868a',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <ImageBackground source={require('../assets/images/homeBackground4.jpg')} style={styles.centerContent}>

        {/* "upcoming events modal */}
        <AppointmentModalHomescreen />

        {/* activity and todo content, middle of the screen */}
        <View style={styles.middleContent}>

          {/* progress cycle*/}
          <View style={styles.activityContent}>
            <Text style={styles.activityHeader}>Steps</Text>
            <View>
              <PedometerHomescreen />
            </View>
          </View>

          {/* ToDo view content*/}
          <View style={styles.todoContent}>
            <Text style={styles.todoHeader}>ToDo</Text>
            <View>
              <TodoHomescreen />
            </View>
          </View>

        </View>
        {/* button to profile */}
        <ProfileModal />

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({

  activityContent: {
    flex: 1,
    backgroundColor: '#5F7C80',
    margin: 15,
    marginLeft: 10,
    padding: 10,
    borderRadius: 5,
    height: 200,
  },

  activityHeader: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 15,
  },

  centerContent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff'
  },

  middleContent: {
    flexDirection: "row",
  },

  todoContent: {
    flex: 1,
    backgroundColor: '#5F7C80',
    margin: 15,
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
    maxHeight: 200,
  },

  todoHeader: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 16,
  },
});
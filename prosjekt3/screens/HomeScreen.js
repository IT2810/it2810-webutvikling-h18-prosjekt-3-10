import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,

} from 'react-native';
import PedometerHomescreen from '../components/PedometerHomescreen';
import TodoHomescreen from '../components/TodoHomescreen';
import AppointmentModalHomescreen from '../components/AppointmentInfoHomescreenModal';
import ProfileModal from '../components/ProfileModal';
import { Header, } from 'react-native-elements';

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
      <ScrollView>

        {/* <ImageBackground source={require('../assets/images/homeBackground4.jpg')} style={styles.centerContent}>  */}
        <View style={styles.centerContent}>
          <Header
            centerComponent={{ text: 'Kult navn', style: { color: 'black', fontSize: 16, fontWeight: 'bold' }, }}
            backgroundColor={'#fff'}
          />



          {/* "upcoming events modal */}
          <AppointmentModalHomescreen />


          {/* activity and todo content, middle of the screen */}
          <View style={styles.middleContent}>

            {/* progress cycle*/}
            <View style={styles.activityContent}>
              {/* <Text style={styles.activityHeader}>Steps</Text> */}
              <View>
                <PedometerHomescreen />
              </View>
            </View>
          </View>

          <View style={styles.middleContent}>


            {/* ToDo view content*/}
            <View style={styles.todoContent}>
              {/* <Text style={styles.todoHeader}>ToDo</Text> */}
              <View>
                <TodoHomescreen />
              </View>
            </View>

          </View>

          {/* button to profile */}
          <ProfileModal />
        </View>

      </ScrollView>

      /* </ImageBackground> */
    );
  }
}

const styles = StyleSheet.create({

  activityContent: {
    // flex: 1,
    backgroundColor: '#f2f2f2',
    // margin: 10,
    // marginLeft: 2,
    padding: 5,
    // borderRadius: 5,
    // height: 250,
    marginRight: 5,
  },

  activityHeader: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 15,
  },

  centerContent: {
    // width: '100%',
    // height: '100%',
    alignItems: 'center',
    //justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: '#ffffff'
  },

  middleContent: {
    //flex: 1,
    // flexDirection: "row",
    // alignItems: 'stretch',
    //justifyContent: 'center',
    backgroundColor: "#e6e6e6",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    //padding: 20,
  },

  todoContent: {
    //flex: 1,
    backgroundColor: '#f2f2f2',
    // margin: 10,
    // marginRight: 0,
    padding: 5,
    // borderRadius: 5,
    //maxHeight: 300,
    height: 200,
    // width: 200,
    // flexDirection: 'column',
    // alignItems: 'stretch',
    // justifyContent: 'center',
    marginLeft: 5,
  },

  todoHeader: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 16,
  },
});

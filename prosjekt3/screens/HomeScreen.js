import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView
} from 'react-native';
import PedometerHomescreen from '../components/PedometerHomescreen';
import TodoHomescreen from '../components/TodoHomescreen';
import AppointmentModalHomescreen from '../components/AppointmentInfoHomescreenModal';
import ProfileModal from '../components/ProfileModal';
import { Header, } from 'react-native-elements';
import Colors from '../constants/Colors';

export default class HomeScreen extends React.Component {

  // header and styling of it
  static navigationOptions = {
    header: null, // removing the header
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>

      <Header
        outerContainerStyles={styles.headerOuterContainer}
        innerContainerStyles={styles.headerInnerContainer}
        centerComponent={{
          text: 'STE reactive',
          style: styles.header,
        }}
        backgroundColor={Colors.headerBackground}
      />

      <ScrollView style={{
        backgroundColor: Colors.backgroundColor,
      }}>

        <View>
          <View style={styles.modals}>
            {/* "upcoming events modal */}
            <AppointmentModalHomescreen />
            {/* button to profile modal*/}
            <ProfileModal />
          </View>

          {/* activity and todo content, middle of the screen */}
          <View style={styles.activityBackgroundContent}>

            {/* progress cycle*/}
            <View style={styles.activityContent}>
              <View>
                <PedometerHomescreen />
              </View>
            </View>
          </View>

          <View style={styles.TodoBackgroundContent}>

            {/* ToDo view content*/}
            <View style={styles.todoContent}>
              <Text style={styles.todoHeader}>Todo</Text>
              <View>
                <TodoHomescreen />
              </View>
            </View>
          </View>
        </View>

      </ScrollView >
      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
      flex: 1,
      backgroundColor: '#425b84',
  },

  activityContent: {
    padding: 10,
  },

  activityBackgroundContent: {
    backgroundColor: Colors.backgroundColor,
    borderColor: "#999",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  activityHeader: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 15,
  },

  headerOuterContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    backgroundColor: "#425b84",
  },

  header: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: '900',
    fontVariant: ['small-caps'],
  },

  TodoBackgroundContent: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 15,
  },

  modals: {
    flexDirection: "row",
    backgroundColor: Colors.backgroundColor,
    width: '80%',
    marginLeft: 10,
    padding: 15,
  },

  todoContent: {
    padding: 10,
  },

  todoHeader: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 17,
    padding: 4,
    backgroundColor: "#425b84",
    borderColor: "#999",
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },

});

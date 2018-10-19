import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
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
      <ScrollView style={{
        backgroundColor: "#d9d9d9",
      }}>

        <View>

          <Header
            outerContainerStyles={styles.headerOuterContainer}
            innerContainerStyles={styles.headerInnerContainer}
            centerComponent={{
              text: 'STE reactive',
              style: styles.header,
            }}
            backgroundColor={Colors.headerBackground}
          />
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
              <Text style={styles.todoHeader}>ToDo</Text>
              <View>
                <TodoHomescreen />
              </View>
            </View>
          </View>
        </View>

      </ScrollView >
    );
  }
}

const styles = StyleSheet.create({

  activityContent: {
    padding: 10,
  },

  activityBackgroundContent: {
    backgroundColor: "#a6a6a6",
    borderColor: "#ffffff",
    borderBottomWidth: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activityHeader: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 15,
  },

  headerInnerContainer: {
    marginTop: 15,
  },

  headerOuterContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    backgroundColor: "#5aa0dd",
    height: 100
  },

  header: {
    color: '#cccccc',
    fontSize: 25,
    fontWeight: '900',
    fontVariant: ['small-caps'],
  },

  TodoBackgroundContent: {
    backgroundColor: "#737373",
    borderColor: "#ffffff",
    borderBottomWidth: 1,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  modals: {
    flexDirection: "row",
    backgroundColor: "#d9d9d9",
    borderColor: "#ffffff",
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },

  todoContent: {
    padding: 10,
  },

  todoHeader: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 17,
    backgroundColor: "#425b84",
    borderColor: "#a6a6a6",
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },

});

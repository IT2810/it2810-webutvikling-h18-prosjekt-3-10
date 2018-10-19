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
  static navigationOptions = {
    header: null,
  };

  // Sets profile modal to visible, causing it to appear
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View>

        <Header
          outerContainerStyles={styles.headerOuterContainer}
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
            <View style={styles.eventAndProfileContainer}>
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

            <View style={styles.todoBackgroundContent}>
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
      </View>

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

  todoBackgroundContent: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 15,
  },

  eventAndProfileContainer: {
    flexDirection: "row",
    backgroundColor: Colors.backgroundColor,
    paddingTop: 10,
    paddingBottom: 10,
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

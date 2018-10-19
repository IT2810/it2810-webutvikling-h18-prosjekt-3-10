import React from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import Colors from '../constants/Colors';
import PedometerSensor from '../components/pedometer';

export default class ActivityScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    navBarHeight: (Platform.OS === 'ios') ? -64 : 100,
  }

  // RENDER
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={this.state.navBarHeight} behavior="position" enabled>
        <ScrollView scrollEnabled={false}>
          <PedometerSensor />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

// STYLESHEET
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.backgroundColor,
  },
});

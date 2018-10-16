import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { List, ListItem, Button, Text, Overlay } from 'react-native-elements';
import { AsyncStorage, StyleSheet, View, TextInput, Alert, KeyboardAvoidingView, ScrollView } from "react-native";
import ProgressCircle from 'react-native-progress-circle'
import Colors from '../constants/Colors';



export default class PedometerSensor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPedometerAvailable: "checking",
      todayStepCount: 0,
      pastStepCount: 0,
      currentStepCount: 0,
      goal: '',
      inputGoal: '',
    };
  }

  componentDidMount() {
    this._subscribe();
    this.retrieveData();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setHours(end.getHours() - end.getHours());
    start.setMinutes(end.getMinutes() - end.getMinutes());
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ todayStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  // The progress circle
  progressCircle = () => {
    const steps = this.state.todayStepCount;
    const goal = this.state.goal;
    const perc = (parseInt(steps, 10) / parseInt(goal, 10) * 100);

    return (
      <ProgressCircle
        percent={perc}
        radius={100}
        borderWidth={10}
        color="#2f95dc"
        shadowColor="#999"
        bgColor="#eee"
      >
        <Text style={{ fontSize: 40, fontWeight: 'bold' }}> {steps} </Text>
        <Text style={{ fontSize: 15 }}> {'Goal: ' + goal} </Text>

      </ProgressCircle>
    )
  }

  // Get data from input daily goal
  handleInputGoal = (value) => {
    if (isNaN(value)) {
      Alert.alert("Value is Not Number");
    }
    else {
      this.setState(() => ({
        inputGoal: value,
      }));
    }
  }

  // Function to set or update daily goal
  setGoal = () => {
    const goal = this.state.inputGoal;
    if (goal != '') {
      this.setState({
        goal: this.state.inputGoal,
        inputGoal: ''
      },
        () => this.storeData()
      );
    }
  }

  // Function to save daily goal data to local storage
  storeData = async () => {
    const data = this.state.goal;
    try {
      await AsyncStorage.setItem('Goal', data);
    }
    catch (error) {
      alert('Error storing data')
    }
  };

  // Function to retrieve daily goal data from local storage
  retrieveData = async () => {
    try {
      const data = await AsyncStorage.getItem('Goal');
      if (data != null) {
        this.setState({
          goal: data,
        });
      }
      else {
        this.setState({
          goal: '10000',
        })
      }
    }
    catch (error) {
      alert('Error retrieving data')
    }
  }

  // Function to check if pedometer tech is working, returning green line if
  checkAvailablity = () => {
    if (this.state.isPedometerAvailable == 'true') {
      return (
        <View style={{ width: 500, height: 5, backgroundColor: '#1A6A1F' }}>
        </View>
      )
    }
    else {
      return (
        <View style={{ width: 500, height: 5, backgroundColor: '#842126' }}>
        </View>
      )
    }
  }

  motivationQuote = () => {
    const steps = this.state.todayStepCount;
    const goal = this.state.goal;
    const perc = (parseInt(steps, 10) / parseInt(goal, 10) * 100);

    if (perc > 0 && 10 > perc) {
      return (
        <Text style={styles.motivationQuote}>
          You are on the go!
          Why not take a morning walk!
        </Text>
      )
    }

    else if (perc > 10 && 25 > perc) {
      return (
        <Text style={styles.motivationQuote}>
          That is a good start!
          Stay focused to reach your goal!
        </Text>
      )
    }

    else if (perc > 25 && 50 > perc) {
      return (
        <Text style={styles.motivationQuote}>
          Not far to halfway now! You are doing great!
        </Text>
      )
    }

    else if (perc > 50 && 80 > perc) {
      return (
        <Text style={styles.motivationQuote}>
          You are over halfway! Keep it up!
        </Text>
      )
    }

    else if (perc > 80) {
      return (
        <Text style={styles.motivationQuote}>
          Not far to go now! Either a short run or a 10 minute walk will make you reach the goal!
        </Text>
      )
    }
  }

  render() {
    return (
      <View style={styles.elements}>
        {this.checkAvailablity()}

        <Text style={styles.todayStepTxt}>
          Todays steps:
            </Text>

        <View style={styles.progressCircle}>
          {this.progressCircle()}
        </View>

        {this.motivationQuote()}

        <View>
          <TextInput
            style={styles.inputForm}
            value={this.state.inputGoal}
            onChangeText={this.handleInputGoal}
            placeholder="Input your daily goal"
            underlineColorAndroid="transparent"
            keyboardType='numeric'
          />
        </View>

        <Button
          title="Set goal"
          onPress={this.setGoal}
          buttonStyle={styles.addBtn}
        />

      </View>



    );
  }
}

const styles = StyleSheet.create({
  elements: {
    alignItems: 'center',

  },
  todayStepTxt: {
    fontSize: 18,
    marginTop: 20,
    flex: 1,
  },
  progressCircle: {
    marginTop: 15,
    marginBottom: 30,
    flex: 1,
  },
  motivationQuote: {
    fontSize: 15,
    textAlign: 'center',
    width: 200,
    flex: 1,
  },
  addBtn: {
    width: 200,
    backgroundColor: '#2f95dc',
    marginBottom: 20,
  },
  inputForm: {
    marginTop: 30,
    backgroundColor: '#fff',
    width: 200,
    height: 40,
    marginBottom: 8,
    textAlign: 'center',
  },


});

Expo.registerRootComponent(PedometerSensor);

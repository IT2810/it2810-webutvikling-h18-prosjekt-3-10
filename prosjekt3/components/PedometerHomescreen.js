import React from "react";
import { Pedometer } from "expo";
import { Text } from 'react-native-elements';
import { AsyncStorage, StyleSheet, View } from "react-native";
import ProgressCircle from 'react-native-progress-circle'

export default class PedometerHomescreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todayStepCount: 0,
            goal: '',
        }
    }

    // mounting stored activity data
    componentDidMount() {
        this.retrieveData()
        this._subscribe();
    }

    // updating steps between activity and homescreen in one the same session
    componentDidUpdate() {
        this.retrieveData()

        _subscribe = () => {
            this._subscription = Pedometer.watchStepCount(result => {
                this.setState({
                    currentStepCount: result.steps
                });
            });
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

    }

    // retrieving to days steps
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

    // function for step counter
    _subscribe = () => {
        this._subscription = Pedometer.watchStepCount(result => {
            this.setState({
                currentStepCount: result.steps
            });
        });
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

    // The progress circle
    progressCircle = () => {
        const steps = this.state.todayStepCount;
        const goal = this.state.goal;
        const perc = (parseInt(steps, 10) / parseInt(goal, 10) * 100);
        const percentText = (Math.floor(100 * steps / goal));
        const empty = (this.state.goal === "0");
        const toLarge = (steps >= goal)
        return (
            <ProgressCircle
                percent={perc}
                radius={75}
                borderWidth={15}
                color='#5aa0dd'
                shadowColor="#a6a6a6"
                bgColor="#425b84"
            >
                <Text style={styles.progressCircleText}> {"Steps"} </Text>
                <Text style={styles.stepsText}> {steps} </Text>
                <Text style={styles.progressCircleText}>{empty || toLarge ? "100%" : percentText + "%"}</Text>
            </ProgressCircle>
        )
    }
    render() {
        return (
            <View >
                {this.progressCircle()}
            </View>
        )
    }
}

const styles = StyleSheet.create({

    progressCircleText: {
        fontSize: 18,
        color: "#999999"
    },

    stepsText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "#ffffff",
    },
})

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableHighlight,
  ImageBackground,
  AsyncStorage,
  FlatList,
  ScrollView,

} from 'react-native';
import { Button, List, Icon, ListItem } from 'react-native-elements';
import ProgressCircle from 'react-native-progress-circle';
import { Pedometer } from "expo";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      todo: [],
      todayStepCount: 0,
      goal: '',
    }
  }

  // header and styling of it
  static navigationOptions = {
    title: "Home",
    header: null, // removing the header
    headerStyle: { // styling the header
      backgroundColor: '#69868a',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentDidMount() {
    this.retrieveData()
    this._subscribe();
  }

  // retrieving data from todo and activity screens
  retrieveData = async () => {
    try {
      const getData = await AsyncStorage.getItem('Todo-list');
      const getActivityData = await AsyncStorage.getItem('Goal');
      const data = JSON.parse(getData);
      const activityData = JSON.parse(getActivityData);

      if (data != null || activityData != null) {
        this.setState({
          todo: data,
          goal: activityData,
        });
      }
      else {
        this.setState({
          todo: [],
          goal: '',
        })
      }
    }
    catch (error) {
      alert('Error retrieving data')
    }
  }

  // output from todo screen
  itemsOutput = () => {
    return (
      <List containerStyle={styles.todoList}>
        <ScrollView>
          <FlatList containerStyle={styles.todoList}
            data={this.state.todo}
            keyExtractor={(item) => item.id.toString()}
            extraData={this.state}
            renderItem={({ item }) => (
              <ListItem
                title={item.input}
                subtitle={item.date}
                hideChevron={true} />
            )} />
        </ScrollView>
      </List>
    )
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

  render() {
    return (
      <ImageBackground source={require('../assets/images/homeBackground4.jpg')} style={styles.centerContent}>
        <View style={styles.events}>

          {/* the modal for upcoming events*/}
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            presentationStyle="formSheet"
            onRequestClose={() => { // required on android, making it posible to use hardware back-button
              this.setModalVisible(!this.state.modalVisible);
            }}>
            <View style={styles.centerContent}>
              <Text>{"appointment info here"}</Text>

              <TouchableHighlight style={styles.closeModalButton}
                onPress={() => { // closing modal when close-button is pressed
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.closeModalButtonText}>Close</Text>
              </TouchableHighlight>
            </View>
          </Modal>
          <TouchableHighlight
            onPress={() => { // opens modal when event-object is pressed
              this.setModalVisible(true);
            }}>
            <View style={styles.eventIconText}>
              <Icon
                reverse
                name='event'
                color='#5F7C80'
              />
              <Text style={styles.eventText}>Upcoming Event: {'TBA'}</Text>
            </View>
          </TouchableHighlight>
        </View>

        {/* progress cycle*/}
        <View style={styles.middleContent}>
          <View style={styles.activityContent}>
            <Text style={styles.activityHeader}>Steps</Text>
            <View>

              <ProgressCircle
                percent={70}
                radius={70}
                borderWidth={15}
                color='#e68a00'
                shadowColor="#ffffff"
                bgColor="#333333"
              >
                <Text style={styles.stepsText}> {this.state.todayStepCount} </Text>
                <Text style={styles.progressCircleText}>{Math.ceil(100 * this.state.todayStepCount / this.state.goal) + "%"}</Text>
              </ProgressCircle>

            </View>
          </View>

          {/* ToDo view content*/}
          <View style={styles.todoContent}>
            <Text style={styles.todoHeader}>ToDo</Text>
            <View>
              <View >
                {this.itemsOutput()}
              </View>
            </View>
          </View>
        </View>

        {/* Button for profile*/}
        <View style={styles.profileButtonPosition}>
          <Button buttonStyle={styles.profileButton}
            icon={{
              name: 'user',
              type: 'font-awesome',
              size: 30
            }}
            title=" PROFILE"
            onPress={() => this.props.navigation.navigate('Profile')} />
        </View>
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

  /* backgroundImage: {
     width: '100%',
     height: '100%',
     alignItems: 'center',
     justifyContent: 'center',
     flex: 1,
     flexDirection: 'column',
     justifyContent: 'space-between',
     backgroundColor: '#ffffff'
   },*/

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

  closeModalButton: {
    margin: 10,
    backgroundColor: "#cc0000",
    borderWidth: 0,
    borderRadius: 5,
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
  },

  closeModalButtonText: {
    fontSize: 18,
    color: "#ffffff",

  },

  events: {
    backgroundColor: '#5F7C80',
    borderWidth: 0,
    width: "95%",
    height: 75,
    borderRadius: 10,
    borderWidth: 0,
    margin: 8,
    marginTop: 40,

  },

  eventIconText: {
    flexDirection: 'row',
  },

  eventText: {
    fontSize: 18,
    color: "#ffffff",
    height: 75,
    justifyContent: 'center',
    margin: 20,
    marginLeft: 0,
  },

  profileButton: {
    backgroundColor: '#517fa4',
    borderWidth: 0,
    borderRadius: 10,
    height: 75,
  },

  profileButtonPosition: {
    width: '100%',
    margin: 8,
  },

  progressCircleText: {
    fontSize: 18,
    color: "#999999"
  },

  middleContent: {
    flexDirection: "row",
  },

  stepsText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#595959",
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

  todoList: {
    borderWidth: 1,
    marginBottom: 20,
  },
});
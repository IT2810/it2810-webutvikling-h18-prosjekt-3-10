import React, { Component } from 'react';
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
import TodoScreen from '../screens/TodoScreen';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    Obj = new TodoScreen();
    this.state = {
      modalVisible: false,
      todo: [],
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
  }

  retrieveData = async () => {
    try {
      const getData = await AsyncStorage.getItem('Todo-list');
      const data = JSON.parse(getData);
      if (data != null) {
        this.setState({
          todo: data,
        });
      }
      else {
        this.setState({
          todo: [],
        })
      }
    }
    catch (error) {
      alert('Error retrieving data')
    }
  }

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
          <View>
            <ProgressCircle
              percent={70}
              radius={70}
              borderWidth={15}
              color='#e68a00'
              shadowColor="#ffffff"
              bgColor="#333333">
              <Text style={styles.progressCircleText}>{'70%'}</Text>
            </ProgressCircle>
          </View>


          <View style={styles.todoContent}>
            <Text style={styles.todoHeader}>ToDo</Text>

            <View
            >
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
    color: "#ffffff"
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

  todoList: {
    borderWidth: 1,
    marginBottom: 20,







  },


});
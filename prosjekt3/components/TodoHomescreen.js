import React from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage,
  FlatList,
  ScrollView,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

export default class TodoHomescreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [],
      todayStepCount: 0,
    }
  }

  // mounting stored todo data
  componentDidMount() {
    this.retrieveData()
  }

  // updating todo between screens in the same session
  componentDidUpdate() {
    this.retrieveData()
  }

  // retrieving todo data from TodoScreen and displaying it on HomeScreen
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

  // output from todo screen
  itemsOutput = () => {
    return (
      <List containerStyle={styles.todoList}>
        <ScrollView>
          <FlatList containerStyle={styles.todoList}
            data={this.state.todo}
            keyExtractor={(item) => item.id.toString()}
            extraData={this.state.refresh}
            renderItem={({ item }) => (
              <ListItem
                title={item.input}
                subtitle={item.date}
                hideChevron={true}
                style={{ backgroundColor: "blue" }}
              />
            )} />
        </ScrollView>
      </List>
    )
  }

  render() {
    return (
      <View >
        {this.itemsOutput()}
      </View>
    )
  }
}

const styles = StyleSheet.create({

  todoList: {
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 0,
    width: 250,
    maxHeight: 120,
    minHeight: 100,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
})


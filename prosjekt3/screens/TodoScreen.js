import React, { Component } from 'react';
import {
  View, StyleSheet, TextInput,
  ListView, Image, FlatList, AsyncStorage
} from 'react-native';
import { List, ListItem, Button, Text } from 'react-native-elements';
import { Constants } from 'expo';
import DatePicker from 'react-native-datepicker';


export default class TodoScreen extends React.Component {
  static navigationOptions = {
    title: 'Todo',
  };

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      id: '',
      inputValue: '',
      date: '',
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleDeleteButtonPress = this.handleDeleteButtonPress.bind(this);
  }

  handleTextChange = (value) => {
    this.setState(() => ({
      inputValue: value,
    }));
  }

  getNewId = () => {
    const list = this.state.list;
    let id = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].id == id) {
        id += 1;
      }
    }
    return id;
  }

  handleSendButtonPress = () => {
    const input = this.state.inputValue;
    const date = this.state.date;
    const list = this.state.list;
    let id = this.getNewId();
    if (!input) {
      return;
    }
    if (!date) {
      list.push({ id: id, input: input, date: null })
    }
    else {
      list.push({ id: id, input: input, date: date });
    }
    this.setState(() => ({
      list,
      id: '',
      inputValue: '',
      date: '',
    }));
    this.storeData();
  };

  handleDeleteButtonPress = (item) => {
    const list = this.state.list.filter(listItem => listItem.id != item.id)
    // returns new array with item filtered out
    this.setState(
      { list },
      () => this.storeData()
    );
  }

  itemsOutput = () => {
    return (
      <List style={styles.todoItemsContainer}>
        <FlatList
          style={styles.todoItems}
          data={this.state.list}
          keyExtractor={(item) => item.id.toString()}
          extraData={this.state}
          renderItem={({ item }) => (
            <ListItem
              title={item.input}
              subtitle={item.date}
              rightIcon={{
                name: 'times',
                type: 'font-awesome',
                style: {
                  marginRight: 15,
                  fontSize: 22,
                },
              }}
              onPressRightIcon={() => this.handleDeleteButtonPress(item)}
            />
          )}
        />
      </List>
    )
  }

  datePicker = () => {
    return (
      <DatePicker
        style={{
          width: 320,
          paddingBottom: 10,
        }}
        date={this.state.date}
        value={this.state.date}
        mode="datetime"
        placeholder="Set date if you want"
        format="DD.MM.YYYY, HH:MM"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        is24Hour={true}
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            backgroundColor: '#fff',
            borderColor: '#fff',
            marginLeft: 36
          }
        }}
        onDateChange={(date) => { this.setState({ date: date }) }}
      />
    )
  }

  storeData = async () => {
    const data = this.state.list;
    try {
      await AsyncStorage.setItem('Todo-list', JSON.stringify(data));
    }
    catch (error) {
      // Error saving data
    }
  };

  componentDidMount = () => {
    this.retrieveData()
  }

  retrieveData = async () => {
    try {
      const getData = await AsyncStorage.getItem('Todo-list');
      const data = JSON.parse(getData);
      if (data != null) {
        this.setState({
          list: data,
        });
      }
      else {
        this.setState({
          list: [],
        })
      }
    }
    catch (error) {
      // Error retrieving data
    }
  }

  // RENDER
  render() {
    return (
      <View style={styles.container}>

        {/* Input text, date and add button */}
        <View style={styles.formView}>
          <Image
            style={styles.listImage}
            source={require('../assets/images/list-icon.png')}
          />

          <TextInput
            style={styles.inputForm}
            value={this.state.inputValue}
            onChangeText={this.handleTextChange}
            placeholder="What todo"
          />

          {/* Date Picker */}
          {this.datePicker()}

          <Button
            title="Add"
            onPress={this.handleSendButtonPress}
            buttonStyle={styles.addBtn}
            titleStyle={styles.addBtnTitle}
          />
        </View>

        {/* Todo tasks */}
        {this.itemsOutput()}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#eee',
  },
  formView: {
    alignItems: 'center',
    borderColor: '#ccc',
    paddingBottom: 8,
  },
  inputForm: {
    marginLeft: 36,
    backgroundColor: '#fff',
    width: 284,
    height: 40,
    padding: 8,
    marginBottom: 8,
    textAlign: 'center',
  },
  todoItemsContainer: {

  },
  todoItems: {

  },
  listImage: {
    position: 'absolute',
    left: 0,
    top: 6,
    marginLeft: 30,
    width: 25,
    height: 25,
  },
  addBtn: {
    marginLeft: 36,
    width: 285,
    backgroundColor: "rgba(92, 99,216, 1)",
  },
  addBtnTitle: {

  }

});

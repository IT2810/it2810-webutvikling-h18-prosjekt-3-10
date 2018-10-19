import React from 'react';
import { View, StyleSheet, TextInput, Image, FlatList, AsyncStorage, ScrollView, SafeAreaView } from 'react-native';
import { List, ListItem, Button, Header } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Colors from '../constants/Colors'

export default class TodoScreen extends React.Component {
  static navigationOptions = {
    header: null,
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

  // Updating inputValue on textchange
  // InputValue represents name of ToDo-task
  handleTextChange = (value) => {
    this.setState(() => ({
      inputValue: value,
    }));
  }

  // Finding an id not in use
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

  // Adding an item to the list of todos
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

  // Deleting an item from the list of todos
  handleDeleteButtonPress = (item) => {
    const list = this.state.list.filter(listItem => listItem.id != item.id)
    // sets state with new array where specified item is removed
    this.setState(
      { list },
      () => this.storeData()
    );
  }

  // List with todo items
  itemsOutput = () => {
    return (
      <List>
        <FlatList
          data={this.state.list}
          keyExtractor={(item) => item.id.toString()}
          extraData={this.state}
          renderItem={({ item }) => (
            <ListItem
              containerStyle={styles.listItems}
              title={item.input}
              titleStyle={styles.listItemTitle}
              subtitle={item.date}
              subtitleStyle={styles.listItemSubtitle}
              leftIcon={{
                name: 'chevron-right',
                style: styles.listItemLeftIcon
              }}
              rightIcon={{
                name: 'clear',
                style: styles.listItemRightIcon,
              }}
              onPressRightIcon={() => this.handleDeleteButtonPress(item)}
            />
          )}
        />
      </List>
    )
  }

  // Datepicker component
  datePicker = () => {
    return (
      <DatePicker
        style={{
          width: '90%',
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

  // Saves list of todos in AsyncStorage
  storeData = async () => {
    const data = this.state.list;
    try {
      await AsyncStorage.setItem('Todo-list', JSON.stringify(data));
    }
    catch (error) {
      console.error("Saving list of todos in AsyncStorage failed")
    }
  };

  // When component first loads, retrieve todo-list from AsyncStorage
  componentDidMount = () => {
    this.retrieveData()
  }

  // Retrieves todo-list from AsyncStorage
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
      alert('Error retrieving data')
      console.error("Error retrieving Todo-list from AsyncStorage")
    }
  }

  // RENDER
  render() {
    return (

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Header
            outerContainerStyles={styles.headerOuterContainer}
            innerContainerStyles={styles.headerInnerContainer}
            centerComponent={{
              text: 'todo',
              style: styles.header,
            }}
            backgroundColor={Colors.headerBackground}
          />

          <View style={styles.formView}>

            <View style={styles.txtinput}>
              <Image
                style={styles.listImage}
                source={require('../assets/images/list-icon.png')}
              />

              <TextInput
                style={styles.inputForm}
                value={this.state.inputValue}
                onChangeText={this.handleTextChange}
                placeholder="What todo"
                underlineColorAndroid="transparent"
              />
            </View>

            {this.datePicker()}

            <View style={styles.btnView}>
              <Button
                title="Add"
                onPress={this.handleSendButtonPress}
                buttonStyle={styles.addBtn}
              />
            </View>
          </View>

          <View style={styles.listItemContainer}>
            <ScrollView>
              {this.itemsOutput()}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerOuterContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },

  header: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
    fontVariant: ['small-caps'],
  },

  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: Colors.backgroundColor,
  },

  formView: {
    alignItems: 'center',
    borderColor: '#ccc',
    paddingBottom: 8,
    paddingTop: 20,
  },

  txtinput: {
    width: '90%',
  },

  inputForm: {
    marginLeft: 36,
    backgroundColor: Colors.inputBackground,
    height: 40,
    padding: 8,
    marginBottom: 8,
    textAlign: 'center',
  },

  listItemContainer: {
    height: 350,
    marginRight: 20,
    marginLeft: 20,
  },

  listItems: {
    borderBottomColor: '#ccc',
    backgroundColor: Colors.backgroundColor,
    paddingTop: 15,
    paddingBottom: 15,
  },

  listItemTitle: {
    fontWeight: '400',

  },
  listItemSubtitle: {
    fontWeight: '300',
  },

  listItemLeftIcon: {
    marginRight: 10,
    fontSize: 22,
    color: Colors.black,
  },

  listItemRightIcon: {
    marginRight: 10,
    fontSize: 22,
    color: Colors.btnRed,
  },

  listImage: {
    position: 'absolute',
    left: 0,
    top: 6,
    marginLeft: 0,
    width: 25,
    height: 25,
  },

  addBtn: {
    backgroundColor: Colors.btnBlue,
  },
  btnView: {
    marginLeft: 36,
    width: '89%',
  }

});

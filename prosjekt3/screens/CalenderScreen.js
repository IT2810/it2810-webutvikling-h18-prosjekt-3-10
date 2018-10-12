import React from 'react';
import { ScrollView, StyleSheet, View, FlatList, TextInput,
  TouchableHighlight, Modal, Alert, AsyncStorage } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { List, ListItem, Button, Text } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Colors from '../constants/Colors'
import TodoScreen from './TodoScreen';

export default class CalenderScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendar',
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      inputValue: '',
      date: '',
      items: {},
    };
  }


  myAgenda = () => {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />
    )
  }

  // Function to save data to local storage
  storeData = async () => {
  const data = this.state.items;
    try {
      await AsyncStorage.setItem('Agenda', JSON.stringify(data));
    }
    catch (error) {
      // Error saving data
    }
  };

  componentDidMount = () => {
    this.retrieveData()
  }

  // Function to retrieve data from local storage
  retrieveData = async () => {
    try {
      const getAgenda = await AsyncStorage.getItem('Agenda');
      const agenda = JSON.parse(getAgenda);
      if (agenda != null) {
        this.setState({
          items: agenda,
        });
      }
      else {
        this.setState({
          items: {},
        })
      }
    }
    catch (error) {
      throw error
      alert('Error retrieving data')
    }
  }

  loadItems(day) {
    setTimeout(() => {
      for (let k = -15; k < 85; k++) {
        const time = day.timestamp + k * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
    // https://github.com/wix/react-native-calendars/blob/master/example/src/screens/agenda.js
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}>
        <Text>{item.name}</Text>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is an empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  // Adds a new item to the agenda
  addItem = () => {
    const input = this.state.inputValue;
    const date = this.state.date;
    const items = this.state.items;
    if (!input || !date) {
      this.setModalVisibility();
    }
    else {
      if (!items[date]) {
        items[date] = []
      }
      items[date].push({name: input});
    }
    this.setState(() => ({
      items,
      inputValue: '',
      date: '',
    }));

    this.storeData();
    this.setModalVisibility();
  }

  setModalVisibility = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  }

  handleTextChange = (value) => {
    this.setState(() => ({
      inputValue: value,
    }));
  }

  myModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.modal}>
          <View>

            <TextInput
              style={styles.inputForm}
              value={this.state.inputValue}
              onChangeText={this.handleTextChange}
              placeholder="Whats happening"
              underlineColorAndroid="transparent"
            />

            {this.datePicker()}

            <Button
              title="Add it"
              onPress={this.addItem}
              buttonStyle={styles.addBtn}
              containerViewStyle={{width: '100%', marginLeft: 0}}
            />

          </View>
        </View>
      </Modal>
    )
  }


  // Date picker object
  datePicker = () => {
    return (
      <DatePicker
        style={{
          width: 320,
          paddingBottom: 10,
        }}
        date={this.state.date}
        value={this.state.date}
        mode="date"
        placeholder="Set date if you want"
        format="YYYY-MM-DD"
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
        onDateChange={(date) => {this.setState({date: date})}}
      />
    )
  }


  render() {
    return (
      <View>

        <View>
          <Button
            title="Add new agenda"
            onPress={this.setModalVisibility}
            buttonStyle={styles.addBtn}
            containerViewStyle={{width: '100%', marginLeft: 0}}
          />
        </View>

        <View>
          {this.myModal()}
        </View>

        <View style={{height: 800}}>
          {this.myAgenda()}
        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  modal: {
    marginTop: 22,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },
  addBtn: {
    backgroundColor: '#2f95dc',
  },
  inputForm: {
    backgroundColor: Colors.backgroundColor,
    height: 100,
    marginTop: 30,
    textAlign: 'center',
  },
});

import React from 'react';
import { ScrollView, StyleSheet, View, FlatList, TextInput,
  TouchableHighlight, Modal, Alert, AsyncStorage, TouchableOpacity } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { List, ListItem, Button, Text, Header, Icon } from 'react-native-elements';
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
      addModalVisible: false,
      updateModalVisible: false,
      inputValue: '',
      date: '',
      time: '',
      items: {},
      selectedItem: {},
    };
  }

  // Calender agenda object
  myAgenda = () => {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        theme={{
          agendaKnobColor: '#2f95dc'
        }}
      />
    )
  }

  // Runs first time screen opens
  componentDidMount = () => {
    this.retrieveData()
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
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + (i * 24 * 60 * 60 * 1000);
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
      <View style={[styles.item, { height: item.height }]}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {this.isSelected(item)}}
        >
          <Text style={styles.itemTime}> {item.time} </Text>
          <Text style={styles.itemName}> {item.name} </Text>
        </TouchableOpacity>
      </View>
    );
  }

  isSelected = (item) => {
    this.setState(() => ({
      selectedItem: item,
    }));
    this.setUpdateModalVisibility();
  }

  updateItemModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={this.state.updateModalVisible}
        onRequestClose={() => {this.setUpdateModalVisibility()}}>

        <View style={styles.modal}>
          <View>

            <Header
              rightComponent={{ size: 24, icon: 'close', color: 'black', onPress: () => {this.setUpdateModalVisibility()} }}
              centerComponent={{ text: 'Update item', style: { color: 'black', fontSize: 16, fontWeight: 'bold' }, }}
              backgroundColor={'#fff'}
            />

            <TextInput
              style={styles.inputForm}
              value={this.state.inputValue}
              onChangeText={this.handleTextChange}
              placeholder="Whats happening"
              underlineColorAndroid="transparent"
            />

            <View style={styles.modalDatePicker}>
              {this.datePicker()}
            </View>
            <View style={styles.modalTimePicker}>
              {this.timePicker()}
            </View>

            <Button
              title="Update item"
              onPress={this.updateItem}
              buttonStyle={styles.addBtn}
              containerViewStyle={{width: '100%', marginLeft: 0}}
            />

            <Button
              title="Delete item"
              onPress={this.removeItem}
              buttonStyle={styles.deleteBtn}
              containerViewStyle={{width: '100%', marginLeft: 0}}
            />

          </View>
        </View>
      </Modal>
    )
  }

  updateItem = () => {
    if (!this.state.inputValue == '' && !this.state.date == '') {
      this.removeItem();
      this.addItem();
    }
    else {
      return;
    }
  }

  removeItem = () => {
    const items = this.state.items;
    const item = this.state.selectedItem;
    const date = item.date;
    console.log(item);
    items[date].pop(item)
    this.setState(
      { items, updateModalVisible: false,  },
      () => this.storeData()
    );

  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {this.setAddModalVisibility()}}
        >
          <Text style={{color: '#bbb'}}>Click me to add new agenda!</Text>
        </TouchableOpacity>
      </View>
    );
  }

  selectedEmptyDate = () => {

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
    const time = this.state.time;
    const id = input + date;
    if (!input || !date) {
      return;
    }
    else {
      if (!items[date]) {
        items[date] = []
      }
      items[date].push({
        name: input,
        date: date,
        id: id,
        time: time,
      });
    }
    this.setState(() => ({
      items,
      inputValue: '',
      date: '',
      time: '',
      addModalVisible: false,
      updateModalVisible: false,
    }));

    this.storeData();
  }

  handleTextChange = (value) => {
    this.setState(() => ({
      inputValue: value,
    }));
  }

  addItemModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={this.state.addModalVisible}
        onRequestClose={() => {this.setAddModalVisibility()}}>

        <View style={styles.modal}>
          <View>

            <Header
              rightComponent={{ size: 24, icon: 'close', color: 'black', onPress: () => {this.setAddModalVisibility()} }}
              centerComponent={{ text: 'Add item', style: { color: 'black', fontSize: 16, fontWeight: 'bold' }, }}
              backgroundColor={'#fff'}
            />

            <TextInput
              style={styles.inputForm}
              value={this.state.inputValue}
              onChangeText={this.handleTextChange}
              placeholder="Whats happening"
              underlineColorAndroid="transparent"
            />

            <View style={styles.modalDatePicker}>
              {this.datePicker()}
            </View>
            <View style={styles.modalTimePicker}>
              {this.timePicker()}
            </View>

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
        mode="date"
        placeholder="Set date"
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

  // Time picker object
  timePicker = () => {
    return (
      <DatePicker
        style={{
          width: 320,
          paddingBottom: 10,
        }}
        date={this.state.time}
        value={this.state.time}
        mode="time"
        placeholder="Set time if you want"
        format="HH:mm"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        is24Hour={true}
        iconSource={require('../assets/images/watch.png')}
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
        onDateChange={(date) => {this.setState({time: date})}}
      />
    )
  }

  setAddModalVisibility = () => {
    this.setState(() => ({
      addModalVisible: !this.state.addModalVisible,
    }));
  }

  setUpdateModalVisibility = () => {
    this.setState(() => ({
      updateModalVisible: !this.state.updateModalVisible,
    }));
  }

  // RENDER
  render() {
    return (
      <View>

        <View>
          <Button
            title="Add new agenda"
            onPress={this.setAddModalVisibility}
            buttonStyle={styles.addBtn}
            containerViewStyle={{width: '100%', marginLeft: 0}}
          />
        </View>

        <View>
          {this.addItemModal()}
          {this.updateItemModal()}
        </View>

        <View style={{height: 800}}>
          {this.myAgenda()}
        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
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
  itemTime: {
    fontSize: 12,
    color: '#666666',
  },
  itemName: {
    fontSize: 16,
  },
  addBtn: {
    backgroundColor: '#2f95dc',
  },
  deleteBtn: {
    backgroundColor: '#2f95dc',
    marginTop: 8,
  },
  modal: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: Colors.backgroundColor,
  },
  inputForm: {
    width: 400,
    backgroundColor: '#fff',
    height: 50,
    marginTop: 40,
    marginBottom: 12,
    textAlign: 'center',
  },
  modalDatePicker: {
    width: 320,
    marginLeft: 12,
  },
  modalTimePicker: {
    width: 320,
    marginLeft: 12,
    marginBottom: 8,
  },



});

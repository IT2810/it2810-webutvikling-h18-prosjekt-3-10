import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Modal,
  Button,
  AsyncStorage
} from 'react-native';
import { WebBrowser, Icon } from 'expo';
import Colors from '../constants/Colors'
import { MonoText } from '../components/StyledText';
import t from 'tcomb-form-native';

export default class ContactsScreen extends Component {
  static navigationOptions = {
    title: "Contacts",
  };

  state = {
    addContactModalVisible: false,
  }



  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps='handled'>
          
          {this.emptyContactsList()}
          {this.addContactModal()}

        </ScrollView>
      </View>
    );
  }

  handleSubmit = () => {
    const value = this.formRef.getValue(); // use that ref to get the form value
    console.log('Trying to save: ', value);
    this.saveContact(value);
  }

  async saveContact(contact) {
    console.log("trying to save")
    await AsyncStorage.setItem("contacts", JSON.stringify(contact))
    console.log("saved")
  }

  async retrieveContacts() {
    const retrievedItem = await AsyncStorage.getItem("contacts");
    const item = JSON.parse(retrievedItem);
    console.log(item);
  }

  addContactModal = () => {
    const Contact = t.struct({
      name: t.String,
      email: t.String
    })
    const Form = t.form.Form;

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.addContactModalVisible}
        onRequestClose={() => {this.setState({addContactModalVisible: false})}}>
        <Text style={styles.modalTitle}>Add contact</Text>
        <View style={styles.formContainer}>
          <Form type={Contact} ref={form => this.formRef = form}/>
        </View>
        <Button onPress={this.handleSubmit} title="Add" style={{width: 40}}/>
        <Button onPress={this.retrieveContacts} title="Retrieve" style={{width: 40}}/>
      </Modal>
    )
  }

  emptyContactsList = () => {
    return (
      <View style={styles.welcomeContainer}>
        <Image
          source={
            __DEV__
              ? require('../assets/images/alone.gif')
              : require('../assets/images/alone.gif')
          }
          style={styles.welcomeImage}
        />

        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>It looks like your contacts list is empty.</Text>
          <Text style={styles.getStartedText}>Let's add some!</Text>
        </View>

        <View>
          <TouchableHighlight hitSlop={{top: 20, right: 20, left: 20, bottom: 20}}>
            <Icon.Ionicons
              name="ios-add-circle"
              size={32}
              style={{ marginTop: 20 }}
              color={Colors.tintColor}
              onPress={() => this.setState({addContactModalVisible: true})}
            />
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  formContainer: {
    justifyContent: 'center',
    padding: 20,
  },
  modalTitle: {
    padding: 20,
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 400,
    height: 200,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 25,
    marginTop: 20,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

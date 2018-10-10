import React, { Component } from 'react';
import AddContactModal from '../components/AddContactModal';
import ContactInformationModal from '../components/ContactInformationModal';

import {
  Alert,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  Button,
  AsyncStorage
} from 'react-native';

import { List, ListItem, Text } from 'react-native-elements';

import { Contacts, Permissions } from 'expo';
import ContactsList from '../components/ContactsList';
import Loading from '../components/Loading';

export default class ContactsScreen extends Component {
  static navigationOptions = {
    title: "Contacts",
  };

  state = {
    contactModalVisible: false,
    addContactModalVisible: false,
    importedContacts: [],
    addedContacts: [],
    fetchingContacts: true,
  }

  componentDidMount = () => {
    this.loadContacts()
    // Check if user already has accepted sharing contacts
    // If not the contacts page will show an option to import from contacts
    // which will in turn ask for Contacts-permission.
    Permissions.getAsync(Permissions.CONTACTS)
      .then(({ status }) => {
        if (status === 'granted') {
          this.importContacts();
        }
      })
  }

  // Saves a contact in AsyncStorage
  saveContact = contact => {
    AsyncStorage.getItem('contacts')
      .then(result => {
        if (result == null) {
          return []
        } else {
          return JSON.parse(result)
        }
      })
      .then(data => {
        data.push(contact)
        data.sort((a, b) => a.firstName < b.firstName ? -1 : 1)
        this.setState({
          addedContacts: data,
        })
        return JSON.stringify(data)
      })
      .then(contacts => {
        AsyncStorage.setItem('contacts', contacts)
      })
  }

  // Removes contact from AsyncStorage
  removeContact = contact => {
    // First gets all the saved contacts
    AsyncStorage.getItem('contacts')
      .then(result => {
        if (result == null) {
          console.error("There's no saved contacts")
          return []
        } else {
          return JSON.parse(result)
        }
      })
      // Then deletes the contact from that list
      .then(data => {
        data = data.filter(savedContact => savedContact.id != contact.id)
        this.setState({
          addedContacts: data,
        })
        return JSON.stringify(data)
      })
      // And finally updates storage with the contact removed
      .then(contacts => {
        AsyncStorage.setItem('contacts', contacts)
      })
  }

  // Loads added contacts from AsyncStorage
  loadContacts = () => {
    let addedContacts = []
    AsyncStorage.getItem('contacts')
      .then(result => {
        if (result !== null) {
          addedContacts = JSON.parse(result)
        }
        this.setState({
          addedContacts,
          fetchingContacts: false,
        })
      })
  }

  // Imports contacts from phone contact list
  importContacts = async () => {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    if (status === 'granted') {
      result = await Contacts.getContactsAsync();
      importedContacts =
        result.data
          // Filter away the contacts without any name
          .filter(contact => contact.firstName || contact.lastName)
          // Give each contact-object an empty string for first or last name if they lack it
          .map(contact => {
            const { firstName, lastName } = contact
            contact.firstName = firstName ? firstName : ""
            contact.lastName = lastName ? lastName : ""
            return contact
          })
          // Sort by first name
          .sort((a, b) => a.firstName < b.firstName ? -1 : 1)
      this.setState({
        importedContacts,
        fetchingContacts: false,
      })
    } else {
      console.error('Contact read permission not granted, no changes made')
    }
  }

  handleDelete = (contact) => {
    Alert.alert(
      `Delete ${contact.firstName}?`,
      "This will remove the contact",
      [
        { text: 'Cancel', onPress: () => { }, style: 'cancel' },
        {
          text: 'YES', onPress: () => {
            this.removeContact(contact)
          }
        },
      ],
      { cancelable: false }
    )
  }

  handleContactPress = contact => {
    this.setState({
      contactModalVisible: true,
      activeContact: contact,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps='handled'>
          {
            // This checks if phone is currently fetching contacts and if so displays loading, if not displays list of contacts
            this.state.fetchingContacts
              ?
              <Loading />
              :
              <ContactsList
                addedContacts={this.state.addedContacts}
                importedContacts={this.state.importedContacts}
                handleContactPress={this.handleContactPress}
                handleDelete={this.handleDelete}
                importContacts={this.importContacts}
                addContact={() => this.setState({ addContactModalVisible: true })}
              />
          }

          {/*Modals not shown on screen until their visibility is set to true in state*/}
          <ContactInformationModal contact={this.state.activeContact} closeCallback={() => this.setState({ contactModalVisible: false })} visible={this.state.contactModalVisible} />
          <AddContactModal onSave={(contact) => this.saveContact(contact)} closeCallback={() => this.setState({ addContactModalVisible: false })} visible={this.state.addContactModalVisible} />
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  modalContent: {
    padding: 20,
    alignItems: "center",
  },
  buttonContainer: {
    margin: 10,
    width: "50%"
  },
  textWithLabel: {
    marginTop: 20,
    alignSelf: "flex-start"
  },
  avatar: {
    marginVertical: 20,
  },
  lightText: {
    color: 'rgba(96,100,109, 1)',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 10,
  },

  contactsHeader: {
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  formContainer: {
    justifyContent: 'center',
    padding: 20,
  },
  modalTitle: {
    padding: 20,
    fontSize: 24,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  welcomeContainer: {
    margin: 20,
  },
  item: {
    margin: 30,
  },
  welcomeImage: {
    width: 400,
    height: 200,
    resizeMode: 'contain',
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
    marginBottom: 20,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  GrayContent: {
    width: 375,
    flex: 1,
    padding: 10,
  },

  headBackground: {
    width: 375,
    flex: 1,
    padding: 10,
  },

  headerText: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    padding: 10,
    color: "#4d4d4d",
  },

  integerInput: {
    flex: 1,
    fontSize: 15,
    color: "#778899",
    fontWeight: '600',
    borderBottomWidth: 1,
    borderColor: '#69868a',
  },

  name: {
    fontSize: 20,
    color: "#1c1c1c",
    fontWeight: '700',
    borderBottomWidth: 2,
    borderColor: '#587073',
  },

  userInfo: {
    fontSize: 14,
    color: "#778899",
    fontWeight: '600',
    flex: 1,
    borderBottomWidth: .5,
    borderColor: '#8D8D8D',
  },

  saveButton: {
    margin: 10,
    backgroundColor: "#129919",
    borderWidth: 0,
    borderRadius: 5,
    width: 200,
  },

  SectionStyleIntegers: {
    flexDirection: 'row',
    height: 30,
    margin: 10,
    width: 125,
  },

  SectionStyleName: {
    flexDirection: 'row',
    height: 30,
    margin: 10,
    width: 300,
  },

  SectionStyleUserInfo: {
    flexDirection: 'row',
    height: 30,
    margin: 10,
    width: 250,
  },
})

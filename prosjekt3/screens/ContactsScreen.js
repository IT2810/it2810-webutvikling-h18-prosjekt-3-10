import React, { Component } from 'react';
import AddContactModal from '../components/AddContactModal';
import ContactInformationModal from '../components/ContactInformationModal';
import {
  Alert,
  View,
  AsyncStorage,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Header } from 'react-native-elements';
import { Contacts, Permissions } from 'expo';
import ContactsList from '../components/ContactsList';
import Loading from '../components/Loading';
import Colors from '../constants/Colors'


export default class ContactsScreen extends Component {
  static navigationOptions = {
    title: "Contacts",
    header: null,
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
    {/*
    Permissions.getAsync(Permissions.CONTACTS)
      .then(({ status }) => {
        if (status === 'granted') {
          this.importContacts();
        }
      })
    */}
  }

  // Saves a contact in an array in AsyncStorage
  // Also updates state to mirror AsyncStorage
  saveContact = async contact => {
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
        return AsyncStorage.setItem('contacts', contacts)
      })
  }

  // Removes contact from AsyncStorage
  // Also updates state to mirror AsyncStorage
  removeContact = async contact => {
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
          contactModalVisible: false,
        })
        return JSON.stringify(data)
      })
      // And finally updates storage with the contact removed
      .then(contacts => {
        return AsyncStorage.setItem('contacts', contacts)
      })
  }

  // Retrieves added contacts from AsyncStorage and sets them in state
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

  // NOTE: This method is not used because of importing contacts causing slowdown in app
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

  // Handles delete action from user
  // Asks to verify deletion before passing contact to removal-method
  handleDelete = (contact) => {
    Alert.alert(
      `Delete ${contact.firstName} ${contact.lastName}?`,
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

  // Handles press on contact
  // Opens modal for more information on the contact
  handleContactPress = contact => {
    this.setState({
      contactModalVisible: true,
      activeContact: contact,
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View>

          <Header
            outerContainerStyles={styles.headerOuterContainer}
            rightComponent={{
              size: 28,
              icon: 'add-circle',
              color: Colors.btnBlue,
              style: styles.headerBtn,
              onPress: () => { this.setState({ addContactModalVisible: true }) }
            }}
            centerComponent={{
              text: 'contacts',
              style: styles.header,
            }}
            backgroundColor={Colors.headerBackground}
          />

          <View>
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
            <ContactInformationModal
              contact={this.state.activeContact}
              onDelete={(contact) => this.handleDelete(contact)}
              closeCallback={() => this.setState({ contactModalVisible: false })}
              visible={this.state.contactModalVisible}
            />
            <AddContactModal
              onSave={(contact) => this.saveContact(contact)}
              closeCallback={() => this.setState({ addContactModalVisible: false })}
              visible={this.state.addContactModalVisible} />
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

});

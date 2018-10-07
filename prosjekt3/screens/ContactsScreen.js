import React, { Component } from 'react';
import AddContactModal from '../components/AddContactModal';

import {
  Alert,
  Image,
  Platform,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableHighlight,
  TextInput,
  View,
  Modal,
  Button,
  AsyncStorage
} from 'react-native';

import { Avatar, Header, List, ListItem, Text } from 'react-native-elements';

import { WebBrowser, Icon, Contacts, Permissions } from 'expo';
import Colors from '../constants/Colors'
import { MonoText } from '../components/StyledText';

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
    .then(({status}) => {
      if (status === 'granted') {
        this.retrieveContacts();
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
        console.error("No contacts are saved?!")
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

  // Imports contacts saved on the phone
  importContacts = async () => {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    if (status === 'granted') {
      importedContacts = await Contacts.getContactsAsync();
      this.setState({
        importedContacts: importedContacts.data,
        fetchingContacts: false,
      })
    } else {
      console.error('Contact read permission not granted, no changes made')
    }
  }

  // This is the modal that shows a more detailed view of chosen contact. 
  contactModal = () => {
    if (this.state.activeContact && this.state.contactModalVisible) {
      let contact = this.state.activeContact;
      return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.contactModalVisible}
          onRequestClose={() => {this.setState({contactModalVisible: false})}}>
          <Header
            innerContainerStyles={{alignItems: 'center'}}
            leftComponent={{ icon: 'keyboard-arrow-down', color: '#fff', size: 32, onPress: () => {this.setState({contactModalVisible: false})} }}
          />
          <View style={styles.modalContent}>
            <Avatar
              avatarStyle={styles.avatar}
              xlarge
              rounded
              source={contact.imageAvailable ? {uri: contact.image.uri} : require('../assets/images/robot-prod.png')}
            />
            <View style={styles.textWithLabel}>
              <Text h4 style={styles.lightText}>Name</Text>
              <Text h3>{`${contact.firstName} ${contact.lastName}`}</Text>
            </View>
            <View style={styles.textWithLabel}>
              <Text h4 style={styles.lightText}>Number</Text>
              <Text h3>{contact.phoneNumbers && contact.phoneNumbers[0].number}</Text>
            </View>
          </View>
        </Modal>
      )
    } 
  }

  showEmptyContactsList = () => {
    return (
      <View style={[styles.welcomeContainer, {alignItems: "center"}]}>
        <Image
          source={
            require('../assets/images/alone.gif')
          }
          style={styles.welcomeImage}
        />

        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>It looks like your contacts list is empty.</Text>
          <View style={styles.buttonContainer}>
            <Button title="Import from phone" onPress={this.importContacts}/>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Add Contact" onPress={() => {this.setState({addContactModalVisible: true})}}/>
          </View>
        </View>

      </View>
    )
  }

  handleDelete = (contact) => {
    Alert.alert(
      `Delete ${contact.firstName}?`,
      "This will remove the contact",
      [
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
        {text: 'YES', onPress: () => {
          this.removeContact(contact)
        }},
      ],
      { cancelable: false }
    )
  }

  renderContactsList = (contacts) => {
    return (
        <List>
          <FlatList
            data={contacts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              // TODO: Don't show undefined if name is not found
              <ListItem 
                containerStyle={{padding: 20}}
                roundAvatar
                title={`${item.firstName} ${item.lastName}`}
                avatar={item.imageAvailable ? {uri: item.image.uri} : require('../assets/images/profile.png')}
                onPress={() => {
                  this.setState({
                    contactModalVisible: true,
                    activeContact: item,
                  })
                }}
                onLongPress={() => this.handleDelete(item)}
              />
            )}
          />
        </List>
    )
  }

  showContacts = () => {
    return (
      <View style={styles.contactsContainer}>
        <View style={styles.contactsHeader}>
          <Text h4>Added contacts:</Text>
          <Button title="Add Contact" onPress={() => {this.setState({addContactModalVisible: true})}}/>
        </View>
        {this.renderContactsList(this.state.addedContacts)}
        <View style={styles.contactsHeader}>
          <Text h4>Imported contacts:</Text>
          <Button title="Import" onPress={this.importContacts}/>
        </View>
        {this.renderContactsList(this.state.importedContacts)}
      </View>
    )
  }

  showLoading = () => {
    return (
      <View style={{alignItems: "center", justifyContent: "center"}}>
        <Image
          source={
            require('../assets/images/loading.gif')
          }
          style={styles.welcomeImage}
        />
        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>Loading...</Text>
        </View>
      </View>
    )
  }

  hasContacts = () => {
    return this.state.importedContacts.length !== 0 || this.state.addedContacts.length !== 0
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps='handled'>
          {
            this.state.fetchingContacts ?
            (this.showLoading()) :
            (this.hasContacts() ? this.showContacts() : this.showEmptyContactsList())
          }
          {
            this.contactModal()
          }
            <AddContactModal onSave={(contact) => this.saveContact(contact)} closeCallback={() => this.setState({addContactModalVisible: false})} visible={this.state.addContactModalVisible}/>
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

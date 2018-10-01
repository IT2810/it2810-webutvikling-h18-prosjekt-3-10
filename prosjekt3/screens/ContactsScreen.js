import React, { Component } from 'react';
import {
  Image,
  Platform,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
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
    contacts: {data: []},
    fetchingContacts: true,
  }

  componentDidMount = () => {
    // Check if user already has accepted sharing contacts
    // If not the contacts page will show an option to import from contacts
    // which will in turn ask for Contacts-permission. 
    Permissions.getAsync(Permissions.CONTACTS)
    .then(({status}) => {
      if (status === 'granted') {
        this.retrieveContacts();
      } else {
        this.setState({
          fetchingContacts: false,
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps='handled'>
          <Button title="Simulate remove permissions" onPress={() => {this.setState({contacts: {data: []}})}}/>
          {
            this.state.fetchingContacts ?
            (this.showLoading()) :
            (this.state.contacts.data.length == 0 ? this.showEmptyContactsList() : this.showContacts())
          }
          {
              this.contactModal()
          }
        </ScrollView>
      </View>
    );
  }

  retrieveContacts = async () => {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    if (status === 'granted') {
      const data = await Contacts.getContactsAsync();
      this.setState({
        contacts: data,
        fetchingContacts: false,
      })
    } else {
      throw new Error('Contact read permission not granted');
    } 
  }

  contactModal = () => {
    if (this.state.activeContact && this.state.contactModalVisible) {
      let contact = this.state.activeContact;
      console.log(contact)
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
          <Button title="Import from phone" onPress={this.retrieveContacts}/>
        </View>

      </View>
    )
  }

  showContacts = () => {
    return (
      <View style={styles.welcomeContainer}>
        <List>
          <FlatList
            data={this.state.contacts.data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              // TODO: Don't show undefined if name is not found
              (item.lastName || item.firstName) &&
              <ListItem 
                roundAvatar
                title={`${item.firstName} ${item.lastName}`}
                avatar={item.imageAvailable ? {uri: item.image.uri} : require('../assets/images/robot-prod.png')}
                onPress={() => {
                  this.setState({
                    contactModalVisible: true,
                    activeContact: item,
                  })
                }}
              />
            )}
          />
        </List>
      </View>
    )
  }

  showLoading = () => {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modalContent: {
    padding: 20,
    alignItems: "center",
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
    paddingTop: 30,
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
  },
});

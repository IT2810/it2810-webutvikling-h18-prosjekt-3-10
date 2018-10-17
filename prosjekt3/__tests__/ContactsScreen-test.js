import 'react-native';
import React from 'react';
import ContactsScreen from '../screens/ContactsScreen';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';

import MockAsyncStorage from 'mock-async-storage';

const mock = () => {
    const mockImpl = new MockAsyncStorage()
    jest.mock('AsyncStorage', () => mockImpl)
}
const release = () => jest.unmock('AsyncStorage')

import { AsyncStorage } from 'react-native';

describe('ContactsScreen snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders the contacts screen', async () => {
    const tree = renderer.create(<ContactsScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Unit testing', () => {
    let contactsScreen = renderer.create(<ContactsScreen />).getInstance();
    const contact = {
        firstName: "Hello",
        lastName: "World",
        id: "1231231231",
        number: "02020202",
    }
    it('should save contact in state', async () => {
        mock();
        await contactsScreen.saveContact(contact);
        expect(contactsScreen.state.addedContacts.length).toEqual(1);
        expect(contactsScreen.state.addedContacts[0].firstName).toEqual("Hello")
    })
    it('should have saved contact in AsyncStorage', async () => {
        const value = await AsyncStorage.getItem('contacts')
        expect(value).toBe(JSON.stringify([contact]))
    })
    it('should allow several contacts in AsyncStorage', async () => {
        await contactsScreen.saveContact(contact);
        const value = await AsyncStorage.getItem('contacts')
        expect(value).toBe(JSON.stringify([contact, contact]))
    })
    it('should be able to load contacts from AsyncStorage', async () => {
        contactsScreen.setState({addedContacts: []})
        expect(contactsScreen.state.addedContacts.length).toEqual(0)        
        await contactsScreen.loadContacts();
        expect(contactsScreen.state.addedContacts.length).toBeGreaterThan(0)
    }) 
    it('should remove contacts from AsyncStorage', async () => {
        // This should delete all the contacts as they all share the same id
        await contactsScreen.removeContact(contact)
        const value = await AsyncStorage.getItem('contacts')
        expect(value).toBe("[]")
    })
    it('should handle contact press', () => {
        contactsScreen.handleContactPress(contact);
        expect(contactsScreen.state.contactModalVisible).toBe(true)
        expect(contactsScreen.state.activeContact).toEqual(contact)
    })
});

release();

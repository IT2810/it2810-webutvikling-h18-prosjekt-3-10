import 'react-native';
import React from 'react';
import CalenderScreen from '../screens/CalenderScreen';
import renderer from 'react-test-renderer';
import MockAsyncStorage from 'mock-async-storage'
import { AsyncStorage } from 'react-native'

const mock = () => {
  const mockImpl = new MockAsyncStorage()
  jest.mock('AsyncStorage', () => mockImpl)
};

const release = () => jest.unmock('AsyncStorage');


// Testing AsyncStorage
it('Mock Async Storage working', async () => {
  await AsyncStorage.setItem('myKey', 'myValue')
  const value = await AsyncStorage.getItem('myKey')
  expect(value).toBe('myValue')
})


describe('Unit testing', () => {
  let calenderScreen = renderer.create(<CalenderScreen />).getInstance();
  const item = {
    name: "Hello",
    date: "2018-10-20",
    id: "Hello2018-10-20",
    time: "20:20",
  }

  it('should save agenda in state', async () => {
    await calenderScreen.addItem(item);
    expect(calenderScreen.state.items.length).toEqual(1);
  })

  it('should have saved contact in AsyncStorage', async () => {
    const value = await AsyncStorage.getItem('Agenda')
    expect(value).toBe(JSON.stringify([item]))
  })

  it('should put selected item in selectedItem'), async () => {
    await calenderScreen.isSelected(item)
    const value = calenderScreen.state.selectedItem;
    expect(value).toBe(item)
  }

  it('should delete selected item', async () => {
    // This should delete the selected Item
    await calenderScreen.removeItem(item)
    const value = await AsyncStorage.getItem('Agenda')
    expect(value).toBe("{}")
  })

});

release();

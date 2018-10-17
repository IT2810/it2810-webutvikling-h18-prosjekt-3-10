import React from 'react';
import renderer from 'react-test-renderer';
import ProfileScreen from '../screens/ProfilesScreen';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import { AsyncStorage } from 'react-native';
import MockAsyncStorage from 'mock-async-storage';



const mock = () => {
    const mockImpl = new MockAsyncStorage()
    jest.mock('AsyncStorage', () => mockImpl)
}
const release = () => jest.unmock('AsyncStorage')

describe('ProfileScreen snapshot', () => {
    jest.useFakeTimers();
    beforeEach(() => {
        NavigationTestUtils.resetInternalState();
    });

    it('renders the profile screen', async () => {
        const tree = renderer.create(<ProfileScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});


describe('Unit testing', () => {
    let profileScreen = renderer.create(<ProfileScreen />).getInstance();
    const user = {
        name: 'Jens',
        email: 'test@testorini.com',
        town: 'Trondheim',
        myHeightNumber: '180',
        myWeightNumber: '80',
        modalVisible: false,
    }

    it('should save profileuser in state', async () => {
        mock();
        await profileScreen.saveState(user);
        const value = await AsyncStorage.getItem('profile')
        //expect(profileScreen.state.saveState.length).toEqual(1);
        expect(value).toBe(JSON.stringify(profileScreen))
    })


    release();

});


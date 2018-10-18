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

// snapshot test
const release = () => jest.unmock('AsyncStorage')
describe('ContactsScreen snapshot', () => {
    jest.useFakeTimers();
    beforeEach(() => {
        NavigationTestUtils.resetInternalState();
    });

    it('renders the contacts screen', async () => {
        const tree = renderer.create(<ProfileScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("unit test save info", () => {
    let profileInfo = renderer.create(<ProfileScreen />).getInstance();
    const user = {
        name: 'Jens',
        email: 'Test@Testorini.com',
        town: 'Trondheim',
        myHeightNumber: '180',
        myWeightNumber: '80',
        modalVisible: false,
    }

    // testing saveState function
    it('should save profile in AsyncStorage', async () => {
        mock();
        profileInfo.setState(user)
        await profileInfo.saveState();
        const value = await AsyncStorage.getItem('profile')
        expect(value).toBe(JSON.stringify(user));

    })

    // testing retrieveData function
    it('should retrieve profile in AsyncStorage', async () => {
        mock();
        profileInfo.setState(user)
        await profileInfo.retrieveData();
        const value = await AsyncStorage.getItem('profile')
        expect(value).toBe(JSON.stringify(user));
    })

    release();

})


import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../screens/HomeScreen';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';

// snapshot test
const release = () => jest.unmock('AsyncStorage')
describe('Homescreen snapshot', () => {
    jest.useFakeTimers();
    beforeEach(() => {
        NavigationTestUtils.resetInternalState();
    });

    it('renders the homes screen', async () => {
        const tree = renderer.create(<HomeScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

release();


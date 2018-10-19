import React from 'react';
import renderer from 'react-test-renderer';
import ProfileModal from '../components/ProfileModal';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';

// snapshot test
const release = () => jest.unmock('AsyncStorage')
describe('Profile-modal snapshot', () => {
    jest.useFakeTimers();
    beforeEach(() => {
        NavigationTestUtils.resetInternalState();
    });

    it('renders the Profile-modal', async () => {
        const tree = renderer.create(<ProfileModal />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

release();
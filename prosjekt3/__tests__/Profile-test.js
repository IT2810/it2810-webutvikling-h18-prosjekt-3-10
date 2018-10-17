import React from 'react';
import renderer from 'react-test-renderer';
import ProfileScreen from '../screens/ProfilesScreen';


// testing snapshot view
it('renders correctly', () => {
    const tree = renderer
        .create(< ProfileScreen />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

// component is rendered correctly
test('renders button with passed props', () => {
    const component = renderer.create(
        <ProfileScreen onClick={() => { }} label="test label" />
    );
    expect(component.toJSON()).toMatchSnapshot();
});


//When a component is rendered the save is equal to empty / undefined.
test('renders with " " as an initial state of saveState', () => {
    const component = renderer.create(
        <ProfileScreen onClick={() => { " " }} label="this is test label" />
    );
    const instance = component.getInstance();
    expect(instance.state.saveState).toBe(undefined);
});

//When we click on the button it calls the SaveState function only ones - in render
test('onClick function is being called once', () => {
    const fn = jest.fn();
    const component = renderer.create(
        <ProfileScreen onClick={fn} label="this is test label" saveState={" "} />
    );
    const instance = component.getInstance();
    instance.props.onClick();
    expect(fn.mock.calls.length).toBe(1);
});




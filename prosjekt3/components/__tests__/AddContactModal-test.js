import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import AddContactModal from '../AddContactModal';

describe('Snapshot testing', () => {
    jest.useFakeTimers();
    let tree = renderer.create(<AddContactModal />).toJSON();
    expect(tree).toMatchSnapshot();
})

describe('Unit testing', () => {
    let modal = renderer.create(<AddContactModal onSave={jest.fn()} closeCallback={jest.fn()}/>).getInstance();
    const exampleState = {
        firstName: "Hello",
        lastName: "World",
        number: "02020202",
        id: "1231231231",
    }
    const expectedInitialState = {
        firstName: '',
        lastName: '',
        number: '',
        id: '',
    }
    const { number } = exampleState
    const contact = {
        firstName: exampleState.firstName.trim(),
        lastName: exampleState.lastName.trim(),
        id: `${exampleState.firstName}${exampleState.lastName}${exampleState.number}`,
        phoneNumbers: [{number: number}]
    }

    it('should start with empty state', () => {
        expect(modal.state).toEqual(expectedInitialState);
    })

    it('should make contact, reset state and call onSave and close', () => {
        modal.setState(exampleState)
        expect(modal.state).toEqual(exampleState)
        modal.handleAddContact()
        expect(modal.state).toEqual(expectedInitialState)
        expect(modal.props.onSave).toBeCalledWith(contact)
        expect(modal.props.closeCallback).toBeCalled()
    })
});

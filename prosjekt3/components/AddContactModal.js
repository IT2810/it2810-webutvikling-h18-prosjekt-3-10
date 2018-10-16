import React, { Component } from 'react';

import {
    Modal,
    KeyboardAvoidingView,
    View,
    TextInput,
    Button,
    StyleSheet,
} from 'react-native'

import {
    Avatar,
    Header,
} from 'react-native-elements'

export default class AddContactModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            number: '',
            id: '',
        }
    }

    // Generates ID from first and last name combined with number
    // NOTE: This means it's possible (though unlikely) that two or more contacts can
    // share an ID.
    generateId = () => {
        const id = `${this.state.firstName}${this.state.lastName}${this.state.number}`
        return id
    }

    render() {
        return (
            <Modal
                animationType="fade"
                transparent={false}
                visible={this.props.visible}
                onRequestClose={this.props.closeCallback}
            >
                <KeyboardAvoidingView behavior="position">
                    <Header
                        innerContainerStyles={{alignItems: 'center'}}
                        leftComponent={{ icon: 'keyboard-arrow-down', color: '#fff', size: 32, onPress: this.props.closeCallback }}
                        centerComponent={{ text: 'Add contact', style: { color: '#fff' } }}
                    />
                    <View style={styles.modalContent}>
                        <Avatar // using react native elements - external libary
                            containerStyle={styles.avatar}
                            xlarge
                            rounded
                            source={require('../assets/images/profile.png')}
                            activeOpacity={0.7}
                        />
        
                        <View style={styles.nameInput}>
                            <TextInput style={styles.name} // input field for name
                            placeholder="First name"
                            value={this.state.firstName}
                            onChangeText={name => {
                                this.setState({
                                    firstName: name,
                                })
                            }}
                            underlineColorAndroid="transparent" 
                            />
                        </View>
        
                        <View style={styles.nameInput}>
                            <TextInput style={styles.name} // input field for name
                            placeholder="Last name"
                            value={this.state.lastName}
                            onChangeText={name => {
                                this.setState({
                                    lastName: name
                                })
                            }}
                            underlineColorAndroid="transparent" 
                            />
                        </View>
        
                        <View style={styles.numberInput}>
                            <TextInput
                                style={styles.number}
                                placeholder="Phone Number"
                                keyboardType='numeric'
                                onChangeText={(number) => {
                                    this.setState({
                                        number,
                                    })
                                }}
                                value={this.state.number}
                                maxLength={8}  // Limit for number of integers
                                underlineColorAndroid="transparent" 
                            />
                        </View>
                        <View style={styles.buttonWrapper}>
                            <Button 
                                onPress={()=>{
                                    const {
                                        firstName,
                                        lastName,
                                        number,
                                    } = this.state

                                    // Construct contact-object
                                    // Trim spaces from both ends of names
                                    const contact = {
                                        firstName: firstName.trim(),
                                        lastName: lastName.trim(),
                                        id: this.generateId(),
                                        phoneNumbers: [{number: number}]
                                    }

                                    // Reset modal
                                    this.setState({
                                        firstName: '',
                                        lastName: '',
                                        number: '',
                                        id: '',
                                    })

                                    // Pass contact to save-method
                                    this.props.onSave(contact)

                                    // Notify ready to close
                                    this.props.closeCallback()
                                }} 
                                title="Add"
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalContent: {
        alignItems: "center",
    },
    header: {
        width: "100%",
    },
    avatar: {
        margin: 20,
    },
    textWithLabel: {
        marginBottom: 20,
    },
    lightText: {
        color: "#696969"
    },
    name: {
        fontSize: 20,
        color: "#4d4d4d",
        fontWeight: '700',
        margin: 15,
    },
    number: {
        fontSize: 20,
        color: "#4d4d4d",
        fontWeight: '700',
        margin: 15,
    },
    nameInput: {
        width: 300,
    },
    numberInput: {
        width: 300,
    },
    buttonWrapper: {
        width: 200,
        marginBottom: 30,
    }
})
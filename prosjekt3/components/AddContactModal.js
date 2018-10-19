import React, { Component } from 'react';
import Colors from '../constants/Colors'
import {
    Modal,
    KeyboardAvoidingView,
    View,
    TextInput,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from 'react-native'
import {
    Avatar,
    Header,
    Button,
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

    // Handles "Add contact"-button press
    handleAddContact = () => {
        const {
            firstName,
            lastName,
            number,
        } = this.state

        // Construct contact-object
        // Also trims spaces from both ends of names
        const contact = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            id: this.generateId(),
            phoneNumbers: [{ number: number }]
        }

        // Reset modal state
        this.setState({
            firstName: '',
            lastName: '',
            number: '',
            id: '',
        })

        // Pass contact to save-method in parent screen/component
        this.props.onSave(contact)

        // Notify ready to close
        this.props.closeCallback()
    }

    render() {
        return (
            <Modal
                animationType="fade"
                transparent={false}
                visible={this.props.visible}
                onRequestClose={this.props.closeCallback}
            >
                <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView behavior="position">
                    <Header
                      outerContainerStyles={styles.headerOuterContainer}
                      rightComponent={{
                        size: 28,
                        icon: 'close',
                        color: 'black',
                        style: styles.headerBtn,
                        onPress: this.props.closeCallback
                      }}
                      centerComponent={{
                        text: 'Add contact',
                        style: styles.header,
                      }}
                      backgroundColor={Colors.headerBackground}
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
                                onPress={this.handleAddContact}
                                buttonStyle={styles.addBtn}
                                title="Add"
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
                </SafeAreaView>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#fff',
    },
    headerOuterContainer: {
      borderBottomWidth: 1,
      borderBottomColor: '#999',
    },
    header: {
      color: 'black',
      fontSize: 20,
      fontWeight: '600',
      fontVariant: ['small-caps'],
    },
    addBtn: {
      marginTop: 15,
      backgroundColor: Colors.btnBlue,
    },
    modalContent: {
        alignItems: "center",
    },
    avatar: {
        margin: 20,
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

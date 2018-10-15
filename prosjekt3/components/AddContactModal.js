import React, { Component } from 'react';

import {
    Modal,
    KeyboardAvoidingView,
    ScrollView,
    View,
    TextInput,
    Button,
    StyleSheet,
    Text,
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
                <KeyboardAvoidingView behavior="position" enabled>
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
        
                        <View style={styles.SectionStyleName}>
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
        
                        <View>
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
        
                        <View style={styles.SectionStyleIntegers}>
                            <TextInput
                                style={styles.integerInput}
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
                    </View>
                    <View style={styles.centerContent}>
                        <Button 
                            onPress={()=>{
                                const {
                                    firstName,
                                    lastName,
                                    number,
                                } = this.state

                                // Construct contact-object
                                const contact = {
                                    firstName,
                                    lastName,
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
        margin: 10,
        marginBottom: 40,
    },
    textWithLabel: {
        width: "80%",
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
        width: "80%",
    },
})
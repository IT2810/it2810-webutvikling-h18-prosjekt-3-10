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

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.visible}
                onRequestClose={this.props.closeCallback}
            >
                <Header
                    innerContainerStyles={{alignItems: 'center'}}
                    leftComponent={{ icon: 'keyboard-arrow-down', color: '#fff', size: 32, onPress: this.props.closeCallback }}
                    centerComponent={{ text: 'Add contact', style: { color: '#fff' } }}
                />
                <KeyboardAvoidingView behavior="position" enabled>
                <ScrollView>
                    <View style={styles.headBackground}>
                    <View style={styles.centerContent}>
                        <Avatar // using react native elements - external libary
                        xlarge
                        rounded
                        source={require('../assets/images/profile.png')}
                        activeOpacity={0.7}
                        />
                    </View>
    
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
                                id: number,
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
                                id
                            } = this.state
                            const contact = {
                                firstName,
                                lastName,
                                id,
                                phoneNumbers: [{number: number}]
                            }
                            this.setState({
                                firstName: '',
                                lastName: '',
                                number: '',
                                id: '',
                            })
                            this.props.onSave(contact)
                            this.props.closeCallback()
                        }} 
                        title="Add"
                    />
                    </View>
                </ScrollView>
                </KeyboardAvoidingView>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    centerContent: {
        width: '100%',
    }
})
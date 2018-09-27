import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';

export default class UserProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            town: '',
            height: '',
            weight: '',

        };
    }
    static navigationOptions = {
        header: null,
    };

    /* funksjon som bestemmer at input kun kan være integers for høyde */
    onChangedHeight(height) {
        let newHeight = 'cm   ';
        let heightNumbers = '0123456789';
        for (var i = 0; i < height.length; i++) {
            if (heightNumbers.indexOf(height[i]) > -1) {
                newHeight = newHeight + height[i];
            }
        }
        this.setState({ myHeightNumber: newHeight });
    }

    onChangedWeight(weight) {
        let newWeight = 'kg   ';
        let weightNumbers = '0123456789';
        for (var i = 0; i < weight.length; i++) {
            if (weightNumbers.indexOf(weight[i]) > -1) {
                newWeight = newWeight + weight[i];
            }
        }
        this.setState({ myWeightNumber: newWeight });
    }


    render() {
        let profilePicture = {
            uri: 'https://bootdey.com/img/Content/avatar/avatar4.png'
        }
        return (
            <ScrollView style={styles.scroll}>
                <KeyboardAvoidingView style={styles.viewContent} behavior="padding" enabled>
                    <View style={styles.headBackground}>
                        <Text style={styles.headerText}>Profile</Text>
                        <Image style={styles.avatar}
                            source={profilePicture} />
                        <TextInput style={styles.name} placeholder="Name" onChangeText={(name => this.setState({ name }))} />
                        <TextInput
                            style={styles.integerInput}
                            placeholder="Height"
                            keyboardType='numeric'
                            onChangeText={(height) => this.onChangedHeight(height)}
                            value={this.state.myHeightNumber}
                            maxLength={8}  //setting limit of input
                        />
                        <TextInput
                            style={styles.integerInput}
                            placeholder="Weight"
                            keyboardType='numeric'
                            onChangeText={(weight) => this.onChangedWeight(weight)}
                            value={this.state.myWeightNumber}
                            maxLength={8}  //setting limit of input
                        />
                    </View>
                    <TextInput style={styles.userInfo} placeholder="E-mail" onChangeText={(email => this.setState({ email }))} keyboardType="email-address" />
                    <TextInput style={styles.userInfo} placeholder="Town" onChangeText={(town => this.setState({ town }))} />
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

    headBackground: {
        backgroundColor: 'powderblue',
        width: 375,
        flex: 1,
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 2,

    },

    headerText: {
        fontSize: 30,
        fontWeight: '700',
        textAlign: 'center',
        padding: 15,

    },

    scroll: {
        flex: 1
    },

    viewContent: {
        flex: 2,
        alignItems: 'center',


    },

    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 20,
    },
    name: {
        fontSize: 22,
        color: "#000000",
        fontWeight: '700',
        width: 200,
        padding: 10,
        textAlign: 'center',


    },
    userInfo: {
        fontSize: 16,
        color: "#778899",
        fontWeight: '600',
        width: 200,
        padding: 10,
        textAlign: 'center',
    },

    integerInput: {
        fontSize: 15,
        color: "#778899",
        fontWeight: '600',
        width: 80,
        padding: 6,
        textAlign: 'center',
    }


});

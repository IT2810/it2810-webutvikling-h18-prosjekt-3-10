import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';

export default class UserProfileView extends Component {
    static navigationOptions = {
        title: 'Profile',
    };

    render() {
        return (

            <ScrollView style={styles.scroll}>
                <KeyboardAvoidingView style={styles.viewContent} behavior="padding" enabled>


                    <Image style={styles.avatar}
                        source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar4.png' }} />

                    <TextInput style={styles.name} placeholder="Name" />
                    <TextInput style={styles.userInfo} placeholder="E-mail" keyboardType="email-address" />
                    <TextInput style={styles.userInfo} placeholder="Town" />
                </KeyboardAvoidingView>
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({

    scroll: {
        flex: 1
    },

    viewContent: {
        padding: 20,
        alignItems: 'center',


    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        color: "#000000",
        fontWeight: '600',
        width: 200,
        padding: 20,
    },
    userInfo: {
        fontSize: 16,
        color: "#778899",
        fontWeight: '600',
        width: 200,
        padding: 20,
    },
    body: {
        backgroundColor: "#778899",
        alignItems: 'center',
    }
});

import React, { Component } from 'react';
import { Avatar } from 'react-native-elements';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    ImageBackground,

} from 'react-native';

export default class UserProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = { // inital sate for input fields
            name: '',
            email: '',
            town: '',
            height: '',
            weight: '',
        };
    }
    static navigationOptions = {
        header: null, // remove initial white-area header
    };

    /* function that restrict user to only input integers for height input field */
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
    /* function that restrict user to only input integers for weight input field */
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
            uri: 'https://bootdey.com/img/Content/avatar/avatar4.png' // link to profile image/avatar
        }
        // let backgroundImage = "../assets/images/profileBackground.jpg"

        return (
            <KeyboardAvoidingView behavior="position" enabled>
                <ScrollView>
                    <View style={styles.headBackground}>
                        {/* <ImageBackground style={styles.ImageBackground} source={require(backgroundImage) }> */}

                        <Text style={styles.headerText}>Profile</Text>
                        <View style={styles.avatarImage}>
                            <Avatar // using react native elements - external libary
                                xlarge
                                rounded
                                source={profilePicture}
                                activeOpacity={0.7}
                            />
                        </View>

                        <View style={styles.SectionStyleName}>
                            <Image source={require('../assets/images/profileName.png')} style={styles.ImageStyle} />
                            <TextInput style={styles.name} // input field for name
                                placeholder="Enter name"
                                onChangeText={(name => this.setState({ name }))}
                                underlineColorAndroid="transparent" />
                        </View>

                        <View style={styles.SectionStyleIntegers}>
                            <Image source={require('../assets/images/profileHeight.png')} style={styles.ImageStyle} />
                            <TextInput // input field for height
                                style={styles.integerInput}
                                placeholder="Height"
                                keyboardType='numeric'
                                onChangeText={(height) => this.onChangedHeight(height)}
                                value={this.state.myHeightNumber}
                                maxLength={8}  //limit for number of integers
                                underlineColorAndroid="transparent" />
                        </View>

                        <View style={styles.SectionStyleIntegers}>
                            <Image source={require('../assets/images/profileWeight.png')} style={styles.ImageStyle} />
                            <TextInput // input field for weight
                                style={styles.integerInput}
                                placeholder="Weight"
                                keyboardType='numeric'
                                onChangeText={(weight) => this.onChangedWeight(weight)}
                                value={this.state.myWeightNumber}
                                maxLength={8}  //limit for number of integers
                                underlineColorAndroid="transparent" />
                        </View>
                        {/*  </ImageBackground> */}
                    </View>

                    <View style={styles.GrayContent}>
                        <View style={styles.SectionStyleUserInfo}>
                            <Image source={require('../assets/images/profileEmail.png')} style={styles.ImageStyle} />
                            <TextInput style={styles.userInfo} // input field for e-mail
                                placeholder="E-mail"
                                onChangeText={(email => this.setState({ email }))}
                                keyboardType="email-address"
                                underlineColorAndroid="transparent" />
                        </View>
                        <View style={styles.SectionStyleUserInfo}>
                            <Image source={require('../assets/images/profileTown.png')} style={styles.ImageStyle} />
                            <TextInput style={styles.userInfo} // input field for town
                                placeholder="Town"
                                onChangeText={(town => this.setState({ town }))}
                                underlineColorAndroid="transparent" />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

// styling
const styles = StyleSheet.create({

    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "#4d4d4d",
        marginBottom: 20,
    },

    avatarImage: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    GrayContent: {
        width: 375,
        flex: 1,
        padding: 10,
    },

    headBackground: {
        backgroundColor: '#B0E0E6',
        width: 375,
        flex: 1,
        padding: 10,
        borderBottomWidth: 2,
    },

    headerText: {
        fontSize: 30,
        fontWeight: '700',
        textAlign: 'center',
        padding: 15,
        color: "#4d4d4d",
    },

    ImageStyle: {
        marginRight: 15,
        height: 35,
        width: 35,
        resizeMode: 'stretch',
    },

    integerInput: {
        flex: 1,
        fontSize: 15,
        color: "#778899",
        fontWeight: '600',
        borderBottomWidth: 1,
        borderColor: '#69868a',
    },

    name: {
        flex: 1,
        fontSize: 20,
        color: "#4d4d4d",
        fontWeight: '700',
        borderBottomWidth: 2,
        borderColor: '#587073',
    },

    userInfo: {
        fontSize: 14,
        color: "#778899",
        fontWeight: '600',
        flex: 1,
        borderBottomWidth: .5,
        borderColor: '#8D8D8D',
    },

    /* ImageBackground: {
         width: 375,
         flex: 1,
         alignItems: 'center',
         padding: 10,
         borderBottomWidth: 2,
     },*/

    SectionStyleIntegers: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
        width: 125,
    },

    SectionStyleName: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
        width: 300,
    },

    SectionStyleUserInfo: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
        width: 250,
    },

});

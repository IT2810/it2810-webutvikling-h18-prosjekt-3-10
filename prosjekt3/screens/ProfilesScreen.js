import React, { Component } from 'react';
import { Avatar } from 'react-native-elements';
import {
    StyleSheet,
    View,
    Image,
    TextInput,
    ScrollView,
    AsyncStorage,
    TouchableHighlight,
    Text,
    ImageBackground,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import Colors from '../constants/Colors'

export default class UserProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = { // inital sate for input fields
            name: '',
            email: '',
            town: '',
            myHeightNumber: '',
            myWeightNumber: '',
            modalVisible: false,
            navBarHeight: (Platform.OS === 'ios') ? 10 : -90,
        };
    }
    static navigationOptions = {
        header: null,
    };

    // When the screen is first loaded, retrieve the saved profile data
    componentDidMount = () => {
        this.retrieveData()
    }

    // Retrieves profile data from AsyncStorage
    retrieveData = async () => {
        try {
            const result = await AsyncStorage.getItem('profile')
            if (result !== null) {
                const data = JSON.parse(result)
                this.setState({
                    name: data.name,
                    email: data.email,
                    town: data.town,
                    myHeightNumber: data.myHeightNumber,
                    myWeightNumber: data.myWeightNumber,
                })
            }
        }
        catch (error) {
            alert('Error retrieving data')
            console.error("Error retrieving profile data from AsyncStorage")
        }
    }

    // Method that restricts input from user to only contain integers
    // Also adds cm to the height-string
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

    // Method that restricts input from user to only contain integers
    // Also adds kg to the weight string
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

    // Saves the profile to AsyncStorage
    saveState = async () => {
        const data = this.state;
        try {
            await AsyncStorage.setItem("profile", JSON.stringify(data))
        } catch (error) {
            alert('Error saving data')
            console.error("Error saving profile date to AsyncStorage")
        }
    }

    render() {
        let profilePicture = {
            uri: 'https://bootdey.com/img/Content/avatar/avatar4.png' // link to profile image/avatar
        }

        return (
            <KeyboardAvoidingView keyboardVerticalOffset={this.state.navBarHeight} behavior="position" enabled>
                <ScrollView style={styles.container}>

                    <ImageBackground source={require('../assets/images/profileBackground3.jpg')} style={styles.backgroundImage}>
                        <View style={styles.headBackground}>
                            <View style={styles.centerContent}>
                                <Avatar avatarStyle={styles.avatar}// using react native elements - external libary
                                    xlarge
                                    rounded
                                    source={profilePicture}
                                    activeOpacity={0.7}
                                />
                            </View>

                            <View>
                                <TextInput style={[styles.name, styles.centerContent]} // input field for name
                                    placeholder="Enter name"
                                    placeholderTextColor="#4f545b"
                                    value={this.state.name}
                                    onChangeText={(name => this.setState({ name }))}
                                    underlineColorAndroid="transparent" />
                            </View>
                        </View>
                    </ImageBackground>

                    <View style={styles.GrayContent}>

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
                        <View style={styles.SectionStyleUserInfoTown}>
                            <Image source={require('../assets/images/profileTown.png')} style={styles.ImageStyle} />
                            <TextInput style={styles.userInfo} // input field for town
                                placeholder="Town"
                                value={this.state.town}
                                onChangeText={(town => this.setState({ town }))}
                                underlineColorAndroid="transparent" />
                        </View>
                        <View style={styles.SectionStyleUserInfoEmail}>
                            <Image source={require('../assets/images/profileEmail.png')} style={styles.ImageStyle} />
                            <TextInput style={styles.userInfo} // input field for e-mail
                                placeholder="E-mail"
                                onChangeText={(email => this.setState({ email }))}
                                value={this.state.email}
                                keyboardType="email-address"
                                underlineColorAndroid="transparent" />
                        </View>
                    </View>

                    {/*  Save  button */}
                    <View style={styles.centerContent}>
                        <View style={styles.saveButton}>
                            <TouchableHighlight
                                onPress={this.saveState} >
                                <View style={styles.eventIconText}>
                                    <Text style={styles.saveText}>Save</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>

                </ScrollView >
            </KeyboardAvoidingView>
        );
    }
}

// styling
const styles = StyleSheet.create({

    avatar: {
        borderWidth: 2,
        borderColor: "#4d4d4d"
    },

    backgroundImage: {
        flex: 1,
    },

    centerContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    GrayContent: {
        flex: 1,
        padding: 10,
    },

    headBackground: {
      flex: 1,
      borderBottomWidth: 2,
      marginTop: 14,
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
        fontSize: 20,
        color: "#4d4d4d",
        fontWeight: '700',
        margin: 15,
        textAlign: "center"
    },

    userInfo: {
        fontSize: 14,
        color: "#778899",
        fontWeight: '600',
        flex: 1,
        borderBottomWidth: .5,
        borderColor: '#8D8D8D',
    },

    saveButton: {
        margin: 10,
        backgroundColor: Colors.btnBlue,
        borderWidth: 0,
        borderRadius: 5,
        width: 200,
    },

    saveText: {
        fontSize: 16,
        color: "#ffffff",
        justifyContent: 'center',
        textAlign: 'center',
        margin: 15,
    },

    SectionStyleIntegers: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
        width: 125,
    },

    SectionStyleUserInfoEmail: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
        width: 320,
    },

    SectionStyleUserInfoTown: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
        width: 250,
    },

});

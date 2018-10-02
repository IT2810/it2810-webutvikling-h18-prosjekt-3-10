import React, { Component } from 'react';
import { Avatar, Button } from 'react-native-elements';
import {
    StyleSheet,
    View,
    Image,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    AsyncStorage,
} from 'react-native';

export default class UserProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = { // inital sate for input fields
            name: '',
            email: '',
            town: '',
            myHeightNumber: '',
            myWeightNumber: '',
        };
    }
    static navigationOptions = {
        title: "Profile",
        headerStyle: { // styling the header
            backgroundColor: '#69868a',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    // loading saved profile info
    componentDidMount = () => {
        this.retrieveData()
    }


    // retrieves stored profile info
    retrieveData = async () => {
        try {
            const result = await AsyncStorage.getItem('profile')
            const data = JSON.parse(result)
            this.setState({
                name: data.name,
                email: data.email,
                town: data.town,
                myHeightNumber: data.myHeightNumber,
                myWeightNumber: data.myWeightNumber,
            })
        }
        catch (error) {
            alert('Error retrieving data')
        }
    }

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
    // saving profile info
    saveState = async () => {
        const data = this.state;
        try {
            await AsyncStorage.setItem("profile", JSON.stringify(data))
        } catch (error) {
            alert('Error saving data')
        }
    }

    render() {
        let profilePicture = {
            uri: 'https://bootdey.com/img/Content/avatar/avatar4.png' // link to profile image/avatar
        }

        return (
            <KeyboardAvoidingView behavior="position" enabled>
                <ScrollView>

                    <View style={styles.headBackground}>
                        <View style={styles.centerContent}>
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
                                value={this.state.name}
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
                    </View>

                    <View style={styles.GrayContent}>
                        <View style={styles.SectionStyleUserInfo}>
                            <Image source={require('../assets/images/profileEmail.png')} style={styles.ImageStyle} />
                            <TextInput style={styles.userInfo} // input field for e-mail
                                placeholder="E-mail"
                                onChangeText={(email => this.setState({ email }))}
                                value={this.state.email}
                                keyboardType="email-address"
                                underlineColorAndroid="transparent" />
                        </View>
                        <View style={styles.SectionStyleUserInfo}>
                            <Image source={require('../assets/images/profileTown.png')} style={styles.ImageStyle} />
                            <TextInput style={styles.userInfo} // input field for town
                                placeholder="Town"
                                value={this.state.town}
                                onChangeText={(town => this.setState({ town }))}
                                underlineColorAndroid="transparent" />
                        </View>
                    </View>
                    <View style={styles.centerContent}>
                        <Button buttonStyle={styles.saveButton}
                            title='SAVE'
                            onPress={this.saveState} />
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

// styling
const styles = StyleSheet.create({

    centerContent: {
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
        padding: 10,
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

    saveButton: {
        margin: 10,
        backgroundColor: "#129919",
        borderWidth: 0,
        borderRadius: 5,
        width: 200,
    },

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

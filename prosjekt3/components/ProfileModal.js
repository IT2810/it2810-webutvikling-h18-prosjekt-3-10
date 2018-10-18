import React from 'react';
import {
    StyleSheet,
    View,
    Modal,
    TouchableHighlight,
    KeyboardAvoidingView,
} from 'react-native';
import { Icon, } from 'react-native-elements';
import ProfileScreen from '../screens/ProfilesScreen';

export default class ProfileModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    ProfileMod = () => {
        return (
            <View>

                {/* the modal for profile*/}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    presentationStyle="formSheet"
                    onRequestClose={() => { // required on android, making it posible to use hardware back-button
                        this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <View >
                        {/* get return screen */}
                        <ProfileScreen />

                        <TouchableHighlight style={styles.closeModalButton}
                            underlayColor={'transparent'}
                            onPress={() => { // closing modal when close-button is pressed
                                this.setModalVisible(!this.state.modalVisible);
                            }}>
                            {/* home button in profile screen */}
                            <Icon
                                reverse
                                type='font-awesome'
                                name='home'
                                color="#cc0000"
                                size={30}
                            />
                        </TouchableHighlight>
                    </View>
                </Modal>

                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => { // opens modal when profile-object is pressed
                        this.setModalVisible(true);
                    }}>
                    <View>
                        {/* profile button on home screen */}
                        <Icon style={styles.modalProfile}
                            reverse
                            type='font-awesome'
                            name='user'
                            color='#5F7C80'
                            size={40}
                        />
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
    render() {
        return (
            <View>
                {this.ProfileMod()}
            </View>
        )
    }
}

const styles = StyleSheet.create({

    closeModalButton: {
        position: 'absolute',
        top: "50%",
        right: 2,
    },

    modalProfile: {
        position: 'absolute',
        bottom: 3,
    },
})
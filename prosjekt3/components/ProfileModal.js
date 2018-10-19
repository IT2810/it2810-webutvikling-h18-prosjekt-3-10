import React from 'react';
import {
    StyleSheet,
    View,
    Modal,
    TouchableHighlight,
    Platform,
    SafeAreaView
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import ProfileScreen from '../screens/ProfilesScreen';
import Colors from '../constants/Colors'

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
                {/* the modal for profile */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    presentationStyle="formSheet"
                    onRequestClose={() => { // required on android, making it posible to use hardware back-button
                        this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <SafeAreaView style={styles.safeArea}>
                      <Header
                          outerContainerStyles={styles.headerOuterContainer}
                          innerContainerStyles={styles.headerInnerContainer}
                          rightComponent={{
                              size: 32,
                              icon: 'home',
                              color: Colors.btnBlue,
                              onPress: () => { this.setModalVisible(!this.state.modalVisible) }
                          }}
                          centerComponent={{
                              text: 'profile',
                              style: styles.header,
                          }}
                          backgroundColor={Colors.headerBackground}
                      />

                      <View >
                          {/* get return screen */}
                          <ProfileScreen />
                      </View>
                    </SafeAreaView>
                </Modal>

                <View style={styles.profileBtnContainer}>
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
                            color='#2f95dc'
                            size={40}
                        />
                    </View>
                </TouchableHighlight>
                </View>
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
    safeArea: {
      flex: 1,
      backgroundColor: '#fff',
    },
    profileBtnContainer: {
      flex: 1,
    },
    headerOuterContainer: {
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },
    header: {
        color: 'black',
        fontSize: 20,
        fontWeight: '600',
        fontVariant: ['small-caps'],
    },

})

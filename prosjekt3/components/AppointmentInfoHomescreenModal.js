import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    TouchableHighlight,
    ImageBackground,

} from 'react-native';
import { Button, Icon, } from 'react-native-elements';
import PedometerHomescreen from '../components/PedometerHomescreen';
import TodoHomescreen from '../components/TodoHomescreen';


export default class AppointmentModalHomescreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }



    AppointmentModal = () => {
        return (
            <View style={styles.events}>

                {/* the modal for upcoming events*/}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    presentationStyle="formSheet"
                    onRequestClose={() => { // required on android, making it posible to use hardware back-button
                        this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <View style={styles.centerContent}>
                        <Text>{"appointment info here"}</Text>

                        <TouchableHighlight style={styles.closeModalButton}
                            onPress={() => { // closing modal when close-button is pressed
                                this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <Text style={styles.closeModalButtonText}>Close</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>
                <TouchableHighlight
                    onPress={() => { // opens modal when event-object is pressed
                        this.setModalVisible(true);
                    }}>
                    <View style={styles.eventIconText}>
                        <Icon
                            reverse
                            name='event'
                            color='#5F7C80'
                        />
                        <Text style={styles.eventText}>Upcoming Event: {'TBA'}</Text>
                    </View>
                </TouchableHighlight>
            </View>

        )
    }

    render() {
        return (
            <View>
                {this.AppointmentModal()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    events: {
        backgroundColor: '#5F7C80',
        borderWidth: 0,
        width: "95%",
        height: 75,
        borderRadius: 10,
        borderWidth: 0,
        margin: 8,
        marginTop: 40,

    },

    eventIconText: {
        flexDirection: 'row',
    },

    eventText: {
        fontSize: 18,
        color: "#ffffff",
        height: 75,
        justifyContent: 'center',
        margin: 20,
        marginLeft: 0,
    },
    centerContent: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff'
    },

    closeModalButton: {
        margin: 10,
        backgroundColor: "#cc0000",
        borderWidth: 0,
        borderRadius: 5,
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
    },

    closeModalButtonText: {
        fontSize: 18,
        color: "#ffffff",

    },
})
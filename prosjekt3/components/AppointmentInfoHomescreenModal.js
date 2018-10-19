import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    TouchableHighlight,
    AsyncStorage,
    SafeAreaView,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { Agenda } from 'react-native-calendars';
import Colors from '../constants/Colors'

export default class AppointmentModalHomescreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            date: '',
            time: '',
            items: {},
            _mounted: false,
        };
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    // mounting data from calendar
    componentDidMount = () => {
        this.retrieveData()
        this._mounted = true
    }

    // updating data from calendar in the same session
    componentDidUpdate = () => {
        this.retrieveData()
    }

    // canceling subscription on asynchronous  tasks
    componentWillUnmount = () => {
        this._mounted = false

    }

    myAgenda = () => {
        return (
            <Agenda
                items={this.state.items}
                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                rowHasChanged={this.rowHasChanged.bind(this)}
                hideKnob={true}
            />
        )
    }

    // retrieving information from calendar
    retrieveData = async () => {
        try {
            const getAgenda = await AsyncStorage.getItem('Agenda');
            const agenda = JSON.parse(getAgenda);
            if (agenda != null && this._mounted) {
                this.setState({
                    items: agenda,
                });
            }
            else {
                this.setState({
                    items: {},
                })
            }
        }
        catch (error) {
            alert('Error retrieving data')
        }
    }

    // renders the agenda item
    renderItem(item) {
        return (
            <View
                style={[styles.item, { height: item.height }]}>
                <Text style={styles.itemTime}> {item.time} </Text>
                <Text style={styles.itemName}> {item.name} </Text>
            </View>
        );
    }

    // renders the text for a day with no agenda
    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}>
                <Text style={{ color: '#bbb' }}>Nothing to do today</Text>
                <Text style={{ color: '#bbb', fontSize: 12 }}>Add something in Calendar</Text>
            </View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }

    // the modal content
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
                    <SafeAreaView style={styles.safeArea}>
                    <Header
                        outerContainerStyles={styles.headerOuterContainer}
                        centerComponent={{
                            text: 'Agenda',
                            style: styles.header,
                        }}
                        backgroundColor={Colors.headerBackground}

                    />
                    <View style={styles.centerContent}>
                        <View style={styles.agendaContent}>
                            {this.myAgenda()}
                        </View>

                        <TouchableHighlight style={styles.closeModalButton}
                            onPress={() => { // closing modal when close-button is pressed
                                this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <Text style={styles.closeModalButtonText}>Close</Text>
                        </TouchableHighlight>
                    </View>
                    </SafeAreaView>
                </Modal>

                {/* The button for accessing modal content */}
                <View style={styles.agendaBtnContainer}>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => { // opens modal when event-object is pressed
                        this.setModalVisible(true);
                    }}>
                    <View style={styles.eventIconText}>
                        <Icon
                            reverse
                            name='event'
                            color='#2f95dc'
                        />
                        <Text style={styles.eventText}>Upcoming Events  </Text>
                    </View>
                </TouchableHighlight>
                </View>
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
    safeArea: {
      flex: 1,
      backgroundColor: '#fff',
    },
    agendaBtnContainer: {
      flex: 1,
    },
    agendaContent: {
        width: "100%",
        flex: 1,
    },

    item: {
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 5,
      marginRight: 10,
      marginTop: 30,
      marginBottom: -12,
      padding: 10,
    },

    emptyDate: {
      height: 15,
      flex: 1,
      paddingTop: 40
    },

    itemTime: {
        fontSize: 12,
        color: '#666666',
    },

    itemName: {
        fontSize: 16,
    },

    events: {
        backgroundColor: Colors.btnBlue,
        borderWidth: 0,
        height: 75,
        borderRadius: 10,
        margin: 10,
        marginLeft: 20,
        marginRight: -30,
        width: '80%'
    },

    eventIconText: {
        flexDirection: 'row',
        width: '80%'
    },

    eventText: {
        fontSize: 16,
        color: "#ffffff",
        height: 75,
        margin: 20,
        marginLeft: 0,
        marginRight: 0,
        width: '80%'
    },
    centerContent: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: Colors.backgroundColor,
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
    },

    closeModalButtonText: {
        fontSize: 18,
        color: "#ffffff",
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

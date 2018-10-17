import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    TouchableHighlight,
    AsyncStorage,
    TouchableOpacity,

} from 'react-native';
import { Icon, } from 'react-native-elements';
import { Agenda } from 'react-native-calendars';
import Colors from '../constants/Colors'



export default class AppointmentModalHomescreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            addModalVisible: false,
            updateModalVisible: false,
            inputValue: '',
            date: '',
            time: '',
            items: {},
            selectedItem: {},
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    componentDidMount = () => {
        this.retrieveData()
    }

    componentDidUpdate = () => {
        this.retrieveData()
    }

    myAgenda = () => {
        return (
            <Agenda
                items={this.state.items}
                loadItemsForMonth={this.loadItems.bind(this)}
                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                rowHasChanged={this.rowHasChanged.bind(this)}
                theme={{
                    agendaKnobColor: '#2f95dc'
                }}
            />
        )
    }


    retrieveData = async () => {
        try {
            const getAgenda = await AsyncStorage.getItem('Agenda');
            const agenda = JSON.parse(getAgenda);
            if (agenda != null) {
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
            throw error
            alert('Error retrieving data')
        }
    }

    loadItems(day) {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + (i * 24 * 60 * 60 * 1000);
                const strTime = this.timeToString(time);
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                }
            }
            const newItems = {};
            Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
            this.setState({
                items: newItems
            });
        }, 1000);
        // https://github.com/wix/react-native-calendars/blob/master/example/src/screens/agenda.js
    }

    renderItem(item) {
        return (
            <View
                style={[styles.item, { height: item.height }]}
            >
                <Text style={styles.itemTime}> {item.time} </Text>
                <Text style={styles.itemName}> {item.name} </Text>
            </View>
        );
    }

    isSelected = (item) => {
        this.setState(() => ({
            selectedItem: item,
        }));
        this.setUpdateModalVisibility();
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}>
                <Text style={{ color: '#bbb' }}>Nothing to do today</Text>
            </View>
        );
    }

    selectedEmptyDate = () => {

    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }

    handleTextChange = (value) => {
        this.setState(() => ({
            inputValue: value,
        }));
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
                        <View style={{ height: 800, width: "100%" }}>
                            {this.myAgenda()}
                        </View>
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
                        <Text style={styles.eventText}>Upcoming Events  </Text>


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

    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    },
    itemTime: {
        fontSize: 12,
        color: '#666666',
    },
    itemName: {
        fontSize: 16,
    },
    addBtn: {
        backgroundColor: '#2f95dc',
    },
    deleteBtn: {
        backgroundColor: '#2f95dc',
        marginTop: 8,
    },
    modal: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: Colors.backgroundColor,
    },
    inputForm: {
        width: 400,
        backgroundColor: '#fff',
        height: 50,
        marginTop: 40,
        marginBottom: 12,
        textAlign: 'center',
    },
    modalDatePicker: {
        width: 320,
        marginLeft: 12,
    },
    modalTimePicker: {
        width: 320,
        marginLeft: 12,
        marginBottom: 8,
    },





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
        //flex: 1,
        //flexDirection: 'column',
        //justifyContent: 'space-between',
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
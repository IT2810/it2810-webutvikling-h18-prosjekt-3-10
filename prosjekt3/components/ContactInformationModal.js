import React from 'react';

import {
    Modal,
    View,
    StyleSheet,
} from 'react-native'

import {
    Avatar,
    Header,
    Text,
} from 'react-native-elements'

const contactModal = ({ contact = {}, visible, closeCallback }) => {
    return (
    <Modal
        animationType="fade"
        transparent={false}
        visible={visible}
        onRequestClose={closeCallback}>
        <View style={styles.modalContent}>
            <Header
            outerContainerStyles={styles.header}
            innerContainerStyles={{alignItems: 'center'}}
            leftComponent={{ icon: 'keyboard-arrow-down', color: '#fff', size: 32, onPress: closeCallback }}
            />
            <Avatar
                containerStyle={styles.avatar}
                xlarge
                rounded
                source={contact.imageAvailable ? {uri: contact.image.uri} : require('../assets/images/profile.png')}
            />
            <View style={styles.textWithLabel}>
                <Text h4 style={styles.lightText}>Name</Text>
                <Text h3>{`${contact.firstName} ${contact.lastName}`}</Text>
            </View>
            <View style={styles.textWithLabel}>
                <Text h4 style={styles.lightText}>Number</Text>
                <Text h3>{contact.phoneNumbers && contact.phoneNumbers[0].number}</Text>
            </View>
        </View>
    </Modal>
    )
} 

const styles = StyleSheet.create({
    modalContent: {
        alignItems: "center",
    },
    header: {
        width: "100%",
    },
    avatar: {
        margin: 10,
        marginBottom: 40,
    },
    textWithLabel: {
        width: "80%",
        marginBottom: 20,
    },
    lightText: {
        color: "#696969"
    }
})

export default contactModal
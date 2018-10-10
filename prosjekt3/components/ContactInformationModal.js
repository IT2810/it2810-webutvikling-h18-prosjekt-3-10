import React from 'react';

import {
    Modal,
    View,
    Text,
    StyleSheet,
} from 'react-native'

import {
    Avatar,
    Header,
} from 'react-native-elements'

const contactModal = ({ contact = {}, visible, closeCallback }) => {
    return (
    <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={closeCallback}>
        <Header
        innerContainerStyles={{alignItems: 'center'}}
        leftComponent={{ icon: 'keyboard-arrow-down', color: '#fff', size: 32, onPress: closeCallback }}
        />
        <View style={styles.modalContent}>
        <Avatar
            avatarStyle={styles.avatar}
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
    centerContent: {
        width: '100%',
    }
})

export default contactModal
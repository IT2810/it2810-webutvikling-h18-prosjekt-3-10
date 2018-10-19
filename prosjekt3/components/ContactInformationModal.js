import React from 'react';
import Colors from '../constants/Colors'

import {
    Modal,
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from 'react-native'

import {
    Avatar,
    Header,
    Text,
} from 'react-native-elements'

const contactModal = ({ contact = {}, visible, closeCallback, onDelete }) => {
    return (
    <Modal
        animationType="fade"
        transparent={false}
        visible={visible}
        onRequestClose={closeCallback}>

        <SafeAreaView style={styles.safeArea}>
          <Header
            outerContainerStyles={styles.headerOuterContainer}
            leftComponent={{
              size: 28,
              icon: 'delete',
              color: Colors.btnRed,
              onPress: () => { onDelete(contact) }
            }}
            rightComponent={{
              size: 28,
              icon: 'close',
              color: 'black',
              style: styles.headerBtn,
              onPress: closeCallback
            }}
            centerComponent={{
              text: 'contact info:',
              style: styles.header,
            }}
            backgroundColor={Colors.headerBackground}
          />
          <View style={styles.modalContent}>
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
        </SafeAreaView>
    </Modal>
    )
}

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#fff'
    },
    headerOuterContainer: {
      borderBottomWidth: 1,
      borderBottomColor: '#999',
    },
    header: {
      color: 'black',
      fontSize: 20,
      fontWeight: '600',
      fontVariant: ['small-caps'],
    },
    modalContent: {
        alignItems: "center",
    },
    avatar: {
        marginTop: 30,
        margin: 10,
        marginBottom: 30,
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

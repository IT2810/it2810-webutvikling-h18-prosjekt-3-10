import React from 'react';

import {
    View,
    StyleSheet,
    Alert,
    FlatList,
    Button,
    Image,
    ScrollView,
} from 'react-native'

import {
    List,
    ListItem,
    Text,
} from 'react-native-elements';

const ContactsList = ({
  addedContacts = [],
  importedContacts = [],
  handleContactPress,
  handleDelete,
  importContacts,
  addContact }) => {

    // Helperfunction that places all items from array into a flatlist
    const listContacts = contacts => {
        return (
            <List>
                <FlatList
                data={contacts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ListItem
                        containerStyle={styles.listItem}
                        roundAvatar
                        title={`${item.firstName} ${item.lastName}`}
                        avatar={item.imageAvailable ? {uri: item.image.uri} : require('../assets/images/profile.png')}
                        onPress={() => handleContactPress(item)}
                        // Only imported contacts has a lookupKey, so that's an easy way to check which type the contact is
                        onLongPress={item.lookupKey ? () => Alert.alert("Can't do anything with phone contact") : () => handleDelete(item)}
                    />
                )}
                />
            </List>
        )
    }

    const hasContacts = importedContacts.length || addedContacts.length;
    if (hasContacts) {
        return (
            <View style={styles.contactsContainer}>
                <View style={styles.contactsHeader}>
                    <Text style={styles.contactsHeaderTxt}>Added contacts</Text>
                </View>
                <ScrollView keyboardShouldPersistTaps='handled'>
                {listContacts(addedContacts)}
                </ScrollView>
                {/*
                  // Kommentert ut fordi vi ikke har tid til å finne løsning til treghetsproblem
                <View style={styles.contactsHeader}>
                    <Text h4>Imported contacts</Text>
                    {
                        importedContacts.length == 0 && <Button title="Import" onPress={importContacts}/>
                    }
                </View>
                {listContacts(importedContacts)}
                */}
            </View>
        )
    } else {
        // Show an empty contact list
        return(
            <View style={styles.mainContainer}>
                <Image
                source={
                    require('../assets/images/alone.gif')
                }
                style={styles.lonelyImage}
                />

                <View style={styles.ontainer}>
                    <Text style={styles.text}>It looks like your contacts list is empty.</Text>
                    <Text style={styles.text}>Try to add some in the top right corner!</Text>

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: "center",
    },
    contactsHeader: {
        padding: 20,
        paddingBottom: 0,
    },
    buttonContainer: {
        margin: 10,
    },
    lonelyImage: {
        width: 400,
        height: 200,
        marginBottom: 50,
    },
    contactsHeaderTxt: {
      fontSize: 20,
    }
})

export default ContactsList

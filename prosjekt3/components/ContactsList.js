import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Alert,
    FlatList,
    Button,
    Image
} from 'react-native'

import {
    List,
    ListItem,
} from 'react-native-elements';

const ContactsList = ({ addedContacts = [], importedContacts = [], handleContactPress, handleDelete, importContacts, addContact }) => {

    // Helperfunction that places all items from array into a flatlist
    const listContacts = contacts => {
        return (
            <List>
                <FlatList
                    data={contacts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ListItem
                            containerStyle={{ padding: 20 }}
                            roundAvatar
                            title={`${item.firstName} ${item.lastName}`}
                            avatar={item.imageAvailable ? { uri: item.image.uri } : require('../assets/images/profile.png')}
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
                    <Text h4>Added contacts:</Text>
                    <Button title="Add Contact" onPress={addContact} />
                </View>
                {listContacts(addedContacts)}
                <View style={styles.contactsHeader}>
                    <Text h4>Imported contacts:</Text>
                    {
                        importedContacts.length == 0 && <Button title="Import" onPress={importContacts} />
                    }
                </View>
                {listContacts(importedContacts)}
            </View>
        )
    } else {
        // Show an empty contact list
        return (
            <View style={[styles.welcomeContainer, { alignItems: "center" }]}>
                <Image
                    source={
                        require('../assets/images/alone.gif')
                    }
                    style={styles.welcomeImage}
                />

                <View style={styles.getStartedContainer}>
                    <Text style={styles.getStartedText}>It looks like your contacts list is empty.</Text>
                    <View style={styles.buttonContainer}>
                        <Button title="Import from phone" onPress={importContacts} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Add Contact" onPress={addContact} />
                    </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    centerContent: {
        width: '100%',
    }
})

export default ContactsList

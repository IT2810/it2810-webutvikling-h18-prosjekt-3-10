import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
} from 'react-native';

const Loading = () => {
    return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image
                source={
                    require('../assets/images/loading.gif')
                }
                style={styles.welcomeImage}
            />
            <View style={styles.getStartedContainer}>
                <Text style={styles.getStartedText}>Loading...</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    centerContent: {
        width: '100%',
    }
})

export default Loading;
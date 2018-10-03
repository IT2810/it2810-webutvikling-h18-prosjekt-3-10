import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,

} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressCircle from 'react-native-progress-circle';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home",
    headerStyle: { // styling the header
      backgroundColor: '#69868a',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <ScrollView style={styles.viewContent}>


        <View style={styles.centerContent}>
          <View style={styles.progressCircle}>

            <ProgressCircle
              percent={70}
              radius={70}
              borderWidth={15}
              color='#e68a00'
              shadowColor="#ffffff"
              bgColor="#333333"
            >
              <Text style={styles.progressCircleText}>{'70%'}</Text>
            </ProgressCircle>
          </View>



          <View style={styles.profileButtonPosition}>
            <Button buttonStyle={styles.profileButton}
              icon={{
                name: 'user',
                type: 'font-awesome',
                size: 30
              }}
              title=" PROFILE"

              onPress={() => this.props.navigation.navigate('Profile')} />
          </View>
        </View>



      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },



  profileButton: {
    margin: 10,
    backgroundColor: '#517fa4',
    borderWidth: 0,
    width: 150,
    height: 75,
    borderRadius: 50,
  },

  /* profileButtonPosition: {
     position: 'absolute',
     bottom: 0,
   },*/

  progressCircle: {
    margin: 50,
  },

  progressCircleText: {
    fontSize: 18,
    color: "#ffffff"

  },


  viewContent: {
    backgroundColor: '#ffffff'
  }

});
import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Button } from 'react-native-elements';

export default class ProfileButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      todo: [],
      todayStepCount: 0,
      goal: '',
    }
  }

  homeButton = () => {
    return (
      <Button buttonStyle={styles.profileButton}
        icon={{
          name: 'user',
          type: 'font-awesome',
          size: 30
        }}
        title=" PROFILE"
        onPress={() => this.props.navigation.navigate('Profile')} />
    )
  }

  render() {
    return (
      <View>
        {this.homeButton()}
      </View>
    )
  }

}

const styles = StyleSheet.create({

  profileButton: {
    backgroundColor: '#517fa4',
    borderWidth: 0,
    borderRadius: 10,
    height: 75,
  },

})

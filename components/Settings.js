/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { white, red, orange } from "../utils/colors";
import ActionButton from "./ActionButton";
import { AsyncStorage } from 'react-native'
import { clearAsyncStorage } from '../utils/api';



sendClearAsyncStorage = () => {
  clearAsyncStorage();
}


export default class Settings extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Do you want to clear AsyncStorage? </Text>
        <ActionButton styles={styles} text={"Clear AsyncStorage"} color={red} onPress={this.sendClearAsyncStorage}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  submitBtnText:{
    color:white,
    fontSize:22,
    textAlign:'center',
  },
  title:{
    fontSize:30,
    color: '#333',
  },
  submitBtn:{
    borderWidth:0.5,
    borderColor:'#d6d7da',
    padding:10,
    backgroundColor: orange,
    borderRadius:7,
    overflow:'hidden',
  },
  iosBtn:{
    padding:10,
    borderRadius:7,
    height:45,
    margin:5,
    width:220
  },
});

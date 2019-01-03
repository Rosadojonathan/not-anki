/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import {orange, white,green } from '../utils/colors';
import { TODAY } from '../utils/api';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import SubmitButton from './SubmitButton';
import DB from '../utils/db';



class AddCard extends Component {
  state = {
    db: new DB('jonathanrosado'),
    recto:'',
    verso:'',
    correctAnswer:'',
  }

  submitCard = (deck) => {
    const { recto, verso } = this.state;

      if(recto && verso){

        this.state.db.addCardToDeck(deck,{recto,verso}).then(
          (value) => {
            console.log('card added :')
            console.log(value)
            let dueDate = TODAY
            let { recto, verso, difficulty, interval, update, id} = value
            //waiting for the card obj to be returned by the api before dispatching the redux action creator
            this.props.dispatch(addCard({recto, verso, difficulty, interval, update, id, deck,dueDate}));
            this.setState({ recto:'',verso:''});
            this.props.navigation.dispatch(NavigationActions.back({key:null}));
          }
        )

      }

  }

  render() {
    const deckName = this.props.navigation.state.params.entryId;
    return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}> Front of Flashcard
        </Text>
        <TextInput style={styles.input}
                   onChangeText={(recto)=> this.setState({recto})}
                   value={this.state.recto}
          >
        </TextInput>

        <Text style={styles.title}>
          Back
        </Text>
        <TextInput
          style={styles.input}
                     onChangeText={(verso)=> this.setState({verso})}
                     value={this.state.verso}>
        </TextInput>


        <SubmitButton style={styles} onPress={()=> this.submitCard(deckName)} text={'Add Card'}/>


      </View>
    </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    top:-40
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
    backgroundColor: green,
    borderRadius:7,
    overflow:'hidden',
    marginTop:25
  },
  input:{
    width:250,
    height:40,
    padding:8,
    borderWidth:1,
    borderColor:'#757575',
    margin:20,
    borderRadius:7,
  }
});


export default connect()(AddCard)

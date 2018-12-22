/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { orange, white, purple,red, green,grey,deepGreen } from '../utils/colors';
import { SubmitButton } from './SubmitButton';
import { connect } from 'react-redux';
import ActionButton from './ActionButton';
import {Info} from './Info';
import { increaseCardDifficulty } from "../utils/api";
import { increaseDifficulty } from "../actions/index.js";

class Quiz extends Component {

  state = {
    questionNumber:0,
    showRecto:false,
    easy:0,
    hard:0,
  }

  showVerso = () => (
    !this.state.showRecto ? this.setState({showRecto:true})
    : this.setState({ showRecto:false})
  )

  submitAnswer = (answer,id) => {
    const { questionNumber } = this.state;
    const deck = this.props.navigation.state.params.entryId;
    const {decks } = this.props;
    // const easy = decks[deck].vocab[questionNumber].easyAnswer.toLowerCase()

    if(answer == 'easy' || answer == "very easy"){
      this.setState({
        easy: this.state.easy + 1
      })
    } else{
      this.setState({ hard: this.state.hard + 1 })
      increaseCardDifficulty(deck,id);
      console.log(`deck is ${deck}`)
      this.props.dispatch(increaseDifficulty(decks[deck],deck,decks[deck].vocab[questionNumber]));


    }
    this.setState({ questionNumber: this.state.questionNumber + 1, showRecto: false })
  }

  replayQuiz = () => {
    this.setState({
      questionNumber:0,
      showRecto:false,
      easy:0,
      hard:0,
    })
  }

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back({key:null}))
  }

  render() {
    const { decks } = this.props;
    console.log('logging props')
    console.log(this.props)
    const deck = this.props.navigation.state.params.entryId;
    const number = this.state.questionNumber + 1;
    const { questionNumber } = this.state;


    if(questionNumber === decks[deck].vocab.length){

      return (
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.mainText}>You got  {this.state.easy} vocab out of {decks[deck].vocab.length} vocab!</Text>
            {this.state.easy > this.state.hard ? <Text style={{fontSize:90}}>:D</Text>
            : <Text style={{fontSize:90}}> :'( </Text>}

            <View style={styles.line}>
              <ActionButton styles={styles} text={'Try Again ?'} color={red} onPress={this.replayQuiz } />
              <ActionButton styles={styles} text={'Back'} color={green} onPress={this.goBack} />
            </View>
          </View>
        </View>
      )
    }
    
    const { difficulty } = this.props.decks[deck].vocab[questionNumber]

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          {difficulty ? <Text>{difficulty}</Text> : null }

          <Text style={styles.question}>{number} / {decks[deck].vocab.length}</Text>

          {!this.state.showRecto ?   <Text style={styles.mainText}>{decks[deck].vocab[questionNumber].recto}</Text>
            :<Text style={styles.mainText}>{decks[deck].vocab[questionNumber].verso}</Text> }


          {!this.state.showRecto ? <Info style={styles.switch} text={'Show Verso'} onPress={this.showVerso}></Info>
            :  <Info style={styles.switch} text={'Show Recto'} onPress={this.showVerso}></Info>}

        <View style={styles.line}>
          <ActionButton color={red} styles={styles} text={'Hard'} onPress={() => this.submitAnswer('hard',decks[deck].vocab[questionNumber].id)} />
          <ActionButton color={green} styles={styles}  text={'Easy'} onPress={() => this.submitAnswer('easy',decks[deck].vocab[questionNumber].id)}/>
          <ActionButton color={deepGreen} styles={styles}  text={'Very Easy'} onPress={() => this.submitAnswer('very easy',decks[deck].vocab[questionNumber].id)}/>
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
  line:{
    flexDirection:'row'
  }
  ,
  iosBtn:{
    padding:10,
    borderRadius:7,
    height:55,
    margin:5,
    width:100
  },
  submitBtnText:{
    color:white,
    fontSize:26,
    textAlign:'center',
  },
  vocab:{
    top:0,
    alignSelf:'flex-start',
    left:0,

    fontSize:20,
    margin:5,
    position:'absolute'
  },
  answer:{
    fontSize:20,
    margin:20,
  },
  switch:{
    alignSelf:'stretch',
    fontSize:25,
    justifyContent:'center',
    textAlign:'center',
    padding:55,
  },
  card:{
    flex:1,
    justifyContent:'space-around',
    alignItems:'center',
    margin:10,
    backgroundColor:white,
    alignSelf:'stretch',
    borderRadius:10,
    shadowColor:'rgba(0,0,0,0.34)',
    shadowOffset:{width:0,height:3},
    shadowRadius:4,
    shadowOpacity:1,
  },
  mainText:{
    fontSize:40,
    marginTop:40,
    textAlign:'center',
  },

});

function mapStateToProps(decks){
  return {
    decks
  }
}

export default connect(mapStateToProps)(Quiz)

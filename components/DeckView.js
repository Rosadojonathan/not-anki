/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getData } from "../utils/api";
import { connect } from 'react-redux';
import ActionButton from './ActionButton';
import { purple, white, red, grey, green, deepBlue} from '../utils/colors';
import { getCardsLength, getCardsToReview, displayLearningSessionButton } from '../utils/helpers';


class DeckView extends Component {
  render() {
    const deck = this.props.navigation.state.params.entryId;
    const { decks } = this.props;
    const vocab = decks[deck].vocab

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.mainText}>{decks[deck].title}</Text>
          <Text style={styles.subText}>{vocab ? getCardsToReview(vocab) : null}</Text>

          <ActionButton
          styles={styles}
          text={'Add Card'}
          onPress={() => this.props.navigation.navigate('AddCard', {entryId:deck})}
          color={green}
          />

          {displayLearningSessionButton(vocab) === false  ?
            <ActionButton
            styles={styles}
            text={'No cards left'}
            color={grey}
            />          
          :
            <ActionButton
            styles={styles}
            text={'Learning Session'}
            onPress={() => this.props.navigation.navigate('Quiz', {entryId:deck})}
            color={deepBlue}
            />
          }


        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  iosBtn:{
    padding:10,
    borderRadius:7,
    height:45,
    margin:5,
    width:170,
    marginBottom:20,
  },
  submitBtnText:{
    color:white,
    fontSize:22,
    textAlign:'center',
    
  },
  card:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:10,
    backgroundColor:white,
    alignSelf:'stretch',
    borderRadius:10,
    shadowColor:'rgba(0,0,0,0.34)',
    shadowOffset:{
      width:0,
      height:3
    },
    shadowRadius:4,
    shadowOpacity:1,
  },
  mainText:{
    fontSize:40,
  },
  subText:{
    fontSize:30,
    marginBottom:160,
  }
});

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckView)

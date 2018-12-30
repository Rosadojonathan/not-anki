import React, { Component } from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import { saveDeckTitle } from "../utils/api";
import { addDeck } from "../actions";
import { connect } from 'react-redux';
import SubmitButton from './SubmitButton';
import { green,white } from '../utils/colors';
class AddDeck extends Component {
  state = {
    text: ""
  };

  submitName = () => {
    const { text } = this.state;
    if(text){
      saveDeckTitle(text);
      this.props.dispatch(addDeck(text));
      this.props.navigation.navigate("DeckView", {entryId: text});
      this.setState({text:''})
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the name of the new deck?</Text>
        <TextInput
          onChangeText={text => this.setState({ text: text })}
          value={this.state.text}
          style={styles.input}
        />
        <SubmitButton style={styles} onPress={(this.submitName)} text={"Add New Deck"} />
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
  input: {
    width:200,
    height:44,
    padding:8,
    borderWidth:1,
    borderColor:'#757575',
    margin:50,
    borderRadius:8
  },
  title:{
    fontSize:28,
    color:'#333',
    textAlign:'center',
    margin:'auto'
  },
  submitBtn:{
    borderWidth:0.5,
    borderColor:'#d6d7da',
    padding:10,
    backgroundColor: green,
    borderRadius:7,
    overflow:'hidden',
    height:45,
    width:170,

  },
  submitBtnText:{
    color:white,
    fontSize:22,
    textAlign:'center',
  },
});



export default connect()(AddDeck);

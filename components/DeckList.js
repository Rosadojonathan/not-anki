import React from 'react'
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native'
import { getData } from '../utils/api'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { orange, white,grey, deepBlue,green } from '../utils/colors'
import { getCardsLength } from '../utils/helpers';
import ActionButton from './ActionButton';

class DeckList extends React.Component {

	componentDidMount(){
		getDecks()
		.then(decks => this.props.receiveAllDecks(decks))
		.catch((error) => {
			console.error(error);
		})
	}

 reFetch = () => {
		getDecks()
		.then(decks => this.props.receiveAllDecks(decks))
		.catch((error) => {
			console.error(error);
		})
	}

	render(){
		const { decks } = this.props

		// const decks = getData()



		return(
			<ScrollView style={styles.container}>
				{Object.keys(decks).map((deck) => {
					const { title, vocab } = decks[deck]
					return (
						<View key={deck} style={styles.card}>
							<Text style={styles.cardText}>{title}</Text>
							<Text style={styles.cardText}>{vocab ? getCardsLength(vocab) : null}</Text>

							<ActionButton styles={styles}
									onPress={() => this.props.navigation.navigate('DeckView', {entryId: deck})}
									text={"View Deck"}
									color={deepBlue}
									/>

						</View>
					)
				})}
			<View style={styles.box}>
				<ActionButton color={green} styles={styles} text={'Refresh'}
					onPress={this.reFetch}
				/>
			</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignSelf: 'stretch',
		padding: 5

	},
	box:{
		justifyContent:'center',
		alignItems:'center'
	},
	card: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: grey,
		margin: 8,
		height: 200,
		borderRadius: 10,
		shadowColor: 'rgba(0,0,0,0.34)',
		 shadowOffset: {
		 	width: 0,
		 	height: 3,
		 },
		 shadowRadius: 4,
		 shadowOpacity: 1
	},
	cardText: {
		fontSize: 30,
		color: white
	},
	cardBtn: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	iosBtn:{
    padding:10,
    borderRadius:7,
    height:45,
    margin:5,
    width:180,
		justifyContent: 'center',
		alignItems: 'center'
  },
	submitBtnText:{
    color:white,
    fontSize:20,
    textAlign:'center',
  },

})


function mapStateToProps(decks){
	return {
		decks
	}
}

function mapDispatchToProps(dispatch){
	return {
		receiveAllDecks: (decks) => dispatch(receiveDecks(decks))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
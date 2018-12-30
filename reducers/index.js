import {
  ADD_DECK,
  GET_DECKS,
  RECEIVE_DECKS,
  ADD_CARD_TO_DECK,
  REMOVE_DECK,
  INCREASE_DIFFICULTY,
  SCHEDULE_SETTER
} from "../actions/index";

function deck(state = {}, action) {
  switch (action.type) {
    case ADD_DECK:
      const newDeck = {
        [action.deck]: {
          title: action.deck,
          vocab: []
        }
      };
      return {
        ...state,
        ...newDeck
      };
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_CARD_TO_DECK:
     {
      console.log('adding card to deck')
      let { recto, verso, difficulty, interval, update, id,deck,dueDate } = action.card;
      console.log(action)
      return {
        ...state,
        [deck]: {
          ...state[deck],
          vocab: [
            ...state[deck].vocab,
            { recto, verso, difficulty, interval, update, id, dueDate }
          ]
        }
      };
    }
    case INCREASE_DIFFICULTY:
    {
      console.log('increasing difficulty')

      let { card,decks,deck } = action.data;
      var idx = state[decks.title].vocab.findIndex(obj => obj.id === card.id)
      // console.log(`index is ${idx}`)
      // console.log(`action object is ${action}`)
      // console.log(action)
      // console.log('state object is :')
      // console.log(state)
      // console.log('deck is :')
      // console.log(deck)
      return {
        ...state,
        [decks.title]:{
          ...state[deck],
          vocab:[
            ...state[deck].vocab.slice(0,idx),
            {...state[deck].vocab[idx],
            difficulty: card.difficulty + 0.1
          },
          ...state[deck].vocab.slice(idx + 1)
          ]
        }
      };
    }
    case SCHEDULE_SETTER:
    {
      let {card, decks, deck, multiplier } = action.data;
      // console.log(state[decks.title])
      var idx = state[decks.title].vocab.findIndex(obj => obj.id === card.id)
      card.interval === 0 ? card.interval = 1 : card.interval = card.interval; // otherwise you get stuck at 0 for future multiplications
      nextInterval = card.interval * multiplier
      nextDueDate = card.dueDate + nextInterval;
      return {
        ...state,
        [decks.title]:{
          ...state[deck],
          vocab:[
            ...state[deck].vocab.slice(0,idx),
            {...state[deck].vocab[idx],
            interval: nextInterval,
            dueDate: nextDueDate
          },
          ...state[deck].vocab.slice(idx + 1)
          ]
        }
      };
    }
    default:
      return state;
  }
}

export default deck;

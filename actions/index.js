export const ADD_DECK = "ADD_DECK";
export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_CARD_TO_DECK = "ADD_CARD_TO_DECK";
export const INCREASE_DIFFICULTY = "INCREASE_DIFFICULTY";
export const SCHEDULE_SETTER = "SCHEDULE_SETTER";

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  };
}

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}

export function addCard(card) {
  return {
    type: ADD_CARD_TO_DECK,
    card
  };
}

export function increaseDifficulty(decks, deck,card){
  return {
    type: INCREASE_DIFFICULTY,
    data: {
      decks,
      deck,
      card
    }
  }
}

export function scheduleSetter(decks, deck,card,multiplier){
  return {
    type: SCHEDULE_SETTER,
    data: {
      decks,
      deck,
      card,
      multiplier
    }
  }
}
import { AsyncStorage } from 'react-native'
import {initialData} from './initialData';

const FLASHCARDS_STORAGE_KEY = 'flashcards: decks'
const DAY_IN_MINISECONDS = 24 * 60 * 60 * 1000;
const getDaysSinceEpoch = () => (
    Math.round(new Date().getTime() / DAY_IN_MINISECONDS)
);

export const TODAY = getDaysSinceEpoch();


export const getData = () => {
  return initialData
}


 export function getDecks () {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results => {
      if(results === null) {
        AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(initialData))
        return initialData
      }else {
        return JSON.parse(results)
      }
    })
  }


export function saveDeckTitle(title){
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
      [title]: {
        title: title,
        vocab: []
      }
    }))
  }

export function addCardToDeck(deckName, card){
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
  .then(results => JSON.parse(results))
  .then(results => {
    const { recto, verso } = card;
    const newCard = Object.assign({}, {recto:recto, verso:verso, difficulty:0.3,success:0, interval:1,dueDate:TODAY,id:results[deckName].vocab.length + 1})
    results[deckName].vocab.push(newCard)
    AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(results))
      return newCard
  })
}

export function increaseCardDifficulty(deck,id){
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
  .then(results => JSON.parse(results))
  .then(results => {
    const index = results[deck].vocab.map((e) =>  {return e.id }).indexOf(id)
    results[deck].vocab[index].difficulty += 0.1
    return results
  })
  .then(results => {
    console.log("which gives:")
    console.log(results)
    AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(results))
  })
  .done();
  }


export function nextScheduleSetter(deck,id, multiplier){
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
  .then(results => JSON.parse(results))
  .then(results => {
    const index = results[deck].vocab.map((e) =>  {return e.id }).indexOf(id)
    results[deck].vocab[index].interval === 0 ? results[deck].vocab[index].interval = 1 : results[deck].vocab[index].interval;
    results[deck].vocab[index].interval *= multiplier;
    results[deck].vocab[index].dueDate += results[deck].vocab[index].interval;
    return results
  })
  .then(results => {
    // console.log("nextScheduleSetter output :")
    // console.log(results[deck])
    AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(results))
  })
  .done();

}
export function clearAsyncStorage () {
  AsyncStorage.clear()
}

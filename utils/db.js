import PouchDB from 'pouchdb-react-native';
import { initialData, TODAY } from './initialData';

export default class DB {
    constructor(name) {
        this.db = new PouchDB(name);
    
    }
    async initializeDB() {
        try {
        let res = await this.db.get('jonathanrosado')
        console.log('initial data')
        console.log(res)
        return res.decks;
        }
        catch (err) {
            let init = await this.db.put(initialData);
            let res = await this.db.get('jonathanrosado')
            console.log(init);
            return res.decks;
        }
    }

    async addCardToDeck(deckName, card){
        const { recto, verso } = card;
        let data = await this.db.get('jonathanrosado')
        const newCard = Object.assign({}, {recto:recto, verso:verso, difficulty:0.3,success:0, interval:1,dueDate:TODAY,id:data.decks[deckName].vocab.length + 1})
        data.decks[deckName].vocab.push(newCard)
        await this.db.put(data);
        return newCard;

    }

    async saveDeck(deckName){
        let data = await this.db.get('jonathanrosado')
        const {decks} = data;
        const newDeck = {     
            [deckName]: {
                title: deckName,
                vocab: []
            }
        }
        data.decks = {...data.decks, ...newDeck }
        console.log(data)
        return await this.db.put(data);
    }

    async nextScheduleSetter(deck,id, multiplier){
        let data = await this.db.get('jonathanrosado')
        const index = data.decks[deck].vocab.map((e) =>  {return e.id }).indexOf(id)
        data.decks[deck].vocab[index].interval === 0 ? data.decks[deck].vocab[index].interval = 1 : data.decks[deck].vocab[index].interval = data.decks[deck].vocab[index].interval;
        data.decks[deck].vocab[index].interval *= multiplier;
        data.decks[deck].vocab[index].dueDate += data.decks[deck].vocab[index].interval;
        return await this.db.put(data)
    }

    async sync(){
        let sync = await PouchDB.sync('jonathanrosado','http://localhost:5984/jonathanrosado')
        console.log(sync)
        return sync;
    }
}
import React, { Component } from 'react';
import './CardDeck.css';

import Card from './Card';
import axios from 'axios';

import { chooseRandomPosition } from './helper';

const API_URL = 'https://deckofcardsapi.com/api/deck';    
// https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2

class CardDeck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deck_id: null,
            cards: [],
            isExhausted: false
        }
        this.fetchNewCard = this.fetchNewCard.bind(this);
        this.fetchNewDeck = this.fetchNewDeck.bind(this);
    }
    getDeck() {
        console.log('Getting new deck');
        axios.get(`${API_URL}/new/shuffle/`).then(response => {
            const actualData = response.data;
            this.setState({ deck_id: actualData.deck_id, cards: [], isExhausted: false });
        });
    }
    componentDidMount() {
        this.getDeck();
    }
    fetchNewCard() {
        let newCard;
        axios.get(`${API_URL}/${this.state.deck_id}/draw/`).then(response => {
            const actualData = response.data;
            if(actualData.success) {
                newCard = actualData.cards[0];
                const positions = {
                    posX: chooseRandomPosition(-50, 50),
                    posY: chooseRandomPosition(-50, 50),
                    rot: chooseRandomPosition(-45, 45)
                }
                this.setState(st => {
                    return { cards: [ ...st.cards, { ...newCard, positions } ] };
                });
            }
            else {
                alert('All cards have been served. Please fetch a New Deck to start again');
                this.setState({ isExhausted: true });
            }
        });
    }
    fetchNewDeck() {
        this.getDeck();
    }
    render() {
        const allCards = this.state.cards.map(aCard => {
            return <Card key={aCard.code} cardProps={aCard} />
        });
        return(
            <div className='CardDeck'>
                <h1>♦ Card Dealer App ♦</h1>
                <p>A simple React App for dealing with Cards</p>
                {!this.state.isExhausted ?
                    <button className='diagonal' onClick={this.fetchNewCard}>Get New Card</button> :
                    <button className='diagonal' onClick={this.fetchNewDeck}>Get a New Deck</button>
                }
                <div className='CardDeck-tray'>
                    {allCards}
                </div>
            </div>
        )
    }
}

export default CardDeck;
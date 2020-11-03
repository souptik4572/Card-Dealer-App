import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
    render() {
        const cardProps = this.props.cardProps;
        const customStyle = {
            transform: `translate(${cardProps.positions.posX}px) translate(${cardProps.positions.posY}px) rotate(${cardProps.positions.rot}deg)`
        }
        return(
            <div className='Card' style={customStyle}>
                <img src={cardProps.image} alt={`${cardProps.value} of ${cardProps.suit}`} />
            </div>
        )
    }
}

export default Card;
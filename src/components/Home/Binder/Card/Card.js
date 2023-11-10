import React from 'react';
import { useCards } from '../../CardsContext.js';
import './Card.css';

const Card = ({ dbCard, collectionCard, i }) => {
    const { fdb, setSelected, view } = useCards();

    return <div key={`divpage1${i}`} className="cardBox">
        {
            fdb && <img
                className={collectionCard ? "cardImage" : "darkCardImage"}
                alt={dbCard.name}
                key={`page1${i}`}
                src={"https://images.ygoprodeck.com/images/cards/"
                    + ((fdb.find((c) => c.name.toLowerCase() === (dbCard?.name?.toLowerCase() ?? ''))?.id) ?? '89631139')
                    + ".jpg"
                }
                onClick={() => setSelected({ dbCard: dbCard, collectionCard: collectionCard })}
            />
        }
        {collectionCard && collectionCard['#'] > 1 && <div className="ownedCounter">{collectionCard['#']}</div>}
        {dbCard.card_sets && <div className="rarity">{view === 'collection' ? collectionCard.Rarity : dbCard.card_sets[0].set_rarity_code}</div>}
    </div>;
}

export default Card;
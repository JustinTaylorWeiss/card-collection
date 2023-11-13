import React from 'react';
import { useCards } from '../CardsContext.js';
import './InfoBox.css';

const InfoBox = () => {
    const { selected } = useCards();

    return <div className="infoBox">
        <img className="infoImage" src={"https://images.ygoprodeck.com/images/cards/" + selected.dbCard.id + ".jpg"} alt={selected.dbCard.name} />
        <span>{selected.dbCard.name}</span>
        <span>{selected.dbCard.desc}</span>
        <span>{selected?.dbCard?.cardSet?.set_name ?? ''}</span>
        <span>{selected.collectionCard['#']}</span>
    </div>
};

export default InfoBox;
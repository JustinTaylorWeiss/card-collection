import React from 'react';
import { useCards } from '../CardsContext.js';
import Card from './Card/Card.js';
import './Binder.css';

const Binder = () => {
    const { fdb, fCards, page, set, view } = useCards();
    const isCollection = view === 'collection';
    const primarySet = isCollection ? fCards : fdb;
    const secondarySet = isCollection ? fdb : fCards;
    
    return <div className="binder">
        {
            ['page1', 'page2'].map((_, i) => (
                <div className="binderPage" key={`binder${i}`}>
                    {
                        fdb && primarySet && primarySet.slice((page+i)*9, (page+i)*9+9).map((primaryCard, i) => {
                            const secondaryCard = secondarySet.find(c => c.name.toLowerCase() === primaryCard.name.toLowerCase() && (set ? c.Set === set : true)) ?? false;
                            return <Card
                                dbCard={isCollection ? secondaryCard : primaryCard}
                                collectionCard={isCollection ? primaryCard : secondaryCard}
                                i={i}
                                key={`card${i}`}
                            />
                        })
                    }
                </div>
            ))
        }
    </div>
};

export default Binder;
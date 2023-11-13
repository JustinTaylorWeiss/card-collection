import React, { useEffect } from 'react';
import { useCards } from '../CardsContext.js';
import Card from './Card/Card.js';
import './Binder.css';

const Binder = () => {
    const { fdb, fCards, search, filterCards, page, set, view, searchedFdb, searchedFCards, resetDb, resetCollection } = useCards();
    const isCollection = view === 'collection';
    const primarySet = isCollection ? searchedFCards : searchedFdb;
    const secondarySet = isCollection ? searchedFdb : searchedFCards;
    
    useEffect(() => {
        if(view === 'collection') {
            resetDb()
        } else {
            resetCollection();
        }
        filterCards(search);
    }, [fdb, fCards]);

    return <div className="binder">
        {
            ['page1', 'page2'].map((_, i) => (
                <div className="binderPage" key={`binder${i}`}>
                    {
                        fdb && primarySet && primarySet.slice((page+i)*9, (page+i)*9+9).map((primaryCard, i) => {
                            const secondaryCard = secondarySet.find(c => 
                                c.name.toLowerCase() === primaryCard.name.toLowerCase()
                                && (set ? c.Set === set : true)
                                && (isCollection ? c.cardSet.set_name === primaryCard.Set : c.Set === primaryCard.cardSet.set_name)
                            ) ?? false;
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
import React, { useContext, createContext, useEffect, useState, useMemo } from 'react';
import dbcsv from './dbcsv.json';

const CardsContext = createContext();

export const useCards = () => useContext(CardsContext);

export const CardsProvider = ({ children }) => {
    const cards = dbcsv;
    const [db, setDb] = useState(false);

    const [filteredSet, setFilteredSet] = useState('');
    const [view, setView] = useState('collection');
    const [cardSearch, setCardSearch] = useState('')
    
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState({ dbCard: {name: 'Fire Princess', id: 64752646, desc: 'Each time you gain Life Points, inflict 500 damage to your opponent.'}, collectionCard: {} });

    // Fetch Card Databse From API
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php');
                const db = biggify(await res.json());
                setDb(db);
            } catch(e) { console.log(e);}
        })();
    },[]);

    // Reset Page Number Whenever A New Filter Is Applied
    useEffect(() => {
        setPage(0);
    },[view, cardSearch, filteredSet])

    // Filters
    const doSearchFilter = (state) => (
        state.filter((card) => card.name.toLowerCase().includes(cardSearch))
    );
      
    const doSetFilter = (state) => (
        filteredSet !== ''
            ?state.filter((card)=> (
                view === "collection"
                    ?  card.set === filteredSet
                    :  card.cardSet.set_name === filteredSet
            ))
            : state
    );

    // Set FDB
    const fdb = useMemo(() => (
        db
            ? view !== 'collection'
                ? [
                    doSetFilter,
                    doSearchFilter,
                ].reduce(
                    (acc, func) => func(acc)
                    ,db
                )
                : db
            : false
    ), [filteredSet, cardSearch, view, db, doSetFilter, doSearchFilter]);
      
    // Set FCARDS
    const fCards = useMemo(() => (
        view === 'collection'
            ? [
                doSearchFilter,
            ].reduce(
                (acc, func) => func(acc)
                ,cards
            )
            : cards
    ), [filteredSet, cardSearch, view, cards, doSearchFilter]);

    // Helper Functions
    const changePage = (delta) => {
        const newPage = page + delta;
        if (newPage > Math.ceil((((view === 'collection' ? fCards : fdb)?.length ?? 0) / 9.0) - 1) || newPage < 0) return;
        setPage(newPage);
    };

    const filterSet = (set) => {
        setFilteredSet(set);
        setView('database')
    };

    const resetCollection = () => {
        filterSet('');
        setView('collection');
    };

    const resetDb = () => {
        filterSet('');
        setView('database');
    };

    // Expand Card List To Include All Versions Of Each Card
    const biggify = (db) => {
        let out = []
        db.data.forEach((card, i) => {
          if(card.card_sets)
            card.card_sets.forEach((set) => out.push({...card, cardSet: set}));
          else
            out.push({...card, cardSet: { set_name: 'none', set_rarity: 'none' }});
        });
        return out
    };
    
    const value = {
        page,
        fdb,
        fCards,
        filteredSet,
        selected, setSelected,
        view,
        setCardSearch,
        changePage, filterSet, resetCollection, resetDb
    };

    return <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
};
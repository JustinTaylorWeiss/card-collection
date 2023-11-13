import React, { useContext, createContext, useEffect, useState, useRef } from 'react';
import dbcsv from './dbcsv.json';

const CardsContext = createContext();

export const useCards = () => useContext(CardsContext);

export const CardsProvider = ({ children }) => {
    const cards = dbcsv;
    const [page, setPage] = useState(0);
    const [db, setDb] = useState(false);
    const [fdb, setFdb] = useState(false);
    const [fCards, setFCards] = useState(cards);
    const [set, setSet] = useState('');
    const [view, setView] = useState('collection');
    const [searchedFCards, setSFC] = useState(cards);
    const [searchedFdb, setSFDB] = useState(false);
    const search = useRef('');
    const [selected, setSelected] = useState({ dbCard: {name: 'Fire Princess', id: 64752646, desc: 'Each time you gain Life Points, inflict 500 damage to your opponent.'}, collectionCard: {} });

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php');
                const db = biggify(await res.json());
                setDb(db);
                setFdb(db);
                setSFDB(db);
            } catch(e) {
                console.log(e);
            }
        })();
    }, []);

    const changePage = (delta) => {
        const newPage = page + delta;
        if (newPage > Math.ceil((((view === 'collection' ? fCards : fdb)?.length ?? 0) / 9.0) - 1) || newPage < 0) return;
        setPage(newPage);
    };

    const filterCards = (search) => {
        setPage(0);
        if (view === 'collection') {
            setSFC(fCards.filter(collectionCard => collectionCard.name.toLowerCase().includes(search.current.value)));
        } else {
            setSFDB(fdb.filter(dbCard => dbCard.name.toLowerCase().includes(search.current.value)));
        }
    };
    
    const filterSet = (s) => {
        setPage(0);
        setFdb(db.filter(dbCard => (dbCard?.card_sets?.map(set => set.set_name) ?? []).includes(s)));
        setFCards(cards);
        setSet(s);
        setView('db');
    };

    const biggify = (database) => (
        database.data.reduce((acc, dbCard) => (
            [
                ...acc,
                ...(dbCard?.card_sets?.map((set) => ({ ...dbCard, cardSet: set }))) ?? [{ ...dbCard, cardSet: { set_name: 'none', set_rarity: 'none' } }]
            ]
        ), [])
    );

    const resetCollection = () => {
        setPage(0);
        setFCards(cards);
        setFdb(db);
        setSet('');
        setView('collection');
    };
    
    const resetDb = () => {
        setPage(0);
        setFCards(cards);
        setFdb(db);
        setSet('');
        setView('db');
    };

    const value = {
        page, setPage,
        fdb,
        fCards,
        set,
        selected, setSelected,
        view,
        search,
        searchedFdb, searchedFCards,
        changePage, filterCards, filterSet, resetCollection, resetDb
    };

    return <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
};
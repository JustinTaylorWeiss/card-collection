import React from 'react';
import { useCards } from '../CardsContext.js';
import './Buttons.css';

const Buttons = () => {
    const { changePage, filterCards, filterSet, resetCollection, fdb, fCards, page, search, resetDb, view } = useCards();

    return <div>
        <button className="pageButton" type="button" onClick={() => changePage(-2)}>Previous</button>
        <button className="pageButton" type="button" onClick={() => changePage(2)}>
            Next{` ${page}/${Math.ceil((((view === 'collection' ? fCards : fdb)?.length ?? 0) / 9.0) - 1)}`}
        </button>
        <input className="search" type="text" ref={search} onChange={() => filterCards(search)}></input>
        <button type="button" onClick={() => resetCollection()}>Collection</button>
        <button type="button" onClick={() => resetDb()}>Database</button>
        <select id="dropdown" onChange={() => filterSet(document.getElementById('dropdown').value)}>
            <option value="none">Filter By Set</option>
            <optgroup label="Series 1, 2, 3">
                <option value="Legend of Blue Eyes White Dragon">LOB</option>
                <option value="Metal Raiders">MRD</option>
                <option value="Spell Ruler">SRL</option>
                <option value="Pharaoh's Servant">PSV</option>
                <option value="Labyrinth of Nightmare">LON</option>
                <option value="Legacy of Darkness">LOD</option>
                <option value="Pharaonic Guardian">PGD</option>
                <option value="Magician's Force">MFC</option>
                <option value="Dark Crisis">DCR</option>
                <option value="Invasion of Chaos">IOC</option>
                <option value="Ancient Sanctuary">AST</option>
            </optgroup>
            <optgroup label="Series 4">
                <option value="Soul of the Duelist">SOD</option>
                <option value="Rise of Destiny">RDS</option>
                <option value="Flaming Eternity">FET</option>
                <option value="The Lost Millennium">TLM</option>
                <option value="Cybernetic Revolution">CRV</option>
                <option value="Elemental Energy">EEN</option>
                <option value="Shadow of Infinity">SOI</option>
                <option value="Enemy of Justice">EOJ</option>
            </optgroup>
            <optgroup label="Series 5">
                <option value="Power of the Duelist">POTD</option>
                <option value="Cyberdark Impact">CDIP</option>
                <option value="Strike of Neos">STON</option>
                <option value="Force of the Breaker">FOTB</option>
                <option value="Tactical Evolution">TAEV</option>
                <option value="Gladiator's Assault">GLAS</option>
                <option value="Phantom Darkness">PTDN</option>
                <option value="Light of Destruction">LODT</option>
            </optgroup>
            <optgroup label="Series 6">
                <option value="The Duelist Genesis">TDGS</option>
                <option value="Crossroads of Chaos">CSOC</option>
                <option value="Crimson Crisis">CRMS</option>
                <option value="Raging Battle">RGBT</option>
                <option value="Ancient Prophecy">ANPR</option>
                <option value="Stardust Overdrive">SOVR</option>
                <option value="Absolute Powerforce">ABPF</option>
                <option value="The Shining Darkness">TSHD</option>
            </optgroup>
            <optgroup label="Series 11">
                <option value="Photon Hypernova">PHHY</option>
            </optgroup>
            <optgroup label="Series 12">
                <option value="Duelist Nexus">DUNE</option>
                <option value="Age of Overlord">AGOV</option>
            </optgroup>
        </select>
    </div>
};

export default Buttons;
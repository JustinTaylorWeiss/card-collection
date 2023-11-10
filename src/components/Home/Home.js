import React from 'react';
import './Home.css';
import kmLogo from '../../images/km.png';
import Binder from './Binder/Binder.js';
import InfoBox from './InfoBox/InfoBox.js';
import Buttons from './Buttons/Buttons.js';
import { CardsProvider } from './CardsContext.js';

const Home = () => {
    return <>
        <div className="outerContainer">
            <img className="kmLogo" src={kmLogo} alt="kmLogo" /><br /><br />
            <CardsProvider>
                <Binder />
                <InfoBox /> 
                <Buttons />
            </CardsProvider>
        </div>
    </>;
}
export default Home;
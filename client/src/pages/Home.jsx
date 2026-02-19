
import React from 'react';
import ChatWindow from '../components/ChatWindow';
import MoodSelector from '../components/MoodSelector';
import Disclaimer from '../components/Disclaimer';

const Home = () => {
    return (
        <div className="home-page">
            <h1>MindCare AI</h1>
            <Disclaimer />
            <MoodSelector />
            <ChatWindow />
        </div>
    );
};

export default Home;

import React, { useState } from 'react';
import Speech from './Speech';

const App = () => {
    const [text, setText] = useState('');

    const handleSpeech = (transcript) => {
        setText(transcript);
    }

    return (
        <div className="container">
            <h1>Speech to Text App</h1>
            
            <input type="text" value={text} readOnly />
            <Speech onSpeech={handleSpeech} />
        </div>
    );
}

export default App;

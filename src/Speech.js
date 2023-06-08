import { useState, useEffect } from 'react'
import SweetAlert from 'sweetalert';
import Bowser from "bowser";
import '@fortawesome/fontawesome-free/css/all.min.css';


//Initialize speech recognition related variables.
const browser = Bowser.getParser(window.navigator.userAgent);
const browserName = browser.getBrowserName();
const osName = browser.getOSName();
const browserIsSupported = browserName === 'Chrome' && osName !== 'iOS';
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const recognition = new SpeechRecognition();

const Speech = ({ onSpeech }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [recognitionStarted, setRecognitionStarted] = useState(false);

    useEffect(() => {
        // Check for supported browsers.
        if (!browserIsSupported) return;

        // Initialize speech recognition using the web speech api.
        // Use JSpeech Grammar Format.
        const grammar = '#JSGF V1.0;'
        const speechRecognitionList = new SpeechGrammarList();
        speechRecognitionList.addFromString(grammar, 1);
        recognition.grammars = speechRecognitionList;
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        // Handle speech recognition results.
        recognition.onresult = event => {
            const last = event.results.length - 1;
            const command = event.results[last][0].transcript.toLowerCase();
            console.log(command);
            onSpeech(command);
            setRecognitionStarted(false);
        };

        // Handle speech ending
        recognition.onspeechend = () => {
            setShowAlert(false);
            browserIsSupported && recognition.stop();
        };

        // Handle speech recognition starting
        recognition.onstart = () => {
            setRecognitionStarted(true);
        }

        return () => {

        }
    }, []);

    const handleVoiceRecognition = () => {
        setShowAlert(true);
        if (!recognitionStarted) setTimeout(() => recognition.start(), 100);
    }

    if (!browserIsSupported) return null;

    return (
        <span className="input-group-addon ms-2 me-3">
            <i onClick={handleVoiceRecognition} className="fas fa-2x fa-microphone"></i>
        </span>
    )
}

export default Speech;
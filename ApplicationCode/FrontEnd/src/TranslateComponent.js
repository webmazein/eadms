import React, { useState } from 'react';
import axios from 'axios';

const TranslateComponent = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    try {
      const response = await axios.post(
        'https://translation.googleapis.com/language/translate/v2',
        {},
        {
          params: {
            q: text,
            target: 'hi',
            key: 'YOUR_API_KEY', // Replace with your API key
          },
        }
      );
      setTranslatedText(response.data.data.translations[0].translatedText);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  return (
    <div>
      <h1>Translate English to Hindi</h1>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter text in English"
      />
      <button onClick={handleTranslate}>Translate</button>
      <h2>Translated Text:</h2>
      <p>{translatedText}</p>
    </div>
  );
};

export default TranslateComponent;

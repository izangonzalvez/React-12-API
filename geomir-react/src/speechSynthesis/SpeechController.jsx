import React, { useContext, useEffect, useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { UserContext } from '../userContext';

export const TextToSpeech = ({ text }) => {
  const { speak } = useSpeechSynthesis();

  const handleClick = (event) => {
    event.stopPropagation(); // Evita que el clic se propague a los elementos padres
    const selectedText = event.target.innerText;
    speak({ text: selectedText });
  };


  return (
    <div onClick={handleClick}  tabIndex="0">
      {text}
    </div>
  );
}
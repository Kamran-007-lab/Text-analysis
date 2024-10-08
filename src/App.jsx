import React, { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";

const App = () => {
  const [text, setText] = useState("");
  const [searchStr, setSearchStr] = useState("");
  const [replaceStr, setReplaceStr] = useState("");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleReplace = () => {
    const newText = text.split(searchStr).join(replaceStr);
    setText(newText);
  };

  const getUniqueWordsCount = () => {
    const wordsArray = text.split(/\s+/); 
    const cleanedWords = wordsArray.map((word) => word.trim().toLowerCase());
    const uniqueWords = {};

    cleanedWords.forEach((element) => {
      if (element) {
        uniqueWords[element] = 1;
      }
    });

    return Object.keys(uniqueWords).length;
  };

  const getCharacterCount = () => {
    let count = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      // console.log(char)
      if (char.match(/[a-zA-Z0-9]/)) {
        count++;
      }
    }

    return count;
  };

  const getHighlightedText = (textToHighlight) => {
    if (!replaceStr) {
      return textToHighlight;
    }
    const regex = new RegExp(replaceStr, 'g');
    // console.log(regex);
    const parts = textToHighlight.split(regex);
    // console.log(parts);

    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {index < parts.length - 1 && (
          <span className="bg-yellow-200">{replaceStr}</span>
        )}
      </span>
    ));
  };

  return (
    <div
      className="min-h-screen bg-gray-100 flex justify-center items-center p-6 bg-cover bg-center"
      style={{
        backgroundImage: `url('https://wallpapercave.com/wp/wp2824699.jpg')`,
      }}
    >
      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-2xl shadow-black relative">
        <h1 className="text-2xl font-bold text-center mb-4 z-10">Text Analysis</h1>
        <div
          className="absolute h-44 mx-6 top-[12%] inset-0 p-4 whitespace-pre-wrap pointer-events-none bg-white rounded-lg overflow-hidden z-10 text-transparent"
        >
          {getHighlightedText(text)}
        </div>

        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent relative z-10 caret-black"
          rows="6"
          value={text}
          placeholder="Enter your text. Apply punctuation"
          onChange={handleTextChange}
        />

        <div className="mt-4 text-gray-700">
          <p className="text-lg">
            Unique Words:{" "}
            <span className="font-semibold">{getUniqueWordsCount()}</span>
          </p>
          <p className="text-lg">
            Characters (Excluding spaces & punctuation):{" "}
            <span className="font-semibold">{getCharacterCount()}</span>
          </p>
        </div>

        <div className="mt-6 flex flex-col space-y-4">
          <input
            type="text"
            placeholder="String to search for (Case sensitive)"
            value={searchStr}
            onChange={(e) => setSearchStr(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="String to replace with"
            value={replaceStr}
            onChange={(e) => setReplaceStr(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleReplace}
            className="w-full p-3 bg-sky-200 text-gray-700 rounded-lg hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Replace All
          </button>
        </div>

        <div className="mt-4 flex justify-center items-center text-gray-800">
          <AiOutlineCheckCircle className="mr-2" />
          <p>Real-time analysis of text</p>
        </div>
      </div>
    </div>
  );
};

export default App;

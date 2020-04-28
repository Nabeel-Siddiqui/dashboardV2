import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Quote from './componets/Quote.js'
import Reddit from './componets/Reddit.js'



const api = {
  key: "23259d09329083a1e35362d821a07a3b",
  base: "https://api.openweathermap.org/data/2.5"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const [redditData, setRedditData] = useState([]);
  const [quoteData, setQuoteData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      
      const redditResult = await axios(
        'https://www.reddit.com/r/popular.json',
      );
      const quoteResult = await axios (
        'http://quotes.rest/qod.json'
      );

      setQuoteData(quoteResult.data.contents.quotes)
      setRedditData(redditResult.data.data.children);

    };
    fetchData();
  }, []);


  const renderQuote = () => {
    return quoteData.map(quote => <Quote quote={quote}/>)
  }

  const renderReddit = () => {
    return redditData.map(reddit => <Reddit reddit={reddit.data}/>)
  }



  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}/weather?q=${query}&units=imperial&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

    
  return (
    <div>
      {renderQuote()}
      {renderReddit()}
    </div>
  );
}

export default App;


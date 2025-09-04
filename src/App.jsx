import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='app'>
      <h1>Joke Generator</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>{data.joke}</p>
      )}
      <button onClick={() => window.location.reload()}>Get Another Joke</button>
    </div>
  );
};

export default App

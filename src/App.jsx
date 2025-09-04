import { useState } from 'react'
import { useEffect } from 'react'


function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [checkboxes, setCheckboxes] = useState(() => {
    const savedChecks = localStorage.getItem('checkboxes');
    return savedChecks ? JSON.parse(savedChecks) :
      ([
        { id: 1, label: 'NSFW', checked: false },
        { id: 2, label: 'Religious', checked: false },
        { id: 3, label: 'Political', checked: false },
        { id: 4, label: 'Racist', checked: false },
        { id: 5, label: 'Sexist', checked: false },
        { id: 6, label: 'Explicit', checked: false },

      ])
  });

  const fetchData = async () => {
    try {
      const blacklistFlags = checkboxes
        .filter(cb => cb.checked)
        .map(cb => cb.label.toLowerCase())
        .join(',');

      const url = `https://v2.jokeapi.dev/joke/Any?type=single${blacklistFlags ? `&blacklistFlags=${blacklistFlags}` : ''}`;

      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };


  useEffect(() => {
    localStorage.setItem('checkboxes', JSON.stringify(checkboxes));
  }, [checkboxes]);

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setCheckboxes(prevCheckboxes =>
      prevCheckboxes.map(cb =>
        cb.id === parseInt(id) ? { ...cb, checked } : cb
      )
    );
  };
  useEffect(() => {
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
      <div className="checkbox-row">
        <span className="label-title">Blacklist Flags:</span>
        <div className="checkbox-group">
          {checkboxes.map(checkbox => (
            <label key={checkbox.id}>
              <input
                type="checkbox"
                id={checkbox.id}
                checked={checkbox.checked}
                onChange={handleCheckboxChange}
              />
              {checkbox.label}
            </label>
          ))}
        </div>
      </div>



      <button onClick={() => {
        setLoading(true);
        fetchData();
      }}>
        Get Another Joke
      </button>


    </div>
  );
};

export default App

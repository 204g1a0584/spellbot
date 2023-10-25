import React, { useState } from 'react';
import './App.css';

function App() {
  const [Text, setText] = useState('');
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const postData = async () => {
    try {
      setError(null); // Reset any previous errors
      setLoading(true);

      // Replace the API URL with your actual endpoint
      const apiUrl = `https://api.textgears.com/grammar?text=${Text}&language=en-GB&whitelist=&dictionary_id=&ai=1&key=uA6hWUQ9eJmzN7L8`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Text),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Data posted successfully:', result);

      if (result.Error) {
        setErrors(result.Error.better);
      }
    } catch (error) {
      setError('An error occurred. Please try again.'); // Display an error message
      console.error('Error posting data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1 className="title">Grammar Checker</h1>

      <div className="textarea-container">
        <textarea
          className="textarea"
          placeholder="Enter your text here"
          onChange={(e) => setText(e.target.value)}
          value={Text}
        />
        <button className="check-button" onClick={postData}>
          Check Grammar
        </button>
      </div>

      {loading && <p className="loading">Checking...</p>}
      {error && <p className="error">{error}</p>}
      {errors.length > 0 && (
        <div>
          <h3>Better Suggestions:</h3>
          <ul>
            {errors.map((item, index) => (
              <li key={index}>{item}</li>
            ))  }
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;

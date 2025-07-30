import { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:8000/expand', {
        text: input
      });
      setOutput(res.data.expanded);
    } catch (err) {
      setOutput('Error contacting the backend.');
      console.error(err);
    }
  };

  return (
    <div style={{ display: "flex", gap: "2rem", padding: "2rem" }}>
      <div>
        <h3>Input</h3>
        <textarea
          rows="10"
          cols="40"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <br />
        <button onClick={handleSubmit}>Expand</button>
      </div>
      <div>
        <h3>Output</h3>
        <textarea
          rows="10"
          cols="40"
          readOnly
          value={output}
        />
      </div>
    </div>
  );
}

export default App;
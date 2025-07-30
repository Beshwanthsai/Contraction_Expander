import { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  // Contraction mapping - no server needed!
  const contractionMap = {
    // Common contractions
    "ain't": "am not",
    "aren't": "are not", 
    "can't": "cannot",
    "couldn't": "could not",
    "didn't": "did not",
    "doesn't": "does not",
    "don't": "do not",
    "hadn't": "had not",
    "hasn't": "has not",
    "haven't": "have not",
    "he'd": "he would",
    "he'll": "he will",
    "he's": "he is",
    "i'd": "I would",
    "i'll": "I will",
    "i'm": "I am",
    "i've": "I have",
    "isn't": "is not",
    "it'd": "it would",
    "it'll": "it will",
    "it's": "it is",
    "let's": "let us",
    "shouldn't": "should not",
    "that's": "that is",
    "there's": "there is",
    "they'd": "they would",
    "they'll": "they will",
    "they're": "they are",
    "they've": "they have",
    "we'd": "we would",
    "we'll": "we will",
    "we're": "we are",
    "we've": "we have",
    "weren't": "were not",
    "what's": "what is",
    "where's": "where is",
    "who's": "who is",
    "won't": "will not",
    "wouldn't": "would not",
    "you'd": "you would",
    "you'll": "you will",
    "you're": "you are",
    "you've": "you have",
    // Additional contractions
    "ma'am": "madam",
    "o'clock": "of the clock",
    "y'all": "you all",
    "'cause": "because",
    "'til": "until",
    "'bout": "about",
    "'round": "around",
    "'fore": "before",
    "'neath": "beneath",
    "'gainst": "against",
    // Negative contractions
    "mustn't": "must not",
    "needn't": "need not",
    "oughtn't": "ought not",
    "shan't": "shall not",
    "wasn't": "was not",
    "won't've": "will not have",
    "wouldn't've": "would not have",
    "shouldn't've": "should not have",
    "couldn't've": "could not have",
    "mightn't": "might not",
  };

  const expandContractions = (text) => {
    if (!text) return '';
    
    let expandedText = text;
    
    // Create a regex pattern that matches all contractions
    const contractionPattern = new RegExp(
      '\\b(' + Object.keys(contractionMap).map(key => 
        key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      ).join('|') + ')\\b', 'gi'
    );
    
    expandedText = expandedText.replace(contractionPattern, (match) => {
      const lowerMatch = match.toLowerCase();
      const expansion = contractionMap[lowerMatch];
      
      if (expansion) {
        // Preserve original capitalization
        if (match[0] === match[0].toUpperCase()) {
          return expansion.charAt(0).toUpperCase() + expansion.slice(1);
        }
        return expansion;
      }
      return match;
    });
    
    return expandedText;
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      const expanded = expandContractions(input);
      setOutput(expanded);
      setLoading(false);
    }, 500);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const sampleTexts = [
    "I can't believe you're here! Won't you stay for dinner?",
    "We've been waiting for you. It's time to go.",
    "Don't worry, we'll handle everything. You shouldn't stress about it."
  ];

  const loadSample = (text) => {
    setInput(text);
    setOutput('');
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">
            <span className="title-icon">📝</span>
            Contraction Expander
          </h1>
          <p className="subtitle">Transform contractions into their full forms instantly</p>
        </header>

        <div className="content">
          <div className="input-section">
            <div className="section-header">
              <h3 className="section-title">Input Text</h3>
              <div className="sample-buttons">
                {sampleTexts.map((text, index) => (
                  <button
                    key={index}
                    className="sample-btn"
                    onClick={() => loadSample(text)}
                    title="Click to load sample text"
                  >
                    Sample {index + 1}
                  </button>
                ))}
              </div>
            </div>
            <textarea
              className="textarea input-textarea"
              placeholder="Enter text with contractions here... (e.g., I can't believe it's working!)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows="8"
            />
            <div className="button-group">
              <button 
                className="btn btn-primary" 
                onClick={handleSubmit}
                disabled={loading || !input.trim()}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Expanding...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">✨</span>
                    Expand Contractions
                  </>
                )}
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={handleClear}
                disabled={loading}
              >
                <span className="btn-icon">🗑️</span>
                Clear
              </button>
            </div>
          </div>

          <div className="output-section">
            <div className="section-header">
              <h3 className="section-title">Expanded Text</h3>
              {output && (
                <button 
                  className="copy-btn"
                  onClick={handleCopy}
                  title="Copy to clipboard"
                >
                  <span className="btn-icon">📋</span>
                  Copy
                </button>
              )}
            </div>
            <textarea
              className="textarea output-textarea"
              placeholder="Expanded text will appear here..."
              value={output}
              readOnly
              rows="8"
            />
            {output && (
              <div className="stats">
                <span className="stat">
                  Characters: {output.length}
                </span>
                <span className="stat">
                  Words: {output.split(/\s+/).filter(word => word.length > 0).length}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <footer className="footer">
          <div className="footer-content">
            <div className="sparkle-line">
              <span className="sparkle">✨</span>
              <span className="sparkle">⭐</span>
              <span className="sparkle">✨</span>
            </div>
            <p className="footer-text">
              <span className="magic-text">Crafted with</span>
              <span className="heart">⚡️</span>
              <span className="magic-text">by</span>
              <span className="creator-name">Beshwanth Sai Katari</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
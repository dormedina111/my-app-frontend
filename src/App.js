import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Lobby from './components/Lobby';
import CodeBlockPage from './components/CodeBlockPage';

function App() {
    const [codeBlocks, setCodeBlocks] = useState([]);

    useEffect(() => {
        // Fetch code-blocks from the server
        fetch('http://localhost:5000/api/code-blocks')
            .then(response => response.json())
            .then(data => setCodeBlocks(data))
            .catch(error => console.error('Error fetching code blocks:', error));
    }, []);

    return (
      <Router>
            <Routes>
                <Route path="/" element={<Lobby codeBlocks={codeBlocks} />} />
                <Route path="/codeblock/:id" element={<CodeBlockPage codeBlocks={codeBlocks} />} />
            </Routes>
        </Router>
    );
}

export default App;

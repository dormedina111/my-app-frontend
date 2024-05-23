import React from 'react';
import { Link } from 'react-router-dom';
import './Lobby.css';

function Lobby() {
    const codeBlocks = [
        { id: 1, title: "Reversing a String" },
        { id: 2, title: "Checking for Palindrome" },
        { id: 3, title: "Summing Elements in an Array" },
        { id: 4, title: "Counting Occurrences in an Array" }
    ];

    return (
        <div className="lobby-container">
            <h1>Choose code block</h1>
            <div className="button-container">
                {codeBlocks.map((codeBlock) => (
                    <Link to={`/codeblock/${codeBlock.id}`} key={codeBlock.id}>
                        <button className="lobby-button">
                            {codeBlock.title}
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Lobby;
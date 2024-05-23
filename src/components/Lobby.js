import React from 'react';
import { Link } from 'react-router-dom';
import './Lobby.css';

function Lobby({ codeBlocks }) {
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

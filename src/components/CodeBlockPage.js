import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import './CodeBlockPage.css';
import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

const socket = io.connect("http://localhost:5000");

function CodeBlockPage({ codeBlocks }) {
    const { id } = useParams();
    const [codeBlock, setCodeBlock] = useState(null);
    const [code, setCode] = useState('');
    const [role, setRole] = useState(null);
    const [isSolved, setIsSolved] = useState(false); 


    useEffect(() => {
        socket.emit('joinRoom', id);
        const currentCodeBlock = codeBlocks.find(block => block.id === parseInt(id, 10));
        // console.log(currentCodeBlock)
        // console.log(currentCodeBlock.code)
        // console.log(typeof(currentCodeBlock.code))
        if (currentCodeBlock) {
            setCodeBlock(currentCodeBlock);
            setCode(currentCodeBlock.code);
        }


        // Event handler for role assignment
        socket.on('roleAssigned', (assignedRole) => {
            console.log(`Assigned role: ${assignedRole}`);
            setRole(assignedRole);
        });

        // Event handler for receiving code updates
        socket.on('updateCode', (newCode) => {
            if(newCode === null) return;
            setCode(newCode);
        });

        // Event handler for code solved
        socket.on('codeSolved', (solved) => {
            setIsSolved(solved);
        });

        return () => {
            socket.off('roleAssigned');
            socket.off('updateCode');
            socket.off('codeSolved');
            socket.emit('leaveRoom', id);
        };
    }, [id, codeBlocks]);

    // Event handler for textarea value change
    const handleCodeChange = (newCode) => {
        setCode(newCode);
        socket.emit('updateCode', newCode);
        // Check the solution on every code change
        checkSolution(newCode); 
    };

    // Function to compare student's code with solution
    const checkSolution = (newCode) => {
        // For debugging
        console.log("Checking solution...");
        console.log("New Code:", newCode);
        console.log("Solution:", codeBlock.solution);

        if (newCode === codeBlock.solution) { 
            console.log("Solution is correct!");
            setIsSolved(true);
            socket.emit('codeSolved', true);
        } else {
            console.log("Solution is incorrect.");
            setIsSolved(false);
            socket.emit('codeSolved', false);
        }
    };

    if (!codeBlock) {
        return <div>Loading...</div>;
    }

    return (
        <div className="code-block-page">
            <h1>{codeBlock.title}</h1>
            <p>Role: {role}</p>
            {isSolved && <div className="smiley-face">😊</div>} {/* Display smiley face if solved */}
            <ReactCodeMirror
                value={code}
                editable={role==='student'}
                onChange={handleCodeChange}
                theme={vscodeDark}
                style={{ border: "1px solid gray", flex: 1 }}
                height="100%"
            />
        </div>
    );
}

export default CodeBlockPage;

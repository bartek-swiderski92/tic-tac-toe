/** @format */
import {useState} from 'react';

function Square({squares, index, handleClick}) {
    return (
        <button
            id={`square-${index}`}
            className="square"
            onClick={() => handleClick(index)}
        >
            {squares[index]}
        </button>
    );
}

function Board({xIsNext, squares, onPlay}) {
    const nextPlayer = xIsNext ? 'X' : 'O';

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) return;

        const nextSquares = squares.slice();
        nextSquares[i] = nextPlayer;
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status = winner ? `Winner: ${winner}` : `Next player: ${nextPlayer}`;

    const rows = [];
    let squareIndex = 0;
    for (let i = 0; i < 3; i++) {
        const squareNodes = [];
        for (let j = 0; j < 3; j++) {
            squareNodes.push(
                <Square
                    key={`square-${squareIndex}`}
                    squares={squares}
                    index={squareIndex}
                    handleClick={handleClick}
                />
            );
            squareIndex++;
        }
        rows.push(
            <div
                key={i}
                className="board-row"
            >
                {squareNodes}
            </div>
        );
    }

    return (
        <>
            <div className="status">{status}</div>
            <div>{rows}</div>
        </>
    );
}
export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;

    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        const description = move > 0 ? `Go to move # ${move}` : 'Go to game start';

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            lines[i].forEach((square) => {
                document.querySelector(`#square-${square}`)?.classList.add('winning-square');
            });
            return squares[a];
        }
    }
    return null;
}

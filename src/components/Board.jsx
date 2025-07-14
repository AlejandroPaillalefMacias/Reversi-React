"use client";
import React, { useEffect, useState } from "react";
import Cell from "./Cell";

const SIZE = 8;

const createInitialBoard = () => {
  const board = Array(SIZE)
    .fill(null)
    .map(() => Array(SIZE).fill(null));
  board[3][3] = "white";
  board[3][4] = "black";
  board[4][3] = "black";
  board[4][4] = "white";
  return board;
};

const directions = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],          [0, 1],
  [1, -1],  [1, 0], [1, 1],
];

const Board = () => {
  const [board, setBoard] = useState(createInitialBoard);
  const [currentPlayer, setCurrentPlayer] = useState("black");

  const isValidMove = (row, col, player, board) => {
    if (board[row][col]) return false;

    const opponent = player === "black" ? "white" : "black";

    for (let [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      let hasOpponentBetween = false;

      while (
        x >= 0 && x < SIZE &&
        y >= 0 && y < SIZE &&
        board[x][y] === opponent
      ) {
        x += dx;
        y += dy;
        hasOpponentBetween = true;
      }

      if (
        hasOpponentBetween &&
        x >= 0 && x < SIZE &&
        y >= 0 && y < SIZE &&
        board[x][y] === player
      ) {
        return true;
      }
    }
    return false;
  };

  const getFlippedDiscs = (row, col, player, board) => {
    const opponent = player === "black" ? "white" : "black";
    const flips = [];

    for (let [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      const discs = [];

      while (
        x >= 0 && x < SIZE &&
        y >= 0 && y < SIZE &&
        board[x][y] === opponent
      ) {
        discs.push([x, y]);
        x += dx;
        y += dy;
      }

      if (
        discs.length > 0 &&
        x >= 0 && x < SIZE &&
        y >= 0 && y < SIZE &&
        board[x][y] === player
      ) {
        flips.push(...discs);
      }
    }
    return flips;
  };

  const handleClick = (row, col) => {
    if (!isValidMove(row, col, currentPlayer, board)) {
      console.log("Jugada invalida en:", row, col);
      return;
    }

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = currentPlayer;

    const flipped = getFlippedDiscs(row, col, currentPlayer, board);
    flipped.forEach(([x, y]) => {
      newBoard[x][y] = currentPlayer;
    });

    console.log("Fichas volteadas:", flipped);
    setBoard(newBoard);
    setCurrentPlayer((prev) => (prev === "black" ? "white" : "black"));
  };

  const resetGame = () => {
    setBoard(createInitialBoard());
    setCurrentPlayer("black");
  };

  const countDiscs = (color) =>
    board.flat().filter((cell) => cell === color).length;

  return (
    <div>
      <h2>Turno: {currentPlayer === "black" ? "⚫ Negro" : "⚪ Blanco"}</h2>
      <div className="board">
        {board.map((row, i) =>
          row.map((cell, j) => (
            <Cell
              key={`${i}-${j}`}
              value={cell}
              onClick={() => handleClick(i, j)}
            />
          ))
        )}
      </div>
      <div className="score">
        ⚫ Negro: {countDiscs("black")} | ⚪ Blanco: {countDiscs("white")}
      </div> <br />
      <button onClick={resetGame} className="restart-button">🔁 Reiniciar Juego</button>
    </div>
  );
};

export default Board;
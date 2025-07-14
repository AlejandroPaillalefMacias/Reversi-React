"use client"
import React, { useState } from "react";
import Board from "./components/Board";
import "./styles.css";


const App = () => {
  return (
    <div className="app">
      <h1>Reversi</h1>
      <Board />
    </div>
  );
};

export default App;
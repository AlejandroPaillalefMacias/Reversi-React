"use client";
import React from "react";

const Cell = ({ value, onClick }) => {
    return (
        <div className="cell" onClick={onClick}>
            {value && (
                <div className={`disc ${value === "black" ? "black" : "white"}`}></div>
            )}
        </div>
    );
};

export default Cell;
"use strict";

const gameBoard = (() => {

    // CellState: "empty" | "x" | "o"
    const EMPTY_BOARD = 
        ["empty", "empty", "empty",
         "empty", "empty", "empty",
         "empty", "empty", "empty"];

    const board = EMPTY_BOARD;

    const clearBoard = function() {
        this.board = EMPTY_BOARD;
    };

    const renderBoard = function() {
        const boardDiv = document.querySelector("#board");

        this.board.forEach((cell, i) => {
            cellDiv = boardDiv.children.item(i);
            switch (cell) {
                case "empty":
                    cellDiv.classList.remove("xState");
                    cellDiv.classList.remove("oState");
                    cellDiv.innerText="";
                    break;
                case "x":
                    cellDiv.classList.add("xState");
                    cellDiv.classList.remove("oState");
                    cellDiv.innerText="X";
                    break;
                case "o":
                    cellDiv.classList.remove("xState");
                    cellDiv.classList.add("oState");
                    cellDiv.innerText="O";
                    break;
            }
        });
    };

    return { clearBoard, renderBoard };
})();

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

    // (1, 2) -> 5
    const convert2d = function(row, col) {
        return row * 3 + col;
    }

    const get = function(row, col) {
        return this.board[convert2d(row, col)];
    }

    const set = function(row, col, value) {
        this.board[convert2d(row, col)] = value;
    }

    return { clearBoard, renderBoard, get, set };
})();


const controller = (() => {

    // CurrentPlayer: "x" | "o"
    let currentPlayer = "x";

    const resetGame = function () {
        gameBoard.clearBoard();
        currentPlayer = "x";
    }

    // -> "incomplete" | "tie" | "xWins" | "oWins"
    const determineState = function() {

        // -> "incomplete" | "xWins" | "oWins"
        const checkCells = function(cell1, cell2, cell3) {
            if (cell0 === cell1 === cell2) {
                if (cell0 === "x") {
                    return "xWins";
                } else if (cell0 === "o") {
                    return "oWins";
                }
            }

            return "incomplete";
        }

        // Check rows
        for (let row = 0; row < 3; row++) {
            let cell0 = gameBoard.get(row, 0);
            let cell1 = gameBoard.get(row, 1);
            let cell2 = gameBoard.get(row, 2);
            let check = checkCells(cell1, cell2, cell3);
            if (check !== "incomplete") return check;
        }

        // Check cols
        for (let col = 0; col < 3; col++) {
            let cell0 = gameBoard.get(0, col);
            let cell1 = gameBoard.get(1, col);
            let cell2 = gameBoard.get(2, col);
            let check = checkCells(cell1, cell2, cell3);
            if (check !== "incomplete") return check;
        }

        // Check diagonals
        let cell0 = gameBoard.get(0, 0);
        let cell1 = gameBoard.get(1, 1);
        let cell2 = gameBoard.get(2, 2);
        let check = checkCells(cell1, cell2, cell3);
        if (check !== "incomplete") return check;

        cell0 = gameBoard.get(2, 2);
        cell1 = gameBoard.get(1, 1);
        cell2 = gameBoard.get(0, 0);
        check = checkCells(cell1, cell2, cell3);
        if (check !== "incomplete") return check;

        // Check for tie
        const anyEmpty = false;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (gameBoard.get(row, col) === "empty") {
                    anyEmpty = true;
                }
            }
        }
        if (!anyEmpty) {
            return "tie";
        }

        return "incomplete";
    }
})();

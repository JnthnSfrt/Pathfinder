import React, { Component } from 'react';
import Node from './Node/Node.jsx';

import './Pathfinder.css';

const START_NODE_COL = 10;
const START_NODE_ROW = 10;

const END_NODE_COL = 40;
const END_NODE_ROW = 10;

const GRID_COLS = 50;
const GRID_ROWS = 21;

export default class Pathfinder extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            mouseIsPressed: false,
        };
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({ grid });
    }

    handleMouseDown(row, col) {
        const newGrid = getGridWithNewNode(this.state.grid, row, col);
        this.setState({ grid: newGrid, mouseIsPressed: false });
    }

    render() {
        const { grid, mouseIsPressed } = this.state;

        return (
            <>
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const { row, col, isEnd, isStart, isBarrier } = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            col={col}
                                            isEnd={isEnd}
                                            isStart={isStart}
                                            isBarrier={isBarrier}
                                            mouseIsPressed={mouseIsPressed}
                                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                            onMouseEnter={undefined}
                                            onMouseUp={undefined}
                                            row={row}></Node>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }
}


const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: false,
        isEnd: false,
        distance: Infinity,
        isVisited: false,
        isBarrier: false,
        previousNode: null,
    };
};

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < GRID_ROWS; row++) {
        const currentRow = [];
        for (let col = 0; col < GRID_COLS; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};

const getGridWithNewNode = (grid, row, col) => {
    if (row === Pathfinder.startNodeRow && col === Pathfinder.startNodeCol) return;
    const newGrid = getInitialGrid();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isStart: !node.isStart
    };
    newGrid[row][col] = newNode;
    return newGrid;
}

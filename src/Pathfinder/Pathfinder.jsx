import React, { Component } from 'react';
import Node from './Node/Node.jsx';

import './Pathfinder.css';

const START_NODE_COL = 10;
const START_NODE_ROW = 11;

const END_NODE_COL = 40;
const END_NODE_ROW = 11;

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
                                            onMouseDown={undefined}
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
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === END_NODE_ROW && col === END_NODE_COL,
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
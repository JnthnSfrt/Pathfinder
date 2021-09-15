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
            stateName: 'idle',
        };
        this.setStartNode = this.setStartNode.bind(this);
        this.setEndNode = this.setEndNode.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({ grid });
    }

    handleMouseDown(row, col) {
        if (this.state.stateName === 'idle') return;
        const newGrid = getGridWithNewNode(this.state.grid, row, col, this.state.stateName);
        this.setState({ grid: newGrid, mouseIsPressed: true });
    }

    handleMouseUp(row, col) {
        if (this.state.mouseIsPressed) {
            this.setState({ mouseIsPressed: false, stateName: 'idle' });
        }
    }

    setStartNode() {
        if (this.stateName !== 'start') {
            this.setState({ stateName: 'start' });
        }
    }

    setEndNode() {
        if (this.state.stateName !== 'end') {
            this.setState({ stateName: 'end' });
        }
    }

    reset() {
        const grid = getInitialGrid();
        this.setState({ grid });
    }

    render() {
        const { grid, mouseIsPressed } = this.state;
        return (
            <>
                <div>StateName: {this.state.stateName}</div>
                <button onClick={this.setStartNode}>
                    Set start node
                </button>
                <button onClick={this.setEndNode}>
                    Set end node
                </button>
                <button onClick={this.reset}>Reset</button>
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
                                            onMouseUp={(row, col) => this.handleMouseUp(row, col)}
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

const getGridWithNewNode = (grid, row, col, state) => {
    const newGrid = getInitialGrid();
    const node = newGrid[row][col];
    var newNode = {
        ...node,
    };
    if (state === 'start') {
        newNode = {
            ...node,
            isStart: true
        };
    }
    else if (state === 'end') {
        newNode = {
            ...node,
            isEnd: true
        };
    }

    grid[row][col] = newNode;
    return grid;
}

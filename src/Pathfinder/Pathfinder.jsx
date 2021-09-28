import React, { Component } from 'react';

import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/Dijkstra.js';
import Node from './Node/Node.jsx';
import './Pathfinder.css';

const GRID_COLS = 70;
const GRID_ROWS = 27;

export default class Pathfinder extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      startNodes: [],
      mouseIsPressed: false,
      // Control the mouse behaviour 
      stateName: 'idle',
    };
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    if (this.state.stateName === 'idle') return;
    const newGrid = getGridWithNewNode(this.state.grid, row, col, this.state.stateName);
    this.setState({ grid: newGrid, mouseIsPressed: true });
    // After pressing the button to set walls hovering over the grid would start drawing walls. 
    // With an additional state walls are getting placed after a mouse click into a node.
    if (this.state.stateName === 'wall') {
      this.setState({ stateName: 'draw-wall' })
    }
  }

  handleMouseEnter(row, col) {
    if (this.state.stateName === 'draw-wall') {
      const newGrid = getGridWithNewNode(this.state.grid, row, col, this.state.stateName);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  }

  handleMouseUp(row, col) {
    if (this.state.mouseIsPressed) {
      this.setState({ mouseIsPressed: false, stateName: 'idle' });
    }
  }

  // Switch state to enable placing start node(s) with mouse click
  setStartNode() {
    if (this.stateName !== 'start') {
      this.setState({ stateName: 'start' });
    }
  }

  // Switch state to enable placing end node(s) with mouse click
  setEndNode() {
    if (this.state.stateName !== 'end') {
      this.setState({ stateName: 'end' });
    }
  }

  // Switch state to enable placing wall node(s) with mouse click
  setWallNode() {
    if (this.state.stateName !== 'wall') {
      this.setState({ stateName: 'wall' });
    }
  }

  // Removes all start, end and wall nodes
  reset() {
    // "cheap" way to reset the grid
    window.location.reload();
    //  const grid = getInitialGrid();
    //  this.setState({ grid });
  }

  getStartNodes(grid) {
    const startNodes = [];
    for (const row of grid) {
      for (const node of row) {
        if (node.isStart) startNodes.push(node);
      }
    }
    return startNodes;
  }

  getEndNodes(grid) {
    const endNodes = [];
    for (const row of grid) {
      for (const node of row) {
        if (node.isEnd) endNodes.push(node);
      }
    }
    return endNodes;
  }

  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  //Only handles one start and one end node
  visualizeAlgorithm() {
    const { grid } = this.state;
    const startNodes = this.getStartNodes(grid);
    const endNodes = this.getEndNodes(grid);

    const startNode = startNodes[0];
    const endNode = endNodes[0];

    const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder)
  }

  render() {
    const { grid, mouseIsPressed } = this.state;
    return (
      <>
        <div className="toolbar">
          <div className="toolbar">StateName: {this.state.stateName}</div>
          <button className="button" onClick={() => this.setStartNode()}>Set start node</button>
          <button className="button" onClick={() => this.setEndNode()}>Set end node</button>
          <button className="button" onClick={() => this.visualizeAlgorithm()}>Visualize Algorithm</button>
          <button className="button" onClick={() => this.setWallNode()}>Draw wall</button>
          <button className="button" onClick={() => this.reset()}>Reset</button>
        </div>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isEnd, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isEnd={isEnd}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                      onMouseUp={(row, col) => this.handleMouseUp(row, col)}
                      row={row} />
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
    isWall: false,
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

const getGridWithNewNode = (grid, row, col, stateName) => {
  const newGrid = getInitialGrid();
  const node = newGrid[row][col];
  switch (stateName) {
    case "start":
      var newNode = {
        ...node,
        isStart: true
      };
      break;
    case "end":
      var newNode = {
        ...node,
        isEnd: true
      };
      break;
    default:
      var newNode = {
        ...node,
        isWall: true
      }
      break;
  }
  grid[row][col] = newNode;
  return grid;
}

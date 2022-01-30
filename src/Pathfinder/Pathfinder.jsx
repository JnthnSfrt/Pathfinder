import React, { Component, useEffect, useState } from 'react';

import { dijkstra, getNodesInShortestPathOrder }
  from '../algorithms/Dijkstra.js';
import { primMaze } from '../algorithms/Maze/Prim.js';
import Node from './Node/Node.jsx';
import '../Styles/Sidebar.css'

import '../Styles/Pathfinder.css';

const MULTIPLIER = 1.25;

export default function Pathfinder(props) {
  const [grid, setGrid] = useState(getInitialGrid());
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [stateName, setStateName] = useState('idle');


  const componentDidMount = () => {
    const grid = getInitialGrid();
    setGrid(grid);
  }

  const handleMouseDown = (row, col) => {
    if (stateName === 'idle') return;
    const newGrid =
      getGridWithNewNode(grid, row, col, stateName);
    setGrid(newGrid);
    setIsMousePressed(true);
    // After pressing the button to set walls hovering over the grid 
    // would start drawing walls. With an additional state walls are 
    // getting placed after a mouse click into a node.  
    if (stateName === 'wall') {
      setStateName('draw-wall')
    }
  }

  const handleMouseEnter = (row, col) => {
    if (stateName === 'draw-wall') {
      const newGrid =
        getGridWithNewNode(grid, row, col, stateName);
      setGrid(grid);
      setIsMousePressed(true);
    }
  }

  const handleMouseUp = (row, col) => {
    if (isMousePressed) {
      setIsMousePressed(false);
      setStateName('idle');
      openSidebar();
    }
  }

  // Switch state to enable placing start node(s) with mouse click
  const setStartNode = () => {
    if (stateName !== 'start') {
      setStateName('start');
      closeSidebar();
    }
  }

  // Switch state to enable placing end node(s) with mouse click
  const setEndNode = () => {
    if (stateName !== 'end') {
      setStateName('end');
      closeSidebar();
    }
  }

  // Switch state to enable placing wall node(s) with mouse click
  const setWallNode = () => {
    if (stateName !== 'wall') {
      setStateName('wall');
      closeSidebar();
    }
  }

  // Removes all start, end and wall nodes
  const reset = () => {
    // "cheap" way to reset the grid
    window.location.reload();
    closeSidebar();
  }

  const closeSidebar = () => {
    document.getElementById("menu__toggle").checked = false;
  }

  const openSidebar = () => {
    document.getElementById("menu__toggle").checked = true;
  }

  const getStartNodes = (grid) => {
    const startNodes = [];
    for (const row of grid) {
      for (const node of row) {
        if (node.isStart) startNodes.push(node);
      }
    }
    return startNodes;
  }

  const getEndNodes = (grid) => {
    const endNodes = [];
    for (const row of grid) {
      for (const node of row) {
        if (node.isEnd) endNodes.push(node);
      }
    }
    return endNodes;
  }


  const animateAlgorithm =
    (visitedNodesInOrder, nodesInShortestPathOrder) => {
      for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
          setTimeout(() => {
            animateShortestPath(nodesInShortestPathOrder);
          }, 10 * i);
          return;
        }
        setTimeout(() => {
          const node = visitedNodesInOrder[i];
          document.getElementById(`node-${node.row}-${node.col}`)
            .className = 'node node-visited';
        }, 10 * i);
      }
    }

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  //Only handles one start and one end node
  const visualizeAlgorithm = () => {
    const startNodes = getStartNodes(grid);
    const endNodes = getEndNodes(grid);

    const startNode = startNodes[0];
    const endNode = endNodes[0];

    if (!startNode) {
      window.alert("Start node is missing!");
      return;
    }
    if (!endNode) {
      window.alert("End node is missing!");
      return;
    }
    const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    closeSidebar();
  }

  const visualizeMaze = () => {
    const maze = primMaze(grid);
    animateMaze(maze);
    closeSidebar();
  }

  const animateMaze = (maze) => {
    for (let col = 0; col < maze[0].length; col++) {
      for (let row = 0; row < maze.length; row++) {
        setTimeout(() => {
          setTimeout(() => {
            const node = maze[row][col];
            if (node.isWall === true) {
              document.getElementById(`node-${node.row}-${node.col}`).className =
                'node node-wall';
            }
          }, MULTIPLIER * 5 * col);
        }, MULTIPLIER * 305 * row);
      }
    }
    setTimeout(() => setGrid(maze), MULTIPLIER * 10000);
  }

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      reset();
    }, 250)
    window.addEventListener('resize', debouncedHandleResize)

    //Clean-up listener
    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  })

  return (
    <>
      {/* Sidebar */}
      <div className="Sidebar">
        <input id="menu__toggle" type="checkbox" />
        <label class="menu__btn" for="menu__toggle">
          <span></span>
        </label>
        <ul class="menu__box">
          <button class="menu__button" onClick=
            {() => setStartNode()}>Set start node</button>
          <button class="menu__button" onClick=
            {() => setEndNode()}>Set end node</button>
          <button class="menu__button" onClick=
            {() => visualizeAlgorithm()}>Visualize Algorithm</button>
          <button class="menu__button" onClick=
            {() => setWallNode()}>Draw wall</button>
          <button class="menu__button" onClick=
            {() => visualizeMaze()}>Visualize Maze</button>
          <button class="menu__button" onClick=
            {() => reset()}>Reset</button>
          <span id="dimension">{window.innerWidth} * {window.innerHeight}</span>
        </ul>
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
                    mouseIsPressed={isMousePressed}
                    onMouseDown={(row, col) =>
                      handleMouseDown(row, col)}
                    onMouseEnter={(row, col) =>
                      handleMouseEnter(row, col)}
                    onMouseUp={(row, col) =>
                      handleMouseUp(row, col)}
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

const createNode = (col, row) => {
  return {
    col: col,
    row: row,
    isStart: false,
    isEnd: false,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getInitialGrid = () => {
  const height = window.innerHeight;
  const width = window.innerWidth;
  const nodeDimension = 26;


  const rows = (height - 200) / nodeDimension;
  const cols = (width - 64) / nodeDimension;
  const grid = [];
  for (let row = 0; row < rows; row++) {
    const currentRow = [];
    for (let col = 0; col < cols; col++) {
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

//Reduces amount of resize events getting fired
//time in milliseconds
function debounce(fn, ms) {
  let timer
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}
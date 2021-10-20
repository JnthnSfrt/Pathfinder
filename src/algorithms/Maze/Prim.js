//1: Starte mit einem Koordinatensystem voller Wände -> getInitialGrid("walls");
//2: Nehme eine Zelle, markiere sie als Pfad -> Grid[random][random] = {..., isWall: false}
//3: Nachbarzellen (isWall: true) zu Liste hinzufügen
//4: !Liste.isEmpty
//  1: Liste[random]
//  2: 1 Nachbarzelle isWall 
//    1: -> Pfad
//    2: Nachbarzellen isWall -> Liste 
//  3: entferne Liste[random] von Liste 

export function primMaze(initialGrid) {
  const walls = [];
  const grid = prepareGrid(initialGrid);

  //Mark random node as start
  let rndRow = Math.floor(Math.random() * grid.length);
  let rndCol = Math.floor(Math.random() * grid[0].length);
  const rndNode = grid[rndRow][rndCol];
  rndNode.isWall = false;
  console.log(grid); //isWall true, rndNode isWall false

  var wallNeighbors = getAdjacentWalls(rndNode, grid);
  while (wallNeighbors.length) {
    walls.push(wallNeighbors.shift());
  }

  while (walls.length > 0) {
    var randomWall = walls[Math.floor(Math.random() * walls.length)];
    if (getAdjacents(randomWall, grid).length - 1 ===
      getAdjacentWalls(randomWall, grid).length) {
      // Make wall a passage
      randomWall.isWall = false;
      // mark the unvisited cell as part of the maze
      var wallNeighbors = getAdjacentWalls(randomWall, grid);
      while (wallNeighbors.length) {
        walls.push(wallNeighbors.shift());
      }
    }
    var randomWallIndex = walls.indexOf(randomWall);
    walls.splice(randomWallIndex, 1);
  }
  console.log(walls);
  return grid;
}

function prepareGrid(grid) {
  const newGrid = grid.map(row =>
    row.map(node => setWall(node)));
  return newGrid;
};

function setWall(node) {
  const newNode = { ...node, isWall: true }
  return newNode;
}

function getAdjacents(node, grid) {
  const adjacents = [];
  const { row, col } = node;
  //top
  if (row > 0) adjacents.push(grid[row - 1][col]);
  //bottom
  if (row + 1 < grid.length) adjacents.push(grid[row + 1][col]);
  //left
  if (col > 0) adjacents.push(grid[row][col - 1]);
  //right
  if (col + 1 < grid[0].length) adjacents.push(grid[row][col + 1]);
  console.log(adjacents);
  return adjacents;
}

function getAdjacentWalls(node, grid) {
  const adjacents = getAdjacents(node, grid);
  var adjacentWalls = [];
  for (var i = 0; i < adjacents.length; i++) {
    if (adjacents[i].isWall === true) {
      adjacentWalls.push(adjacents[i]);
    }
  }
  return adjacentWalls;
}


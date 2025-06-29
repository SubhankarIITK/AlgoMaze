
        class PathfindingVisualizer {
            constructor() {
                this.rows = 20;
                this.cols = 25;
                this.grid = [];
                this.start = { row: 5, col: 5 };
                this.end = { row: 15, col: 20 };
                this.isMouseDown = false;
                this.isRunning = false;
                this.mode = 'wall'; // wall, start, end
                
                this.initializeGrid();
                this.createGridHTML();
                this.bindEvents();
                this.updateStats(0, 0, 0);
            }

            initializeGrid() {
                this.grid = [];
                for (let row = 0; row < this.rows; row++) {
                    this.grid[row] = [];
                    for (let col = 0; col < this.cols; col++) {
                        this.grid[row][col] = {
                            row,
                            col,
                            isWall: false,
                            isVisited: false,
                            isPath: false,
                            distance: Infinity,
                            previousNode: null,
                            fScore: Infinity,
                            gScore: Infinity,
                            hScore: 0
                        };
                    }
                }
            }

            createGridHTML() {
                const gridElement = document.getElementById('grid');
                gridElement.innerHTML = '';
                
                for (let row = 0; row < this.rows; row++) {
                    for (let col = 0; col < this.cols; col++) {
                        const cell = document.createElement('div');
                        cell.className = 'cell';
                        cell.id = `cell-${row}-${col}`;
                        
                        if (row === this.start.row && col === this.start.col) {
                            cell.classList.add('start');
                        } else if (row === this.end.row && col === this.end.col) {
                            cell.classList.add('end');
                        }
                        
                        gridElement.appendChild(cell);
                    }
                }
            }

            bindEvents() {
                const grid = document.getElementById('grid');
                
                grid.addEventListener('mousedown', (e) => {
                    if (this.isRunning) return;
                    this.isMouseDown = true;
                    this.handleCellClick(e);
                });
                
                grid.addEventListener('mousemove', (e) => {
                    if (!this.isMouseDown || this.isRunning) return;
                    this.handleCellClick(e);
                });
                
                grid.addEventListener('mouseup', () => {
                    this.isMouseDown = false;
                });

                // Prevent context menu
                grid.addEventListener('contextmenu', (e) => e.preventDefault());

                // Right click for start/end placement
                grid.addEventListener('mousedown', (e) => {
                    if (e.button === 2) { // Right click
                        this.handleRightClick(e);
                    }
                });

                document.getElementById('visualize').addEventListener('click', () => this.startVisualization());
                document.getElementById('clearPath').addEventListener('click', () => this.clearPath());
                document.getElementById('clearAll').addEventListener('click', () => this.clearAll());
                document.getElementById('generateMaze').addEventListener('click', () => this.generateMaze());
            }

            handleCellClick(e) {
                if (!e.target.classList.contains('cell')) return;
                
                const [, row, col] = e.target.id.split('-').map(Number);
                
                if ((row === this.start.row && col === this.start.col) || 
                    (row === this.end.row && col === this.end.col)) {
                    return;
                }
                
                this.grid[row][col].isWall = !this.grid[row][col].isWall;
                e.target.classList.toggle('wall');
            }

            handleRightClick(e) {
                if (!e.target.classList.contains('cell')) return;
                e.preventDefault();
                
                const [, row, col] = e.target.id.split('-').map(Number);
                
                if (this.mode === 'start') {
                    this.setStart(row, col);
                    this.mode = 'end';
                    document.getElementById('modeInfo').textContent = 'Right-click to set END point';
                } else if (this.mode === 'end') {
                    this.setEnd(row, col);
                    this.mode = 'wall';
                    document.getElementById('modeInfo').textContent = 'Click and drag to draw walls. Right-click to set start/end points.';
                } else {
                    this.mode = 'start';
                    document.getElementById('modeInfo').textContent = 'Right-click to set START point';
                }
            }

            setStart(row, col) {
                document.getElementById(`cell-${this.start.row}-${this.start.col}`).classList.remove('start');
                this.start = { row, col };
                document.getElementById(`cell-${row}-${col}`).classList.add('start');
                this.grid[row][col].isWall = false;
                document.getElementById(`cell-${row}-${col}`).classList.remove('wall');
            }

            setEnd(row, col) {
                document.getElementById(`cell-${this.end.row}-${this.end.col}`).classList.remove('end');
                this.end = { row, col };
                document.getElementById(`cell-${row}-${col}`).classList.add('end');
                this.grid[row][col].isWall = false;
                document.getElementById(`cell-${row}-${col}`).classList.remove('wall');
            }

            async startVisualization() {
                if (this.isRunning) return;
                
                this.isRunning = true;
                document.getElementById('visualize').disabled = true;
                this.clearPath();
                
                const algorithm = document.getElementById('algorithm').value;
                const startTime = performance.now();
                
                let result;
                switch (algorithm) {
                    case 'dijkstra':
                        result = await this.dijkstra();
                        break;
                    case 'astar':
                        result = await this.aStar();
                        break;
                    case 'bfs':
                        result = await this.bfs();
                        break;
                    case 'dfs':
                        result = await this.dfs();
                        break;
                }
                
                const endTime = performance.now();
                
                if (result.found) {
                    await this.animatePath(result.path);
                    this.updateStats(result.visitedCount, result.path.length, Math.round(endTime - startTime));
                } else {
                    this.updateStats(result.visitedCount, 0, Math.round(endTime - startTime));
                    alert('No path found!');
                }
                
                this.isRunning = false;
                document.getElementById('visualize').disabled = false;
            }

            async dijkstra() {
                const visitedNodesInOrder = [];
                const unvisitedNodes = this.getAllNodes();
                
                this.grid[this.start.row][this.start.col].distance = 0;
                
                while (unvisitedNodes.length) {
                    this.sortNodesByDistance(unvisitedNodes);
                    const closestNode = unvisitedNodes.shift();
                    
                    if (closestNode.isWall) continue;
                    if (closestNode.distance === Infinity) break;
                    
                    closestNode.isVisited = true;
                    visitedNodesInOrder.push(closestNode);
                    
                    await this.animateNodeVisit(closestNode);
                    
                    if (closestNode.row === this.end.row && closestNode.col === this.end.col) {
                        return {
                            found: true,
                            path: this.getShortestPath(closestNode),
                            visitedCount: visitedNodesInOrder.length
                        };
                    }
                    
                    this.updateUnvisitedNeighbors(closestNode);
                }
                
                return { found: false, visitedCount: visitedNodesInOrder.length };
            }

            async aStar() {
                const openSet = [this.grid[this.start.row][this.start.col]];
                const visitedNodesInOrder = [];
                
                this.grid[this.start.row][this.start.col].gScore = 0;
                this.grid[this.start.row][this.start.col].fScore = this.heuristic(this.start, this.end);
                
                while (openSet.length > 0) {
                    openSet.sort((a, b) => a.fScore - b.fScore);
                    const current = openSet.shift();
                    
                    if (current.isWall) continue;
                    
                    current.isVisited = true;
                    visitedNodesInOrder.push(current);
                    
                    await this.animateNodeVisit(current);
                    
                    if (current.row === this.end.row && current.col === this.end.col) {
                        return {
                            found: true,
                            path: this.getShortestPath(current),
                            visitedCount: visitedNodesInOrder.length
                        };
                    }
                    
                    const neighbors = this.getNeighbors(current);
                    for (const neighbor of neighbors) {
                        if (neighbor.isWall || neighbor.isVisited) continue;
                        
                        const tentativeGScore = current.gScore + 1;
                        
                        if (tentativeGScore < neighbor.gScore) {
                            neighbor.previousNode = current;
                            neighbor.gScore = tentativeGScore;
                            neighbor.hScore = this.heuristic(neighbor, this.end);
                            neighbor.fScore = neighbor.gScore + neighbor.hScore;
                            
                            if (!openSet.includes(neighbor)) {
                                openSet.push(neighbor);
                            }
                        }
                    }
                }
                
                return { found: false, visitedCount: visitedNodesInOrder.length };
            }

            async bfs() {
                const queue = [this.grid[this.start.row][this.start.col]];
                const visitedNodesInOrder = [];
                
                this.grid[this.start.row][this.start.col].isVisited = true;
                
                while (queue.length > 0) {
                    const current = queue.shift();
                    visitedNodesInOrder.push(current);
                    
                    await this.animateNodeVisit(current);
                    
                    if (current.row === this.end.row && current.col === this.end.col) {
                        return {
                            found: true,
                            path: this.getShortestPath(current),
                            visitedCount: visitedNodesInOrder.length
                        };
                    }
                    
                    const neighbors = this.getNeighbors(current);
                    for (const neighbor of neighbors) {
                        if (!neighbor.isVisited && !neighbor.isWall) {
                            neighbor.isVisited = true;
                            neighbor.previousNode = current;
                            queue.push(neighbor);
                        }
                    }
                }
                
                return { found: false, visitedCount: visitedNodesInOrder.length };
            }

            async dfs() {
                const stack = [this.grid[this.start.row][this.start.col]];
                const visitedNodesInOrder = [];
                
                while (stack.length > 0) {
                    const current = stack.pop();
                    
                    if (current.isVisited || current.isWall) continue;
                    
                    current.isVisited = true;
                    visitedNodesInOrder.push(current);
                    
                    await this.animateNodeVisit(current);
                    
                    if (current.row === this.end.row && current.col === this.end.col) {
                        return {
                            found: true,
                            path: this.getShortestPath(current),
                            visitedCount: visitedNodesInOrder.length
                        };
                    }
                    
                    const neighbors = this.getNeighbors(current);
                    for (const neighbor of neighbors) {
                        if (!neighbor.isVisited && !neighbor.isWall) {
                            neighbor.previousNode = current;
                            stack.push(neighbor);
                        }
                    }
                }
                
                return { found: false, visitedCount: visitedNodesInOrder.length };
            }

            heuristic(nodeA, nodeB) {
                return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
            }

            getAllNodes() {
                const nodes = [];
                for (let row = 0; row < this.rows; row++) {
                    for (let col = 0; col < this.cols; col++) {
                        nodes.push(this.grid[row][col]);
                    }
                }
                return nodes;
            }

            sortNodesByDistance(unvisitedNodes) {
                unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
            }

            updateUnvisitedNeighbors(node) {
                const unvisitedNeighbors = this.getUnvisitedNeighbors(node);
                for (const neighbor of unvisitedNeighbors) {
                    neighbor.distance = node.distance + 1;
                    neighbor.previousNode = node;
                }
            }

            getUnvisitedNeighbors(node) {
                const neighbors = [];
                const { col, row } = node;
                
                if (row > 0) neighbors.push(this.grid[row - 1][col]);
                if (row < this.rows - 1) neighbors.push(this.grid[row + 1][col]);
                if (col > 0) neighbors.push(this.grid[row][col - 1]);
                if (col < this.cols - 1) neighbors.push(this.grid[row][col + 1]);
                
                return neighbors.filter(neighbor => !neighbor.isVisited);
            }

            getNeighbors(node) {
                const neighbors = [];
                const { col, row } = node;
                
                if (row > 0) neighbors.push(this.grid[row - 1][col]);
                if (row < this.rows - 1) neighbors.push(this.grid[row + 1][col]);
                if (col > 0) neighbors.push(this.grid[row][col - 1]);
                if (col < this.cols - 1) neighbors.push(this.grid[row][col + 1]);
                
                return neighbors;
            }

            getShortestPath(finishNode) {
                const nodesInShortestPathOrder = [];
                let currentNode = finishNode;
                
                while (currentNode !== null) {
                    nodesInShortestPathOrder.unshift(currentNode);
                    currentNode = currentNode.previousNode;
                }
                
                return nodesInShortestPathOrder;
            }

            async animateNodeVisit(node) {
                return new Promise(resolve => {
                    setTimeout(() => {
                        if (node.row !== this.start.row || node.col !== this.start.col) {
                            if (node.row !== this.end.row || node.col !== this.end.col) {
                                document.getElementById(`cell-${node.row}-${node.col}`).classList.add('visited');
                            }
                        }
                        resolve();
                    }, 50);
                });
            }

            async animatePath(path) {
                for (let i = 0; i < path.length; i++) {
                    const node = path[i];
                    await new Promise(resolve => {
                        setTimeout(() => {
                            if (node.row !== this.start.row || node.col !== this.start.col) {
                                if (node.row !== this.end.row || node.col !== this.end.col) {
                                    document.getElementById(`cell-${node.row}-${node.col}`).classList.add('path');
                                }
                            }
                            resolve();
                        }, 100);
                    });
                }
            }

            clearPath() {
                for (let row = 0; row < this.rows; row++) {
                    for (let col = 0; col < this.cols; col++) {
                        const cell = document.getElementById(`cell-${row}-${col}`);
                        cell.classList.remove('visited', 'path', 'current');
                        
                        this.grid[row][col].isVisited = false;
                        this.grid[row][col].isPath = false;
                        this.grid[row][col].distance = Infinity;
                        this.grid[row][col].previousNode = null;
                        this.grid[row][col].fScore = Infinity;
                        this.grid[row][col].gScore = Infinity;
                        this.grid[row][col].hScore = 0;
                    }
                }
                this.updateStats(0, 0, 0);
            }

            clearAll() {
                this.initializeGrid();
                this.createGridHTML();
                this.updateStats(0, 0, 0);
            }

            generateMaze() {
                this.clearAll();
                
                // Simple random maze generation
                for (let row = 0; row < this.rows; row++) {
                    for (let col = 0; col < this.cols; col++) {
                        if ((row === this.start.row && col === this.start.col) || 
                            (row === this.end.row && col === this.end.col)) {
                            continue;
                        }
                        
                        if (Math.random() < 0.3) {
                            this.grid[row][col].isWall = true;
                            document.getElementById(`cell-${row}-${col}`).classList.add('wall');
                        }
                    }
                }
            }

            updateStats(visited, pathLength, time) {
                document.getElementById('visitedCount').textContent = visited;
                document.getElementById('pathLength').textContent = pathLength;
                document.getElementById('executionTime').textContent = `${time}ms`;
            }
        }

        // Initialize the visualizer when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            new PathfindingVisualizer();
        });
    
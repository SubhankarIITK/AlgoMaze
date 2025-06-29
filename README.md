# 🗺️ Interactive Pathfinding Visualizer

A stunning web-based visualization tool for popular pathfinding algorithms, built with modern glassmorphism UI design and smooth animations.

![Pathfinding Visualizer Demo](https://img.shields.io/badge/Status-Live-brightgreen) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🚀 Features

### 🎯 Algorithms Implemented
- **Dijkstra's Algorithm** - Finds shortest path with optimal performance
- **A* Algorithm** - Heuristic-based pathfinding with Manhattan distance
- **Breadth-First Search (BFS)** - Guarantees shortest path in unweighted graphs
- **Depth-First Search (DFS)** - Explores paths using stack-based traversal

### 🎨 Modern UI Design
- **Glassmorphism Interface** - Stunning transparent effects with backdrop blur
- **Smooth Animations** - Fluid cell transitions and hover effects
- **Real-time Statistics** - Live tracking of visited nodes, path length, and execution time
- **Interactive Controls** - Intuitive click-and-drag wall creation
- **Responsive Design** - Works seamlessly across different screen sizes

### 🔧 Interactive Features
- **Dynamic Wall Creation** - Click and drag to draw obstacles
- **Start/End Point Placement** - Right-click to set custom start and end positions
- **Maze Generation** - Automatically generate random mazes for testing
- **Algorithm Comparison** - Switch between algorithms to see performance differences
- **Visual Feedback** - Color-coded cells showing algorithm progress

## 🎮 How to Use

1. **Setup Points**
   - Right-click on any cell to set the **Start Point** (Green)
   - Right-click again to set the **End Point** (Red)

2. **Create Obstacles**
   - Click and drag on empty cells to create **Walls** (Dark)
   - Walls block the pathfinding algorithms

3. **Choose Algorithm**
   - Select your preferred algorithm from the dropdown menu
   - Each algorithm has different characteristics and performance

4. **Visualize**
   - Click **"Start Visualization"** to watch the algorithm in action
   - Observe how different algorithms explore the search space

5. **Analyze Results**
   - View real-time statistics: visited nodes, path length, execution time
   - Compare different algorithms on the same maze

## 🛠️ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/SubhankarIITK/AlgoMaze.git
   cd pathfinding-visualizer
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your preferred browser
   open index.html
   # or
   python -m http.server 8000  # For local server
   ```

3. **Start exploring!**
   - No installation required - runs directly in the browser
   - Compatible with all modern browsers

## 📊 Algorithm Comparison

| Algorithm | Time Complexity | Space Complexity | Optimal Path | Best Use Case |
|-----------|----------------|------------------|--------------|---------------|
| **Dijkstra's** | O((V + E) log V) | O(V) | ✅ Yes | Weighted graphs, guaranteed shortest path |
| **A*** | O(b^d) | O(b^d) | ✅ Yes | When heuristic is available, faster than Dijkstra |
| **BFS** | O(V + E) | O(V) | ✅ Yes | Unweighted graphs, shortest path |
| **DFS** | O(V + E) | O(V) | ❌ No | Exploring all paths, not optimal |

## 🎨 Visual Elements

### Color Coding
- 🟢 **Green** - Start point
- 🔴 **Red** - End point  
- ⚫ **Dark** - Walls/obstacles
- 🔵 **Blue** - Visited cells
- 🟡 **Yellow** - Final path
- 🟣 **Purple** - Currently exploring

### Animation Effects
- **Smooth cell transitions** with scale animations
- **Glassmorphism panels** with backdrop blur effects
- **Hover interactions** with elevation changes
- **Path reconstruction** with sequential highlighting

## 🔧 Technical Implementation

### Core Technologies
- **HTML5** - Structure and semantic markup
- **CSS3** - Modern styling with glassmorphism effects
- **Vanilla JavaScript** - Algorithm implementation and DOM manipulation

### Key Features
- **ES6+ Syntax** - Modern JavaScript features
- **CSS Grid** - Responsive grid layout
- **Backdrop Filters** - Glassmorphism effects
- **CSS Animations** - Smooth transitions and effects
- **Event Handling** - Mouse interactions and controls

### Browser Compatibility
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ IE11+ (limited backdrop-filter support)

## 📱 Responsive Design

The visualizer adapts to different screen sizes:
- **Desktop** - Full feature set with large grid
- **Tablet** - Optimized touch interactions
- **Mobile** - Compact layout with essential features

## 🎯 Educational Value

Perfect for:
- **Computer Science Students** - Understanding algorithm behavior
- **Coding Interviews** - Visualizing pathfinding concepts
- **Algorithm Comparison** - Seeing performance differences
- **Interactive Learning** - Hands-on algorithm exploration

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Ideas for Contributions
- Add more algorithms (Bellman-Ford, Floyd-Warshall)
- Implement weighted edges
- Add sound effects
- Create more maze generation algorithms
- Mobile touch improvements
- Performance optimizations

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by classic pathfinding visualizers
- Modern UI design trends and glassmorphism
- Computer science education and algorithm visualization

## 📞 Contact

- **GitHub** - [@yourusername](https://github.com/SubhankarIITK)
- **Email** - subhankarsutradhar2004@gmail.com
- **LinkedIn** - [Your Name](https://linkedin.com/in/yourname)

---

⭐ **Star this repository if you found it helpful!**

📚 **Check out my other projects:** [Your Portfolio](https://yourportfolio.com)

#pathfinding #algorithms #visualization #javascript #glassmorphism #webdev
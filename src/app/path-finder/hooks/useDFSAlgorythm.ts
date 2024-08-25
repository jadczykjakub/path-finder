import { useState, useEffect } from 'react';

type TUseDFSAlgorytm = {
  setMaze: React.Dispatch<React.SetStateAction<string[][]>>;
  maze: string[][];
  mazeDimension: {
    width: number;
    height: number;
}
};

function useDFSAlgorythm({ setMaze, maze, mazeDimension }: TUseDFSAlgorytm) {
  const [timeoutIds, setTimeoutIds] = useState<NodeJS.Timeout[]>([]);

  function dfs(startNode: number[]) {
    let stack = [startNode];
    let visited = new Set(`${startNode[0]},${startNode[1]}`);

    function visitCell([x, y]: number[]) {
      setMaze((prevMaze) =>
        prevMaze.map((row, rowIndex) =>
          row.map((cell, cellIndex) => {
            if (rowIndex === y && cellIndex === x) {
              return cell === 'end' ? 'meetEnd' : 'visited';
            }
            return cell;
          })
        )
      );

      if (maze[y][x] === 'end') {
        console.log('path found!');
        return true;
      }
      return false;
    }

    function step() {
      if (stack.length === 0) {
        return;
      }
      const [x, y] = stack.pop() as number[];
      console.log('new step');
      const dirs = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];

      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;
        if (
          nx >= 0 &&
          nx < mazeDimension.width &&
          ny >= 0 &&
          ny < mazeDimension.height &&
          !visited.has(`${nx},${ny}`)
        ) {
          visited.add(`${nx},${ny}`);
          if (maze[ny][nx] === 'path' || maze[ny][nx] === 'end') {
            if (visitCell([nx, ny])) {
              return true;
            }
            stack.push([nx, ny]);
          }
        } // '2, 3'
      }
      const timeoutId = setTimeout(step, 40);
      setTimeoutIds((previousTimeoutIds) => [...previousTimeoutIds, timeoutId]);
    }

    step();
    return false;
  }

  const dfsRefresh = () => {
    timeoutIds.forEach(clearTimeout);
    setTimeoutIds([]);
  }

  useEffect(() => {
    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
      setTimeoutIds([]);
    };
  }, []);

  return { dfs, dfsRefresh };
}

export default useDFSAlgorythm;

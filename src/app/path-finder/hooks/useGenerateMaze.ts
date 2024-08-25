import { useState, useEffect } from 'react';

function useGenerateMaze(mazeDimension: { width: number; height: number }) {
  const [maze, setMaze] = useState<string[][]>([]);

  useEffect(() => {
    function generateMaze(height: number, width: number) {
      let matrix: string[][] = [];

      for (let i = 0; i < height; i++) {
        let row = [];
        for (let j = 0; j < width; j++) {
          row.push('wall');
        }
        matrix.push(row);
      }
      console.log(matrix);

      const dirs = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];

      function isCellValid(x: number, y: number) {
        return (
          y >= 0 && x >= 0 && x < width && y < height && matrix[y][x] === 'wall'
        );
      }

      function carvePath(x: number, y: number) {
        matrix[y][x] = 'path';

        const directions = dirs.sort(() => Math.random() - 0.5);

        for (let [dx, dy] of directions) {
          const nx = x + dx * 2;
          const ny = y + dy * 2;
          if (isCellValid(nx, ny)) {
            matrix[y + dy][x + dx] = 'path';
            carvePath(nx, ny);
          }
        }
      }

      carvePath(1, 1);

      matrix[1][0] = 'start';
      matrix[height - 2][width - 1] = 'end';
      
      setMaze(matrix);
    }

    generateMaze(mazeDimension.height, mazeDimension.width);
  }, [mazeDimension]);

  return { maze, setMaze };
}

export default useGenerateMaze;

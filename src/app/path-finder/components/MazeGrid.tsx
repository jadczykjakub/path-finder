'use client';
import React, { useState } from 'react';
import useGenerateMaze from '../hooks/useGenerateMaze';
import useBFSAlgorythm from '../hooks/useBFSAlgorythm';
import useDFSAlgorythm from '../hooks/useDFSAlgorythm';
import { Button } from '@nextui-org/button';

export default function MazeGrid({ width = 10, height = 10 }) {
  const [mazeDimension, setMazeDimension] = useState<{
    width: number;
    height: number;
  }>({ width, height });

  const { maze, setMaze } = useGenerateMaze(mazeDimension);

  const { bfs, bfsRefresh } = useBFSAlgorythm({
    setMaze,
    maze,
    mazeDimension,
    refresh: () => handleRefresh(),
  });

  const { dfs, dfsRefresh } = useDFSAlgorythm({ setMaze, maze, mazeDimension });

  const handleRefresh = () => {
    bfsRefresh();
    dfsRefresh();
    setMazeDimension({ ...mazeDimension });
  };

  return (
    <div className="flex flex-col gap-8 ">
      <div className="flex justify-center gap-4 flex-wrap">
        <Button color="primary" onClick={() => bfs([1, 0])}>
          Breadth-first Search
        </Button>
        <Button color="primary" onClick={() => dfs([1, 0])}>
          Deep-first Search
        </Button>
        <Button color="primary" onClick={() => handleRefresh()}>
          refresh
        </Button>
      </div>
      <div className="grid justify-items-center p-6 bg-white rounded-sm shadow-[0px_20px_21px_-12px_rgba(66,68,90,1)]">
        {maze?.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="row">
              {row.map((cell, cellIndex) => {
                return <div key={cellIndex} className={`cell ${cell}`}></div>;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

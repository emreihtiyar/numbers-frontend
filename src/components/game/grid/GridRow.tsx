'use client';

import GridCell from './GridCell';
import { GRID_SIZE } from '@/lib/constants';

interface GridRowProps {
  rowIndex: number;
  onCellClick: (colIndex: number) => void;
  onCellRightClick: (colIndex: number) => void;
  getCellNumber: (colIndex: number) => number | undefined;
  isClickable: (colIndex: number) => boolean;
  isLastNumber: (colIndex: number) => boolean;
}

export default function GridRow({ 
  onCellClick, 
  onCellRightClick,
  getCellNumber,
  isClickable,
  isLastNumber 
}: GridRowProps) {
  return (
    <div className="flex">
      {Array.from({ length: GRID_SIZE }).map((_, colIndex) => (
        <GridCell
          key={colIndex}
          number={getCellNumber(colIndex)}
          onClick={() => onCellClick(colIndex)}
          onRightClick={() => onCellRightClick(colIndex)}
          isClickable={isClickable(colIndex)}
          isLastNumber={isLastNumber(colIndex)}
        />
      ))}
    </div>
  );
} 
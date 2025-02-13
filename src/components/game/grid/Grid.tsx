'use client';

import { useState } from 'react';
import GridRow from './GridRow';
import ConfirmModal from '../ConfirmModal';
import { GRID_SIZE, MOVE_RULES, UNDO_RULES } from '@/lib/constants';
import { COLORS } from '@/styles/colors';
import { useGame } from '@/lib/contexts/GameContext';

interface PendingUndo {
  cellIndex: number;
  newNumber: number;
}

export default function Grid() {
  const { setMaxNumber, clickOrder, setClickOrder, nextNumber, setNextNumber } = useGame();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingUndo, setPendingUndo] = useState<PendingUndo | null>(null);

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (clickOrder.some(cell => cell.row === rowIndex && cell.col === colIndex)) {
      return;
    }

    if (!isValidMove(rowIndex, colIndex)) {
      return;
    }

    setClickOrder([...clickOrder, { row: rowIndex, col: colIndex, number: nextNumber }]);
    setMaxNumber(nextNumber);
    setNextNumber(nextNumber + 1);
  };

  const handleCellRightClick = (rowIndex: number, colIndex: number) => {
    const clickedCell = clickOrder.find(cell => cell.row === rowIndex && cell.col === colIndex);
    if (clickedCell) {
      const cellIndex = clickOrder.findIndex(cell => cell.number === clickedCell.number);
      const stepsBack = clickOrder.length - cellIndex;
      
      if (stepsBack <= UNDO_RULES.MAX_DIRECT_UNDO_STEPS) {
        setClickOrder(clickOrder.slice(0, cellIndex));
        setNextNumber(clickedCell.number);
      } else {
        setPendingUndo({
          cellIndex,
          newNumber: clickedCell.number + 1
        });
        setShowConfirmModal(true);
      }
    }
  };

  const handleConfirmUndo = () => {
    if (pendingUndo) {
      setClickOrder(clickOrder.slice(0, pendingUndo.cellIndex + 1));
      setNextNumber(pendingUndo.newNumber);
      setShowConfirmModal(false);
      setPendingUndo(null);
    }
  };

  const handleCancelUndo = () => {
    setShowConfirmModal(false);
    setPendingUndo(null);
  };

  const isValidMove = (rowIndex: number, colIndex: number) => {
    if (clickOrder.length === 0) return true;
    
    const lastCell = clickOrder[clickOrder.length - 1];
    const rowDiff = Math.abs(rowIndex - lastCell.row);
    const colDiff = Math.abs(colIndex - lastCell.col);

    if ((rowDiff === MOVE_RULES.VERTICAL_HORIZONTAL_DISTANCE && colDiff === 0) || 
        (colDiff === MOVE_RULES.VERTICAL_HORIZONTAL_DISTANCE && rowDiff === 0)) {
      return true;
    }

    if (rowDiff === MOVE_RULES.DIAGONAL_DISTANCE && colDiff === MOVE_RULES.DIAGONAL_DISTANCE) {
      return true;
    }

    return false;
  };

  const getCellNumber = (rowIndex: number, colIndex: number) => {
    const cell = clickOrder.find(cell => cell.row === rowIndex && cell.col === colIndex);
    return cell?.number;
  };

  const isClickable = (rowIndex: number, colIndex: number) => {
    if (clickOrder.some(cell => cell.row === rowIndex && cell.col === colIndex)) {
      return false;
    }
    
    return clickOrder.length === 0 || isValidMove(rowIndex, colIndex);
  };

  const isLastNumber = (rowIndex: number, colIndex: number) => {
    const lastCell = clickOrder[clickOrder.length - 1];
    return lastCell ? lastCell.row === rowIndex && lastCell.col === colIndex : false;
  };

  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <div className="w-full flex justify-center">
        <div className={`overflow-x-auto max-w-full transition-all duration-300 ${showConfirmModal ? 'blur-sm' : ''}`}>
          <div className={`border ${COLORS.CELL.BORDER} inline-block`}>
            {Array.from({ length: GRID_SIZE }, (_, rowIndex) => (
              <GridRow 
                key={rowIndex}
                rowIndex={rowIndex}
                onCellClick={(colIndex) => handleCellClick(rowIndex, colIndex)}
                onCellRightClick={(colIndex) => handleCellRightClick(rowIndex, colIndex)}
                getCellNumber={(colIndex) => getCellNumber(rowIndex, colIndex)}
                isClickable={(colIndex) => isClickable(rowIndex, colIndex)}
                isLastNumber={(colIndex) => isLastNumber(rowIndex, colIndex)}
              />
            ))}
          </div>
        </div>
      </div>
      <ConfirmModal 
        isOpen={showConfirmModal}
        onConfirm={handleConfirmUndo}
        onCancel={handleCancelUndo}
      />
    </div>
  );
} 
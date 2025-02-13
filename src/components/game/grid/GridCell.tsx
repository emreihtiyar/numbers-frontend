import { COLORS } from '@/styles/colors';

interface GridCellProps {
  onClick: () => void;
  onRightClick?: () => void;
  number?: number;
  isClickable: boolean;
  isLastNumber?: boolean;
}

export default function GridCell({ onClick, onRightClick, number, isClickable, isLastNumber }: GridCellProps) {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (number && onRightClick) {
      onRightClick();
    }
  };

  const cellClasses = [
    'w-12 h-12 sm:w-14 sm:h-14 border flex items-center justify-center transition-colors',
    COLORS.CELL.BORDER,
    isClickable 
      ? `${COLORS.CELL.CLICKABLE.BG} ${COLORS.CELL.CLICKABLE.HOVER} cursor-pointer`
      : `${COLORS.CELL.UNCLICKABLE.BG} ${COLORS.CELL.UNCLICKABLE.OPACITY} cursor-not-allowed`,
    isLastNumber ? `border-2 ${COLORS.CELL.HIGHLIGHT.BORDER}` : '',
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={cellClasses}
      onClick={isClickable ? onClick : undefined}
      onContextMenu={handleContextMenu}
    >
      {number && (
        <span className={`text-base sm:text-lg font-bold ${COLORS.CELL.NUMBER}`}>{number}</span>
      )}
    </div>
  );
} 
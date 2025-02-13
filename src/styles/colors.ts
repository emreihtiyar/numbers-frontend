export const COLORS = {
  CELL: {
    BORDER: 'border-gray-300',
    CLICKABLE: {
      BG: 'bg-purple-400/20',
      HOVER: 'hover:bg-purple-400/40',
    },
    UNCLICKABLE: {
      BG: 'bg-transparent',
      OPACITY: 'opacity-50',
    },
    HIGHLIGHT: {
      BORDER: 'border-purple-400',
    },
    NUMBER: 'text-purple-300',
  },
  BUTTON: {
    PRIMARY: {
      BG: 'bg-purple-600',
      HOVER: 'hover:bg-purple-700',
      TEXT: 'text-white',
    },
    SECONDARY: {
      BG: 'bg-gray-600',
      HOVER: 'hover:bg-gray-700',
      TEXT: 'text-white',
    },
  },
  MODAL: {
    BACKDROP: 'bg-black/30',
    BG: 'bg-gray-900/90',
    BORDER: 'border-purple-400',
    TEXT: 'text-white',
    HIGHLIGHT: 'text-purple-400',
  },
} as const; 
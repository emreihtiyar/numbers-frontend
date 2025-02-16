export const en = {
  buttons: {
    clear: 'Clear',
    confirm: 'Yes',
    cancel: 'No',
    close: 'Close',
    howToPlay: 'How to Play?',
    share: 'Share',
    topList: 'Top List',
  },
  modal: {
    multipleStepsUndo: 'Multiple steps will be undone. Are you sure?',
    clearConfirm: 'Are you sure you want to clear the game?',
    yourTime: 'Your Time',
    yourLastNumber: 'Your Last Number',
    share: {
      title: 'Share Your Result',
      username: 'Username',
      usernameError: 'Username must be between 3-20 characters',
      shareButton: 'Share',
      success: 'Your result has been shared successfully!',
      error: 'An error occurred while sharing your result'
    },
    topList: {
      title: 'Top Results',
      username: 'User',
      lastNumber: 'Last Number',
      time: 'Time',
      loading: 'Loading...',
      error: 'An error occurred while loading results'
    },
    howToPlay: {
      title: 'How to Play?',
      objective: 'Game Objective',
      objectiveText: 'Try to achieve the highest score by placing numbers according to specific rules.',
      rules: 'Game Rules',
      rulesList: [
        'Played on a 10x10 grid',
        'Each move must be made relative to the previous move:',
        '3 squares away horizontally or vertically',
        '2 squares away diagonally',
        'Numbers are placed in sequence starting from 1',
        'A square cannot be selected again once chosen',
        'Right-click to undo your last move',
        'The objective of the game is to achieve the highest score'
      ]
    }
  },
  stats: {
    time: 'Time',
    lastNumber: 'Last Number',
  },
} as const; 
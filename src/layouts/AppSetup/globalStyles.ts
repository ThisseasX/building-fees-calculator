export default {
  [['html', 'body', '#root'].join(',')]: {
    height: '100%',
  },
  '@keyframes saving-indicator': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(-360deg)',
    },
  },
};

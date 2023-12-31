export default {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%',
    gap: 4,
    '& > div': {
      width: 'calc(50% - 16px)',
      '@media (max-width: 900px)': {
        width: '100%',
      },
    },
  },
};

export default {
  root: {
    display: 'flex',
  },
  block: {
    width: '36px',
    height: '36px',
    minWidth: '36px',
    minHeight: '36px',
    border: '1px solid #ccc',
    p: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:first-of-type': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    '&:not(:first-of-type):not(:last-of-type)': {
      borderLeft: 'none',
      borderRight: 'none',
    },
    '&:last-of-type': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },
};

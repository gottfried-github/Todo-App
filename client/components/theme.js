import { createTheme } from '@mui/material/styles'

const palette = {
  backgrounds: {
    main: '#d3f1f3',
    light: '#b3e9f2',
    dark: '#c1e3ef',
  },
  util: {
    main: 'rgb(255, 255, 255)',
    light: 'rgb(255, 255, 255)',
    dark: 'rgba(0, 0, 0, 0.5)',
    darker: 'rgb(0, 0, 0)',
  },
  danger: {
    main: '#d34463',
    light: '#d34463',
    dark: '#d34463',
  },
}

const typography = {
  color: palette.util.dark,
  body2: {
    fontSize: '0.875rem',
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 400,
  },
}

const stylesButton = {
  padding: '2px 4px',
  color: `${palette.util.dark}`,
  backgroundColor: 'transparent',
  border: 'none',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: `${palette.backgrounds.light}`,
  },
}

export default createTheme({
  palette,
  typography,
  components: {
    MuiTextField: {
      styleOverrides: {
        // for variant='filled'
        root: {
          '& .MuiFilledInput-root::before, & .MuiFilledInput-root:hover::before': {
            border: 'none !important',
          },
          '& .MuiFilledInput-root::after, & .MuiFilledInput-root.Mui-focused::after': {
            border: 'none',
          },
          '& .MuiFilledInput-input': {
            padding: 8,
            fontSize: '0.875rem',
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          ...stylesButton,
          '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: `${palette.backgrounds.light}`,
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'base' },
          style: {
            ...stylesButton,
            lineHeight: 'normal',
            minWidth: 'auto',
          },
        },
        {
          props: { variant: 'main' },
          style: {
            padding: '2px 22px',
            fontSize: '1.125rem',
            fontWeight: 800,
            color: `${palette.util.darker}`,
            backgroundColor: `${palette.backgrounds.light}`,
            border: 'none',
            '&:hover': {
              backgroundColor: `${palette.backgrounds.dark}`,
            },
          },
        },
      ],
    },
  },
})

import { createTheme } from '@mui/material/styles'

const palette = {
  util: {
    main: 'rgb(255, 255, 255)',
    light: 'rgb(255, 255, 255)',
    dark: 'rgba(0, 0, 0, 0.5)',
    darker: 'rgb(0, 0, 0)',
    darkTransparent: 'rgba(0, 0, 0, 0.06)',
    shadow: 'rgba(86, 100, 104, 0.16)',
    green: '#589054',
    red: '#d34463',
    redTransparent: 'rgba(211, 68, 99, 0.3)',
  },
}

export default createTheme({
  palette,
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'danger' },
          style: {
            color: `${palette.util.red}`,
            '&:hover': {
              backgroundColor: `${palette.util.redTransparent}`,
            },
          },
        },
      ],
    },
  },
})

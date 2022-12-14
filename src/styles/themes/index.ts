import { createTheme, experimental_sx as sx } from "@mui/material/styles"

export const theme = createTheme({
    palette: {
	primary: {
	    main: "#89b4ff",
	},
	secondary: {
	    main: '#b2d2fd',
	}
    },
    components: {
	MuiContainer: {
	    styleOverrides: {
		root: {
		    border: "1px solid black",
		    width: 80,
		    height: 80,
		    borderRadius: 20,
		}
	    }
	},
	MuiTextField: {
	    styleOverrides: {
		root: sx({
		    // eslint-disable-next-line
		    // @ts-ignore
		    '& label': { paddingLeft: (theme) => theme.spacing(2) },
		    // eslint-disable-next-line
		    // @ts-ignore
		    '& input': { paddingLeft: (theme) => theme.spacing(3.5) },
		    '& fieldset': {
		    // eslint-disable-next-line
		    // @ts-ignore
			paddingLeft: (theme) => theme.spacing(2.5),
			borderRadius: '12px',
		    },
		})
	    }
	},
	MuiButton: {
	    styleOverrides: {
		root: sx({
		    '& fieldset': {
		    // eslint-disable-next-line
		    // @ts-ignore
			paddingLeft: (theme) => theme.spacing(2.5),
			borderRadius: '16px',
		    },
		})
	    }
	}
    },
})


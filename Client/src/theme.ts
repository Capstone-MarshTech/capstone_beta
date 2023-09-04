export const tokens = {
	primary: {
		// marsh-blue
		100: '#ccd5e4',
		200: '#99abc9',
		300: '#6680ad',
		400: '#335692',
		500: '#002c77',
		600: '#00235f',
		700: '#001a47',
		800: '#001230',
		900: '#000918',
	},

	black: {
		100: '#d1d3d5',
		200: '#a4a7ac',
		300: '#767a82',
		400: '#494e59',
		// Marsh Black 500: '#1b222f'
		500: '#1b222f',
		600: '#161b26',
		700: '#10141c',
		800: '#0b0e13',
		900: '#050709',
	},

	liblue: {
		// marsh-light-blue
		100: '#e4f6ff',
		200: '#c8edff',
		300: '#ade5ff',
		400: '#91dcff',
		500: '#76d3ff',
		600: '#5ea9cc',
		700: '#477f99',
		800: '#2f5466',
		900: '#182a33',
	},

	ligreen: {
		100: '#e0f5ff',
		200: '#c1ebff',
		300: '#a3e1ff',
		400: '#84d7ff',
		500: '#65cdff',
		600: '#51a4cc',
		700: '#3d7b99',
		800: '#285266',
		900: '#142933',
	},

	green: {
		// marsh-green
		100: '#cceae9',
		200: '#99d5d2',
		300: '#66c0bc',
		400: '#33aba5',
		500: '#00968f',
		600: '#007872',
		700: '#005a56',
		800: '#003c39',
		900: '#001e1d',
	},

	grey: {
		100: '#f0f0f3',
		200: '#e1e2e7',
		300: '#d1d3da',
		400: '#c2c5ce',
		500: '#b3b6c2',
		600: '#8f929b',
		700: '#6b6d74',
		800: '#48494e',
		900: '#242427',
	},

	secondary: {
		// yellow
		100: '#fcf0dd',
		200: '#fae1bb',
		300: '#f7d299',
		400: '#f5c377',
		500: '#f2b455',
		600: '#c29044',
		700: '#916c33',
		800: '#614822',
		900: '#302411',
	},
	tertiary: {
		// purple
		500: '#8884d8',
	},
	background: {
		light: '#fff',
		main: '#1f2026',
	},
};

// mui theme settings
export const themeSettings = {
	palette: {
		primary: {
			...tokens.primary,
			main: tokens.primary[500],
			light: tokens.primary[400],
		},
		secondary: {
			...tokens.secondary,
			main: tokens.secondary[500],
		},
		tertiary: {
			...tokens.tertiary,
		},
		grey: {
			...tokens.grey,
			main: tokens.grey[500],
		},
		background: {
			default: tokens.background.main,
			light: tokens.background.light,
		},
	},
	typography: {
		fontFamily: ['Noto Sans', 'sans-serif'].join(','),
		fontSize: 12,
		h1: {
			fontFamily: ['Noto Sans', 'sans-serif'].join(','),
			fontSize: 32,
			fontWeight: 800,
		},
		h2: {
			fontFamily: ['Noto Sans', 'sans-serif'].join(','),
			fontSize: 24,
		},
		h3: {
			fontFamily: ['Noto Sans', 'sans-serif'].join(','),
			fontSize: 24,
			fontWeight: 800,
			color: tokens.primary[500],
		},
		h4: {
			fontFamily: ['Noto Sans', 'sans-serif'].join(','),
			fontSize: 14,
			fontWeight: 600,
			color: tokens.primary[500],
		},
		h5: {
			fontFamily: ['Noto Sans', 'sans-serif'].join(','),
			fontSize: 12,
			fontWeight: 100,
			color: tokens.grey[500],
		},
		h6: {
			fontFamily: ['Noto Sans', 'sans-serif'].join(','),
			fontSize: 10,
			color: tokens.grey[100],
		},
	},
};

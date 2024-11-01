/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		fontFamily: {
				inter: ["Inter", "sans-serif"],
				poppins: ["Poppins", "sans-serif"]
			},
		extend: {
			colors: {
				navBlueLight: '#0C46BE0F',
        		navBlueDark: '#092C4C',
        		navGray: '#8F90A6',
				dashBlue: '#F2F8FD',
				tgray: '#585865',
				tLightPurple: '#6E7191',
				borange: '#ECA25D',
				bgreen: '#74CA9C'
			},
		}
	},
	plugins:[]
};

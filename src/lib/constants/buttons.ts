export interface STYLE {
	default: string;
	selected: string;
}
export const DARK: STYLE = {
	default:
		'text-white border-solid border border-neutral-800 bg-neutral-800 hover:bg-neutral-900 hover:border-neutral-900',
	selected:
		'text-neutral-600 border-solid border border-neutral-400 hover:border-neutral-700 hover:text-black'
};

export const LIME: STYLE = {
	default:
		'text-black border-solid border border-lime-300 bg-lime-300 hover:bg-lime-400 hover:border-lime-400',
	selected:
		'text-black border-solid border border-lime-300 hover:border-lime-400 hover:text-lime-500'
};

export const BLUE: STYLE = {
	default:
		'text-black border-solid border border-blue-300 bg-blue-300 hover:bg-blue-400 hover:border-blue-400',
	selected:
		'text-black border-solid border border-blue-300 hover:border-blue-400 hover:text-blue-500'
};

export const BLUE_DARK: STYLE = {
	default:
		'text-white border-solid border border-blue-500 bg-blue-500 hover:bg-blue-600 hover:border-blue-600',
	selected:
		'text-black border-solid border border-blue-500 hover:border-blue-600 hover:text-blue-700'
};

export const YELLOW: STYLE = {
	default:
		'text-black border-solid border border-yellow-300 bg-yellow-300 hover:bg-yellow-400 hover:border-yellow-400',
	selected:
		'text-black border-solid border border-yellow-300 hover:border-yellow-400 hover:text-yellow-500'
};

export const TEAL: STYLE = {
	default:
		'text-white border-solid border border-teal-600 bg-teal-600 hover:bg-teal-700 hover:border-teal-700',
	selected:
		'text-black border-solid border border-teal-500 hover:border-teal-400 hover:text-teal-500'
};

export const EMERALD: STYLE = {
	default:
		'text-white border-solid border border-emerald-600 bg-emerald-600 hover:bg-emerald-700 hover:border-emerald-700',
	selected:
		'text-black border-solid border border-emerald-500 hover:border-emerald-400 hover:text-emerald-500'
};

export const EMERALD_WHITE: STYLE = {
	default: 'text-black border-solid border border-white hover:text-emerald-500 hover:border-white',
	selected:
		'text-black border-solid border border-emerald-500 hover:border-emerald-400 hover:text-emerald-500'
};

export const DANGER: STYLE = {
	default:
		'text-white border-solid border border-red-800 bg-red-800 hover:bg-red-700 hover:border-red-700',
	selected: 'text-black border-solid border border-red-700 hover:border-red-600 hover:text-red-700'
};

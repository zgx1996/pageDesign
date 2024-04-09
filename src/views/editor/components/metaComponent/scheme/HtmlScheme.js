import { PROPS_TYPES } from '@/common/constants.js'

const Div = {
	propsConfig: {
		className: {
			label: '类名',
			type: PROPS_TYPES.stringArray,
		},
	},
    slots: {
        default: []
    }
}

const Span = {
	propsConfig: {
		className: {
			label: '类名',
			type: PROPS_TYPES.stringArray,
		},
	},
    slots: {
        default: []
    }
}

const Text = {
	propsConfig: {
		textContent: {
			label: '内容',
			type: PROPS_TYPES.string
		}
	},
    slots: {
        default: null
    }
}

const Ul = {
	propsConfig: {
		className: {
			label: '类名',
			type: PROPS_TYPES.stringArray,
		},
	},
    slots: {
        default: []
    },
}

const Li = {
	propsConfig: {
		className: {
			label: '类名',
			type: PROPS_TYPES.stringArray,
		},
	},
    slots: {
        default: []
    }
}



export default { Div, Span, Text, Ul, Li }
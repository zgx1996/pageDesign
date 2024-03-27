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

export default { Div }
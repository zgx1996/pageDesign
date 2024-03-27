import { PROPS_TYPES } from '@/common/constants.js'

const ElContainer = {
	propsConfig: {
		className: {
			label: '类名',
			type: PROPS_TYPES.stringArray,
		},
        direction: {
            label: '子元素排列方向',
			type: PROPS_TYPES.enum,
            enumData:[{label: 'vertical', value: 'vertical'}, {label: 'horizontal', value: 'horizontal'}]
        }
	},
    slots: {
        default: []
    }
}


const ElHeader = {
    propsConfig: {
		className: {
			label: '样式类名',
			type: PROPS_TYPES.string,
		},
        height: {
            label: '高度',
            type: PROPS_TYPES.string,
        }
	},
    slots: {
        default: []
    }
}

const ElAside = {
    propsConfig: {
		className: {
			label: '样式类名',
			type: PROPS_TYPES.string,
		},
        width: {
            label: '宽度',
            type: PROPS_TYPES.string,
        }
	},
    slots: {
        default: []
    }
}

const ElFooter = {
    propsConfig: {
		className: {
			label: '样式类名',
			type: PROPS_TYPES.string,
		},
        height: {
            label: '高度',
            type: PROPS_TYPES.string,
        }
	},
    slots: {
        default: []
    }
}

const ElMain = {
    slots: {
        default: []
    }
}

const ElRow = {
    propsConfig: {
		className: {
			type: PROPS_TYPES.string,
			label: '样式类名',
		},
        gutter: {
            type: PROPS_TYPES.number,
            label: '栅格间隔',
        },
        type: {
            type: PROPS_TYPES.string,
            label: '布局模式'
        },
        justify: {
            type: PROPS_TYPES.enum,
            label: '水平排列方式',
            enumData: [
                { label: 'start', value: 'start' },
                { label: 'end', value: 'end' },
                { label: 'center', value: 'center' },
                { label: 'space-around', value: 'space-around' },
                { label: 'space-between', value: 'space-between' },
            ]
        },
        align: {
            type: PROPS_TYPES.enum,
            label: '垂直排列方式',
            enumData: [
                { label: 'top', value: 'top' },
                { label: 'middle', value: 'middle' },
                { label: 'bottom', value: 'bottom' },
            ]
        },
        tag: {
            type: PROPS_TYPES.string,
            label: '自定义元素标签',
        }
    },
    slots: {
        default: []
    }
}

const ElCol = {
    propsConfig: {
		className: {
			label: '样式类名',
			type: PROPS_TYPES.string,
		},
        span: {
            label: '栅格占据的列数',
            type: PROPS_TYPES.number,
        },
        offset: {
            label: '栅格左侧的间隔格数',
            type: PROPS_TYPES.number,
        },
        push: {
            label: '栅格向右移动格数',
            type: PROPS_TYPES.number,
        },
        pull: {
            label: '栅格向左移动格数',
            type: PROPS_TYPES.number,
        }
	},
    slots: {
        default: []
    }
}


export default { ElContainer, ElHeader, ElAside, ElFooter, ElMain, ElRow, ElCol }
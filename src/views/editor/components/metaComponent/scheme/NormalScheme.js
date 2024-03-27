import { PROPS_TYPES } from '@/common/constants.js'

const ElButton = {
	propsConfig: {
		className: {
			label: '类名',
			type: PROPS_TYPES.stringArray,
		},
        size: {
            label: '尺寸',
            type: PROPS_TYPES.enum,
            enumData: [ { label: 'mini', value: 'mini'}, { label: 'small', value: 'small'}, { label: 'medium', value: 'medium'} ]
        },
        type: {
            label: '类型',
            type: PROPS_TYPES.enum,
            enumData: [ { label: 'primary', value: 'primary'}, { label: 'success', value: 'success'}, { label: 'warning', value: 'warning'}, { label: 'danger', value: 'danger'}, { label: 'info', value: 'info'}, { label: 'text', value: 'text'} ]
        },
        plain: {
            label: '是否朴素按钮',
            type: PROPS_TYPES.boolean
        },
        round: {
            label: '是否圆角按钮',
            type: PROPS_TYPES.boolean
        },
        cicle: {
            label: '是否圆形按钮',
            type: PROPS_TYPES.boolean
        },
        loading: {
            label: '是否加载中状态',
            type: PROPS_TYPES.boolean
        },
        disabled: {
            label: '是否禁用状态',
            type: PROPS_TYPES.boolean
        },
        icon: {
            label: '图标类名',
            type: PROPS_TYPES.boolean
        },
        autofocus: {
            label: '是否默认聚焦',
            type: PROPS_TYPES.boolean
        },
        nativeType: {
            label: '元素type属性',
            type: PROPS_TYPES.enum,
            enumData: [{label: 'button', value: 'button'}, {label: 'submit', value: 'submit'}, {label: 'reset', value: 'reset'}]
        },
	},
    slots: {
        default: []
    }
}


export default { ElButton }
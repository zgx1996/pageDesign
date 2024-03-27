import { PROPS_TYPES } from '@/common/constants.js'

const ElForm = {
	propsConfig: {
		className: {
			label: '类名',
			type: PROPS_TYPES.stringArray,
		},
        disabled: {
            label: '禁用',
            type: PROPS_TYPES.boolean
        },
        size: {
            label: '输入框尺寸',
            tip: '只在type不等于textarea时有效',
            type: PROPS_TYPES.enum,
            enumData: [ { label: 'mini', value: 'mini'}, { label: 'small', value: 'small'}, { label: 'medium', value: 'medium'} ]
        }
	},
    slots: {
        default: []
    }
}

const ElFormItem = {
	propsConfig: {
		className: {
			label: '类名',
			type: PROPS_TYPES.stringArray,
		},
        prop: {
            label: '表单域',
            type: PROPS_TYPES.string
        },
        label: {
            label: '标签',
            type: PROPS_TYPES.string
        },
        labelWidth: {
            type: PROPS_TYPES.string,
            label: '标签宽度',
        },
        required: {
            type: PROPS_TYPES.boolean,
            label: '是否必填',
        },
        rules: {
            type: PROPS_TYPES.objectArray,
            label: '校验规则',
        },
        error: {
            type: PROPS_TYPES.string,
            label: '表单域验证错误信息',
        },
        showMessage: {
            type: PROPS_TYPES.boolean,
            label: '是否显示校验错误信息',
        },
        inlineMessage: {
            type: PROPS_TYPES.boolean,
            label: '以行内形式展示校验信息'
        },
        size: {
            type: PROPS_TYPES.enum,
            label: '组件尺寸'
        }
	},
    slots: {
        default: [],
        label: []
    }
}

export default { ElForm, ElFormItem }
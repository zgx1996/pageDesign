import { PROPS_TYPES } from '@/common/constants.js'

const ElInput = {
	propsConfig: {
		className: {
			label: '类名',
			type: PROPS_TYPES.stringArray,
		},
        type: {
            label: '类型',
            type: PROPS_TYPES.enum,
            tip: '声明input类型, 同原生input的type值',
            enumData: [
                { label: 'text', value: 'text'},
                { label: 'textarea', value: 'textarea'},
                { label: 'file', value: 'file'},
                { label: 'image', value: 'image'},
                { label: 'password', value: 'password'},
                { label: 'radio', value: 'radio'},
                { label: 'submit', value: 'submit'},
                { label: 'button', value: 'button'},
                { label: 'checkbox', value: 'checkbox'},
            ]
        },
        'v-model': {
            label: '绑定值',
            type: PROPS_TYPES.string
        },
        maxlength: {
            label: '最大输入长度',
            type:PROPS_TYPES.number,
        },
        minlength: {
            label: '最小输入长度',
            type:PROPS_TYPES.number,
        },
        'show-word-limit': {
            label: '是否显示输入字数统计',
            tip: '只在类型为text或者textarea时有效',
            type: PROPS_TYPES.boolean
        },
        clearable: {
            label: '是否可清空',
            type: PROPS_TYPES.boolean
        },
        'show-password': {
            label: '是否显示切换密码图标',
            type: PROPS_TYPES.boolean
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

export default { ElInput }
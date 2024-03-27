import { PROPS_TYPES } from '@/common/constants.js'

const ElTable = {
    propsConfig: {
        className: {
			label: '类名',
			type: PROPS_TYPES.stringArray,
		},
        data: {
			label: '显示的数据',
			type: PROPS_TYPES.objectArray,
		},
        maxHeight: {
            label: '最大高度',
            type: PROPS_TYPES.string
        },
        stripe: {
            label: '是否斑马纹',
            type: PROPS_TYPES.boolean
        },
        border: {
            label: '是否带有纵向边框',
            type: PROPS_TYPES.boolean
        },
        size: {
            label: 'Table的尺寸',
            type: PROPS_TYPES.enum,
            enumData: [{label: 'medium', value: 'medium'}, {label: 'mini', value: 'mini'}, {label: 'small', value: 'small'}]
        },
        fit: {
            label: '列的宽度是否自撑开',
            type: PROPS_TYPES.boolean
        },
        showHeader: {
            label: '是否显示表头',
            type: PROPS_TYPES.boolean
        },
        highlightCurrentRow: {
            label: '是否高亮当前行',
            type: PROPS_TYPES.boolean
        },
    },
    slots: {
        default: [],
        append: []
    }
}

const ElTableColumn = {
    propsConfig: {
        type: {
            label: '类型',
            type: PROPS_TYPES.enum,
            enumData: [ {label: '多选', value: 'selection'}, {label: '显示索引', value: 'index'}, {label: '是否展开', value: 'expand'} ]
        },
        index: {
            label: '自定义索引',
            type: PROPS_TYPES.function,
            args: [{argCode: 'index', argName: '索引'}]
        },
        cloumnKey: {
            label: 'column的Key',
            type: PROPS_TYPES.string,
        },
        label: {
            label: '显示的标题',
            type: PROPS_TYPES.string,
        },
        prop: {
            label: '对应列内容的字段名',
            type: PROPS_TYPES.string,
        },
        width: {
            label: '对应列的宽度',
            type: PROPS_TYPES.string,
        },
    },
    slots: {
        default: [],
        header: []
    }
}

export default { ElTable, ElTableColumn }
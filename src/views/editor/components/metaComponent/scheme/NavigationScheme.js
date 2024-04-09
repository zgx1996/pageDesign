import { PROPS_TYPES } from '@/common/constants.js'

const ElTabs = {
    propsConfig: {
        className: {
			label: '类名',
			type: PROPS_TYPES.stringArray,
		},
        value: {
			label: '绑定值，选中选项卡的 name',
			type: PROPS_TYPES.string,
		},
        type: {
			label: '类型',
			type: PROPS_TYPES.enum,
            enumData: [{label: '卡片', value: 'card'}, {label: '边框卡片', value: 'border-card'}]
		},
        closable: {
            label: '标签是否可关闭',
            type: PROPS_TYPES.boolean,
        },
        addable: {
            label: '标签是否可增加',
            type: PROPS_TYPES.boolean,
        },
        editable: {
            label: '标签是否同时可增加和关闭',
            type: PROPS_TYPES.boolean,
        },
        tabPosition: {
            label: '选项卡所在位置',
            type: PROPS_TYPES.enum,
            enumData: [{label: '上', value: 'top'}, {label: '右', value: 'right'}, {label: '下', value: 'bottom'}, {label: '左', value: 'left'}]
        },
        stretch: {
            label: '标签的宽度是否自撑开',
            type: PROPS_TYPES.boolean,
        },
        beforeLeave: {
            label: '切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换',
            type: PROPS_TYPES.function
        }
    },
    slots: {
        default: [],
    }
}

const ElTabPane = {
    propsConfig: {
        label: {
            label: '选项卡标题',
			type: PROPS_TYPES.string,
        },
        disabled: {
            label: '是否禁用',
			type: PROPS_TYPES.boolean,
        },
        name: {
            label: '与选项卡绑定值value对应的标识符，表示选项卡别名',
			type: PROPS_TYPES.string,
        },
        closable: {
            label: '标签是否可关闭',
			type: PROPS_TYPES.boolean,
        },
        lazy: {
            label: '标签是否延迟渲染',
			type: PROPS_TYPES.boolean,
        }
    },
    slots: {
        default: []
    }
}

const ElMenu = {
    propsConfig: {
        mode: {
            label: '模式',
            type: PROPS_TYPES.enum,
            enumData: [ { label: '横向', value: 'horizontal' }, { label: '纵向', value: 'vertical' } ]
        },
        collapse: {
            label: '是否水平折叠收起菜单(仅在mode为vertical时可用)',
            type: PROPS_TYPES.boolean
        },
        backgroundColor: {
            type: '菜单的背景颜色',
            type: PROPS_TYPES.color
        },
        textColor: {
            type: '菜单的文字颜色',
            type: PROPS_TYPES.color
        },
        activeTextColor: {
            label: '当前激活菜单的文字颜色',
            type: PROPS_TYPES.color
        },
        defaultActive: {
            label: '当前激活菜单的index',
            type: PROPS_TYPES.string
        },
        defaultOpeneds: {
            label: '当前打开的subMenu的index的数组',
            type: PROPS_TYPES.stringArray,
        },
        uniqueOpened: {
            label: '是否只保存一个子菜单的展开',
            type: PROPS_TYPES.boolean
        },
        menuTrigger: {
            label: '子菜单打开的触发方式(只在mode为horizontal时有效)',
            type: PROPS_TYPES.enum,
            enumData: [ {label: '鼠标悬浮', value: 'hover' },  {label: '鼠标点击', value: 'click' } ]
        },
        router: {
            label: '是否使用vue-router的模式，启用该模式会在激活导航时以index作为path进行路由跳转',
            type: PROPS_TYPES.boolean
        },
        collapseTransition: {
            label: '是否开启折叠动画',
            type: PROPS_TYPES.boolean
        },
    },
    slots: {
        default: []
    },
    allowSubComponent: {
        default: ['ElSubmenu', 'ElMenuItem', 'ElMenuItemGroup']
    }
}

const ElSubmenu = {
    propsConfig: {
        index: {
            label: '唯一标识',
            type: PROPS_TYPES.string
        },
        popperClass: {
            label: '弹出菜单的自定义类名',
            type: PROPS_TYPES.string
        },
        showTimeout: {
            label: '展开subMenu的延时',
            type: PROPS_TYPES.number
        },
        hideTimeout: {
            label: '收起subMenu的延时',
            type: PROPS_TYPES.number
        },
        disabled: {
            label: '是否禁用',
            type: PROPS_TYPES.boolean
        },
        popperAppendToBody: {
            label: '是否将弹出菜单插入至body元素。在菜单的定位出现问题时，可尝试修改该属性',
            type: PROPS_TYPES.boolean
        }
    },
    slots: {
        default: [],
        title: []
    },
    allowSubComponent: {
        default: ['ElSubmenu', 'ElMenuItem', 'ElMenuItemGroup']
    }
}

const ElMenuItem = {
    propsConfig: {
        index: {
            label: '唯一标识',
            type: PROPS_TYPES.string
        },
        route: {
            label: 'Vue Router 路径对象',
            type: PROPS_TYPES.object,
        },
        disabled: {
            label: '是否禁用',
            type: PROPS_TYPES.boolean   
        }
    },
    slots: {
        default: []
    }
}

const ElMenuItemGroup = {
    propsConfig: {
        title: {
            label: '分组标题',
            type: PROPS_TYPES.string
        },
        
    },
    slots: {
        default: [],
        title: []
    },
    allowSubComponent: {
        default: ['ElMenuItem']
    }
}

export default { ElTabs, ElTabPane, ElMenu, ElSubmenu, ElMenuItem, ElMenuItemGroup }
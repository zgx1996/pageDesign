const componentCategory = { 
  'html': '原生',
  'navigation': '导航',
  'data': '数据',
  'normal': '常用',
  'layout': '布局',
  'form': '表单',
 
}

const elementUIComponentType = {
  Container: {
    components: {
      'ElContainer': {
        props: {
          direction: 'vertical'
        },
        style: {
          height: '100%'
        },
        metaInfo: {
          label: '布局组件',
        }
      },
      'ElHeader': {
        props:
        {

        },
        style: {
          width: '100%',
          height: '60px'
        },
        metaInfo: {
          label: '布局头部'
        }
      },
      'ElMain': {
        props:
        {

        },
        style: {
          width: '100%',
          height: '60px'
        },
        metaInfo: {
          label: '布局主体内容'
        }
      },
      'ElAside': {
        props:
        {

        }
        ,
        style: {
          width: '300px',
          height: '100%'
        },
        metaInfo: {
          label: '布局侧边栏'
        }
      },
      'ElFooter': {
        props: {

        },
        style: {
          width: '100%',
          height: '300px'
        },
        metaInfo: {
          label: '布局底部'
        }
      }
    },
    category: 'layout'
  },
  Layout: {
    components: {
      ElRow: {
        props: {
          value: null
        },
        style: {
          height: '200px',
        },
        metaInfo: { label: '栅格行' }
      },
      ElCol: {
        props: {
          span: 12,
          value: null
        },
        style: {
          height: '50px'
        },
        metaInfo: { label: '栅格列' }
      },
    },
    category: 'layout'
  },
  Input: {
    components: {
      ElInput: {
        props:
        {
          'v-model': ''
        },
        style: {
        },
        metaInfo: {
          label: '输入框'
        }
      }
    },
    category: 'form'
  },
  Form: {
    components: {
      ElForm: {
        props:
        {
        },
        style: {
          height: '200px'
        },
        metaInfo: {
          label: '表单'
        }
      },
      ElFormItem: {
        props:
        {
        },
        style: {
          height: '100%'
        },
        metaInfo: {
          label: '表单项'
        }
      }
    },
    category: 'form'
  },
  Normal: {
    components: {
      ElButton: {
        props:
        {
        },
        style: {
          height: '200px'
        },
        metaInfo: {
          label: '按钮'
        }
      },
    },
    category: 'normal'
  },
  Html: {
    components: {
      Div: {
        props:{
        },
        style: {
          height: '200px'
        },
        metaInfo: {
          label: 'Div标签'
        }
      },
      Span: {
        props:{
        },
        style: {
        },
        metaInfo: {
          label: 'span标签'
        }
      },
      Text: {
        props:{
        },
        style: {
        },
        metaInfo: {
          label: '文本标签'
        }
      }
    },
    category: 'html'
  },
  Data: {
    components: {
      ElTable: {
        props: {},
        style: {height: '400px'},
        metaInfo: {
          label:'表格'
        }
      },
      ElTableColumn: {
        props: {},
        metaInfo: {
          label:'表格列'
        }
      },
    },
    category: 'data'
  },
  Navigation: {
    components: {
      ElTabs: {
        props: {},
        style: {height: '400px'},
        metaInfo: {
          label:'标签页'
        }
      },
      ElTabPane: {
        props: {},
        style: {height: '400px'},
        metaInfo: {
          label:'选项卡'
        }
      },
      ElMenu: {
        props: {
        },
        style: {
          width: '300px',
          height: '100%',
        },
        metaInfo: {
          label: '导航菜单'
        }
      },
      ElSubmenu: {
        props: {
        },
        style: {
          width: '100%',
          height: '30px',
        },
        metaInfo: {
          label: '导航子菜单'
        }
      },
      ElMenuItem: {
        props: {
        },
        style: {
        },
        metaInfo: {
          label: '导航菜单项'
        }
      },
      ElMenuItemGroup: {
        props: {
          title: '默认分组标题'
        },
        metaInfo: {
          label: '导航菜单项组'
        }
      }
    },
    category: 'navigation'
  }
}

export { elementUIComponentType, componentCategory }
import ItemsSetting from './ItemsSetting';

export default [
  {
    id: 'padding',
    label: 'Padding',
    type: 'string',
    desc: 'Paddings of form'
  },
  {
    id: 'layout',
    label: 'Form Layout',
    type: 'enum',
    options: ['horizontal', 'vertical', 'inline'],
    antSetting: true,
    desc: 'Form layout',
  },
  {
    id: 'labelCol',
    label: 'Label Column',
    type: 'number',
    desc: 'The column span for labels'
  },
  {
    id: 'footerLayout',
    label: 'Footer Layout',
    type: 'enum',
    options: ['flex-start', 'center', 'flex-end'],
    desc: 'Footer layout',
  },
  {
    id: 'colon',
    label: 'Colon',
    type: 'boolean',
    antSetting: true,
    desc: 'Configure the default value of colon for Form.Item. Indicates whether the colon after the label is displayed (only effective when prop layout is horizontal)'
  },
  {
    id: 'api',
    label: 'API',
    type: 'string',
    desc: 'API to submit form data to'
  },
  {
    id: 'items',
    label: 'Form Items',
    type: 'Array<Object>',
    desc: 'Form Items',
    component: ItemsSetting
  }
]
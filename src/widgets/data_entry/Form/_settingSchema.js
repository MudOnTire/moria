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
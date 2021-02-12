import ItemsSetting from './ItemsSetting';

export default [
  {
    id: 'layout',
    label: 'Form Layout',
    type: 'enum',
    options: ['horizontal', 'vertical', 'inline'],
    antSetting: true,
    desc: 'Form layout',
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
    type: 'Array<object>',
    desc: 'Form Items',
    component: ItemsSetting
  }
]
import ItemsSetting from './ItemsSetting';

export default [
  {
    id: 'title',
    label: 'Title',
    type: 'string',
    antSetting: true,
    desc: 'Title of description',
  },
  {
    id: 'api',
    label: 'Source API',
    type: 'string',
    desc: 'API to fetch source data',
  },
  {
    id: 'items',
    label: 'Items',
    type: 'Array<Object>',
    desc: 'Description items',
    component: ItemsSetting
  }
]
import ColumnsSetting from './ColumnsSetting';

export default [
  {
    id: 'bordered',
    label: 'Bordered',
    type: 'boolean',
    antSetting: true,
    desc: 'Does table have border',
  },
  {
    id: 'sticky',
    label: 'Sticky',
    type: 'boolean',
    antSetting: true,
    desc: 'Set sticky header and scroll bar',
  },
  {
    id: 'api',
    label: 'Source API',
    type: 'string',
    desc: 'API to fetch source data',
  },
  {
    id: 'columns',
    label: 'Columns',
    type: 'array<Object>',
    desc: 'Columns of table',
    component: ColumnsSetting
  },
  {
    id: 'rowKey',
    label: 'Row Key',
    type: 'string',
    desc: `Row's unique key, could be a string`
  },
  {
    id: 'width',
    label: 'Width',
    type: 'string',
    desc: `Width of this column`
  },
]
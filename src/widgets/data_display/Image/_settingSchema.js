export default [
  {
    id: 'src',
    label: 'Src',
    type: 'string',
    desc: 'Image path',
  },
  {
    id: 'fallback',
    label: 'Fallback Src',
    type: 'string',
    desc: 'Load failure fault-tolerant src'
  },
  {
    id: 'width',
    label: 'Width',
    type: ['number', 'string'],
    desc: 'Image width',
  },
  {
    id: 'height',
    label: 'Height',
    type: ['number', 'string'],
    desc: 'Image height',
  },
  {
    id: 'alt',
    label: 'Alt',
    type: 'string',
    desc: 'Image description',
  }
]
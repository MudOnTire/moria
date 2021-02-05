export default [
  {
    id: 'height',
    label: 'Height',
    type: 'string',
    desc: 'Height flex container',
  },
  {
    id: 'flexDirection',
    label: 'Flex Direction',
    type: 'enum',
    options: ['column', 'row'],
    desc: 'Direction of flex container',
  },
  {
    id: 'justifyContent',
    label: 'Justify Content',
    type: 'enum',
    options: ['flex-start', 'flex-end', 'center'],
    desc: 'Justify Content of flex container',
  },
  {
    id: 'alignItems',
    label: 'Align Items',
    type: 'enum',
    options: [
      /* Global values */
      'inherit',
      'initial',
      'unset',
      /* Basic keywords */
      'normal',
      'stretch',
      /* Positional alignment */
      'center',
      'start',
      'end',
      'flex-start',
      'flex-end',
      /* Baseline alignment */
      'baseline',
      'first baseline',
      'last baseline',
      'safe center',
      'unsafe center'
    ],
    desc: 'Align Items of flex container',
  },
]
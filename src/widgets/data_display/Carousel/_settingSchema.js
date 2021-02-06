export default [
  {
    id: 'count',
    label: 'Slides count',
    type: 'number',
    desc: 'Slides count',
  },
  {
    id: 'autoplay',
    label: 'Autoplay',
    type: 'boolean',
    desc: 'Whether to scroll automatically',
  },
  {
    id: 'dots',
    label: 'Show Dots',
    type: 'boolean',
    desc: 'Whether to show the dots at the bottom of the gallery',
  },
  {
    id: 'dotPosition',
    label: 'Dot Position',
    type: 'enum',
    options: ['top', 'bottom', 'left', 'right'],
    desc: 'The position of the dots, which can be one of top bottom left right',
  },
  {
    id: 'easing',
    label: 'Easing',
    type: 'enum',
    options: ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'],
    desc: 'Transition interpolation function name',
  },
  {
    id: 'effect',
    label: 'Effect',
    type: 'enum',
    options: ['scrollx', 'fade'],
    desc: 'Transition effect	',
  }
]
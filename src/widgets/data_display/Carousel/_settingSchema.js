import Slides from './Slides';

export default [
  {
    id: 'count',
    label: 'Slides count',
    type: 'number',
    desc: 'Slides count',
  },
  {
    id: 'slides',
    label: 'Slides',
    type: 'array<string>',
    desc: 'Slide images',
    component: Slides
  },
  {
    id: 'autoplay',
    label: 'Autoplay',
    type: 'boolean',
    antSetting: true,
    desc: 'Whether to scroll automatically',
  },
  {
    id: 'dots',
    label: 'Show Dots',
    type: 'boolean',
    antSetting: true,
    desc: 'Whether to show the dots at the bottom of the gallery',
  },
  {
    id: 'dotPosition',
    label: 'Dot Position',
    type: 'enum',
    options: ['top', 'bottom', 'left', 'right'],
    antSetting: true,
    desc: 'The position of the dots, which can be one of top bottom left right',
  },
  {
    id: 'easing',
    label: 'Easing',
    type: 'enum',
    options: ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'],
    antSetting: true,
    desc: 'Transition interpolation function name',
  },
  {
    id: 'effect',
    label: 'Effect',
    type: 'enum',
    options: ['scrollx', 'fade'],
    antSetting: true,
    desc: 'Transition effect	',
  }
]
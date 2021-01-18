import { Input, Select, Switch, TimePicker } from 'antd';

const widgets = [
  {
    category: "Form Widgets",
    list: [
      {
        id: '00-00',
        name: "Input",
        component: Input
      },
      {
        id: '00-01',
        name: "Select",
        component: Select
      },
      {
        id: '00-02',
        name: "Switch ",
        component: Switch
      },
      {
        id: '00-03',
        name: "Time Picker",
        component: TimePicker
      },
    ]
  }
]

const cache = {}

const queryWidget = (id) => {
  if (cache[id]) return cache[id];
  for (const category of widgets) {
    for (const widget of category.list) {
      if (widget.id === id) {
        cache[id] = widget;
        return widget;
      }
    }
  }
}

export default widgets;
export { queryWidget };
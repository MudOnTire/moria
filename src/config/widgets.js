import { Input, Select, Switch, TimePicker } from 'antd';

const widgets = [
  {
    category: "Form Widgets",
    list: [
      {
        id: 'form-input',
        name: "Input",
        component: Input
      },
      {
        id: 'form-select',
        name: "Select",
        component: Select
      },
      {
        id: 'form-switch',
        name: "Switch ",
        component: Switch
      },
      {
        id: 'form-timepicker',
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
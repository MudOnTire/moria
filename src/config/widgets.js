import { Input, Select, Switch, TimePicker } from 'antd';
import WidgetsContainer from 'Src/components/WidgetsContainer';

const widgets = [
  {
    category: "Container",
    list: [
      {
        widgetId: "widget-container",
        name: "Widget Container",
        component: WidgetsContainer
      }
    ]
  },
  {
    category: "Form Widgets",
    list: [
      {
        widgetId: 'form-input',
        name: "Input",
        component: Input
      },
      {
        widgetId: 'form-select',
        name: "Select",
        component: Select
      },
      {
        widgetId: 'form-switch',
        name: "Switch ",
        component: Switch
      },
      {
        widgetId: 'form-timepicker',
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
      if (widget.widgetId === id) {
        cache[id] = widget;
        return widget;
      }
    }
  }
}

export default widgets;
export { queryWidget };
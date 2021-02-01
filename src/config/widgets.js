import { Input, Select, Switch, TimePicker } from 'antd';
import WidgetsContainer from 'Src/components/WidgetsContainer';

const WIDGET_IDs = {
  WIDGET_CONTAINER: 'WIDGET_CONTAINER',
  FORM_INPUT: 'FORM_INPUT',
  FORM_SELECT: 'FORM_SELECT',
  FORM_SWITCH: 'FORM_SWITCH',
  FORM_TIME_PICKER: 'FORM_TIME_PICKER'
}

const widgets = [
  {
    category: "Container",
    list: [
      {
        widgetId: WIDGET_IDs.WIDGET_CONTAINER,
        name: "Widget Container",
        component: WidgetsContainer
      }
    ]
  },
  {
    category: "Form Widgets",
    list: [
      {
        widgetId: WIDGET_IDs.FORM_INPUT,
        name: "Input",
        component: Input
      },
      {
        widgetId: WIDGET_IDs.FORM_SELECT,
        name: "Select",
        component: Select
      },
      {
        widgetId: WIDGET_IDs.FORM_SWITCH,
        name: "Switch ",
        component: Switch
      },
      {
        widgetId: WIDGET_IDs.FORM_TIME_PICKER,
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
export { queryWidget, WIDGET_IDs };
import WIDGET_IDs from 'Src/config/widgetIds';
import { WidgetsContainer, GridContainer, Image, Carousel, Table, Description, Form, Line } from 'Src/widgets';

const widgets = [
  {
    category: "Container",
    list: [
      {
        widgetId: WIDGET_IDs.WIDGET_CONTAINER,
        name: "Widget Container",
        component: WidgetsContainer
      },
      // {
      //   widgetId: WIDGET_IDs.GRID_CONTAINER,
      //   name: "Grid Container",
      //   component: GridContainer
      // }
    ]
  },
  {
    category: "Data Display",
    list: [
      {
        widgetId: WIDGET_IDs.DATA_DISPLAY_IMAGE,
        name: "Image",
        component: Image
      },
      {
        widgetId: WIDGET_IDs.DATA_DISPLAY_CAROUSEL,
        name: "Carousel",
        component: Carousel
      },
      {
        widgetId: WIDGET_IDs.DATA_DISPLAY_TABLE,
        name: "Table",
        component: Table
      },
      {
        widgetId: WIDGET_IDs.DATA_DISPLAY_DESCRIPTION,
        name: "Description",
        component: Description
      },
    ]
  },
  {
    category: 'Data Entry',
    list: [
      {
        widgetId: WIDGET_IDs.DATA_ENTRY_FORM,
        name: "Form",
        component: Form
      }
    ]
  },
  {
    category: 'Chart',
    list: [
      {
        widgetId: WIDGET_IDs.CHART_LINE,
        name: "Line",
        component: Line
      }
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
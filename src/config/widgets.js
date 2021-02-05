import WidgetsContainer from 'Src/components/WidgetsContainer';
import WIDGET_IDs from 'Src/config/widgetIds';
import { Image, Carousel } from 'Src/widgets';

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
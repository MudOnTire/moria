import WIDGET_IDs from './widgetIds';
import widgetsContainer from 'Src/widgets/container/WidgetsContainer/_defaultSettings';
import gridContainer from 'Src/widgets/container/GridContainer/_defaultSettings';
import image from 'Src/widgets/data_display/Image/_defaultSettings';
import carousel from 'Src/widgets/data_display/Carousel/_defaultSettings';
import table from 'Src/widgets/data_display/Table/_defaultSettings';
import description from 'Src/widgets/data_display/Description/_defaultSettings';
import form from 'Src/widgets/data_entry/Form/_defaultSettings';
import raw from 'Src/widgets/chart/Raw/_defaultSettings';
import line from 'Src/widgets/chart/Line/_defaultSettings';

export default {
  [WIDGET_IDs.WIDGET_CONTAINER]: widgetsContainer,
  [WIDGET_IDs.GRID_CONTAINER]: gridContainer,
  [WIDGET_IDs.DATA_DISPLAY_IMAGE]: image,
  [WIDGET_IDs.DATA_DISPLAY_CAROUSEL]: carousel,
  [WIDGET_IDs.DATA_DISPLAY_TABLE]: table,
  [WIDGET_IDs.DATA_DISPLAY_DESCRIPTION]: description,
  [WIDGET_IDs.DATA_ENTRY_FORM]: form,
  [WIDGET_IDs.CHART_RAW]: raw,
  [WIDGET_IDs.CHART_LINE]: line,
};

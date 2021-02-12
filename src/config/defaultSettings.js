import WIDGET_IDs from './widgetIds';
import widgetsContainer from 'Src/widgets/container/WidgetsContainer/_defaultSettings';
import image from 'Src/widgets/data_display/Image/_defaultSettings';
import carousel from 'Src/widgets/data_display/Carousel/_defaultSettings';
import table from 'Src/widgets/data_display/Table/_defaultSettings';
import description from 'Src/widgets/data_display/Description/_defaultSettings';
import form from 'Src/widgets/data_entry/Form/_defaultSettings';

export default {
  [WIDGET_IDs.WIDGET_CONTAINER]: widgetsContainer,
  [WIDGET_IDs.DATA_DISPLAY_IMAGE]: image,
  [WIDGET_IDs.DATA_DISPLAY_CAROUSEL]: carousel,
  [WIDGET_IDs.DATA_DISPLAY_TABLE]: table,
  [WIDGET_IDs.DATA_DISPLAY_DESCRIPTION]: description,
  [WIDGET_IDs.DATA_ENTRY_FORM]: form,
};

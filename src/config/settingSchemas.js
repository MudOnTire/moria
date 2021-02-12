import WIDGET_IDs from './widgetIds';
import widgetsContainer from 'Src/widgets/container/WidgetsContainer/_settingSchema';
import image from 'Src/widgets/data_display/Image/_settingSchema';
import carousel from 'Src/widgets/data_display/Carousel/_settingSchema';
import table from 'Src/widgets/data_display/Table/_settingSchema';
import description from 'Src/widgets/data_display/Description/_settingSchema';

export default {
  [WIDGET_IDs.WIDGET_CONTAINER]: widgetsContainer,
  [WIDGET_IDs.DATA_DISPLAY_IMAGE]: image,
  [WIDGET_IDs.DATA_DISPLAY_CAROUSEL]: carousel,
  [WIDGET_IDs.DATA_DISPLAY_TABLE]: table,
  [WIDGET_IDs.DATA_DISPLAY_DESCRIPTION]: description
}
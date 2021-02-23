import React, { useMemo, useContext } from 'react';
import WidgetWrapper from 'Src/components/WidgetWrapper';
import GridCell from './GridCell';
import defaultSettings from 'Src/config/defaultSettings';
import { context, actions } from 'Src/store';
import WIDGET_IDs from 'Src/config/widgetIds';
import { insertTreeItem } from 'Src/uitls/fns';
import { queryWidget } from 'Src/config/widgets';

import styles from './styles.module.scss';

export default function Grid({ config }) {

  const store = useContext(context);
  const { dispatch, pageConfig } = store;

  const finalSettings = useMemo(() => {
    return {
      ...defaultSettings[config.widgetId],
      ...config.settings
    }
  }, [config]);

  const { children } = config
  const { rows, cols } = finalSettings;

  const handleDrop = ({ type, id }, index) => {
    if (!type || !id) return;
    if (type === 'widgetClass') {
      const widgetId = id;
      const newId = `${widgetId}_${new Date().valueOf()}`;
      const child = {
        id: newId,
        widgetId,
        settings: {}
      };
      if (widgetId === WIDGET_IDs.WIDGET_CONTAINER) {
        child.children = [];
      }
      if (!config.children) config.children = [];
      config.children[index] = child;
      dispatch({
        type: actions.UPDATE_PAGE_CONFIG,
        payload: pageConfig
      });
    }
    if (type === 'widgetInstance') {
      insertTreeItem(pageConfig.children, id, config.id, index);
      dispatch({
        type: actions.UPDATE_PAGE_CONFIG,
        payload: pageConfig
      });
    }
  }

  return (
    <WidgetWrapper config={config}>
      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
        }}>
        {
          [...Array(rows * cols).keys()].map((index) => {
            const child = children?.length > index ? children[index] : null;
            let widget = null;
            if (child) {
              widget = queryWidget(child.widgetId);
            }
            return (
              <GridCell onDrop={(data) => handleDrop(data, index)} key={index}>
                {
                  widget ?
                    <widget.component config={child} />
                    :
                    null
                }
              </GridCell>
            )
          })
        }
      </div>
    </WidgetWrapper>
  )
}

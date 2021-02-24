import React, { useState, useEffect, useContext } from 'react';
import { context, actions } from 'Src/store';
import AssetDrawer from 'Src/components/AssetDrawer';
import Draft from 'Src/components/Draft';
import SettingDrawer from 'Src/components/SettingDrawer';
import Resizer from 'Src/components/Resizer';

import styles from './styles.module.scss';

const resizerWidth = 4;

export default function Editor() {
  const store = useContext(context);
  const { dispatch, configingWidgetId } = store;

  const [resizerActive, setResizerActive] = useState(false);
  const [mouseX, setMouseX] = useState(null);
  const [resizerRight, setResizerRight] = useState(0);

  useEffect(() => {
    dispatch({
      type: actions.SET_EDIT_MODE,
      payload: 'edit'
    });
  }, []);

  useEffect(() => {
    if (mouseX === null) return;
    setResizerRight(window.innerWidth - mouseX);
  }, [mouseX])

  useEffect(() => {
    if (!configingWidgetId) {
      setResizerRight(0)
    } else {
      if (resizerRight) return;
      setResizerRight(configingWidgetId && 320 - 2 * resizerWidth);
    }
  }, [configingWidgetId]);

  const handleKeyDown = (e) => {
    if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      dispatch({
        type: actions.SET_SAVE_TRIGGER,
        payload: new Date().valueOf()
      });
    }
  }

  // listen events start
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);
  // listen events end

  const handleMouseMove = (e) => {
    if (resizerActive) {
      setMouseX(e.screenX);
    }
  }

  const onResizeActive = () => {
    setResizerActive(true);
  }

  const onResizeDeactive = () => {
    setResizerActive(false);
  }

  return (
    <div
      className={styles.editor}
      onMouseMove={handleMouseMove}
      onMouseUp={onResizeDeactive}
    >
      <AssetDrawer />
      <Draft style={{ right: resizerRight + resizerWidth }} />
      {
        configingWidgetId &&
        <Resizer right={resizerRight} onActive={onResizeActive} />
      }
      <SettingDrawer style={{ width: resizerRight }} />
    </div>
  )
}

import React, { useReducer } from 'react';
import WIDGET_IDs from 'Src/config/widgetIds';
import { removeTreeItem, updateTreeItem } from 'Src/uitls/fns';

const actions = {
  UPDATE_PAGE_CONFIG: 'UPDATE_PAGE_CONFIG', // 更新页面配置文件
  SET_CONFIGING_WIDGET: 'SET_CONFIGING_WIDGET', // 设置正在被设置的widget的config
  DELETE_WIDGET_CONFIG: 'DELETE_WIDGET_CONFIG', // 删除widget的config
  SET_HOVERING_WIDGET: 'SET_HOVERING_WIDGET', // 设置当前hover的widget
  UPDATE_WIDGET_SETTINGS: 'UPDATE_WIDGET_SETTINGS', // 设置widget的settings
  SET_DEVICE_TYPE: 'SET_DEVICE_TYPE', // Draft 的屏幕宽度
  SET_EDIT_MODE: 'SET_EDIT_MODE' // 设置是否是edit还是preview模式
}

const initialState = {
  pageConfig: {
    id: 'root',
    widgetId: WIDGET_IDs.WIDGET_CONTAINER, // 组件类型Id
    children: [], // 子组件
    settings: {} // 该组件的相关配置
  }, // 页面配置文件
  configingWidgetId: '', // 正在被设置的widget id
  hoveringWidgetId: '', // 当前hover的widget id
  deviceType: 'desktop', // desktop, tablet, mobile
  editMode: 'edit', // edit, preview
  dispatch: () => { },
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.UPDATE_PAGE_CONFIG: {
      return { ...state, pageConfig: payload };
    }
    case actions.SET_CONFIGING_WIDGET: {
      return { ...state, configingWidgetId: payload };
    }
    case actions.DELETE_WIDGET_CONFIG: {
      // payload is id
      if (payload === state.pageConfig.id) return state;
      const updatedChildren = removeTreeItem(state.pageConfig.children, payload);
      return {
        ...state,
        pageConfig: {
          ...state.pageConfig,
          children: updatedChildren
        }
      }
    }
    case actions.SET_HOVERING_WIDGET: {
      return { ...state, hoveringWidgetId: payload }
    }
    case actions.UPDATE_WIDGET_SETTINGS: {
      const { id, settings } = payload;
      if (id === 'root') {
        return {
          ...state,
          pageConfig: {
            ...state.pageConfig,
            settings
          }
        }
      }
      const updated = updateTreeItem(state.pageConfig.children, id, { settings });
      return {
        ...state,
        pageConfig: {
          ...state.pageConfig,
          children: updated
        }
      }
    }
    case actions.SET_DEVICE_TYPE: {
      return {
        ...state,
        deviceType: payload
      }
    }
    case actions.SET_EDIT_MODE: {
      return {
        ...state,
        editMode: payload
      }
    }
    default:
      return state;
  }
}

const context = React.createContext(initialState);

function StoreProvider(props) {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  state.dispatch = dispatch;
  return <context.Provider value={state}>{children}</context.Provider>;
}

export { context, StoreProvider, actions };

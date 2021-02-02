import React, { useReducer } from 'react';
import { WIDGET_IDs } from 'Src/config/widgets';
import { removeTreeItem } from 'Src/uitls/fns';

const actions = {
  UPDATE_PAGE_CONFIG: 'UPDATE_PAGE_CONFIG', // 更新页面配置文件
  SET_CURRENT_WIDGET_CONFIG: 'SET_CURRENT_WIDGET_CONFIG', // 设置正在被设置的widget的config
  DELETE_WIDGET_CONFIG: 'DELETE_WIDGET_CONFIG', // 设置正在被设置的widget的config
}

const initialState = {
  pageConfig: {
    id: 'root',
    widgetId: WIDGET_IDs.WIDGET_CONTAINER, // 组件类型Id
    children: [], // 子组件
    settings: {} // 该组件的相关配置
  }, // 页面配置文件
  currentWidgetConfig: '', // 正在被设置的widget的config
  dispatch: () => { },
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.UPDATE_PAGE_CONFIG: {
      return { ...state, pageConfig: payload };
    }
    case actions.SET_CURRENT_WIDGET_CONFIG: {
      return { ...state, currentWidgetConfig: payload };
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

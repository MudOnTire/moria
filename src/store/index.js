import React, { useReducer } from 'react';
import { WIDGET_IDs } from 'Src/config/widgets';

const actions = {
  UPDATE_PAGE_CONFIG: 'UPDATE_PAGE_CONFIG', // 更新页面配置文件
  SET_CURRENT_WIDGETCONFIG: 'SET_CURRENT_WIDGETCONFIG', // 设置正在被设置的widget的config
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
    case actions.SET_CURRENT_WIDGETCONFIG: {
      return { ...state, currentWidgetConfig: payload };
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

import React, { useReducer } from 'react';

const actions = {
  UPDATE_PAGE_CONFIG: 'UPDATE_PAGE_CONFIG', // 更新页面配置文件
  SET_CONFIG_CONTAINER: 'SET_CONFIG_CONTAINER', // 设置正在被设置的widgets container id
}

const initialState = {
  pageConfig: [], // 页面配置文件
  configedContainerId: '', // 正在被设置的widgets container id
  dispatch: () => { },
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.UPDATE_PAGE_CONFIG: {
      return { ...state, pageConfig: payload };
    }
    case actions.SET_CONFIG_CONTAINER: {
      return { ...state, configedContainerId: payload };
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

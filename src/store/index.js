import React, { useReducer } from 'react';

const actions = {
  ADD_COUNT: 'ADD_COUNT'
}

const initialState = {
  count: 0,
  dispatch: () => { },
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.ADD_COUNT: {
      return { ...state, count: state.count + payload };
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

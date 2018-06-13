const initialState = {
  isLoading: 0,
};
const app = (state = initialState, action = {}) => {
  switch(action.type){
    case "FETCH_START": {
      return { ...state, isLoading: state.isLoading  + 1 }
    }
    case "FETCH_END": {
      return { ...state, isLoading: state.isLoading  - 1 }
    }
    default: {
    return state;
    }
  }
}

export default app;
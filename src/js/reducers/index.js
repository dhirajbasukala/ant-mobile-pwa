
const initialState = {
  isLoading: false,
  movies: []
}
const app = (state = initialState, action = {}) => {
  switch(action.type){
    case "FETCH_START": {
      return { ...state, isLoading: true }
    }
    
    default: 
    return state;
  }
}

export default app;
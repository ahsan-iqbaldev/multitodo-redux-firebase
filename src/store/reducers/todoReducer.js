const initialState = {
    todo: null,
    uid: null,
    isLoading: false,
    singleList:{},
    isGettingSingleList:false,
  };
  const todoReducer = (state = initialState, action) => {
    console.log(action,'action') 
    switch (action.type) {
      case "GET_USERS":
        return {
          ...state,
          todo: action.payload,
          uid: action.payload.id,
        };
        case "SET_IS_LOADING":
          return {
            ...state,
            isLoading: action.payload,
          };
          case "ADD_USER_ERROR":
            return state;
          case "SET_SINGLE_LIST":
            return {...state, singleList:action.payload};
          case "SET_SINGLE_TODO_LOADER":
            return {...state,isGettingSingleList:action.payload}
  
      default:
        return state;
    }
  };
  export default todoReducer;
  
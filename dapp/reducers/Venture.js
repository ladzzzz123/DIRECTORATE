export default function VENTURE(state = { Ventures : [], Venture : undefined, Directors : [] }, action){
  switch(action.type){
    case 'GET_VENTURES_REQUEST':
      return {
        ...state
      };
    case 'GET_VENTURES_SUCCESS':
      console.log(action);
      return {
        ...state,
        Ventures : action.result,
        error : undefined
      };
    case 'GET_VENTURES_FAILURE':
      console.log(action);
      return {
        ...state,
        error : action.error,
        Ventures : []
      };
    case 'NEW_VENTURE_REQUEST':
      return {
        ...state
      };
    case 'NEW_VENTURE_SUCCESS':
      console.log(action);
      return {
        ...state,
        Ventures : state.Ventures.concat(action.result),
        Venture : action.result,
        error : undefined
      };
    case 'NEW_VENTURE_FAILURE':
      console.log(action);
      return {
        ...state,
        error : action.error,
        Venture : undefined
      };
    case 'SET_VENTURES':
      console.log(action);
      return {
        ...state,
        Venture : undefined,
        Ventures : [],
        error : undefined
      };
    case 'SELECTED_VENTURE':
      console.log(action);
      return {
        ...state,
        Venture : action.result,
        error : undefined
      };
    case 'DAV_DIRECTORS_REQUEST':
      return {
        ...state
      };
    case 'DAV_DIRECTORS_SUCCESS':
      console.log(action);
      return {
        ...state,
        Directors : action.result,
        error : undefined
      };
    case 'DAV_DIRECTORS_FAILURE':
      console.log(action);
      return {
        ...state,
        error : action.error,
        Directors : undefined
      };
    default:
      return state;
  }
}

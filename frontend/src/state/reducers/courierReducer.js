const initState = {
  couriers: null,
  error: null,
}

const courierReducer = (state = initState, action) => {
  switch (action.type) {
    case 'COURIERS_FETCHED_SUCCESSFULLY':
      return {
        ...state,
        couriers: action.payload,
        error: null,
      }

    case 'COURIERS_FETCH_ERROR':
      return {
        ...state,
        couriers: null,
        error: 'Something went wrong !',
      }

    default:
      return state
  }
}

export default courierReducer

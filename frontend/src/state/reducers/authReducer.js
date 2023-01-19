const initState = {
  error: null,
  accessToken: null,
  department: null,
  deliveryAgent: null,
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST_ERROR':
      return {
        ...state,
        error: 'Login Failed',
        accessToken: null,
        department: null,
        deliveryAgent: null,
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        accessToken: action.payload,
        error: null,
        department: null,
        deliveryAgent: null,
      }

    case 'DELIVERY_AGENT_LOGIN_SUCCESS':
      return {
        ...state,
        accessToken: action.payload.accessToken,
        error: null,
        department: null,
        deliveryAgent: action.payload.deliveryAgent,
      }
    case 'DEPARTMENT_NOT_FOUND':
      return {
        ...state,
        error: 'No Department found with the given registration number',
        accessToken: null,
        department: null,
        deliveryAgent: null,
      }
    case 'DELIVERYAGENT_NOT_FOUND':
      return {
        ...state,
        error: 'No Delivery agent found with the given email',
        accessToken: null,
        department: null,
        deliveryAgent: null,
      }
    case 'INVALID_PASSWORD':
      return {
        ...state,
        error: 'Incorrect Password',
        accessToken: null,
        department: null,
        deliveryAgent: null,
      }
    case 'REGISTER_REQUEST_ERROR':
      return {
        ...state,
        error: 'Login Failed',
        accessToken: null,
        department: null,
        deliveryAgent: null,
      }
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        accessToken: action.payload,
        error: null,
        department: null,
        deliveryAgent: null,
      }

    case 'REGISTER_FAILURE':
      return {
        ...state,
        accessToken: null,
        error: action.payload.message,
        department: null,
        deliveryAgent: null,
      }
    case 'UNAUTHORIZED':
      return {
        ...state,
        error: 'Unauthorized',
        department: null,
        deliveryAgent: null,
      }
    case 'INVALID_ACCESS_TOKEN':
      return {
        ...state,
        error: 'INVALID ACCESS TOKEN',
        department: null,
        deliveryAgent: null,
      }
    case 'PROFILE_FETCH_SUCCESS':
      return {
        ...state,
        error: null,
        department: action.payload,
        deliveryAgent: null,
      }
    case 'PROFILE_FETCH_ERROR':
      return {
        ...state,
        error: action.payload,
        department: null,
        deliveryAgent: null,
      }
    case 'PROFILE_UPDATE_SUCCESS':
      return {
        ...state,
        error: null,
        department: action.payload,
        deliveryAgent: null,
      }

    case 'LOGOUT':
      return {
        ...state,
        accessToken: null,
        error: null,
        department: null,
        deliveryAgent: null,
      }
    default:
      return state
  }
}

export default authReducer

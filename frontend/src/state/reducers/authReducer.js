const initState = {
  authError: null,
  department: null,
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST_ERROR':
      return {
        ...state,
        authError: 'Login Failed',
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        department: action.payload,
        authError: null,
      }
    case 'DEPARTMENT_NOT_FOUND':
      return {
        ...state,
        authError: 'No Department found with the given registration number',
        department: null,
      }
    case 'INVALID_PASSWORD':
      return {
        ...state,
        authError: 'Incorrect Password',
        department: null,
      }
    case 'REGISTER_REQUEST_ERROR':
      return {
        ...state,
        authError: 'Login Failed',
      }
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        department: action.payload,
        authError: null,
      }

    case 'REGISTER_FAILURE':
      return {
        ...state,
        department: null,
        authError: action.payload.message,
      }

    case 'LOGOUT':
      return {
        ...state,
        department: null,
        authError: null,
      }
    default:
      return state
  }
}

export default authReducer

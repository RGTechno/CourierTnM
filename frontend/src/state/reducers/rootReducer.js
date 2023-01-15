import { combineReducers } from 'redux'
import authReducer from './authReducer'
import courierReducer from './courierReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  courier: courierReducer,
})

export default rootReducer

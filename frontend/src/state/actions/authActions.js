import { toast } from 'react-toastify'
import { apiHost } from '../../apiLoc'

export const login = (credential) => {
  return (dispatch) => {
    const url = `${apiHost}/api/departments/loginDepartment`
    fetch(url, {
      method: 'post',
      body: JSON.stringify({
        registrationNumber: credential.registrationNumber,
        password: credential.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 404) {
          dispatch({
            type: 'DEPARTMENT_NOT_FOUND',
          })
          toast.error('Department not found with given credentials', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
        } else if (response.status === 401) {
          dispatch({
            type: 'INVALID_PASSWORD',
          })
          toast.error('Invalid Password', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
        } else if (response.status === 200) {
          response.json().then((res) => {
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: res.data.accessToken,
            })
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'LOGIN_REQUEST_ERROR',
        })
      })
  }
}

export const register = (details) => {
  return (dispatch) => {
    const url = `${apiHost}/api/departments/addDepartment`
    fetch(url, {
      method: 'post',
      body: JSON.stringify({
        name: details.name,
        country: details.country,
        pinCode: details.pinCode,
        state: details.state,
        city: details.city,
        password: details.password,
        contactNumber: details.contactNumber,
        contactEmail: details.contactEmail,
        registrationNumber: details.registrationNumber,
        location: details.location,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 400) {
          response.json().then((res) => {
            dispatch({
              type: 'REGISTER_FAILURE',
              payload: res,
            })
            toast.error(res.message, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            })
          })
        } else if (response.status === 201) {
          response.json().then((res) => {
            dispatch({
              type: 'REGISTER_SUCCESS',
              payload: res.data.accessToken,
            })
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'REGISTER_REQUEST_ERROR',
        })
      })
  }
}

export const getDepartmentInfo = (accessToken) => {
  return (dispatch) => {
    const url = `${apiHost}/api/departments/getDepartmentInfo`
    fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.status === 404) {
          dispatch({
            type: 'DEPARTMENT_NOT_FOUND',
          })
          toast.error('Department not found with given credentials', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
        } else if (response.status === 401) {
          dispatch({
            type: 'UNAUTHORIZED',
          })
          toast.error('Unauthorized', {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
        } else if (response.status === 403) {
          dispatch({
            type: 'INVALID_ACCESS_TOKEN',
          })
          toast.error('Invalid access token', {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
        } else if (response.status === 200) {
          response.json().then((res) => {
            dispatch({
              type: 'PROFILE_FETCH_SUCCESS',
              payload: res.data,
            })
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'PROFILE_FETCH_ERROR',
          payload: 'Something went wrong !',
        })
        toast.error(error.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      })
  }
}

export const updateDepartmentInfo = (accessToken, details) => {
  return (dispatch) => {
    const url = `${apiHost}/api/departments/updateDepartmentInfo`
    fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({
        name: details.name,
        country: details.country,
        pinCode: details.pinCode,
        state: details.state,
        city: details.city,
        password: details.password,
        contactNumber: details.contactNumber,
        contactEmail: details.contactEmail,
        location: details.location,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.status === 404) {
          dispatch({
            type: 'DEPARTMENT_NOT_FOUND',
          })
          toast.error('Department not found with given credentials', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
        } else if (response.status === 401) {
          dispatch({
            type: 'UNAUTHORIZED',
          })
          toast.error('Unauthorized', {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
        } else if (response.status === 403) {
          dispatch({
            type: 'INVALID_ACCESS_TOKEN',
          })
          toast.error('Invalid access token', {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
        } else if (response.status === 200) {
          response.json().then((res) => {
            dispatch({
              type: 'PROFILE_UPDATE_SUCCESS',
              payload: res.data,
            })
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'PROFILE_FETCH_ERROR',
          payload: 'Something went wrong !',
        })
        toast.error(error.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      })
  }
}

export const loginDeliveryAgent = (credential) => {
  return (dispatch) => {
    const url = `${apiHost}/api/deliveryAgents/loginDeliveryAgent`
    fetch(url, {
      method: 'post',
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 404) {
          dispatch({
            type: 'DELIVERYAGENT_NOT_FOUND',
          })
          toast.error('Delivery agent not found with given credentials', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
        } else if (response.status === 401) {
          dispatch({
            type: 'INVALID_PASSWORD',
          })
          toast.error('Invalid Password', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
        } else if (response.status === 200) {
          response.json().then((res) => {
            dispatch({
              type: 'DELIVERY_AGENT_LOGIN_SUCCESS',
              payload: res.data,
            })
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'LOGIN_REQUEST_ERROR',
        })
      })
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: 'LOGOUT',
    })
  }
}

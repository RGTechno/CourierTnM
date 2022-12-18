export const login = (credential) => {
  return (dispatch) => {
    const url = '/api/loginDepartment'
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
        } else if (response.status === 401) {
          dispatch({
            type: 'INVALID_PASSWORD',
          })
        } else if (response.status === 200) {
          response.json().then((res) => {
            dispatch({
              type: 'LOGIN_SUCCESS',
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

export const register = (details) => {
  return (dispatch) => {
    const url = '/api/addDepartment'
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
        response.json().then((res) => {
          dispatch({
            type: 'REGISTER_SUCCESS',
            payload: res.data,
          })
        })
      })
      .catch((error) => {
        dispatch({
          type: 'REGISTER_REQUEST_ERROR',
        })
      })
  }
}

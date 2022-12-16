export const login = () => {
  return (dispatch) => {
    const url = '/api/loginDepartment'
    fetch(url, {
      method: 'post',
      body: JSON.stringify({ registrationNumber: '123456', password: '1234' }),
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

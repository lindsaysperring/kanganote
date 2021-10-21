const baseURL = process.env.REACT_APP_BASEURL || "http://localhost:5000";
const getAuthHeader = (userData) => ({
  headers: userData.isLoggedIn
    ? { Authorization: `Bearer ${userData.user.token}` }
    : {},
});
const axiosCatch = (error) => {
  if (error.response) {
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
    return error.response.data;
  } else if (error.request) {
    /*
     * The request was made but no response was received, `error.request`
     * is an instance of XMLHttpRequest in the browser and an instance
     * of http.ClientRequest in Node.js
     */
    return error.request;
  } else {
    // Something happened in setting up the request and triggered an Error
    return error.message;
  }
};

export { baseURL, getAuthHeader, axiosCatch };

const TOKEN_KEY = "auth-token";

const auth = {
  logIn (username, password) {
    return request.post('/login', {username, password})
      .then(response => {
        return response.token;
      })
  },

  logOut () {
    return request.post('/logout');
  },

  register (username, password) {
    return request.post('/register', {username, password})
      .then(() => auth.login(username, password)); // or return a token
  },

  onChange () {},

  storeToken(token) {
    AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  }

  getStoredToken() {
    AsyncStorage.getItem(TOKEN_KEY, (err, result) => {
      if (!err && result != null){
        return result;
      }
      else {
        return false;
      };
    });
  },

}

export default auth

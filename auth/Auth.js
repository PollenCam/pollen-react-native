import { AsyncStorage } from 'react-native';

const TOKEN_KEY = "auth-token";

const auth = {
  logIn (email, password) {
    fetch('/api/rest/user_accounts/sign_in', {
      method: 'POST',
      body: JSON.stringify(
        'user_account': {
          'email': email,
          'password': password
        }
      ),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then( (response) => {
      switch (response.status) {
        case 200:
          const resData = response.json();
          storeToken(resData.auth_token);
          return resData;
          break;
        default:
          return response.json();
      }
    }).catch( (error) => {
      console.error('Failed to log in, unable to get client token, error: ' + error);
    })
  },

  logOut () {
    return request.post('/logout');
  },

  register (email, password) {
    fetch('/api/rest/user_accounts', {
      method: 'POST',
      body: JSON.stringify(
        'user_account': {
          'email': email,
          'password': password
        }
      ),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then( (response) => {
      switch (response.status) {
        case 201:
          const resData = response.json();
          storeToken(resData.auth_token);
          return resData;
          break;
        default:
          return response.json();
      }
    }).catch( (error) => {
      console.error('Failed to register, unable to get client token, error: ' + error);
    })
  },

  onChange () {},

  loggedIn() {
    return !!this.getStoredToken();
  },

  storeToken(token) {
    AsyncStorage.setItem(TOKEN_KEY, token);
  },

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

export default auth;

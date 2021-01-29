// /* globals localStorage */
import store from "@/store/index";
import axios from "axios";

export default {
  loginAdmin(username, pass, cb) {
    cb = arguments[arguments.length - 1];
    if (localStorage.token) {
      if (cb) cb(true);
      this.onChange(true);
      return;
    }
    verifyAdmin(username, pass, res => {
      if (res.authenticated) {
        localStorage.token = res.token;
        if (cb) cb(true);
        this.onChange(true);
      } else {
        if (cb) cb(false);
        this.onChange(false);
      }
    });
  },

  loginUser(username, pass, cb) {
    cb = arguments[arguments.length - 1];
    if (localStorage.token) {
      if (cb) cb(true);
      this.onChange(true);
      return;
    }
    verifyUser(username, pass, res => {
      if (res.authenticated) {
        localStorage.token = res.token;
        if (cb) cb(true);
        this.onChange(true);
      } else {
        if (cb) cb(false);
        this.onChange(false);
      }
    });
  },

  getToken() {
    return localStorage.token;
  },

  logout(cb) {
    store.dispatch("deleteCurrentUser");
    localStorage.removeItem("currentUser");
    delete localStorage.token;
    if (cb) cb();
    this.onChange(false);
  },

  loggedIn() {
    if (localStorage.token) {
      store.dispatch("loadLocalStorage");
    }
    return !!localStorage.token;
  },

  typeLogin() {
    let _typeuser = null;
    try {
      _typeuser = store.getters.getTypeUser;
    } catch (error) {
      _typeuser = null;
    }
    return _typeuser;
  },

  onChange() {}
};

async function verifyAdmin(username, pass, cb) {
  let _data = new FormData();
  _data.set("username", username);
  _data.set("password", pass);
  // console.log(_user.username +' | '+ _user.password)
  axios({
    method: "post",
    url: "https://cappstudios.com/tools/viudas/api/actions/admin.login.php",
    data: _data,
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    }
  })
    .then(function(response) {
      //handle success
      if (!response.data.error) {
        // console.log(response.data.message)
        store.dispatch("setCurrentUser", JSON.stringify(response.data.data));
        cb({
          authenticated: true,
          token: Math.random()
            .toString(36)
            .substring(7)
        });
      } else {
        // console.log(response.data.message)
        cb({ authenticated: false });
      }
    })
    .catch(function(response) {
      //handle error
      console.log(response);
      cb({ authenticated: false });
    });
}

async function verifyUser(username, pass, cb) {
  let _data = new FormData();
  _data.set("username", username);
  _data.set("password", pass);
  // console.log(_user.username +' | '+ _user.password)
  axios({
    method: "post",
    url: "https://cappstudios.com/tools/viudas/api/actions/user.login.php",
    data: _data,
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    }
  })
    .then(function(response) {
      //handle success
      if (!response.data.error) {
        // console.log(response.data.message)
        store.dispatch("setCurrentUser", JSON.stringify(response.data.data));
        cb({
          authenticated: true,
          token: Math.random()
            .toString(36)
            .substring(7)
        });
      } else {
        // console.log(response.data.message)
        cb({ authenticated: false });
      }
    })
    .catch(function(response) {
      //handle error
      console.log(response);
      cb({ authenticated: false });
    });
}

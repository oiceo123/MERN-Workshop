const authenticate = (res, next) => {
  if (window !== "undefined") {
    sessionStorage.setItem("token", JSON.stringify(res.data.token));
    sessionStorage.setItem("user", JSON.stringify(res.data.username));
  }
  next();
};

const getToken = () => {
  if (window !== "undefined") {
    if (sessionStorage.getItem("token")) {
      return JSON.parse(sessionStorage.getItem("token"));
    } else {
      return false;
    }
  }
};

const getUser = () => {
  if (window !== "undefined") {
    if (sessionStorage.getItem("user")) {
      return JSON.parse(sessionStorage.getItem("user"));
    } else {
      return false;
    }
  }
};

const logout = (next) => {
  if (window !== "undefined") {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  }
  next();
};

module.exports = { authenticate, getToken, getUser, logout };

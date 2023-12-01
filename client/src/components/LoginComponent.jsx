import { useState, useEffect } from "react";
import axios from "../api";
import Swal from "sweetalert2";
import { authenticate, getUser } from "../services/authenticate";
import { withRouter } from "react-router-dom";

function LoginComponent(props) {
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const { username, password } = state;

  useEffect(() => {
    getUser() && props.history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const submitForm = (event) => {
    event.preventDefault();
    axios
      .post("/login", { username, password })
      .then((res) => {
        authenticate(res, () => props.history.push("/create"));
      })
      .catch((err) => {
        Swal.fire({
          title: "แจ้งเตือน",
          text: err.response.data.error,
          icon: "error",
        });
      });
  };

  return (
    <>
      <h1>เข้าสู่ระบบ | Admin</h1>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={inputValue("username")}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={inputValue("password")}
          />
        </div>
        <br />
        <input type="submit" value="เข้าสู่ระบบ" className="btn btn-primary" />
      </form>
    </>
  );
}

export default withRouter(LoginComponent);

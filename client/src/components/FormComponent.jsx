import { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "../api";
import Swal from "sweetalert2";

function FormComponent() {
  const [state, setState] = useState({
    title: "",
    content: "",
    author: "",
  });
  const { title, content, author } = state;

  // ฟังก์ชั่นนี้มีค่าเท่ากับฟังก์ชั่นด้านล่าง
  /* const inputValue = function (name) {
    return function (event) {
      return setState({ ...state, [name]: event.target.value });
    };
  }; */
  // กำหนดค่าให้กับ state
  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const submitForm = (event) => {
    event.preventDefault();
    axios
      .post("/blog/create", { title, content, author })
      .then((res) => {
        Swal.fire({
          title: "แจ้งเตือน",
          text: "บันทึกข้อมูลบทความเรียบร้อย",
          icon: "success",
        });
        setState({ ...state, title: "", content: "", author: "" });
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
    <div className="container p-5">
      <NavbarComponent />
      <h1>เขียนบทความ</h1>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>ชื่อบทความ</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={inputValue("title")}
          />
        </div>
        <div className="form-group">
          <label>รายละเอียด</label>
          <textarea
            className="form-control"
            value={content}
            onChange={inputValue("content")}
          ></textarea>
        </div>
        <div className="form-group">
          <label>ผู้แต่ง</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={inputValue("author")}
          />
        </div>
        <br />
        <input type="submit" value="บันทึก" className="btn btn-primary" />
      </form>
    </div>
  );
}

export default FormComponent;

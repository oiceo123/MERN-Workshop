import React, { useRef, useState } from "react";
import axios from "../api";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getUser } from "../services/authenticate";
import "../styles/FormComponent.css";

function FormComponent() {
  const [state, setState] = useState({
    title: "",
    author: getUser(),
  });
  const { title, author } = state;

  const [content, setContent] = useState("");

  const quillRef = useRef(null);

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

  const updateContent = (data) => {
    setContent(data);
  };

  const submitForm = (event) => {
    event.preventDefault();
    if (quillRef.current.unprivilegedEditor.getText().trim() === "") {
      Swal.fire({
        title: "แจ้งเตือน",
        text: "กรุณาป้อนเนื้อหาบทความ",
        icon: "error",
      });
    } else {
      axios
        .post("/blog/create", { title, content, author })
        .then((res) => {
          Swal.fire({
            title: "แจ้งเตือน",
            text: "บันทึกข้อมูลบทความเรียบร้อย",
            icon: "success",
          });
          setState({ ...state, title: "", author: getUser() });
          setContent("");
        })
        .catch((err) => {
          Swal.fire({
            title: "แจ้งเตือน",
            text: err.response.data.error,
            icon: "error",
          });
        });
    }
  };

  return (
    <>
      <h1>เขียนบทความ</h1>
      <form onSubmit={submitForm}>
        <div className="form-group mb-2">
          <label>ชื่อบทความ</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={inputValue("title")}
          />
        </div>
        <div className="form-group mb-2">
          <label>รายละเอียด</label>
          <ReactQuill
            ref={quillRef}
            value={content}
            onChange={updateContent}
            theme="snow"
            placeholder="เขียนรายละเอียดบทความของคุณ"
          />
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
    </>
  );
}

export default FormComponent;

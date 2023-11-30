import { useState, useEffect } from "react";
import axios from "../api";
import Swal from "sweetalert2";

function EditComponent(props) {
  const param = props.match.params.slug;
  const [state, setState] = useState({
    title: "",
    content: "",
    author: "",
    slug: "",
  });
  const { title, content, author, slug } = state;

  useEffect(() => {
    axios
      .get(`/blog/${param}`)
      .then((res) => {
        const { title, content, author, slug } = res.data;
        setState({ ...state, title, content, author, slug });
      })
      .catch((err) => {
        alert(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showUpdateForm = () => (
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
      <input type="submit" value="อัพเดท" className="btn btn-primary" />
    </form>
  );

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
      .put(`/blog/${slug}`, { title, content, author })
      .then((res) => {
        Swal.fire({
          title: "แจ้งเตือน",
          text: "อัพเดทบทความเรียบร้อย",
          icon: "success",
        });
        const { title, content, author, slug } = res.data;
        setState({ ...state, title, content, author, slug });
      })
      .catch((err) => {
        Swal.fire({
          title: "แจ้งเตือน",
          text: "เกิดข้อผิดพลาด",
          icon: "error",
        });
      });
  };

  return (
    <>
      <h1>แก้ไขบทความ</h1>
      {showUpdateForm()}
    </>
  );
}

export default EditComponent;

import { useState, useEffect, useRef } from "react";
import axios from "../api";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EditComponent(props) {
  const param = props.match.params.slug;
  const [state, setState] = useState({
    title: "",
    author: "",
    slug: "",
  });
  const { title, author, slug } = state;
  const [content, setContent] = useState("");
  const quillRef = useRef(null);

  useEffect(() => {
    axios
      .get(`/blog/${param}`)
      .then((res) => {
        const { title, content, author, slug } = res.data;
        setState({ ...state, title, author, slug });
        setContent(content);
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
        .put(`/blog/${slug}`, { title, content, author })
        .then((res) => {
          Swal.fire({
            title: "แจ้งเตือน",
            text: "อัพเดทบทความเรียบร้อย",
            icon: "success",
          });
          const { title, content, author, slug } = res.data;
          setState({ ...state, title, author, slug });
          setContent(content);
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
      <h1>แก้ไขบทความ</h1>
      {showUpdateForm()}
    </>
  );
}

export default EditComponent;

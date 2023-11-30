import axios from "./api";
import { useState, useEffect } from "react";
import formatDate from "./utils/formatDate";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function App() {
  const [blogs, setBlogs] = useState([]);

  const fetchData = () => {
    axios
      .get("/blog")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        alert((err) => alert(err));
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirmDelete = (slug) => {
    Swal.fire({
      title: "คุณต้องการลบบทความหรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(slug);
      }
    });
  };

  const deleteBlog = (slug) => {
    axios
      .delete(`blog/${slug}`)
      .then((res) => {
        Swal.fire({
          title: "Deleted!",
          text: res.data.message,
          icon: "success",
        });
        fetchData();
      })
      .catch((err) => {
        Swal.fire({
          title: "ERROR",
          text: "เกิดข้อผิดพลาดบางอย่าง",
          icon: "error",
        });
      });
  };

  return (
    <>
      {blogs.map((blog, index) => (
        <div
          className="row"
          key={index}
          style={{ borderBottom: "1px solid silver" }}
        >
          <div className="col pt-3 pb-2">
            <Link to={`/blog/${blog.slug}`}>
              <h2>{blog.title}</h2>
            </Link>
            <p>{blog.content.substring(0, 250)}</p>
            <p className="text-muted">
              ผู้เขียน: {blog.author} เผยแพร่ : {formatDate(blog.createdAt)}
            </p>
            <Link
              className="btn btn-outline-success"
              to={`/blog/edit/${blog.slug}`}
            >
              อัพเดทบทความ
            </Link>{" "}
            <button
              className="btn btn-outline-danger"
              onClick={() => confirmDelete(blog.slug)}
            >
              ลบบทความ
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default App;

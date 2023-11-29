import axios from "../api";
import { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import formatDate from "../utils/formatDate";

function SingleComponent(props) {
  const param = props.match.params.slug;
  const [blog, setBlog] = useState("");

  useEffect(() => {
    axios
      .get(`/blog/${param}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        alert(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <p className="text-muted">
        ผู้เขียน: {blog.author} เผยแพร่ : {formatDate(blog.createdAt)}
      </p>
    </div>
  );
}

export default SingleComponent;

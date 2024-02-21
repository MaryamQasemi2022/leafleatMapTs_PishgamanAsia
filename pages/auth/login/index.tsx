import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import AuthContext from "@/contexts/AuthContext";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [loginData, setLoginDate] = useState({ username: "", password: "" });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginDate((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginData.username.trim() && loginData.username.trim()) {
      login(loginData);
      return;
    }
    toast.error("نام کاربری و رمز عبور الزامی ست");
    // console.log("نام کاربری و رمز عبور الزامی ست");
  };
  return (
    <div
      style={{
        width: "350px",
        margin: "50px auto",
        padding: "29px",
        direction: "rtl",
        border: "1px solid #e4e4e4",
        borderRadius: "20px",
        boxShadow: "3px 2px 5px #d7d7d7",
      }}
    >
      <h6 className="text-center mb-3">ورود</h6>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            نام کاربری
          </label>
          <input
            type="text"
            name="username"
            className="form-control"
            id="exampleFormControlInput1"
            value={loginData.username}
            placeholder="reakefit"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput2" className="form-label">
            کلمه عبور
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleFormControlInput2"
            value={loginData.password}
            placeholder="437667"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="btn"
          style={{
            width: "100%",
            backgroundColor: "#FFC107",
            boxShadow: "5px 5px 10px #958b8b",
            borderRadius: "14px",
          }}
        >
          ورود
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

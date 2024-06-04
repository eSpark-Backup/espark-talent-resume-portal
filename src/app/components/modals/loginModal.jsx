import React, { useState } from "react";
import { Box, Modal, Typography } from "@mui/material";
import CustomInput from "@/common/CustomInput";
import { toast } from "react-toastify";
import supabase from "@/app/services/supabaseClient";
import Image from "next/image";

const LoginModal = ({ open, setAuthed }) => {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });
  const handleChange = (name, value) => {
    setAuth((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { session, error } = await supabase.auth.signIn({
        email: auth.email,
        password: auth.password,
      });
      if (error) {
        console.log(error, "error");
        toast.error("Invalid Credentials");
      } else {
        localStorage.setItem("auth", session.access_token);
        toast.success("Signed in successfully!");
        setAuthed(true);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <Modal
      sx={{ background: "#fff" }}
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className="card"
        sx={{
          background: "#fff",
          maxWidth: "500px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          padding: "20px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box 
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
        >
          <Box >
           <Image src="/logo.png" alt="logo" width={130} height={70} />
          </Box>
        <Typography
        sx={{
          color: "#001C63",
          fontWeight: "bold",
          fontSize: "1.5rem",
        }}
        id="modal-modal-title" variant="h6" component="h2">
          Login
        </Typography>
        </Box>
        <Box component="form" sx={{ width: "100%" }} onSubmit={handleSubmit}>
          <CustomInput
            required
            label="Email"
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Enter Email"
          />
          <br/>
          <CustomInput
            required
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter Password"
          />
         <br/>
          <button
            className={(loading || auth.email === "" || auth.password === "") ? "disabled" : ""}
            style={{ width: "100% !important", marginTop: "10px" }}
            disabled={loading || auth.email === "" || auth.password === ""}
            type="submit"
          >
            {loading ? "loading..." : "Login"}
          </button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LoginModal;

import loginImg from "../assets/Images/login.webp"
import Template from "../components/core/auth/Template"
import { login } from "../services/operations/authAPI"
import { useState } from "react"


function Login() {

  return (
    <>
    
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    />
    </>
  )
}

export default Login
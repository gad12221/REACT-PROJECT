import { useForm } from "react-hook-form";
import "./Login.scss";
import { LoginUser } from "../@types/types";
import patterns from "../validation/patterns";
import auth from "../services/auth";
import dialogs, { showSuccessDialog } from "../UI/dialogs";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(true);
  const { login } = useContext(AuthContext);



  const onLogin = (data: LoginUser) => {
    auth
      .login(data)
      .then((res) => {
        showSuccessDialog("Login", "Logged in").then(() => {
          login(res.data);
          // send the user to home page
          navigate("/");
        });
      })
      .catch((e) => {
        dialogs.error("Login Error", e.response.data);
      });
  };



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>();


  return (
    <div className="login-container dark:bg-gray-600">
      <h2>Login Page</h2>
      <form noValidate onSubmit={handleSubmit(onLogin)}>
        {/* email */}
        <section>
          <input
            placeholder="Email"
            autoCapitalize="true"
            autoCorrect="false"
            autoComplete="email"
            type="email"
            {...register("email", {
              required: "This field is mandatory",
              pattern: patterns.email,
            })}
          />
          {errors.email && <p>{errors.email?.message}</p>}
        </section>

        {/* password */}
        <section>
          <input
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "This field is mandatory",
              pattern: patterns.password,
            })}
          />
          {errors.password && <p>{errors.password?.message}</p>}
        </section>

        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
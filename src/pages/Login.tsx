import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import authApi from "../redux/features/auth/authApi";
import PhForm from "../components/form/PhForm";
import PhInput from "../components/form/PhInput";

// type TUserInfo = {
//   id: string;
//   password: string;
// };

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const { register, handleSubmit } = useForm();
  const [login] = authApi.useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in", { position: "top-center" });
    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in successfully", {
        id: toastId,
        duration: 2000,
        position: "top-center",
      });
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      toast.error("Something went wrong", {
        id: toastId,
        duration: 2000,
        position: "top-center",
      });
    }
  };

  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <PhForm onSubmit={onSubmit}>
        <PhInput type={"text"} name={"id"} label={"Id:"}></PhInput>
        <PhInput type={"text"} name={"password"} label={"Password:"}></PhInput>
        <Button htmlType="submit">Login</Button>
      </PhForm>
    </Row>
  );
};

export default Login;

import { Button, Row } from "antd";
import PhForm from "../components/form/PhForm";
import PhInput from "../components/form/PhInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/features/admin/userManagement.api";
import { TResponse } from "../types/global";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [ChangePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await ChangePassword(data as TResponse<any>);
    console.log(res);
    if (res?.data?.success) {
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <PhForm onSubmit={onSubmit}>
        <PhInput
          type={"text"}
          name={"oldPassword"}
          label={"Old Password:"}
        ></PhInput>
        <PhInput
          type={"text"}
          name={"newPassword"}
          label={"New Password:"}
        ></PhInput>
        <Button htmlType="submit">Change Password</Button>
      </PhForm>
    </Row>
  );
};

export default ChangePassword;

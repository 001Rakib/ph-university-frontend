import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterStatusOptions } from "../../../constants/semester";
import { toast } from "sonner";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import PHForm from "../../../components/form/PhForm";
import PHDatePicker from "../../../components/form/PhDatePicker";
import PHInput from "../../../components/form/PhInput";
import { useRegisterSemesterMutation } from "../../../redux/features/admin/courseManagement";
import { TResponse } from "../../../types/global";

const SemesterRegistration = () => {
  const [registerSemester] = useRegisterSemesterMutation();
  const { data: academicSemester } = useGetAllSemestersQuery([
    { name: "sort", value: "year" },
  ]);

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating....", {
      position: "top-center",
      duration: 2000,
    });

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };
    try {
      const res = (await registerSemester(semesterData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, {
          position: "top-center",
          duration: 2000,
          id: toastId,
        });
      } else {
        toast.success("Academic Semester Created Successfully", {
          position: "top-center",
          duration: 2000,
          id: toastId,
        });
      }
    } catch (err) {
      toast.error("Something went wrong", {
        position: "top-center",
        duration: 2000,
      });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />

          <PHSelect
            name="status"
            label="Status"
            options={semesterStatusOptions}
          />
          <PHDatePicker name="startDate" label="Start Date" />
          <PHDatePicker name="endDate" label="End Date" />
          <PHInput type="text" name="minCredit" label="Min Credit" />
          <PHInput type="text" name="maxCredit" label="Max Credit" />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;

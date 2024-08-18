import { FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../components/form/PhForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const [createAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating....", {
      position: "top-center",
      duration: 2000,
    });

    const name = semesterOptions[Number(data?.name) - 1]?.label;

    const semesterData = {
      name: name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      const res = (await createAcademicSemester(
        semesterData
      )) as TResponse<any>;
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
        <PhForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect
            label={"Name"}
            name={"name"}
            options={semesterOptions}
          ></PHSelect>
          <PHSelect
            label={"Year"}
            name={"year"}
            options={yearOptions}
          ></PHSelect>
          <PHSelect
            label={"Start Month"}
            name={"startMonth"}
            options={monthOptions}
          ></PHSelect>
          <PHSelect
            label={"End Month"}
            name={"endMonth"}
            options={monthOptions}
          ></PHSelect>
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;

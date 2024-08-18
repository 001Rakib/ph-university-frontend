import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import PHForm from "../../../components/form/PhForm";
import PHInput from "../../../components/form/PhInput";
import {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement";
import { TResponse } from "../../../types/global";

const CreateCourse = () => {
  const [createCourse] = useCreateCourseMutation();
  const { data: courses } = useGetAllCoursesQuery(undefined);

  const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating....", {
      position: "top-center",
      duration: 2000,
    });

    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses
        ? data.preRequisiteCourses?.map((item) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };
    console.log(courseData);
    try {
      const res = (await createCourse(courseData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, {
          position: "top-center",
          duration: 2000,
          id: toastId,
        });
      } else {
        toast.success("Course Created Successfully", {
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
          <PHInput type="text" name="title" label="Title" />
          <PHInput type="text" name="prefix" label="Prefix" />
          <PHInput type="text" name="code" label="Code" />
          <PHInput type="text" name="credits" label="Credits" />
          <PHSelect
            mode="multiple"
            name="preRequisiteCourses"
            label="Pre Requisite Corses"
            options={preRequisiteCoursesOptions}
          />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;

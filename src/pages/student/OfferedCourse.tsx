import { Button, Col, Row } from "antd";
import {
  useEnrollCourseMutation,
  useGetAllOfferedCoursesQuery,
} from "../../redux/features/student/studentCourseManagement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";

type TCourse = {
  [index: string]: any;
};

const OfferedCourse = () => {
  const { data: OfferedCourseData } = useGetAllOfferedCoursesQuery(undefined);
  const [enroll] = useEnrollCourseMutation();
  const singleObject = OfferedCourseData?.data?.reduce((acc: TCourse, item) => {
    const key = item.course.title;

    acc[key] = acc[key] || { courseTitle: key, sections: [] };
    acc[key].sections.push({
      section: item.section,
      _id: item._id,
      startTime: item.startTime,
      endTime: item.endTime,
      days: item.days,
    });

    return acc;
  }, {});

  const modifiedData = Object.values(singleObject ? singleObject : {});

  const handleEnroll: SubmitHandler<FieldValues> = async (id) => {
    const enrollData = {
      offeredCourse: id,
    };

    const res = await enroll(enrollData);
    console.log(res);
  };

  if (!modifiedData.length) {
    return <p>No Courses Available for you</p>;
  }

  return (
    <Row gutter={[0, 20]}>
      {modifiedData.map((item, idx) => {
        return (
          <Col key={idx} span={24} style={{ border: "solid #d4d4d4 2px" }}>
            {" "}
            <div style={{ padding: "10px" }}>
              <h2>{item.courseTitle}</h2>
            </div>
            <div>
              {item.sections.map((item) => {
                return (
                  <Row
                    key={item._id}
                    justify={"space-between"}
                    align={"middle"}
                    style={{ borderTop: "solid #d4d4d4 2px", padding: "10px" }}
                  >
                    <Col span={5}>Section: {item.section} </Col>
                    <Col span={5}>
                      Days:{" "}
                      {item.days.map((day, idx) => (
                        <span key={idx}> {day} </span>
                      ))}{" "}
                    </Col>
                    <Col span={5}>Start Time: {item.startTime} </Col>
                    <Col span={5}>End Time: {item.endTime} </Col>
                    <Button onClick={() => handleEnroll(item._id)}>
                      Enroll
                    </Button>
                  </Row>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default OfferedCourse;

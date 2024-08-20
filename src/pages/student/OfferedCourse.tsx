import { Button, Col, Row } from "antd";
import { useGetAllOfferedCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";

const OfferedCourse = () => {
  const { data: OfferedCourseData } = useGetAllOfferedCoursesQuery(undefined);
  console.log(OfferedCourseData);

  const singleObject = OfferedCourseData?.data?.reduce((acc, item) => {
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

  return (
    <Row gutter={[0, 20]}>
      {modifiedData.map((item) => {
        return (
          <Col span={24} style={{ border: "solid #d4d4d4 2px" }}>
            {" "}
            <div style={{ padding: "10px" }}>
              <h2>{item.courseTitle}</h2>
            </div>
            <div>
              {item.sections.map((item) => {
                return (
                  <Row
                    justify={"space-between"}
                    align={"middle"}
                    style={{ borderTop: "solid #d4d4d4 2px", padding: "10px" }}
                  >
                    <Col span={5}>Section: {item.section} </Col>
                    <Col span={5}>
                      Days:{" "}
                      {item.days.map((day) => (
                        <span> {day} </span>
                      ))}{" "}
                    </Col>
                    <Col span={5}>Start Time: {item.startTime} </Col>
                    <Col span={5}>End Time: {item.endTime} </Col>
                    <Button>Enroll</Button>
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

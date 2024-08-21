import { useGetAllEnrolledCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";

const MySchedule = () => {
  const { data: enrolledCourseData } = useGetAllEnrolledCoursesQuery(undefined);

  console.log(enrolledCourseData);

  return (
    <div>
      {enrolledCourseData?.data?.map((item) => {
        return (
          <div>
            <div>{item.course.title}</div>
            <div>{item.offeredCourse.section}</div>
            <div>
              {item.offeredCourse.days.map((item) => (
                <span> {item} </span>
              ))}
            </div>
            <div>Start Time: {item.offeredCourse.startTime}</div>
            <div>End Time: {item.offeredCourse.endTime}</div>
          </div>
        );
      })}
    </div>
  );
};

export default MySchedule;

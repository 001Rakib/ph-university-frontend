import academicSemesterApi from "../../../redux/features/academicSemeter/academicSemesterApi";

const AcademicSemester = () => {
  const { data } = academicSemesterApi.useGetAllSemestersQuery(undefined);
  console.log(data);

  return (
    <div>
      <h1>Academic semester page</h1>
    </div>
  );
};

export default AcademicSemester;

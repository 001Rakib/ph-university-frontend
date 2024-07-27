import academicManagementApi from "../../../redux/features/admin/academicManagement.api";

const AcademicSemester = () => {
  const { data } = academicManagementApi.useGetAllSemestersQuery(undefined);
  console.log(data);

  return (
    <div>
      <h1>Academic semester page</h1>
    </div>
  );
};

export default AcademicSemester;

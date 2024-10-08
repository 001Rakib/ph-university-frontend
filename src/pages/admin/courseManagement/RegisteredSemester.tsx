import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import {
  useGetAllRegisteredSemestersQuery,
  useUpdateSemesterStatusMutation,
} from "../../../redux/features/admin/courseManagement";
import moment from "moment";
import { TSemester } from "../../../types/courseManagement.type";
import { useState } from "react";

export type TTableData = Pick<TSemester, "startDate" | "endDate" | "status">;

const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

const RegisteredSemester = () => {
  const [semesterId, setSemesterId] = useState("");
  const { data: semesterData, isFetching } =
    useGetAllRegisteredSemestersQuery(undefined);
  const [updateSemesterStatus] = useUpdateSemesterStatusMutation();

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
      status,
    })
  );

  const handleUpdateStatus = (data) => {
    const updateSemesterStatusData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };
    updateSemesterStatus(updateSemesterStatusData);
  };

  const menuProps = {
    items,
    onClick: handleUpdateStatus,
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        let color;

        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }

        return <Tag color={color}> {item} </Tag>;
      },
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
          </Dropdown>
        );
      },
    },
  ];

  //   const onChange: TableProps<TTableData>["onChange"] = (
  //     _pagination,
  //     filters,
  //     _sorter,
  //     extra
  //   ) => {
  //     if (extra.action === "filter") {
  //       const queryParams: TQueryParam[] = [];

  //       setParams(queryParams);
  //     }
  //   };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      //   onChange={onChange}
    />
  );
};

export default RegisteredSemester;

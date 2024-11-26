import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Button, Paper, styled } from "@mui/material";

const DataGridWrapper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  width: "100%",
  padding: "15px",
  marginTop: "10px",
  borderRadius: "20px",
}));

const CommitteeMemberList = () => {
  const [members, setMembers] = useState([]);
  const { committeeId } = useParams();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `/api/v1/committee/committees/${committeeId}/members`
        );
        setMembers(response.data.data.members);
        console.log(response.data.data.members);
        toast.success("Members loaded successfully!");
      } catch (error) {
        toast.error("Failed to fetch committee members!");
        console.error("Error:", error);
      }
    };

    fetchMembers();
  }, [committeeId]);

  const removeUserFromCommittee = async (id) => {
    try {
      const response = await axios.delete(
        `/api/v1/committee/committees/${committeeId}/members/${id}`
      );
      if (response.status === 200) {
        toast.success("User removed from committee successfully");
        setMembers((prevUsers) =>
          prevUsers.filter((user) => user.committeeId !== committeeId)
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("User is not a member of this committee");
      } else {
        toast.error("Failed to remove user from committee");
      }
      console.error("Error removing user from committee:", error);
    }
  };  

  const columns = [
    {
      field: "avatarPath",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => (
        <img
          src={`http://localhost:9000/${params.value}`}
          alt="avatar"
          style={{ width: "45px", height: "45px", borderRadius: "50%" }}
        />
      ),
    },
    {
      field: "fullname",
      headerName: "Full Name",
      width: 250,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 200,
    },
    {
      field: "Actions",
      headerName: "Action",
      width: 175,
      renderCell: (params) => (
        <Button
          variant="contained"
          // color={params.row.isBlocked ? "success" : "error"}
          onClick={() => removeUserFromCommittee(params.row.memberid)}
        >
          Remove User
        </Button>
      ),
    },
  ];

  return (
    <div className="right-content w-100">
      <DataGridWrapper>
        <DataGrid
          rows={members}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
          disableSelectionOnClick
          getRowId={(row) => row.memberid} // Specify memberid as the unique row ID
        />
      </DataGridWrapper>
    </div>
  );
};

export default CommitteeMemberList;

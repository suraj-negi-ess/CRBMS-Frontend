import { Paper, styled } from "@mui/material";
import React from "react";
import CommitteeCard from "../../components/CommitteeCard/CommitteeCard";

const MyCommitteeList = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  width: "100%",
  padding: "15px",
  marginTop: "10px",
  borderRadius: "20px",
}));

const MyCommitteePage = () => {
  return (
    <div className="right-content w-100">
      <MyCommitteeList>
        <CommitteeCard />
      </MyCommitteeList>
    </div>
  );
};

export default MyCommitteePage;

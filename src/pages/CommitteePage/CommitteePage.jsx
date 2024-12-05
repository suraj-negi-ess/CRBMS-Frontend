import React, { useEffect, useState } from "react";
import {
  Box,
  Grid2,
  Typography,
  Paper,
  styled,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import axios from "axios";
import CommitteeCard from "../../components/CommitteeCard/CommitteeCard";
import { ContentHeader, PaperWrapper, RightContent } from "../../Style";
import PopupModals from "../../components/Modals/PopupModals";
import AddCommitteeForm from "./AddCommitteeForm";

// Styled component for the card wrapper
const CardWrapper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  width: "100%",
  height: "100%",
  lineHeight: "60px",
  boxShadow: theme.shadows[1],
  transition: "box-shadow 0.3s ease-in-out",
  cursor: "pointer",
  "&:hover": {
    boxShadow: theme.shadows[15],
  },
}));

const CommitteeManagementMUI = () => {
  const [committeeData, setCommitteeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [isAddCommittee, setIsAddCommittee] = useState(false);

  const fetchCommittee = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get("/api/v1/committee/committees");
      if (response.data?.data?.committees) {
        setCommitteeData(response.data.data.committees);
      } else {
        console.error("Unexpected data structure:", response.data);
        setError("Invalid data structure received from server");
      }
    } catch (err) {
      console.error("Error fetching committees:", err);
      setError(err.message || "Failed to fetch committees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommittee();
  }, []);

  const filteredCommittees = committeeData.filter((committee) => {
    if (filter === "active") return committee.status === "active";
    if (filter === "inactive") return committee.status === "inactive";
    return true;
  });

  const handleDeleteCommittee = (id) => {
    setCommitteeData((prev) => prev.filter((committee) => committee.id !== id));
  };

  const handleAddCommittee = (newCommittee) => {
    setCommitteeData((prev) => [...prev, newCommittee]); // Add new committee to the state
    setIsAddCommittee(false); // Close the modal
  };

  return (
    <>
      <RightContent>
        <PaperWrapper>
          <ContentHeader sx={{ position: "static" }} elevation={4}>
            <Typography
              variant="h5"
              component="h5"
              sx={{ marginRight: "20px" }}
            >
              Committee Management
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
            >
              <FormControl style={{ marginRight: "5 px", width: "150px" }}>
                <InputLabel id="filter-select-label">Show</InputLabel>
                <Select
                  labelId="filter-select-label"
                  id="filter-select"
                  value={filter} // Controlled filter state
                  label="Show"
                  onChange={(e) => setFilter(e.target.value)} // Update filter state
                  size="small"
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                onClick={() => setIsAddCommittee(true)}
              >
                Add Committee
              </Button>
            </Box>
          </ContentHeader>
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="50vh"
            >
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="50vh"
            >
              <Typography color="error">{error}</Typography>
            </Box>
          ) : (
            <Grid2
              container
              columnSpacing={3}
              rowSpacing={3}
              sx={{
                borderRadius: "20px",
                position: "relative",
                top: "30px",
                paddingBottom: "30px",
              }}
            >
              {filteredCommittees.length > 0 ? (
                filteredCommittees.map((committee) => (
                  <CommitteeCard
                    key={committee.id}
                    committee={committee}
                    onDelete={handleDeleteCommittee}
                  />
                ))
              ) : (
                <Grid2 item xs={12}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    width="100%"
                    p={3}
                  >
                    <Typography variant="h6" color="textSecondary">
                      No committees found.
                    </Typography>
                  </Box>
                </Grid2>
              )}
            </Grid2>
          )}
        </PaperWrapper>
      </RightContent>
      <PopupModals
        modalBody={<AddCommitteeForm onAddCommittee={handleAddCommittee} />}
        isOpen={isAddCommittee}
        title={`Add Committee`}
        setIsOpen={setIsAddCommittee}
        width={500}
      />
    </>
  );
};

export default CommitteeManagementMUI;

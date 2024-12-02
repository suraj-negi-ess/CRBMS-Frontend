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
} from "@mui/material";
import axios from "axios";
import CommitteeCard from "../../components/CommitteeCard/CommitteeCard";
import { ContentHeader, RightContent } from "../../Style";

// Styled component for the card wrapper
const CardWrapper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  width: "100%",
  height: "100%",
  lineHeight: "60px",
  border: "2px solid #0858f7",
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
  const [filter, setFilter] = useState("all"); // Default to showing all committees

  // Fetch committees on component mount
  const fetchCommittee = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get("/api/v1/committee/committees");
      if (response.data?.data?.committees) {
        setCommitteeData(response.data.data.committees);
        console.log(response.data.data.committees);
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

  // Filter committees based on the selected filter
  const filteredCommittees = committeeData.filter((committee) => {
    if (filter === "active") return committee.status === "active"; // Show only active committees
    if (filter === "inactive") return committee.status === "inactive"; // Show only inactive committees
    return true; // Show all committees if "All" is selected
  });

  const handleDeleteCommittee = (id) => {
    setCommitteeData((prev) => prev.filter((committee) => committee.id !== id));
  };

  return (
    <RightContent>
      <ContentHeader elevation={8}>
        <Typography variant="h6" component="h6" sx={{ marginRight: "20px" }}>
          Committee Management
        </Typography>
        <FormControl style={{ marginRight: "50px", width: "150px" }}>
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
          spacing={2}
          sx={{
            borderRadius: "20px",
            position: "relative",
            top: "10px",
          }}
        >
          {filteredCommittees.length > 0 ? (
            filteredCommittees.map((committee) => (
              <CardWrapper elevation={12} key={committee.id}>
                <CommitteeCard
                  committee={committee}
                  onDelete={handleDeleteCommittee}
                />
              </CardWrapper>
            ))
          ) : (
            <Grid2 item xs={12}>
              <Box display="flex" justifyContent="center" width="100%" p={3}>
                <Typography variant="h6" color="textSecondary">
                  No committees found.
                </Typography>
              </Box>
            </Grid2>
          )}
        </Grid2>
      )}
    </RightContent>
  );
};

export default CommitteeManagementMUI;

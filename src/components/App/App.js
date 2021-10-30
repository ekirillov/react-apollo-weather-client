import React, { useState } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import WeatherReportCard from "components/WeatherReportCard";
import AddWeatherReportForm from "components/AddWeatherReportForm";

const App = () => {
  const [cities, setCities] = useState(["Moscow"]);
  return (
    <Box p={2}>
      <Typography
        color="primary"
        component="h1"
        variant="h5"
        style={{ marginRight: "8px" }}
      >
        Weather reports
      </Typography>
      <Box mb={2}>
        <AddWeatherReportForm
          onAdd={(newCity) => setCities(() => [...cities, newCity])}
        />
      </Box>
      <Grid container spacing={4}>
        {cities.map((city) => (
          <Grid item key={city}>
            <WeatherReportCard name={city} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default App;

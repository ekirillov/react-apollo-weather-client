import React, { useState } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import CityWeatherCard from "components/CityWeatherCard";
import AddCity from "components/AddCity";

const App = () => {
  const [cities, setCities] = useState(["Smolensk", "Moscow", "Kyiv"]);
  return (
    <Box p={2}>
      <Typography
        color="primary"
        component="h1"
        variant="h5"
        style={{ marginRight: "8px" }}
      >
        Weather cards
      </Typography>
      <Box mb={2}>
        <AddCity onAdd={(newCity) => setCities(() => [...cities, newCity])} />
      </Box>
      <Grid container spacing={4}>
        {cities.map((city) => (
          <Grid item key={city}>
            <CityWeatherCard name={city} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default App;

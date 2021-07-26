import React from "react";
import CityWeatherContainer from "containers/CityWeatherContainer";
import { Grid } from "@material-ui/core";

const App = () => {
  return (
    <Grid container spacing={4}>
      <Grid item>
        <CityWeatherContainer city="Smolensk" />
      </Grid>
      <Grid item>
        <CityWeatherContainer city="Moscow" />
      </Grid>
      <Grid item>
        <CityWeatherContainer city="Kyiv" />
      </Grid>
    </Grid>
  );
};

export default App;

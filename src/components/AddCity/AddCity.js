import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, TextField } from "@material-ui/core";

const AddCity = ({ onAdd }) => {
  const [city, setCity] = useState("");

  return (
    <form
      onSubmit={(e) => {
        // prevent page reload
        e.preventDefault();
        onAdd(city);
      }}
      display="flex"
      alignItems="center"
    >
      <TextField
        style={{ marginRight: "8px" }}
        value={city}
        type="text"
        onChange={(e) => setCity(e.target.value)}
      />
      <Button variant="outlined" size="small" color="primary" type="submit">
        Add new city
      </Button>
    </form>
  );
};

AddCity.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddCity;

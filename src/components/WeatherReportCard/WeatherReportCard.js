import React from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";
import { MINUTE, getDayString } from "utils/time";

const Title = ({ cityName = "" }) => {
  return (
    <Typography variant="h5" component="h2">
      {cityName}
    </Typography>
  );
};

const DateString = ({ date }) => {
  return <Typography color="textSecondary">{getDayString(date)}</Typography>;
};

const WeatherIcon = ({ statusCode }) => {
  return (
    <Avatar
      src={`http://openweathermap.org/img/wn/${statusCode}@2x.png`}
      alt="weather icon"
      style={{
        height: "72px",
        width: "72px",
      }}
    />
  );
};

const Temperature = ({ temperature }) => {
  return (
    <Typography variant="h2" component="p" style={{ width: "200px" }}>
      {temperature}
      <Typography variant="h4" component="sup">
        °C
      </Typography>
    </Typography>
  );
};

const StatusDescription = ({ description }) => {
  return (
    <Typography variant="h5" component="div">
      {description}
    </Typography>
  );
};

const WEATHER_REPORT = gql`
  query Query($city: String!) {
    weatherReport(city: $city) {
      temperature
      date
      weatherCondition {
        description
        icon
      }
    }
  }
`;

const WeatherReportCard = ({ name }) => {
  const {
    error,
    data,
    loading: isLoading,
  } = useQuery(WEATHER_REPORT, {
    variables: {
      city: name,
    },
    pollInterval: 10 * MINUTE,
    notifyOnNetworkStatusChange: true,
  });

  const renderWeatherReport = () => {
    if (isLoading) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "32px 0px",
          }}
        >
          <CircularProgress />
        </div>
      );
    }

    if (error) {
      return <Typography color="error">{error.toString()}</Typography>;
    }

    if (!data) {
      return "No data";
    }

    const {
      weatherReport: {
        temperature,
        date,
        weatherCondition: { description, icon } = {},
      },
    } = data;

    return (
      <>
        <DateString date={new Date(date)} />
        <Box display="flex">
          <Temperature temperature={temperature} />
          <WeatherIcon statusCode={icon} />
        </Box>
        <StatusDescription description={description} />
      </>
    );
  };

  return (
    <Card
      style={{
        width: "320px",
        height: "200px",
      }}
      variant="outlined"
    >
      <CardContent>
        <Title cityName={name} />
        {renderWeatherReport()}
      </CardContent>
    </Card>
  );
};

WeatherReportCard.propTypes = {
  name: PropTypes.string.isRequired,
};

export default WeatherReportCard;

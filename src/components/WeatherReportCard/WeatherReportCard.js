import React from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import RefreshIcon from "@material-ui/icons/Refresh";
import { gql, useQuery } from "@apollo/client";
import { MINUTE } from "utils/time";

const WEEK_DAYS = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thur",
  5: "Fri",
  6: "Sat",
};

const parseTimeValue = (value) => (value < 10 ? `0${value}` : value);

const getDayString = (date) => {
  // TODO: use date-fns
  const weekDay = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedWeekDayName = WEEK_DAYS[weekDay];
  const formattedHours = parseTimeValue(hours);
  const formattedMinutes = parseTimeValue(minutes);

  return `${formattedWeekDayName}, ${formattedHours}:${formattedMinutes}`;
};

const Title = ({ cityName = "", onRefresh }) => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="h5" component="h2">
        {cityName}
      </Typography>
      <IconButton onClick={onRefresh} size="small" color="inherit">
        <RefreshIcon />
      </IconButton>
    </Box>
  );
};

const DateString = ({ isLoading = false, date }) => {
  return (
    <Typography color="textSecondary">
      {isLoading ? <Skeleton /> : getDayString(date)}
    </Typography>
  );
};

const WeatherIcon = ({ statusCode }) => {
  return (
    <Avatar
      src={`http://openweathermap.org/img/wn/${statusCode}@2x.png`}
      alt="weather"
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
      <Typography variant="h4" component="sup" style={{ marginRight: "32px" }}>
        °C
      </Typography>
    </Typography>
  );
};

const StatusDescription = ({ description, isLoading }) => {
  return (
    <Typography variant="h5" component="div">
      {isLoading ? <Skeleton width="100%" /> : description}
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
    data = {},
    loading: isLoading,
    refetch,
  } = useQuery(WEATHER_REPORT, {
    variables: {
      city: name,
    },
    pollInterval: 10 * MINUTE,
    notifyOnNetworkStatusChange: true,
  });

  const renderCardContent = () => {
    const {
      weatherReport: {
        temperature,
        date,
        weatherCondition: { description, icon } = {},
      } = {},
    } = data;

    return (
      <>
        <Box>
          {isLoading ? (
            <Skeleton width="100%">
              <Title cityName="city name" />
            </Skeleton>
          ) : (
            <Title cityName={name} onRefresh={() => refetch()} />
          )}
        </Box>
        <DateString isLoading={isLoading} date={new Date(date)} />
        {isLoading ? (
          <Skeleton width="100%">
            <Box display="flex">
              <Temperature temperature={0} />
            </Box>
          </Skeleton>
        ) : (
          <Box display="flex">
            <Temperature temperature={temperature} />
            <WeatherIcon statusCode={icon} />
          </Box>
        )}
        <StatusDescription isLoading={isLoading} description={description} />
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
        {error ? error.toString() : renderCardContent()}
      </CardContent>
    </Card>
  );
};

WeatherReportCard.propTypes = {
  name: PropTypes.string,
};

export default WeatherReportCard;
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
import { capitalize } from "lodash";

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
      {isLoading ? <Skeleton width="100%" /> : getDayString(date)}
    </Typography>
  );
};

const WeatherIcon = ({ statusCode }) => {
  return (
    <Avatar
      src={
        statusCode
          ? `http://openweathermap.org/img/wn/${statusCode}@2x.png`
          : ""
      }
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
      {isLoading ? <Skeleton width="100%" /> : capitalize(description)}
    </Typography>
  );
};

const CityWeatherCard = ({
  isLoading = false,
  cityName = "",
  date = new Date(),
  temperature = 0,
  statusCode = "",
  description = "",
  onRefresh,
}) => {
  return (
    <Card
      style={{
        minWidth: "330px",
      }}
    >
      <CardContent>
        <Box>
          {isLoading ? (
            <Skeleton
              style={{
                maxWidth: "none",
              }}
            >
              <Title cityName={cityName} onRefresh={onRefresh} />
            </Skeleton>
          ) : (
            <Title cityName={cityName} onRefresh={onRefresh} />
          )}
        </Box>
        <DateString isLoading={isLoading} date={date} />
        <Box display="flex">
          {isLoading ? (
            <Skeleton
              style={{ display: "flex", width: "100%", maxWidth: "none" }}
            >
              <Temperature temperature={0} />
              <WeatherIcon statusCode={statusCode} />
            </Skeleton>
          ) : (
            <>
              <Temperature temperature={temperature} />
              <WeatherIcon statusCode={statusCode} />
            </>
          )}
        </Box>
        <StatusDescription isLoading={isLoading} description={description} />
      </CardContent>
    </Card>
  );
};

CityWeatherCard.propTypes = {
  cityName: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  description: PropTypes.string,
  isLoading: PropTypes.bool,
  onRefresh: PropTypes.func,
  statusCode: PropTypes.string,
  temperature: PropTypes.number,
};

export default CityWeatherCard;

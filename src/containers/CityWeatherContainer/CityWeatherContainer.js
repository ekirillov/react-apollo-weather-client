import React from "react";
import PropTypes from "prop-types";
import { useQuery, gql, NetworkStatus } from "@apollo/client";
import CityWeatherCard from "components/CityWeatherCard";
import { MINUTE } from "utils/time";

const CITY_WEATHER = gql`
  query GetCityWeather($city: String!, $date: Date) {
    cityWeather(city: $city, date: $date) {
      city
      temperature
      date
      weather {
        description
        iconCode
      }
    }
  }
`;

const CityWeather = ({ city }) => {
  const {
    error,
    data = {},
    networkStatus,
    refetch,
  } = useQuery(CITY_WEATHER, {
    variables: {
      city,
    },
    pollInterval: MINUTE,
    notifyOnNetworkStatusChange: true,
  });

  if (error) return <p>Error :(</p>;

  const {
    cityWeather: {
      city: cityName,
      temperature,
      date,
      weather: { description, iconCode } = {},
    } = {},
  } = data;

  return (
    <CityWeatherCard
      isLoading={[NetworkStatus.loading, NetworkStatus.refetch].includes(
        networkStatus
      )}
      cityName={cityName}
      date={date ? new Date(date) : new Date()}
      temperature={temperature}
      statusCode={iconCode}
      description={description}
      onRefresh={() => refetch()}
    />
  );
};

CityWeather.propTypes = {
  city: PropTypes.string.isRequired,
};

export default CityWeather;

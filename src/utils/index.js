export const getDateDifferenceFromNow = (fromDate) => {
  let difference = new Date().getTime() - new Date(fromDate).getTime();

  const oneSecondInMs = 1 * 1000;
  const oneMinuteInMs = 60 * oneSecondInMs;
  const oneHourInMs = 60 * oneMinuteInMs;
  const oneDayInMs = 24 * oneHourInMs;
  const oneMonthInMs = 30 * oneDayInMs;
  const oneYearInMs = 12 * oneMonthInMs;

  let yearDifference = Math.floor(difference / oneYearInMs);
  difference -= yearDifference * oneYearInMs;
  let monthDifference = Math.floor(difference / oneMonthInMs);
  difference -= monthDifference * oneMonthInMs;
  let dayDifference = Math.floor(difference / oneDayInMs);
  difference -= dayDifference * oneDayInMs;
  let hourDifference = Math.floor(difference / oneHourInMs);
  difference -= hourDifference * oneHourInMs;
  let minuteDifference = Math.floor(difference / oneMinuteInMs);
  difference -= minuteDifference * oneMinuteInMs;
  let secondDifference = Math.floor(difference / oneSecondInMs);

  let message;

  if (yearDifference > 0) {
    message = `${yearDifference} year`;
  }
  if (monthDifference > 0) {
    return (message = message
      ? `${message} ${monthDifference} months`
      : `${monthDifference} months`);
  }
  if (dayDifference > 0) {
    message = message
      ? `${message} ${dayDifference} days`
      : `${dayDifference} days`;
  }
  if (hourDifference > 0) {
    message = message
      ? `${message} ${hourDifference} hour`
      : `${hourDifference} hour`;
  }

  if (minuteDifference > 0) {
    return (message = message
      ? `${message} ${minuteDifference} minutes`
      : `${minuteDifference} minutes`);
  }
  if (secondDifference) {
    message = message
      ? `${message} ${Math.round(secondDifference)} seconds`
      : `${Math.round(secondDifference)} seconds`;
  }

  return message;
};

export const sortByDate = (a, b) => {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
};
export const sortPostsByDate = (a, b) => {
  return new Date(b.createAt).getTime() - new Date(a.createAt).getTime();
};

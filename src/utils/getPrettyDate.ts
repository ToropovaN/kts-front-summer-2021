export const getPrettyDate = (stringDate: string) => {
  let newDate = new Date(stringDate).toDateString().split(" ");
  let prettyDate = newDate[2] + " " + newDate[1];
  if (newDate[3] !== new Date().getFullYear().toString()) {
    prettyDate += " " + newDate[3];
  }
  return prettyDate;
};

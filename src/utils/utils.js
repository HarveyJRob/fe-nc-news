export const formatPSQLDateTimeStamp = (created_at) => {
  const newDate = new Date(created_at.replace(" ", "T"));
  return `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
};

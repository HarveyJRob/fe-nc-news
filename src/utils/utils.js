export const formatPSQLDateTimeStamp = (created_at) => {
  const newDate = new Date(created_at.replace(" ", "T"));
  return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
};

export const displayCreatedAt = (created_at) => {
  const dateNow = new Date();
  const dateCreated = new Date(created_at.replace(" ", "T"));
  const dateDiff = Math.abs(dateNow.getTime() - dateCreated.getTime());

  if (dateDiff < 1000 * 60) {
    return `${Math.ceil(dateDiff / 1000)} seconds ago`;
  }
  if (dateDiff < 1000 * 60 * 60) {
    return `${Math.ceil(dateDiff / (1000 * 60))} minutes ago`;
  }
  if (dateDiff < 1000 * 60 * 60 * 24) {
    return `${Math.ceil(dateDiff / (1000 * 60 * 60))} hours ago`;
  }
  if (dateDiff < 1000 * 60 * 60 * 24 * 14) {
    return `${Math.ceil(dateDiff / (1000 * 60 * 60 * 24 * 7))} days ago`;
  }
  if (dateDiff < 1000 * 60 * 60 * 24 * 30) {
    return `${Math.ceil(dateDiff / (1000 * 60 * 60 * 24 * 7))} weeks ago`;
  }
  if (dateDiff < 1000 * 60 * 60 * 24 * 365) {
    return `${Math.ceil(dateDiff / (1000 * 60 * 60 * 24 * 30))} months ago`;
  } else {
    return `${Math.ceil(dateDiff / (1000 * 60 * 60 * 24 * 365))} years ago`;
  }
};

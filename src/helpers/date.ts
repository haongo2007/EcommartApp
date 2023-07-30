import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  differenceInYears,
} from "date-fns";

export const getDateCompare = (after: Date) => {
  const currDate = new Date();
  const compareInMinutes = differenceInMinutes(currDate, after);
  if (compareInMinutes < 1) {
    return `${differenceInSeconds(currDate, after)} seconds ago`;
  } else if (compareInMinutes < 60) {
    return `${compareInMinutes} minutes ago`;
  } else if (compareInMinutes < 60 * 24) {
    return `${differenceInHours(currDate, after)} hour(s) ago`;
  } else if (compareInMinutes < 60 * 30 * 24) {
    return `${differenceInDays(currDate, after)} day(s) ago`;
  } else if (compareInMinutes < 60 * 30 * 24 * 12) {
    return `${differenceInMonths(currDate, after)} month(s) ago`;
  } else {
    return `${differenceInYears(currDate, after)} year(s) ago`;
  }
};

export const currentDateTimeToString = (date) => {
  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  return date.getFullYear() + '-' + (mm > 9 ? '' : '0') + mm + '-' + (dd > 9 ? '' : '0') + dd + ' ' + (h > 9 ? '' : '0') + h + ':' + (m > 9 ? '' : '0') + m + ':' + (s > 9 ? '' : '0') + s;
}

export const getDateDifference = (date) => {
  let diff = differenceInMinutes(new Date(), new Date(date));
  if (diff < 60) return diff + " minutes ago";
  diff = Math.ceil(diff / 60);
  if (diff < 24) return `${diff} hour${diff === 0 ? "" : "s"} ago`;
  diff = Math.ceil(diff / 24);
  if (diff < 30) return `${diff} day${diff === 0 ? "" : "s"} ago`;
  diff = Math.ceil(diff / 30);
  if (diff < 12) return `${diff} month${diff === 0 ? "" : "s"} ago`;
  diff = diff / 12;
  return `${diff.toFixed(1)} year${Math.ceil(diff) === 0 ? "" : "s"} ago`;
}
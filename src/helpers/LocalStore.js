// Movies List
const STORAGE_TIMESTAMP_MOVIES = 'movies-timestamp';
const STORAGE_MOVIES = 'movies';

// Individual Movies
const STORAGE_TIMESTAMP_DETAIL_PREFIX = 'movie-timestamp-';
const STORAGE_DETAIL_PREFIX = 'movie-';

const localStorage = window.localStorage || {};

// TODO: Should modify to only store what we need to be mindful of storage space

// Compare the localDataTimestamp with the currentTimestamp and determine whether
// localDataTimestamp is expired based on hoursAllowed
function localDataIsExpired(localDataTimestamp, currentTimestamp, hoursAllowed = 1) {
  const HOURS_CONSIDERED_FRESH = hoursAllowed;
  const MS_IN_HOUR = 1000 * 3600;
  const ALLOWED_TIME_DELTA = HOURS_CONSIDERED_FRESH * MS_IN_HOUR;

  const convertedCurrentTimeStamp = parseFloat(currentTimestamp);
  const convertedLocalTimeStamp = parseFloat(localDataTimestamp);

  if ([convertedCurrentTimeStamp, convertedLocalTimeStamp].some(stamp => Number.isNaN(stamp))) {
    return true;
  }

  if (parseFloat(currentTimestamp) - parseFloat(localDataTimestamp) > ALLOWED_TIME_DELTA) {
    return true;
  }
  return false;
}

function getStoredMovies() {
  const moviesString = localStorage.getItem(STORAGE_MOVIES);
  if (moviesString === null) {
    return null;
  }

  let moviesArray = null;
  try {
    moviesArray = JSON.parse(moviesString);
  } catch (e) {
    // TODO: Need to do better here and report the error.
    moviesArray = null;
  }
  if (!Array.isArray(moviesArray)) {
    return null;
  }
  return moviesArray;
}

function getStoredDetail(id) {
  const detailString = localStorage.getItem(`${STORAGE_DETAIL_PREFIX}${id}`);
  if (detailString === null) {
    return null;
  }

  let detail = null;
  try {
    detail = JSON.parse(detailString);
  } catch (e) {
    // TODO: Need to do better here and report the error.
    detail = null;
  }

  if (!(detail !== null && typeof detail === 'object')) {
    return null;
  }
  return detail;
}

function storeMovies(movies, timestamp) {
  localStorage.setItem(STORAGE_MOVIES, JSON.stringify(movies));
  localStorage.setItem(STORAGE_TIMESTAMP_MOVIES, timestamp);
}

function storeDetail(detail, id, timestamp) {
  localStorage.setItem(`${STORAGE_DETAIL_PREFIX}${id}`, JSON.stringify(detail));
  localStorage.setItem(`${STORAGE_TIMESTAMP_DETAIL_PREFIX}${id}`, timestamp);
}

function getStoredMoviesTimestamp() {
  return parseFloat(localStorage.getItem(STORAGE_TIMESTAMP_MOVIES));
}

function getStoredDetailTimestamp(id) {
  return parseFloat(localStorage.getItem(`${STORAGE_TIMESTAMP_DETAIL_PREFIX}${id}`));
}

function createTimestamp() {
  return new Date().getTime();
}

export default {
  getStoredMovies,
  localDataIsExpired,
  getStoredMoviesTimestamp,
  createTimestamp,
  storeMovies,
  getStoredDetail,
  storeDetail,
  getStoredDetailTimestamp,
};

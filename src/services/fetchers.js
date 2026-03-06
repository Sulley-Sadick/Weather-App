export const getJSON = async (url) => {
  let response;
  try {
    response = await fetch(url);
  } catch (err) {
    throw new Error(
      "Network error. Please check your network connection and try again.",
    );
  }

  if (!response.ok) {
    throw new Error(
      `Unable to fetch weather data. Please check city spellings and try again.`,
    );
  }

  let data;

  try {
    data = await response.json();

    return data;
  } catch (err) {
    throw new Error("Unable to parse server response. try again later.");
  }
};

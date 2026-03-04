export const getJSON = async (url) => {
  let response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error("Network error: failed to fetch data");
  }

  if (!response.ok) {
    if (response.satus === 404) "city not found, check your spellings";
    `server error: ${response.status} ${response.statusText}`;
  }

  let data;

  try {
    data = await response.json();

    return data;
  } catch {
    throw new Error("Failed to parse response from server");
  }
};

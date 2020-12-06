export function jsonFetched(data) {
  return {
    type: "FETCHED_EXPEDITIONS",
    payload: data,
  };
}

export function fetchExpeditions(dispatch, getState) {
  fetch(
    "https://api.npolar.no/marine/biology/sample/?q=&fields=expedition,utc_date,programs,conveyance&limit=all&format=json&variant=array"
  )
    .then((response) => response.json())
    .then((data) => {
      dispatch(jsonFetched(data));
    });
}

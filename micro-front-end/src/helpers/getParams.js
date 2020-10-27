export const getParams = (str) => {
  let queryString = str || window.location.search || "";
  let keyValPairs = [];
  let params = {};
  queryString = queryString.replace(/.*?\?/, "");

  if (queryString.length) {
    keyValPairs = queryString.split("&");
    for (var pairNum in keyValPairs) {
      var key = keyValPairs[pairNum].split("=")[0];
      if (!key.length) continue;
      if (typeof params[key] === "undefined") params[key] = [];
      params[key].push(keyValPairs[pairNum].split("=")[1]);
    }
  }
  return params;
};

export const checkDeathObjectValid = death => {
  if (
    typeof death !== "object" ||
    !death.hasOwnProperty("name") ||
    death.name === "" ||
    !death.hasOwnProperty("conditions") ||
    death.conditions === "" ||
    !death.hasOwnProperty("timeOfDeath") ||
    death.timeOfDeath === "" ||
    !death.hasOwnProperty("img")
  ) {
    return false;
  }
  return true;
};

export const checkPageNumber = (page, totalDeaths, mapPerPages) => {
  if (page < 1 || Math.ceil(totalDeaths / mapPerPages) < page) {
    return true;
  }
  return false;
};

export const checkDeathObjectValid = death => {
  if (
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

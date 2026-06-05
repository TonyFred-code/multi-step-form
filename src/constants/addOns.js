import { PRICING_TERMS } from "./plansPricing.js";

const ADD_ONS = [
  {
    ID: 1,
    NAME: "online service",
    [PRICING_TERMS.MONTHLY]: 1,
    [PRICING_TERMS.YEARLY]: 10,
    DESC: "Access to multiplayer games",
  },

  {
    ID: 2,
    NAME: "larger storage",
    [PRICING_TERMS.MONTHLY]: 2,
    [PRICING_TERMS.YEARLY]: 20,
    DESC: "Extra 1TB Of cloud save",
  },

  {
    ID: 3,
    NAME: "customizable profile",
    [PRICING_TERMS.MONTHLY]: 2,
    [PRICING_TERMS.YEARLY]: 20,
    DESC: "Custom theme on your profile",
  },
];

export { ADD_ONS };

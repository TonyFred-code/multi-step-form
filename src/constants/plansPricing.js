const PRICING_TERMS = {
  YEARLY: "yearly",
  MONTHLY: "monthly",
};

const YEARLY_DISCOUNT_LABEL = "2 months free";

const PLANS = [
  {
    NAME: "arcade",
    [PRICING_TERMS.YEARLY]: 90,
    [PRICING_TERMS.MONTHLY]: 9,
    ICON_URL: "/images/icon-arcade.svg",
  },

  {
    NAME: "advanced",
    [PRICING_TERMS.YEARLY]: 120,
    [PRICING_TERMS.MONTHLY]: 12,
    ICON_URL: "/images/icon-advanced.svg",
  },

  {
    NAME: "pro",
    [PRICING_TERMS.YEARLY]: 150,
    [PRICING_TERMS.MONTHLY]: 15,
    ICON_URL: "/images/icon-pro.svg",
  },
];

export { PRICING_TERMS, PLANS, YEARLY_DISCOUNT_LABEL };

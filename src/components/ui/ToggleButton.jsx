import { func, oneOf } from "prop-types";
import { PRICING_TERMS } from "../../constants/plansPricing.js";

export default function TogglePricingTerm({ pricingTerm, togglePricingTerm }) {
  // checked = pricing term is yearly (RIGHT)
  // not checked = pricing term is monthly (LEFT)
  const checked = pricingTerm === PRICING_TERMS.YEARLY;

  return (
    <div className="bg-blue-100 flex items-center justify-center gap-8 rounded-md py-3">
      <label
        htmlFor="pricing_term"
        className={`${checked ? "text-grey-500" : "text-blue-950"} font-medium capitalize text-sm`}
      >
        monthly
      </label>
      <div className="relative inline-block h-4 w-8">
        <input
          type="checkbox"
          className="sr-only peer"
          id="pricing_term"
          name="pricing_term"
          checked={checked}
          onChange={togglePricingTerm}
        />
        <label
          htmlFor="pricing_term"
          className="bg-blue-950 absolute top-0 left-0 h-full w-full rounded-full cursor-pointer duration-300 before:content-[''] before:absolute before:size-2.5 before:rounded-full before:top-0.75 before:left-0.75 before:bg-white before:transition-transform before:duration-300 peer-checked:before:translate-x-4 hover:opacity-50 transition"
        ></label>
      </div>
      <label
        htmlFor="pricing_term"
        className={`${!checked ? "text-grey-500" : "text-blue-950"} font-medium capitalize text-sm`}
      >
        yearly
      </label>
    </div>
  );
}

TogglePricingTerm.propTypes = {
  pricingTerm: oneOf([PRICING_TERMS.MONTHLY, PRICING_TERMS.YEARLY]).isRequired,
  togglePricingTerm: func.isRequired,
};

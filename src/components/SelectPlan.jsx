import {
  PLANS,
  PRICING_TERMS,
  YEARLY_DISCOUNT_LABEL,
} from "../constants/plansPricing.js";
import TogglePricingTerm from "./ui/ToggleButton.jsx";
import { STEPS } from "../constants/steps.js";
import { func, oneOf, string } from "prop-types";

export default function SelectPlan({
  activeStepId,
  activePlan,
  handleChangePlan,
  previousStep,
  nextStep,
  pricingTerm,
  togglePricingTerm,
}) {
  const isYearly = pricingTerm === PRICING_TERMS.YEARLY;

  return (
    <section
      className={`${activeStepId === STEPS.STEP_2 ? "flex" : "hidden"} flex-col gap-5 md:h-full`}
    >
      <header className="space-y-1">
        <h2 className="text-blue-950 text-xl font-bold">Select your plan</h2>
        <p className="text-grey-500 text-sm">
          You have the option of monthly or yearly billing
        </p>
      </header>

      <ul className="flex flex-col gap-3 lg:flex-row">
        {PLANS.map((plan) => {
          const { NAME, ICON_URL } = plan;

          return (
            <li key={NAME} className="lg:flex-1">
              <input
                type="radio"
                name="plan"
                id={NAME}
                className="peer hidden"
                checked={NAME === activePlan}
                value={NAME}
                onChange={handleChangePlan}
              />
              <label
                htmlFor={NAME}
                className="p-3 peer-checked:bg-blue-100 border border-blue-300 flex gap-3 rounded-md peer-checked:border-purple-600 items-center lg:flex-col lg:items-start lg:gap-8"
              >
                <span className="self-start flex items-center justify-center size-8 md:size-10 lg:size-12">
                  <img src={ICON_URL} alt="" />
                </span>
                <span>
                  <span className="flex-1 flex-col flex">
                    <span className="text-blue-950 capitalize font-medium">
                      {NAME}
                    </span>
                    <span className="text-grey-500 text-sm">
                      ${plan[pricingTerm]}/{isYearly ? "yr" : "mo"}
                    </span>
                  </span>
                  {isYearly && (
                    <span className="text-blue-950 text-sm font-medium">
                      {YEARLY_DISCOUNT_LABEL}
                    </span>
                  )}
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <TogglePricingTerm
        pricingTerm={pricingTerm}
        togglePricingTerm={togglePricingTerm}
      />

      <div
        className={`hidden bg-white mt-auto md:flex items-center justify-between`}
      >
        <button
          onClick={previousStep}
          type="button"
          className={`cursor-pointer text-gray-500 hover:bg-blue-100 border border-transparent hover:border-gray-500 capitalize rounded py-3 px-5 font-medium hover:text-blue-950`}
        >
          go back
        </button>
        <button
          type="button"
          className={`cursor-pointer text-white capitalize bg-blue-950 rounded py-3 px-5 font-medium`}
          onClick={nextStep}
        >
          next step
        </button>
      </div>
    </section>
  );
}

SelectPlan.propTypes = {
  activeStepId: string.isRequired,
  activePlan: string.isRequired,
  handleChangePlan: func.isRequired,
  previousStep: func.isRequired,
  nextStep: func.isRequired,
  pricingTerm: oneOf([PRICING_TERMS.MONTHLY, PRICING_TERMS.YEARLY]).isRequired,
  togglePricingTerm: func.isRequired,
};

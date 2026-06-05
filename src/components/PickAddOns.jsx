import { func, instanceOf, oneOf, string } from "prop-types";
import { STEPS } from "../constants/steps.js";
import { ADD_ONS } from "../constants/addOns.js";
import { PRICING_TERMS } from "../constants/plansPricing.js";

export default function PickAddOns({
  activeStepId,
  previousStep,
  nextStep,
  addOnsList,
  handleAddOnToggle,
  pricingTerm,
}) {
  const isYearly = pricingTerm === PRICING_TERMS.YEARLY;

  return (
    <section
      className={`${activeStepId === STEPS.STEP_3 ? "flex" : "hidden"} flex-col h-full gap-5`}
    >
      <header className="space-y-px">
        <h2 className="text-blue-950 text-xl font-bold md:text-3xl lg:text-5xl">
          Pick add-ons
        </h2>
        <p className="text-grey-500 text-sm">
          Add-ons help enhance your gaming experience.
        </p>
      </header>
      <ul className="flex flex-col gap-3 ">
        {ADD_ONS.map((addOn) => {
          const { DESC, ID, NAME, PRICE } = addOn;
          const checked = addOnsList.has(ID);
          return (
            <li
              key={ID}
              className="lg:flex-1 focus-within:ring-3 focus-within:ring-purple-600/10 rounded-md"
            >
              <input
                type="checkbox"
                name="addon"
                id={`addOn-${ID}`}
                className="peer sr-only"
                checked={checked}
                value={NAME}
                onChange={() => handleAddOnToggle(ID)}
              />
              <label
                htmlFor={`addOn-${ID}`}
                className="p-3 peer-checked:bg-blue-100 border border-blue-300 flex gap-3 rounded-md peer-checked:border-purple-600 items-center lg:gap-8 hover:border-purple-600 cursor-pointer peer-focus-visible:border-purple-600"
              >
                <span
                  className={`rounded border flex items-center justify-center size-4 ${checked ? "bg-purple-600 border-purple-600" : "border-gray-500 bg-transparent"}`}
                >
                  {checked && <img src="/images/icon-checkmark.svg" alt="" />}
                </span>
                <span className="flex-1">
                  <span className="flex-1 flex-col flex">
                    <span className="text-blue-950 capitalize font-medium">
                      {NAME}
                    </span>
                    <span className="text-grey-500 text-sm">{DESC}</span>
                  </span>
                </span>
                <span className="text-purple-600 text-sm">
                  +${addOn[pricingTerm]}/{isYearly ? "yr" : "mo"}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
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

PickAddOns.propTypes = {
  activeStepId: string.isRequired,
  previousStep: func.isRequired,
  nextStep: func.isRequired,
  addOnsList: instanceOf(Set).isRequired,
  handleAddOnToggle: func.isRequired,
  pricingTerm: oneOf([PRICING_TERMS.MONTHLY, PRICING_TERMS.YEARLY]).isRequired,
};

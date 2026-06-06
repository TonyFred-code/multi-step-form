import { func, instanceOf, oneOf, string } from "prop-types";
import { STEPS } from "../constants/steps.js";
import { PLANS, PRICING_TERMS } from "../constants/plansPricing.js";
import { ADD_ONS } from "../constants/addOns.js";

export default function Summary({
  activeStepId,
  pricingTerm,
  previousStep,
  nextStep,
  addOnIds,
  plan,
  setActiveStepId,
}) {
  const isYearly = pricingTerm === PRICING_TERMS.YEARLY;
  const activePlan = PLANS.find((p) => p.NAME === plan);
  const activePlanPrice = activePlan[pricingTerm];
  const abbreviatedPricingTermName = isYearly ? "yr" : "mo";
  const addOnDetails = [...addOnIds].map((addOnId) =>
    ADD_ONS.find((a) => a.ID === addOnId)
  );
  let totalAddOnPrice = addOnDetails.reduce(
    (sum, addOnDetail) => sum + addOnDetail[pricingTerm],
    0
  );

  const hasSelectedAddOns = addOnDetails.length > 0;
  const totalCharges = totalAddOnPrice + activePlanPrice;

  return (
    <section
      className={`${activeStepId === STEPS.STEP_4 ? "flex" : "hidden"} flex-col h-full gap-5`}
    >
      <header className="space-y-px">
        <h2 className="text-blue-950 text-xl font-bold md:text-3xl lg:text-5xl">
          Finishing up
        </h2>
        <p className="text-grey-500 text-sm">
          Double-check everything looks OK before confirming.
        </p>
      </header>
      <div className="bg-blue-50 rounded-md p-3 space-y-3">
        <div className="flex justify-between">
          <div className="flex flex-col items-start">
            <span className="capitalize text-blue-950 font-medium">
              {activePlan.NAME} ({isYearly ? "yearly" : "monthly"})
            </span>
            <button
              type="button"
              className="text-grey-500 underline capitalize decoration-2 hover:text-purple-600 focus-visible:text-purple-600 cursor-pointer"
              onClick={() => setActiveStepId(STEPS.STEP_2)}
              // directly move to change choice plan page
            >
              change
            </button>
          </div>
          <span className="text-blue-950 font-bold">
            ${activePlanPrice}/{abbreviatedPricingTermName}
          </span>
        </div>
        {hasSelectedAddOns && <hr />}
        {hasSelectedAddOns && (
          <ul className="flex flex-col gap-2">
            {addOnDetails.map((addOnDetail) => {
              const { ID, NAME } = addOnDetail;
              return (
                <li key={ID} className="flex justify-between">
                  <span className="text-grey-500 first-letter:capitalize lowercase inline-block text-[15px]">
                    {NAME}
                  </span>
                  <span className="text-blue-950 text-sm">
                    +${addOnDetail[pricingTerm]}/{abbreviatedPricingTermName}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="flex justify-between px-5">
        <span className="text-grey-500 text-sm inline-block first-letter:capitalize lowercase">
          Total (per {isYearly ? "year" : "month"})
        </span>
        <span className="text-purple-600 font-bold">
          +${totalCharges}/{abbreviatedPricingTermName}
        </span>
      </div>

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
          className={`cursor-pointer text-white capitalize bg-purple-600 rounded py-2 px-6 font-medium hover:opacity-50 focus-visible:opacity-50`}
          onClick={nextStep}
        >
          confirm
        </button>
      </div>
    </section>
  );
}

Summary.propTypes = {
  activeStepId: string.isRequired,
  nextStep: func.isRequired,
  previousStep: func.isRequired,
  pricingTerm: oneOf([PRICING_TERMS.MONTHLY, PRICING_TERMS.YEARLY]).isRequired,
  setActiveStepId: func.isRequired,
  addOnIds: instanceOf(Set),
  plan: string.isRequired,
};

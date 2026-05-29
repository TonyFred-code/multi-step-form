import { bool, number, string } from "prop-types";
import { STEPS_LIST } from "../constants/steps.js";

function StepIndicator({ step, isActive }) {
  return (
    <span
      className={`${isActive ? "text-blue-950 bg-blue-300 border-blue-300" : "text-white"} border inline-flex p-2 rounded-full size-12 items-center justify-center font-bold text-xl`}
    >
      {step}
    </span>
  );
}

StepIndicator.propTypes = {
  step: number.isRequired,
  isActive: bool.isRequired,
};

export default function TopBar({ activeStepId }) {
  return (
    <aside className="md:hidden">
      <ul className="flex gap-4 justify-center items-center">
        {STEPS_LIST.map((stepDetails) => {
          const { id, step } = stepDetails;
          const isActive = id === activeStepId;
          return (
            <li key={id}>
              <StepIndicator step={step} isActive={isActive} />
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

TopBar.propTypes = {
  activeStepId: string.isRequired,
};

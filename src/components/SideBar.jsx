import { bool, number, string } from "prop-types";
import { STEPS_LIST } from "../constants/steps.js";

function StepIndicator({ title, step, isActive }) {
  return (
    <>
      <span
        className={`${isActive ? "text-blue-950 bg-blue-300 border-blue-300" : "text-white"} border inline-flex p-2 rounded-full size-8 items-center justify-center font-bold text-base`}
      >
        {step}
      </span>
      <div>
        <span className="text-blue-300 font-medium text-xs uppercase">
          step {step}
        </span>
        <p className="uppercase text-sm text-white font-bold">{title}</p>
      </div>
    </>
  );
}

StepIndicator.propTypes = {
  title: string.isRequired,
  step: number.isRequired,
  isActive: bool.isRequired,
};

export default function SideBar({ activeStepId }) {
  return (
    <aside className="hidden md:block">
      <ul className="flex flex-col gap-4">
        {STEPS_LIST.map((stepDetails) => {
          const { id, title, step } = stepDetails;
          const isActive = id === activeStepId;

          return (
            <li key={id} className="flex gap-4 items-center">
              <StepIndicator step={step} title={title} isActive={isActive} />
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

SideBar.propTypes = {
  activeStepId: string.isRequired,
};

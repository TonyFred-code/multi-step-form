import { func, string } from "prop-types";
import { STEPS } from "../constants/steps.js";
import PhoneInput from "./PhoneInput.jsx";

export default function PersonalInfo({
  activeStepId,
  name,
  nameError,
  handleNameInput,
  nextStep,
  validateNameInput,
  emailAddress,
  emailAddressError,
  handleEmailAddressInput,
  validateEmailAddressInput,
  phoneNumber,
  setPhoneNumber,
  setPhoneNumberError,
  phoneNumberError,
  numberErrorCode,
  setNumberErrorCode,
}) {
  return (
    <section
      className={`flex-col flex-2 ${activeStepId === STEPS.STEP_1 ? "flex" : "hidden"} gap-4 md:h-full`}
    >
      <header className="space-y-2">
        <h1 className="text-blue-950 text-3xl font-bold">Personal info</h1>
        <p className="text-grey-500">
          Please provide your name, email address, and phone number.
        </p>
      </header>

      <div className="flex flex-col gap-3">
        <div className="flex-col flex">
          <label
            htmlFor="name"
            className="flex justify-between items-center text-sm"
          >
            <span className="text-blue-950">Name</span>
            {nameError && (
              <span className="text-red-500 font-medium text-sm">
                {nameError}
              </span>
            )}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="e.g. Stephen King"
            className={`border px-4 py-3 rounded hover:border-purple-600 focus-within:border-purple-600 outline-none text-blue-950 font-medium w-full box-border ${nameError ? "border-red-500 bg-red-500/10 placeholder:text-red-500/50" : "border-grey-500"}`}
            value={name}
            onChange={handleNameInput}
            onBlur={validateNameInput}
            aria-invalid={nameError ? "true" : undefined}
          />
        </div>

        <div className="flex flex-col shrink">
          <label
            htmlFor="email"
            className="flex text-sm justify-between items-center"
          >
            <span className="text-blue-950">Email Address</span>
            {emailAddressError && (
              <span className="text-red-500 font-medium">
                {emailAddressError}
              </span>
            )}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            placeholder="e.g. stephenking@lorem.com"
            className={`border px-4 py-3 rounded hover:border-purple-600 focus-within:border-purple-600 outline-none text-blue-950 font-medium w-full box-border ${emailAddressError ? "border-red-500 bg-red-500/10 placeholder:text-red-500/50" : "border-grey-500"}`}
            value={emailAddress}
            onChange={handleEmailAddressInput}
            onBlur={validateEmailAddressInput}
            aria-invalid={emailAddressError ? "true" : undefined}
          />
        </div>

        <PhoneInput
          phoneNumber={phoneNumber}
          phoneNumberError={phoneNumberError}
          setPhoneNumber={setPhoneNumber}
          setPhoneNumberError={setPhoneNumberError}
          numberErrorCode={numberErrorCode}
          setNumberErrorCode={setNumberErrorCode}
        />
      </div>

      <div className="hidden md:flex justify-end mt-auto">
        <button
          type="button"
          className={`cursor-pointer text-white capitalize bg-blue-950 rounded-md py-2 px-5 font-medium`}
          onClick={nextStep}
        >
          next step
        </button>
      </div>
    </section>
  );
}

PersonalInfo.propTypes = {
  activeStepId: string.isRequired,
  name: string.isRequired,
  nameError: string, // can be string or NULL
  handleNameInput: func.isRequired,
  nextStep: func.isRequired,
  validateNameInput: func.isRequired,
  emailAddress: string.isRequired,
  emailAddressError: string, // can be string or NULL
  handleEmailAddressInput: func.isRequired,
  validateEmailAddressInput: func.isRequired,
  phoneNumber: string.isRequired,
  setPhoneNumber: func.isRequired,
  setPhoneNumberError: func.isRequired,
  phoneNumberError: string, // can be string or NULL
  numberErrorCode: string, // can be string or NULL
  setNumberErrorCode: func.isRequired,
};

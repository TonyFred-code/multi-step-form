import { useState } from "react";
import PersonalInfo from "./components/PersonalInfo.jsx";
import SideBar from "./components/SideBar.jsx";
import { STEPS } from "./constants/steps.js";
import TopBar from "./components/TopBar.jsx";
import getPhoneInputErrorMessage from "./lib/getPhoneInputErrorMessage.js";
import SelectPlan from "./components/SelectPlan.jsx";
import { PLANS, PRICING_TERMS } from "./constants/plansPricing.js";
import PickAddOns from "./components/PickAddOns.jsx";
import Summary from "./components/Summary.jsx";

export default function App() {
  const [activeStepId, setActiveStepId] = useState(STEPS.STEP_1);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(null);
  const [emailAddress, setEmailAddress] = useState("");
  const [emailAddressError, setEmailAddressError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(null);
  const [numberErrorCode, setNumberErrorCode] = useState(null);
  const [plan, setPlan] = useState(PLANS[0].NAME);
  const [pricingTerm, setPricingTerm] = useState(PRICING_TERMS.MONTHLY);
  const [addOns, setAddOns] = useState(new Set());

  const showPreviousBtn =
    activeStepId === STEPS.STEP_2 || activeStepId === STEPS.STEP_3;

  function isNameValid() {
    return name.trim() !== "";
  }

  function isEmailAddressValid() {
    return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(emailAddress.trim());
  }

  function validatePersonalInfo() {
    const nameValid = isNameValid();
    const emailValid = isEmailAddressValid();

    if (!nameValid) {
      setNameError("This field is required");
    }

    if (!emailValid) {
      setEmailAddressError(
        emailAddress.trim() === ""
          ? "This field is required"
          : "Invalid email address"
      );
    }
    const numberErrMsg = getPhoneInputErrorMessage(
      phoneNumber,
      numberErrorCode
    );
    const phoneNumberValid = numberErrMsg === null;

    if (!phoneNumberValid) {
      setPhoneNumberError(numberErrMsg);
    }

    if (!nameValid || !emailValid || !phoneNumberValid) return;

    setNameError(null);
    setEmailAddressError(null);
    setPhoneNumberError(null);
    setNumberErrorCode(null);
    setActiveStepId(STEPS.STEP_2);
  }

  function handleNameInput(e) {
    setName(e.target.value);
    if (nameError) {
      setNameError(null);
    }
  }

  function handleEmailAddressInput(e) {
    setEmailAddress(e.target.value);
    if (emailAddressError) {
      setEmailAddressError(null);
    }
  }

  function handleChangePlan(e) {
    setPlan(e.target.value);
  }

  function handleAddOnToggle(addOnId) {
    setAddOns((prev) => {
      const next = new Set(prev);
      next.has(addOnId) ? next.delete(addOnId) : next.add(addOnId);
      return next;
    });
  }

  function togglePricingTerm() {
    if (pricingTerm === PRICING_TERMS.MONTHLY) {
      setPricingTerm(PRICING_TERMS.YEARLY);
      return;
    }

    setPricingTerm(PRICING_TERMS.MONTHLY);
  }

  function validateNameInput() {
    if (isNameValid()) {
      setNameError(null);
      return;
    }

    setNameError("This field is required");
  }

  function validateEmailAddressInput() {
    if (emailAddress.trim() === "") {
      setEmailAddressError("This field is required");
      return;
    }

    if (isEmailAddressValid()) {
      setEmailAddressError(null);
      return;
    }

    setEmailAddressError("Invalid email address");
  }

  function previousStep() {
    switch (activeStepId) {
      case STEPS.STEP_2:
        setActiveStepId(STEPS.STEP_1);
        break;

      case STEPS.STEP_3:
        setActiveStepId(STEPS.STEP_2);
        break;

      case STEPS.STEP_4:
        setActiveStepId(STEPS.STEP_3);
        break;

      default:
        break;
    }
  }

  function nextStep() {
    switch (activeStepId) {
      case STEPS.STEP_1:
        validatePersonalInfo();
        break;

      case STEPS.STEP_2:
        setActiveStepId(STEPS.STEP_3);
        break;

      case STEPS.STEP_3:
        setActiveStepId(STEPS.STEP_4);
        break;

      default:
        break;
    }
  }

  return (
    <div className="min-h-screen bg-[url('/images/bg-sidebar-mobile.svg')] bg-size-[100%_45.8vw] bg-no-repeat md:bg-none md:p-3 bg-blue-100 flex flex-col md:items-center md:justify-center ">
      <main className=" md:bg-white flex flex-col md:flex-row px-4 py-8 flex-1 items-center md:items-stretch gap-8 md:max-w-4xl lg:max-w-6xl md:w-10/12 md:p-4 md:rounded-xl">
        {/* <!-- Sidebar start --> */}
        <div className="md:flex-1 md:bg-[url('/images/bg-sidebar-desktop.svg')] md:bg-no-repeat bg-size-[auto_100%] md:rounded-md md:p-5">
          <TopBar activeStepId={activeStepId} />
          <SideBar activeStepId={activeStepId} />
        </div>
        {/* <!-- Sidebar end --> */}
        <form className="md:flex-2 bg-white md:bg-none rounded-xl py-6 px-4 sm:px-6 max-w-xl">
          {/* <!-- Step 1 start --> */}
          <PersonalInfo
            name={name}
            nameError={nameError}
            activeStepId={activeStepId}
            handleNameInput={handleNameInput}
            nextStep={nextStep}
            validateNameInput={validateNameInput}
            emailAddress={emailAddress}
            emailAddressError={emailAddressError}
            handleEmailAddressInput={handleEmailAddressInput}
            validateEmailAddressInput={validateEmailAddressInput}
            phoneNumber={phoneNumber}
            phoneNumberError={phoneNumberError}
            setPhoneNumber={setPhoneNumber}
            setPhoneNumberError={setPhoneNumberError}
            numberErrorCode={numberErrorCode}
            setNumberErrorCode={setNumberErrorCode}
          />
          {/* <!-- Step 1 end --> */}
          {/* <!-- Step 2 start --> */}

          <SelectPlan
            activeStepId={activeStepId}
            activePlan={plan}
            handleChangePlan={handleChangePlan}
            previousStep={previousStep}
            nextStep={nextStep}
            pricingTerm={pricingTerm}
            togglePricingTerm={togglePricingTerm}
          />
          {/* <!-- Step 2 end --> */}
          {/* <!-- Step 3 start --> */}
          <PickAddOns
            activeStepId={activeStepId}
            previousStep={previousStep}
            nextStep={nextStep}
            addOnsList={addOns}
            handleAddOnToggle={handleAddOnToggle}
            pricingTerm={pricingTerm}
          />
          {/* <!-- Step 3 end --> */}
          {/* <!-- Step 4 start --> */}
          <Summary
            activeStepId={activeStepId}
            addOnIds={addOns}
            setActiveStepId={setActiveStepId}
            nextStep={nextStep}
            previousStep={previousStep}
            plan={plan}
            pricingTerm={pricingTerm}
          />
          {/* <!-- Step 4 end --> */}
        </form>
        {/* <!-- Step 5 start --> */}
        <p className={`${activeStepId === STEPS.STEP_5 ? "flex" : "hidden"}`}>
          Thank you! Thanks for confirming your subscription! We hope you have
          fun using our platform. If you ever need support, please feel free to
          email us at support@loremgaming.com.
        </p>
        {/* <!-- Step 5 end --> */}
      </main>
      <div
        className={`md:hidden bg-white px-4 py-6 flex items-center ${showPreviousBtn ? "justify-between" : "justify-end"}`}
      >
        <button
          onClick={previousStep}
          type="button"
          className={`cursor-pointer text-gray-500 hover:bg-blue-100 border border-transparent hover:border-gray-500 capitalize rounded py-3 px-5 font-medium hover:text-blue-950 ${showPreviousBtn ? "flex" : "hidden"}`}
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
    </div>
  );
}

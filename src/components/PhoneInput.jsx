import IntlTelInput from "@intl-tel-input/react";
import "intl-tel-input/styles";
import { func, string } from "prop-types";
import { useRef } from "react";
import getPhoneInputErrorMessage from "../lib/getPhoneInputErrorMessage.js";

async function initialCountryLookUp() {
  const cached = document.cookie
    .split("; ")
    .find((row) => row.startsWith("country_code="))
    ?.split("=")[1];

  if (cached) return cached;

  const res = await fetch("https://ipapi.co/json");
  const data = await res.json();

  // expires in 30 days
  document.cookie = `country_code=${data.country_code}; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
  return data.country_code;
}

export default function PhoneInput({
  phoneNumber,
  setPhoneNumber,
  setPhoneNumberError,
  phoneNumberError,
  setNumberErrorCode,
}) {
  const itiRef = useRef(null);
  function handleSetPhoneNumberError() {
    const iti = itiRef.current?.getInstance();
    const errorCode = iti?.getValidationError();
    if (errorCode === null) {
      setNumberErrorCode(null);
      return;
    }

    setPhoneNumberError(getPhoneInputErrorMessage(iti?.getNumber(), errorCode));
    setNumberErrorCode(errorCode);
  }

  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor="phone"
        className="flex text-sm justify-between items-center"
      >
        <span className="text-blue-950 capitalize">phone number</span>
        {phoneNumberError && (
          <span className="text-red-500 font-medium">{phoneNumberError}</span>
        )}
      </label>
      <IntlTelInput
        onChangeNumber={(num) => {
          setPhoneNumber(num);
          if (phoneNumberError) setPhoneNumberError(null);
        }}
        onChangeValidity={(isValid) => {
          if (isValid) setPhoneNumberError(null);
        }}
        initialCountryLookup={initialCountryLookUp}
        loadUtils={() => import("intl-tel-input/utils")}
        inputProps={{
          id: "phone",
          onBlur: handleSetPhoneNumberError,
        }}
        value={phoneNumber}
        containerClass="input-container"
        ref={itiRef}
      />
    </div>
  );
}

PhoneInput.propTypes = {
  phoneNumber: string.isRequired,
  setPhoneNumber: func.isRequired,
  setPhoneNumberError: func.isRequired,
  phoneNumberError: string,
  numberErrorCode: string,
  setNumberErrorCode: func.isRequired,
};

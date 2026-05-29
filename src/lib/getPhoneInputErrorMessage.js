import intlTelInputCore from "intl-tel-input";

export default function getPhoneInputErrorMessage(number, errorCode) {
  if (!number) return "Please enter a number";
  const { VALIDATION_ERROR } = intlTelInputCore;
  switch (errorCode) {
    case VALIDATION_ERROR.INVALID_COUNTRY_CODE:
      return "Invalid dial code";
    case VALIDATION_ERROR.TOO_SHORT:
      return "Number is too short";
    case VALIDATION_ERROR.TOO_LONG:
      return "Number is too long";
    case VALIDATION_ERROR.IS_POSSIBLE:
    case null:
      return null; // PHONE NUMBER IS VALID
    default:
      return "Invalid number";
  }
}

import { bool } from "prop-types";

export default function Confirmation({ showSuccess }) {
  return (
    <section
      className={`${showSuccess ? "flex" : "hidden"} flex-col md:flex-2 bg-white md:bg-none rounded-xl py-12 px-4 sm:px-6 max-w-xl items-center text-center justify-center`}
    >
      <header className="space-y-2">
        <span className="inline-flex size-12 items-center justify-center md:my-4 md:size-15">
          <img
            className="w-full h-full"
            src="/images/icon-thank-you.svg"
            alt=""
          />
        </span>
        <h2 className="text-2xl font-bold text-blue-950">Thank you!</h2>
      </header>
      <p className="text-grey-500 text-sm">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </section>
  );
}

Confirmation.propTypes = {
  showSuccess: bool.isRequired,
};

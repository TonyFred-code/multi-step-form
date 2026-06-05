# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.3.1] - 2026-06-05

### Fixed

- Corrected broken plan add on input element's label association
- Updated plan add on description letter casing (uppercase/lowercase)

---

## [0.3.0] - 2026-06-05

### Added

- Introduced the **Select Add-ons** form section

### Changed

- Included visual indicators for keyboard focused form input elements on plan
  selection form section

---

## [0.2.1] - 2026-06-05

### Fixed

- Updated form inputs to make them available on the accessibility tree and reachable
  via keyboard focus navigation

---

## [0.2.0] - 2026-06-04

### Added

- Included a new form section allowing a user to select a plan and its
  billing cycle (monthly or yearly).

### Changed

- Extended form field validation by including highly visible and accessible error
  indicators to alert users of invalid inputs.

---

## [0.1.1] - 2026-06-02

### Fixed

- Fixed a bug on the Personal Information form that prevented user details
  from saving correctly.
- Resolved an issue where valid email addresses containing capital letters were
  incorrectly flagged as invalid.
- Fixed a silent error that caused the phone number input field to freeze or
  behave unpredictably on page load.

---

## [0.1.0] - 2026-05-29

### Added

- Introduced the **Personal Information** step to the user registration flow.
- Added an international phone number input field featuring automatic
  country-code formatting.
- Integrated the official project design system, including custom typography
  and brand theme colors.

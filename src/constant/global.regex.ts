/**
 * Regex for a single name without whitespace, numbers or special characters
 */
export const REGEX_SINGLE_NAME = /^(?:[a-zA-Z\u00C0-\u017F]|’|'|\.)+(?:(?:\s+)?(?:[a-zA-Z\u00C0-\u017F]|’|'|\.)+)+$/;

/**
 * Regex for complete name, can also include whitespace, "." and "," and "-" and "'" and "’"
 */
export const REGEX_COMPLETE_NAME =
  /^(?:[a-zA-Z\u00C0-\u017F]|’|'|\.|,|-|\d)+((?:(?:\s+)?(?:[a-zA-Z\u00C0-\u017F]|’|'|\.|,|-|\d)+)+)?$/;

/**
 * Regex for any string but not special characters and number only
 */
export const REGEX_NOT_SPECIAL_ONLY =
  /(?!^(\d|`|~|!|@|#|\$|%|\^|&|\*|\(|\)|_|\+|-|=|\{|\}|\[|\]|\||\\|;|:|"|'|<|>|,|\.|\?|\/)+$)^.+$/;

/**
 * Regex for email validation
 */
export const REGEX_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Regex for fiscal code validation
 * Fiscal code is a special identification number for residents of italy
 */
export const REGEX_FISCAL_CODE = /^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$/;

/**
 * Regex for phone number validation
 */
export const REGEX_PHONE_NUMBER = /^(?:(?:\+)?\d{1,3}(?:\s|-|\.)?)?\(?\d{3}\)?(?:\s|-|\.)?\d{3}(?:\s|-|\.)?\d{3,4}$/;

/**
 * Regex for websites
 */
export const REGEX_WEBSITE =
  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)$/;

/**
 * Regex for numbers only
 */
export const REGEX_NUMBERS_ONLY = /^\d+$/;

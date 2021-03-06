import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';
import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';
import eq from 'lodash/eq';
import sortBy from 'lodash/sortBy';
import isEqual from 'lodash/isEqual';
import upperCase from 'lodash/upperCase';
import trim from 'lodash/trim';
import toUpper from 'lodash/toUpper';

import { EMPTY_STRING } from '../containers/App/constants';
import { ASC, DESC } from './constants';

class Util {
  static setEmptyStringWhenUndefined(value) {
    return isUndefined(value) ? EMPTY_STRING : value;
  }

  static pickByIdentity(dataObj) {
    return pickBy(dataObj, identity);
  }

  static pickByNonNullAndNonEmptyString(dataObj) {
    return pickBy(dataObj, (value) => !isNull(value) && !isUndefined(value) && value !== EMPTY_STRING);
  }

  static equalsIgnoreCase(stringValue, stringSource) {
    return eq(upperCase(stringValue), upperCase(stringSource));
  }

  static isUnorderedArraysEqual(array, otherArray, identityOfArray) {
    const sortedArray = sortBy(array, [(o) => o[identityOfArray]]);
    const sortedOtherArray = sortBy(otherArray, [(o) => o[identityOfArray]]);

    return isEqual(sortedArray, sortedOtherArray);
  }

  static extractTrimmedStringByCharacters(string, characters) {
    return trim(toUpper(string), toUpper(characters));
  }

  static formatDate(date) {
    if (date === undefined) {
      return '';
    }
    const year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : `0${month}`;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : `0${day}`;

    return `${month}/${day}/${year}`;
  }

  static getFromState(state, key) {
    const value = state.get(key);
    if (value) {
      return value.toJS();
    }
    return null;
  }

  static hasText(str) {
    return typeof str === 'string' && str.trim() !== '';
  }

  static invertSortDirection(direction) {
    if (direction === ASC) {
      return DESC;
    }
    return ASC;
  }

  static deCamelize(str) {
    let string = str.replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, '$1 $2');
    string = string.charAt(0).toUpperCase() + string.substr(1);
    return string;
  }
}

export default Util;

/***************************************************/
/************** HELPER FUNCTIONS *******************/
/***************************************************/
"use strict";

/**
 * Generates a random msg within a given range.
 * @param {Array} arr - Mixed array value
 * @returns {Number} Random number between min and max.
 */
export const getRandElement = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
};// End of getRandElement

/**
 * Generates a random number within a given range.
 * @param {Number} start - minimum value (inclusive).
 * @param {Number} end - maximum value (inclusive).
 * @returns {Number} Random number between min and max range
 */
export const getRandNumber = (start = 1, end = 10) => {
    if (start > end) throw new Error("Min cannot be greater than Max");
    return Math.floor(Math.random() * (end - start + 1)) + start;
}// End of getRandNumber

/**
 * is even number or not verification
 * @param {Number} num - minimum value (inclusive).
 * @returns {Boolean} true or false value
 */
export const isEven = (num) => num % 2 === 0; //isEven

/**
 * Check if the given data is a valid non-empty array.
 * @param {Array} data - The data to check.
 * @returns {Boolean} - Returns true if it's a valid array, else false.
 */
export const isValidArray = (arr) => Array.isArray(arr) && arr.length > 0;

/**
 * Recursively deep freezes an object and its nested elements.
 * @param {Object} obj - Object to freeze
 * @returns {Object} the deeply frozen object (immutable object)
 */
export const deepFreeze = (obj) => {
    if (obj && typeof obj === "object" && !Object.isFrozen(obj)) {
        Object.freeze(obj); //Shallow freeze the object (top-level properties)
        Object.values(obj).forEach(deepFreeze); // Recursive freeze nested objects
    }
    return obj;
}// End of deepFreeze

/**
 * Retrieves an array from an object by a given property key.
 * Ensures the value is a non-empty array before returning it.
 * 
 * @param {Object} obj - The object containing the property.
 * @param {string} key - The key whose value needs to be accessed.
 * @returns {Array|null} - Returns the array if valid otherwise, null.
 */
export const getObjectByProperty = (obj, key) => {
    // Check if obj is a valid object and key exists
    if (obj && typeof obj === "object" && key in obj) {
        // Check if the property is an array and not empty
        return isValidArray(obj[key]) && obj[key].length > 0 ? obj[key] : null;
    }
    return null;
};// End of getObjectByProperty

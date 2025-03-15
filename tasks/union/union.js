/**
 * @module union
 * @purpose Custom implementation of union method
 * @description 
 * This function combines two arrays while avoiding duplicates 
 * and ensures order is preserved based on the first occurrence of each element
 *
 * @param {Array} arr1 - The first input array
 * @param {Array} arr2 - The second input array
 * @methods uniqueArray, isDeeplyIdentical
 * @returns {Array} A new array containing unique elements from both arrays
 *
 * @steps
 * 1. Validate given arrays.
 * 2. If both arrays contain primitive values then return merged set of array
 * 3. If any array contains non-primitives, handles deep comparison 
 * 5. Combines array by maintaining same order without duplicates
 * 6. Return the final merged array.
 */
"use strict";

// Function expression to combine two arrays and return a unique array
const union = (arr1, arr2) => 
    // Merge both arrays using spread operator using Set to remove duplicates
    uniqueArray([...new Set([...arr1, ...arr2])]);

/*******************************************************
 ***********************HELPERS*************************
 *******************************************************/

/**
 * Generates a new array with unique elements, preserving the order of their first occurrence.* 
 
 * For non-primitive values (objects, arrays), it uses deep comparison to ensure uniqueness.
 *
 * @param {Array} given_arr - The array from which to create a unique array.
 * @returns {Array} A new array containing only unique elements.
 */
const uniqueArray = (given_arr) => { 
    // define empty array to push deeply tracked valid data
    let unique_arr = [];

    given_arr.forEach(item => {
        // For non-primitive (objects), check for deep equality
        if (!unique_arr.some(curr_item => isDeeplyIdentical(curr_item, item))) {
            unique_arr.push(item);
        }
    });

    return unique_arr;
}

/**
 * Compares two values deeply to check if they are identical.
 * This method checks for nested objects, arrays, and primitive types.
 * 
 * It performs a strict equality check first, followed by a deep comparison for objects and arrays.
 * If the values are not strictly equal, it will compare their keys, lengths, and recursively check their values.
 *
 * @param {Array} ele1 - The first value to compare.
 * @param {Array} ele2 - The second value to compare.
 * @returns {boolean} True if both values are deeply equal, false otherwise.
 */
const isDeeplyIdentical = (ele1, ele2) => {
    // step 1: strict equality check for same ref
    if (ele1 === ele2) return true;

    // step 2: type checking
    if (ele1 === null || ele2 === null || typeof ele1 !== 'object' || typeof ele2 !== 'object') {
        return false;
    }  
    
    // step 3: if valid array types
    const is_arr1 = Array.isArray(ele1);
    const is_arr2 = Array.isArray(ele2);
    if (is_arr1 !== is_arr2 || (is_arr1 && ele1.length !== ele2.length)) {
        return false;
    }    

    if (is_arr1) {
        // deep compares all arr values 
        return ele1.every((ele1_val, index) => isDeeplyIdentical(ele1_val, ele2[index]));
    }

    // step4: get keys of ele1 and ele2 and compare lengths of keys
    const ele1_keys = Object.keys(ele1);
    const ele2_keys = Object.keys(ele2);

    if (ele1_keys.length !== ele2_keys.length) {
        return false;
    }
    
    // step 5: check key based value 
    for (let key of ele1_keys) {
        if (!ele2_keys.includes(key) || !isDeeplyIdentical(ele1[key], ele2[key])) {
            return false;
        }    
    } 
    
    // step 6: return true if all okay 
    return true; 
} //isDeeplyIdentical

/*******************************************************
 ***********************EXPORTS*************************
 *******************************************************/
export default union;
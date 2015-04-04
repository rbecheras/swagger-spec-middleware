var _ = require('lodash');
var arrayTransformator = require('./arrayTransformator');

/**
 * Converts value to object from the given spec
 * @param value
 * @param itemsSpec
 */
var convertObject = function (value, itemsSpec) {

    return value;
};

/**
 * Converts arrays from the given spec configuration
 * @param value
 * @param parameterSpec
 */
var convertArray = function (value, parameterSpec) {

    var type = parameterSpec.type,
        format = parameterSpec.format,
        items = parameterSpec.items,
        collectionFormat = parameterSpec.collectionFormat;

    var array = [];
    console.log('Value: %j', value);
    if (collectionFormat === 'multi') {
        array = value;
    } else {
        array = arrayTransformator.split(value, collectionFormat);
    }

    for (var i = 0; i < array.length; i++) {
        array[i] = convert(array[i], items);
    }

    console.log("%o", value);
    return array;
};

/**
 * Converts parameter to the type described by specification type, format and items. Format is determined by the type as follows:
 * <p>
 * <table>
 * <tr><th>Common Name</th><th>type</th><th>format</th><th>Comments</th></tr>
 * <tr><td>integer</td><td>integer</td><td>int32</td><td>signed 32 bits</td></tr>
 * <tr><td>long</td><td>integer</td><td>int64</td><td>signed 64 bits</td></tr>
 * <tr><td>float</td><td>number</td><td>float</td><td></td></tr>
 * <tr><td>double</td><td>number</td><td>double</td><td></td></tr>
 * <tr><td>string</td><td>string</td><td></td><td></td></tr>
 * <tr><td>byte</td><td>string</td><td>byte</td><td></td></tr>
 * <tr><td>boolean</td><td>boolean</td><td></td><td></td></tr>
 * <tr><td>date</td><td>string</td><td>date</td><td>As defined by full-date - RFC3339/td></tr>
 * <tr><td>dateTime</td><td>string</td><td>date-time</td><td>As defined by date-time - RFC3339</td></tr>
 * </table>
 * </p>
 * @param value parameterOriginalValue
 * @param parameterSpec
 */
var convert = function (value, parameterSpec) {
    var type = parameterSpec.type,
        format = parameterSpec.format,
        items = parameterSpec.items,
        collectionFormat = parameterSpec.collectionFormat;

    //console.log('Convert value: ' + value + ', for type: ' + type + ', format: ' + format + ', items: ' + items + ', collectionFormat: ' + collectionFormat);
    
    if ('integer' === type) {
        if ('int32' === format || 'int64' === format) {
            return parseInt(value);
        }
    }
    if ('number' === type) {
        if ('float' === format || 'double' === format) {
            return parseFloat(value);
        }
    }
    if ('string' === type) {
        if ('date' === format || 'date-time' === format) {
            return new Date(value);
        }
        if (format === undefined || 'byte' === format) {
            return value;
        }
    }
    if ('boolean' === type) {
        return "true" === value;
    }
    if ('array' === type) {
        return convertArray(value, parameterSpec);
    }
    throw 'Could not convert value: ' + value + ', for type: ' + type + ', format: ' + format + ', items: ' + items + ', collectionFormat: ' + collectionFormat;

};

module.exports = {
    convert: convert
}
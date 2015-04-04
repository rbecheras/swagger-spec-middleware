var _ = require('lodash');

var transformer = function (separator) {
    return {
        split: function (data) {
            return data == null ? data : data.toString().split(separator);
        },
        join: function (data) {
            return data == null || !_.isArray(data) ? data : data.join(separator);
        }
    }

};

var support = {

    'csv': transformer(','),
    'ssv': transformer(' '),
    'tsv': transformer('\t'),
    'pipes': transformer('|')

};

/**
 * Join array with separator, example for csv:
 * [1,2,3,4] => "1,2,3,4" 
 * @param data
 * @param separator
 * @returns {*}
 */
var join = function(data, separator){
    return (support[separator] || support.csv).join(data);
};


/**
 * Split string to array by separator, example for csv:
 * "1,2,3,4" => [1,2,3,4]
 * @param data
 * @param separator
 * @returns {*}
 */
var split = function(data, separator){
    return (support[separator] || support.csv).split(data);
};

module.exports = {
    split: split,
    join: join
};
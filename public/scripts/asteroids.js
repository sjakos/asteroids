$( document ).ready( function() {
   initialize(); 
    });

/**
 * Set up page with default dates and prepare event listeners
 */
function initialize() {
    set_value_to_today("start_date");
};

/**
 * Use to set default date value to today in form YYYY-MM-DD
 * 
 * @param {string} elementID    - ID to be set by function
 */
function set_value_to_today( elementID ) {
    var today = new Date();
    today = today.toISOString().slice(0,10);
    $("#" + elementID).val(today);
};

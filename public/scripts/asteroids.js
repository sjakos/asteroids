$(document).ready(function () {
    initialize();
});

/**
 * Set up page with default dates and prepare event listeners
 */
function initialize() {
    set_value_to_today("start_date");
    set_value_to_today("end_date");
    $("submit").click(function () {
        search_asteroids();
    });
};

/**
 * Use to set default date value to today in form YYYY-MM-DD
 * 
 * @param {string} elementID    - ID to be set by function
 */
function set_value_to_today(elementID) {
    var today = new Date();
    today = today.toISOString().slice(0, 10);
    $("#" + elementID).val(today);
};

/**
 * Use query function and filter to search for asteroids
 */
function search_asteroids() {
    var query = query_NEODB();
    var filter = $("#search_filter").val();

    query.done(function (data) {
        filter_search(filter, data)
    });
}

/**
 * Query JPL NEO database API
 */
function query_NEODB() {
    var start_date = $("#start_date").val();
    var end_date = $("#end_date").val();

    var nasaAPI = "https://api.nasa.gov/neo/rest/v1/feed";
    return $.getJSON(nasaAPI, {
        start_date: start_date,
        end_date: end_date,
        api_key: "DEMO_KEY"
    });
};

/**
 * Send query data to appropriate function for display
 * 
 * @param {string}  filter  - Filter from search form
 * @param {Object}  data    - Data from API query
 */
function filter_search(filter, data) {
    switch (filter) {
        case "biggest":
            biggest_asteroid(data);
            break;

        case "fastest":
            fastest_asteroid(data);
            break;

        case "closest":
            closest_asteroid(data);
            break;

        default:
            all_asteroids(data);
            break;
    }
}

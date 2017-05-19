$(document).ready(function () {
    initialize();
});

/**
 * Set up page with default dates and prepare event listeners
 */
function initialize() {
    set_value_to_today("start_date");
    set_value_to_today("end_date");
    $("#search_form").submit(function () {
        query_NEODB();
    });
}

/**
 * Use to set default date value to today in form YYYY-MM-DD
 * 
 * @param {string} elementID    - ID to be set by function
 */
function set_value_to_today(elementID) {
    var today = new Date();
    today = today.toISOString().slice(0, 10);
    $("#" + elementID).val(today);
}

/**
 * Query JPL NEO database API
 */
function query_NEODB() {
    //Need to add in form validation
    var start_date = $("#start_date").val();
    var end_date = $("#end_date").val();

    var nasaAPI = "https://api.nasa.gov/neo/rest/v1/feed";
    $.getJSON(nasaAPI, {
        start_date: start_date,
        end_date: end_date,
        api_key: "DEMO_KEY"
    },
        function (search_data) {
            create_asteroid_table(search_data);
        });
}

//Refactor point: Methods to prevent blocks of HTML in my JS?
function create_asteroid_table(data) {
    //Better way to reference these variables? Is global okay here?
    var start_date = $("#start_date").val();
    var end_date = $("#end_date").val();

    var new_search_button = "<a name='new_search' id='new_search' class='btn btn-primary col-md-2' href='./' role='button'>New Search</a>";
    var results_info = "<h5>Search Results from <em>" + start_date + "</em> to <em>" + end_date + "</em></h5>";
    var search_info_header = "<div id='results_info' class='col-sm-10 text-center results-info'>" + results_info + "</div>";
    var table_column_headers = ["Date", "Name", "Max. Diameter", "Distance", "Velocity"];

    $("#asteroid_search").slideUp();
    $(".container .row").after($("<div class='row'>"
        + search_info_header
        + new_search_button
        + "</div>"
        + "<div id='search_results' class='row'>"
        + "<table class='table table-hover'><thead><tr>"
        + "</tr></thead>"
        + "<tbody>"
        + "</tbody></table>"
        + "</div>"));

    for (title in table_column_headers) {
        var header = table_column_headers[title];
        $("#search_results table thead tr").append($("<th>" + header + "</th>"));
    }

    //split this into another function
    var asteroid_data = data.near_earth_objects;

    for (day in asteroid_data) {
        var data_date = day;
        console.log(data_date);
        var date = asteroid_data[day];

        for (var i = 0; i < date.length; i++) {
            var asteroid = date[i];

            var name = asteroid.name;
            var url = asteroid.nasa_jpl_url;
            var max_diameter = asteroid.estimated_diameter.meters.estimated_diameter_max;
            var distance = asteroid.close_approach_data["0"].miss_distance.kilometers;
            var velocity = asteroid.close_approach_data["0"].relative_velocity.kilometers_per_hour;

            //Find more efficient way to refactor this
            var data = {
                "date": data_date,
                "name": name,
                "url": url,
                "max_diameter": max_diameter,
                "distance": distance,
                "velocity": velocity
            }

            populate_table(data);
        }
    }
}

function populate_table(table_data) {
    var new_row = "<tr>";
    new_row += "<td scope='row'>" + table_data.date + "</td>";
    new_row += "<td>" + table_data.name + "</td>";
    new_row += "<td>" + table_data.max_diameter + " meters</td>";
    new_row += "<td>" + table_data.distance + " kilometers</td>";
    new_row += "<td>" + table_data.velocity + " km/hr</td></tr>";

    $("#search_results table tbody").append($(new_row));
}
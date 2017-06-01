$(document).ready(function () {


   
    //call the web service
    $.ajax({
        url: "/api/AnnualPowerInterruptions",
        method: "GET",
        success: function (data) {
            var tablexml = '<table class="table table-hover table-bordered"><thead><tr><th>Year</th><th>Events</th><th>Customers</th><th>Duration</th></tr></thead>' +
                '<tbody>';

            //for each the array and append the Dom
            $(data).each(function () {
                tablexml += '<tr><td>' + this.year + '</td><td>' + this.totalEvents + '</td><td>' +
                    this.customers + '</td><td>' + this.avgDuration + '</td></tr>';
            });

            tablexml += '</tbody></table>';
            //append  the xml
            $('#tableData').html(tablexml);

        },
        error: function () {
            // append the error msg if any errors in ajax call
            $('#tableData').html('<p class="errormsg">Failed to load Power Interruption Data</p>')
        }
    });

    


});
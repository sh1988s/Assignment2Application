$(document).ready(function () {


   
    //call the web service
    $.ajax({
        url: "/api/AnnualPowerInterruptions",
        method: "GET",
        success: annualSuccessCallback,
        error: function () {
            // append the error msg if any errors in ajax call
            $('#tableData').html('<p class="errormsg">Failed to load Power Interruption Data</p>')
        }
    });


    //Define the success call back func of annualPowerInterruptions
    function annualSuccessCallback (data) {
        var tablexml = '<table class="table table-hover table-bordered"><thead><tr><th>Year</th><th>Events</th><th>Customers</th><th>Duration</th></tr></thead>' +
            '<tbody>';

        
        var customerArray = [];
        //for each the array and append the Dom
        $(data).each(function () {
            tablexml += '<tr><td>' + this.year + '</td><td>' + this.totalEvents + '</td><td>' +
                this.customers + '</td><td>' + this.avgDuration + '</td></tr>';

            //store the customers to an array
            customerArray.push(this.customers);
        });

        tablexml += '</tbody></table>';
        //append the table xml
        $('#tableData').html(tablexml);

        
        var maxValue = Math.max.apply(null, customerArray);
        for (i = 0; i < data.length; i++) {
            var barxml = "";
            var widthpercent = '';

            //the largest number would be 80% width
            if (data[i].customers == maxValue) {
                widthpercent = 80;
            }
            else {
                //the bars with less customers would have shorter width
                widthpercent = (data[i].customers / maxValue).toFixed(2) * 80;
            }

            //build the bar div for each year
            barxml += '<div><div class="graph-year"><span>' + data[i].year + '</span></div><div class="graph-bar" ' +
                //use hsl to indicate the color of the number
                'style="background-color:hsl(0,100%,' + (100 - widthpercent) + '%);"'
                + '><span class="graph-number">' +
                data[i].customers + '</span></div></div>';
            //add the bar to then end
            $('#graphdiv').append(barxml);
            //show the bar as animated
            $('#graphdiv').children().last().find('.graph-bar').delay(100 * i).animate({ width: widthpercent + '%' }, "slow");
            //show the number in 2 seconds
            $('#graphdiv').children().last().find('.graph-number').delay(100 * i).show(2000);
        };



    }

});
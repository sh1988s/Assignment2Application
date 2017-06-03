$(document).ready(function () {


    $('.backbtn').click(function () {
        $('#monthlygraph').hide();
        $('#yearlygraph').show();
    });
   
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


        //add click listener
        $('#tableData tbody tr').click(tableClickFunc);

        drawGraph(data,'year', 'customers', customerArray, '#graphdiv');



    }




    function tableClickFunc (){
        //get data for specific year by call api
        var year = $(this).find('td').first().text();
        $.ajax({
            url: '/api/MonthlyPowerInterruptions/' + year + '/',
            method: 'GET',
            success: monthlySuccessCallback

        });

        $('#yearparam').val(year);
        $(this).parent().children().css('background-color', '');
        $(this).css('background-color', 'darkorange');
    }

    //define
    function monthlySuccessCallback(data) {
        //draw the monthly graph
        $('#yearlygraph').hide();

        var customerArray = [];
        $(data).each(function () {
            customerArray.push(this.customers);
        });
        $('#monthgraphdiv').html('');
        drawGraph(data, 'monthName', 'customers', customerArray, '#monthgraphdiv');
        $('.div-month span').text($('#yearparam').val());
        $('#monthlygraph').show();

    }


    function drawGraph(data,titleName, valueName,percentageArray ,appendTo) {

        var maxValue = Math.max.apply(null, percentageArray);
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
            barxml += '<div><div class="graph-year"><span>' + data[i][titleName] + '</span></div><div class="graph-bar" ' +
                //use hsl to indicate the color of the number
                'style="background-color:hsl(0,100%,' + (100 - widthpercent) + '%);"'
                + '><span class="graph-number">' +
                data[i][valueName] + '</span></div></div>';
            //add the bar to then end
            $(appendTo).append(barxml);
            //show the bar as animated
            $(appendTo).children().last().find('.graph-bar').delay(100 * i).animate({ width: widthpercent + '%' }, "slow");
            //show the number in 2 seconds
            $(appendTo).children().last().find('.graph-number').delay(100 * i).show(2000);
        };
    }
    
});
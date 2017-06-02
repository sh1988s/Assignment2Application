$(document).ready(function () {


   
    //call the web service
    $.ajax({
        url: "/api/AnnualPowerInterruptions",
        method: "GET",
        success: function (data) {
            var tablexml = '<table class="table table-hover table-bordered"><thead><tr><th>Year</th><th>Events</th><th>Customers</th><th>Duration</th></tr></thead>' +
                '<tbody>';

            var customerArray = [];
            //for each the array and append the Dom
            $(data).each(function () {
                tablexml += '<tr><td>' + this.year + '</td><td>' + this.totalEvents + '</td><td>' +
                    this.customers + '</td><td>' + this.avgDuration + '</td></tr>';
                customerArray.push(this.customers);
            });

            tablexml += '</tbody></table>';
            //append  the xml
            $('#tableData').html(tablexml);

            //show the bar as animated

            var maxValue = Math.max.apply(null, customerArray);
            for (i = 0; i < data.length;i++) {
                var barxml = "";
                var widthpercent = '';
                if (data[i].customers == maxValue) {
                    widthpercent = '80%';
                }
                else {
                    widthpercent = (data[i].customers / maxValue).toFixed(2) * 80 + '%';
                }
                barxml += '<div><div class="graph-year"><span>' + data[i].year + '</span></div><div class="graph-bar" ' 
                    +'><span class="graph-number">' +
                    data[i].customers + '</span></div></div>';
                //add the bar to then end
                $('#graphdiv').append(barxml);
                //animate the bar
                $('#graphdiv').children().last().find('.graph-bar').delay(100 * i).animate({ width: widthpercent }, "slow");
                //show the number in 2 seconds
                $('#graphdiv').children().last().find('.graph-number').delay(100 * i).show(2000);
            };

            
           
        },
        error: function () {
            // append the error msg if any errors in ajax call
            $('#tableData').html('<p class="errormsg">Failed to load Power Interruption Data</p>')
        }
    });





});
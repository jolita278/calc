$("<div/>").attr('class', 'container').appendTo('body');
$("<div/>").attr('class', 'form-group').appendTo('.container');

$('<input/>').attr({
    type: 'text',
    id: 'input',
    name: 'result',
    value: '0',
    readonly: 'readonly',
    class: 'form-control'
}).appendTo('.form-group');

$(document).ready(function () {
    var divrow = $("<div/>").attr('class', 'calc-row').appendTo('.container');

    $.each(buttons_data, function (index, buttons_data) {
        divrow.append($("<button>" + buttons_data.value + '</button>')
            .attr("type", buttons_data.type)
            .attr("name", buttons_data.value)
            .attr("value", buttons_data.value)
            .attr("class", buttons_data.class));
    });
});
var first = '';
var second ='';
var action_value;
$(document).ready(function () {
    $(".btn-default").click(function () {


        var value = $(this).val();
        if (value === ".")
            $(this).attr("disabled", "disabled"); //disable dot after first press
        if( $(".btn-primary").attr("disabled") !=="disabled")
        $('#input').val(first += (value)); //shows pressed buttons values(more than one number inline)
        else
            $('#input').val(second += (value));
    });
});


$(document).ready(function () {
    $(".btn-primary").click(function () {
        action_value = $(this).val();
        $(".btn-primary").attr("disabled", "disabled"); //disable all fuctional buttons after one of  them click
        $('#input').val(action_value);
    });
});

$(document).ready(function () {
    $(".btn-success").click(function () {
        var res_value = $(this).val();
        $(".btn-success").attr("disabled", "disabled");// disable button "=" after click
        $('#input').val(res_value);

        calculate(first,second,action_value); //calculate result

        var show_result = first +" " + action_value +" " + second + " " + res_value; //show calculation
        $(".container").prepend(show_result);
    });
});

function calculate(a,b,c){
if (c==="+")
    var end = parseFloat(a) + parseFloat(b);

    $('#input').val(end);
//TODO:switch cases
}

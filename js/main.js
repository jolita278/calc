$("<div/>").attr('class', 'container').attr('text', '0').appendTo('body');
$("<div/>").attr('class', 'form-group').appendTo('.container');

$('<input/>').attr({
    id: 'input',
    value: "0",
    readonly: 'readonly',
    class: 'form-control'
}).appendTo('.form-group');

$(document).ready(function () {
    var divrow = $("<div/>").appendTo('.container');

    $.each(buttons_data, function (index, buttons_data) {
        divrow.append($("<button>" + buttons_data.value + '</button>')
            .attr("type", buttons_data.type)
            .attr("value", buttons_data.value)
            .attr("disabled", false)
            .attr("class", buttons_data.class));
    });
});

var first = '0';
var second = '';
var action;


$(document).ready(function () {
    $(".btn").click(handleClick);
});

function handleClick(e) {
    var $b = $(e.currentTarget);

    if ($b.attr('type') === "number") {

        switch ($b.val()) {
            case '.':
                if (first.indexOf(".") === -1)
                    first += $b.val();
                break;
            case '0':
                if (first.length === 1 && first === "0") {
                }
                else
                    first += $b.val();
                break;
            default:
                if (first.length === 1 && first === "0")
                    first = $b.val();
                else
                    first += $b.val();
                console.log(action);
        }

        $('#input').val(first);
    }
    else {
        switch ($b.val()) {
            case 'C':
                first = '0';
                $('#input').val(first);
                $(".allow_disable").attr("disabled", false);

                break;
            case '<|':
                if (first.length <= 1) {
                    first = '0';
                }
                else
                    first = first.slice(0, -1);
                $('#input').val(first);
                break;
            case '+-':
                if (first[0] === "-")
                    first = first.substring(1, first.length);
                else if (first !== "0")
                    first = "-" + first;

                $('#input').val(first);
                break;

            case '%':
            case '/':
            case '*':
            case '+':
            case '-':
                action = $b.val();
                first += ' '+ action + ' ';
                $(".allow_disable").attr("disabled", true);

                break;
            default:
        }
    }

}


// $(document).ready(function () {
//     $(".number").click(function (e) {
//
//         var value = $(this).val();
//         if (value === ".")
//             $(this).attr("disabled", true); //disable dot after first press
//         if ($(".action").attr("disabled") !== "disabled")
//             $('#input').val(first += (value)); //shows first pressed buttons values(more than one number inline)
//         else
//             $(this).attr("disabled", false);
//             $('#input').val(second += (value));
//     });
// });
//
//
// $(document).ready(function () {
//     $(".action").click(function () {
//         action_value = $(this).val();
//         $(".action").attr("disabled", true); //disable all fuctional buttons after one of  them click
//         $('#input').val(action_value);
//     });
// });
//
// $(document).ready(function () {
//     $(".result").click(function () {
//         var res_value = $(this).val();
//         $(".result").attr("disabled", true);// disable button "=" after click
//         $('#input').val(res_value);
//
//         calculate(first, second, action_value); //calculate result
//
//         var show_result = first + " " + action_value + " " + second + " " + res_value; //show calculation
//         $(".container").prepend(show_result);
//     });
// });
//
//
// $(document).ready(function () {
//     $(".clear").click(function () {
//         var clear_value = $(this).val();
//         if (clear_value === "C")
//             reset();
//         if ($('#input').val().length <= 1)
//             var sliced = "0";
//         else
//             sliced = $('#input').val().slice(0, -1);
//
//         $('#input').val(sliced);
//     });
// });

//
// var end;
// function calculate(a, b, c) {
//
//     a = parseFloat(a);
//     b = parseFloat(b);
//
//     switch (c) {
//         case '+':
//             end = a + b;
//             break;
//         case '-':
//             end = a - b;
//             break;
//         case '*':
//             end = a * b;
//             break;
//         case '/':
//             end = a / b;
//             break;
//         case '%':
//             end = ""; //TODO: percentage calculation
//             break;
//     }
//     $('#input').val(end);
// }
//
// function reset() {
//     $(document).ready(function () {
//         $('#input').val("0");
//         first = '';
//         second = '';
//         action_value = "";
//         $(".action").attr("disabled", false);
//         $(".result").attr("disabled", false);
//         $(".pos_neg").attr("disabled", false);
//         $(".number").attr("disabled", false);
//         //TODO clear text on container
//     });
// }
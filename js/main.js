var first = '0',
    second = '',
    action,
    numbers = ['0'],
    actions = [];

const ACTION_REPLACE = "replace",
    ACTION_DELETE_LAST = "delete_last",
    ACTION_INCREASE = "increase",
    ACTION_REVERSE = "reverse",
    ACTION_CLEAR = "clear",
    ACTION_CALCULATE = "calculate";


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

$(document).ready(function () {
    $(".btn").click(handleClick);
});

function handleClick(e) {
    var $b = $(e.currentTarget);

    if ($b.attr('type') === "number") {

        updateNumber(ACTION_INCREASE, $b.val())
        update_input();
    }
    else {
        switch ($b.val()) {
            case 'C':
                updateNumber(ACTION_CLEAR);
                // first = '0';
                // $('#input').val(first);
                // $(".allow_disable").attr("disabled", false);

                break;
            case '<|':
                updateNumber(ACTION_DELETE_LAST);
            // if (first.length <= 1) {
            //     first = '0';
            // }
            // else
            //  first = first.slice(0, -1);
            //
            //  $('#input').val(first);
            // break;
            case '+-':
                updateNumber(ACTION_REVERSE);
                // if (first[0] === "-")
                //     first = first.substring(1, first.length);
                // else if (first !== "0")
                //     first = "-" + first;
                // $('#input').val(first);
                break;
            case '=':
                updateNumber(ACTION_CALCULATE);

            case '%':
            case '/':
            case '*':
            case '+':
            case '-':
                if (numbers[numbers.length - 1] !== '0') {
                    actions.push($b.val());
                    numbers[actions.length] = '0';
                }
                else {
                    actions.pop();
                    actions.push($b.val());
                }
                break;
            default:
        }

    }

}

function updateNumber(action, value) {
    //console.log(action, value);
    switch (action) {
        case ACTION_REPLACE:

            break;
        case ACTION_DELETE_LAST:

            break;
        case ACTION_INCREASE:
            var n = numbers[actions.length];

            switch (value) {
                case '.':
                    if (n.indexOf(".") === -1)
                        n += value;
                    break;
                case '0':
                    if (n.length === 1 && n === "0") {
                    }
                    else
                        n += value;
                    break;
                default:
                    if (n.length === 1 && n === "0")

                        n = value;
                    else
                        n += value;
            }

            numbers[actions.length] = n;

            break;
        case ACTION_REVERSE:

            break;
        case ACTION_CLEAR:

            break;
        case ACTION_CALCULATE:
           var a = parseFloat(numbers[0]);

            for(var i=1; i<numbers.length; i++){

                var b = parseFloat(numbers[i]);
                  switch(actions[i-1]){
                      case '+':
                          a += b;
                          break;
                      case '-':
                          a -= b;
                          break;
                      case '/':
                          a /= b;
                          break;
                      case '*':
                          a *= b;
                          break;
                      default:
                          //console.log("unknown action");
                  }

            }
            console.log(a);
            $('#input').val(a);
            break;
        default:
            console.log("unknown action");

    }

}

function update_input() {
    var s = "";
    for (var i = 0; i < numbers.length; i++) {
        if (numbers[i] !== "0")
            s += numbers[i];
        if (actions[i])
            s += actions[i];
    }
    $('#input').val(s);
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
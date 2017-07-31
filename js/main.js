var action,
    numbers = ['0'],
    actions = [];

const ACTION_DELETE_LAST = "delete_last",
    ACTION_INCREASE = "increase",
    ACTION_REVERSE = "reverse",
    ACTION_CLEAR = "clear",
    ACTION_CALCULATE = "calculate",
    ACTION_CALCULATE_PERCENTAGE = 'calculate_persentage';

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
        divrow.append($("<button>" + buttons_data.value + '</button>').attr({
            type: buttons_data.type,
            value: buttons_data.value,
            disabled: false,
            class: buttons_data.class
        }))
    });
});

$(document).ready(function () {
    $(".btn").click(handleClick);
});

/*
Function, which sorts buttons clicks, and calls function updateNumber(action, value)
 */
function handleClick(e) {
    var $b = $(e.currentTarget)

    if ($b.attr('type') === "number") {

        updateNumber(ACTION_INCREASE, $b.val())
    }
    else {
        if (numbers[actions.length].slice(-1) === ".")
            numbers[actions.length] = numbers[actions.length].slice(0, -1);

        switch ($b.val()) {

            case 'C':
                updateNumber(ACTION_CLEAR);

                break;
            case '<|':
                updateNumber(ACTION_DELETE_LAST);
                break;

            case '+-':
                updateNumber(ACTION_REVERSE);
                break;

            case '=':
                updateNumber(ACTION_CALCULATE);
                break;
            case"%":
                updateNumber(ACTION_CALCULATE_PERCENTAGE);
                break;

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
    update_input();
    console.log(numbers);
    console.log(actions);
}
/*
function, which updates the number depending on cases
*/

function updateNumber(action, value) {
    switch (action) {

        case ACTION_DELETE_LAST:

            if (numbers[actions.length] === '0') {
                numbers.pop();
                actions.pop();
            }
            else {
                var s = numbers[actions.length].slice(0, -1);
                if (s.length === 0)
                    s = "0";
                numbers[actions.length] = s;
            }

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
            var n = numbers[actions.length];

            if (n[0] === "-") {
                n = n.substring(1, n.length)
            }
            else if (n !== "0")
                n = "-" + n;
            numbers[actions.length] = n;
            break;

        case ACTION_CLEAR:
            numbers = ['0'];
            actions = [];
            break;

        case ACTION_CALCULATE:

            var a = parseFloat(numbers[0]);

            for (var i = 1; i < numbers.length; i++) {

                var b = parseFloat(numbers[i]);
                switch (actions[i - 1]) {
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
                    case'%':
                        b = a / 100 * b;
                        a = a - b;
                        break;
                    default:
                        console.log("unknown action");
                }
            }
            numbers = [a.toString()];
            actions = [];
            break;

        case ACTION_CALCULATE_PERCENTAGE:

            if (actions.length === 0)
                numbers[0] = '0';
            else {

                var a = parseFloat(numbers[0]);

                for (var i = 1; i < actions.length; i++) {

                    var b = parseFloat(numbers[i]);
                    switch (actions[i - 1]) {
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
                            console.log("unknown action");
                    }
                }
                numbers[actions.length] = (numbers[actions.length] * (a / 100)).toString();
            }
            break;

        default:
            console.log("unknown action");
    }
}
/*
 function, which updates the input field
 */
function update_input() {
    var s = "";
    if (numbers.length === 1)
        s = numbers[0];
    else {
        for (var i = 0; i < numbers.length; i++) {
            if (numbers[i] !== "0")
                s += numbers[i];
            if (actions[i])
                s += actions[i];
        }
    }
    $('#input').val(s);
}


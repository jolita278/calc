$("<div/>").attr('class','container').appendTo('body');
$("<div/>").attr('class','form-group').appendTo('.container');

$('<input/>').attr({type: 'text', id: 'input', name: 'test', value:'0',readonly:'readonly',  class: 'form-control'}).appendTo('.form-group');

$(document).ready(function(){
        var divrow = $("<div/>").attr('class','calc-row').appendTo('.container');
        $.each(buttons_data,function(index,buttons_data){
            divrow.append($("<button>"+buttons_data.value+'</button>').attr("type", buttons_data.type).attr("name", buttons_data.name).attr("value", buttons_data.value).attr("class",buttons_data.class ));
        });
        $("#container").html(divrow);

});



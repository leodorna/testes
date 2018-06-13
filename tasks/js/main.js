MAX_HOUR = 16

var stack_svg = d3.select("#stack-graph")
                    .append("svg")
                    .append("g")
                    .attr("class", "stack-area")
                    .attr("width", $("#stack-graph").width())
                    .attr("height", $("#stack-graph").height());
/*
d3.json("data/data.json", function(json){
    console.log(json)
    create_stacked_area(stack_svg, json)
})
*/

json = {
    "keys": ["procrast","work", "study"],
    "data": [
        {"day": 1, "work": 9, "study": 1},
        {"day": 2, "work": 2, "study": 3},
        {"day": 3, "work": 2, "study": 5},
        {"day": 4, "work": 4, "study": 1},
        {"day": 5, "work": 5, "study": 0},
        {"day": 6, "work": 3, "study": 2},
        {"day": 7, "work": 4, "study": 1}
    ]
}



stacked_area = create_stacked_area(stack_svg, json)
create_bar_chart("#histogram", json_bars)
d3.selectAll(".slider").on("change", function(d){
    index = $("#dia").val()
    type  = $(this).prop("id")
    value = parseInt($(this).val())
    if(type == "study"){
        $("#work").prop("max", MAX_HOUR-value)
    } else {
        $("#study").prop("max", MAX_HOUR-value)
    }

    json.data[index][type] = value;


    update_stacked_area(stacked_area, json) 
})

d3.select("#dia").on("change", function(d){
    
    if(type == "study"){
        $("#work").prop("max", MAX_HOUR-value)
    } else {
        $("#study").prop("max", MAX_HOUR-value)
    }
    
})
function create_stacked_area(svg, json){
    parameters = {
        "height": 0,
        "width": 0,
        "x": undefined,
        "y": undefined,
        "stack": undefined,
        "area": undefined,
        "svg": svg,
        "color": undefined
    }
    var height = svg.attr("height") - svg.attr("height")/10;
    var width  = svg.attr("width");
    
    parameters.height = height;
    parameters.width  = width;

    svg.attr("transform", "translate(30, 5)")

    var stack = d3.stack()
                  .keys(["procrast","work", "study"])
                  .order(d3.stackOrderNone)
                  .offset(d3.stackOffsetNone);

    parameters.stack = stack;

    var raw_data = []
    
    //the time I procrastinate is 12 minus the time I work or study
    json.data.forEach(function(d){
        d["procrast"] = MAX_HOUR - (d.work + d.study); 
        raw_data.push(d);
    })

    var view_data = stack(raw_data)

    var x = d3.scaleOrdinal()
              .range(d3.range(raw_data.length)
                        .map(function(d) { 
                            return d*width/raw_data.length; 
                        })
                    );

    var y = d3.scaleLinear()
              .rangeRound([height, 0]);

    var area = d3.area()
                 .x(function(d, i){
                     return x(i)
                 })
                 .y1(function(d){
                     return y(d[1])
                 })
                 .y0(function(d){
                     return y(d[0])
                 })

    var color = d3.scaleLinear()
                    .domain([0,2])
                    .interpolate(d3.interpolateHcl)
                    .range([d3.rgb("#ddd"), d3.rgb('#505050')]);
    
    parameters.color = color;

    x.domain(d3.range(0, 6));
    y.domain([0, MAX_HOUR]);

    parameters.x = x;
    parameters.y = y;
    parameters.area = area;

    var areas = svg.selectAll("path")
                      .data(view_data)
                      .enter()
                      .append("path")
                      .attr("class", "stacked")
                      .attr("d", area)
                      .attr("fill", function(d, i){
                          return color(i)
                      })
                    
    
    var x_axis = d3.axisBottom()
                   .scale(x);
    
    var y_axis = d3.axisLeft()
                   .scale(y)
   
    svg.append("g")
        .attr("transform", "translate(0," + height+ ")")
        .call(x_axis);

    svg.append("g")
        .call(y_axis);

    return parameters;
}

function update_stacked_area(parameters, new_data){
    var raw_data = []

    new_data.data.forEach(function(d){
        d["procrast"] = MAX_HOUR - (d.work + d.study); 
        raw_data.push(d);
    })

    stacked = parameters.svg
                        .selectAll("path.stacked")
                        .data(parameters.stack(raw_data));
    console.log(parameters.svg
        .selectAll("path.stacked")
        .data())
    stacked.exit().remove()

    stacked.transition()
           .duration(500)
           .attr("d", parameters.area)
           .attr("fill", function(d, i){
               return parameters.color(i)
           })

}
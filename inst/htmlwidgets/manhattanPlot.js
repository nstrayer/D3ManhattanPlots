HTMLWidgets.widget({

  name: 'manhattanPlot',

  type: 'output',

  initialize: function(el, width, height) {

    return {
      // TODO: add instance fields as required
    }

  },

  renderValue: function(el, x, instance) {

    var width   = el.getBoundingClientRect().width,
        height  = el.getBoundingClientRect().height,
        padding = 15,
        red     = "#e41a1c",
        blue    = "#377eb8",
        transitionSpeed = 1500,
        delayTime = 20,
        yScale = d3.scale.linear().domain([0, 1]).range([height, padding]), //values wont exceed 1 ever.
        xScale = d3.scale.ordinal().domain([0,1]).rangePoints([padding*2.8,width - padding],0),
        colorScale = d3.scale.linear().domain([0, 1]).range([blue, red]),
        yAxis = d3.svg.axis().scale(yScale).orient("right");

    var svg = d3.select(el)
         .append("svg:svg")
         .attr("width", width)
         .attr("height", height);

    var axisLabel = svg.append("text")
      .text("-log10(P-Val)")
    	.attr("transform","translate(" + ( 13 ) + "," + (height/2) + ")rotate(-90)")

    function customAxis(g) {
    	g.selectAll("text")
    	.attr("x", 4)
    	.attr("dy", -2);
    	g
    	.attr("transform", "translate(" + 20 + ",0)")
    }

    var gy = svg.append("g")
		.attr("class", "axis")
		.call(yAxis)
		.call(customAxis)

    var significanceBar = svg.append("line")
    	.attr("x1", padding + 4)
    	.attr("x2", width - padding)
    	.attr("y1", yScale(0))
    	.attr("y2", yScale(0))
    	.attr("stroke-width", 2)
    	.attr("stroke", "black")

    var significanceText = svg.append("text")
        .attr("x", width - padding)
        .attr("y",0)
        .attr("text-anchor", "end")
        .text("")


    function updateManhattan(data, updateTime) {

        delayTime = 20;

        if (data.length > 200) { //if it is a small dataset do transitions.
            updateTime = 0
            delayTime = 0
        }

        for (var i = 0; i < data.length; i++) {
            data[i].PVal = parseFloat(data[i].PVal);
            delete data[i][""] //because I am a neat freak.
        }

        var dataMax = d3.max(data, function(d) {
                return d.PVal
            }),
            bonferroni = -Math.log10(.05 / data.length),
            maxVal = d3.max([dataMax, bonferroni + .5]),
            minVal = d3.min(data, function(d) {
                return d.PVal
            });

        yScale.domain([0, maxVal])
        xScale.domain(d3.range(data.length + 1))
        colorScale.domain([minVal, maxVal])

        significanceBar
            .transition()
            .duration(updateTime)
            .attr("y1", yScale(bonferroni))
            .attr("y2", yScale(bonferroni))

        significanceText
            .transition()
            .duration(updateTime)
            .attr("y", yScale(bonferroni) - 5)
            .text("Needed for significance")

        var points = svg.selectAll("circle")
            .data(data, function(d) {
                return d.SNP;
            })

        points
            .exit()
            .transition()
            .duration(updateTime / 2)
            .attr("cy", 0)
            .remove()

        points
            .enter()
            .append("circle")
            .attr("cx", function(d, i) {
                return xScale(i);
            })
            .attr("cy", 0)
            .attr("r", 5)
            .on("mouseover", function(d) {
                d3.select("#SNPName").text(d.SNP)
                d3.select("#PValue").text(Math.pow(10, -d.PVal).toExponential(4))
            })
            .transition()
            .duration(updateTime)
            .delay(function(d, i) {
                return delayTime * i;
            })
            .attr("cy", function(d) {
                return (yScale(d.PVal));
            })
            .transition()
            .attr("fill", function(d) {
                return colorScale(d.PVal);
            })


        points
            .transition()
            .duration(updateTime)
            .delay(function(d, i) {
                return delayTime * i;
            })
            .attr("cx", function(d, i) {
                return xScale(i);
            })
            .attr("cy", function(d) {
                return (yScale(d.PVal));
            })
            .attr("fill", function(d) {
                return colorScale(d.PVal);
            })


        gy.transition()
            .duration(updateTime)
            .call(yAxis)
            .selectAll("text") // cancel transition on customized attributes
            .tween("attr.x", null)
            .tween("attr.dy", null);

        gy.call(customAxis);

    }

    updateManhattan(x.data, transitionSpeed) //get it all running!

  },

  resize: function(el, width, height, instance) {

  }

});

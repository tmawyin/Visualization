//******COPA AMERICA 2015*****************
// Display of all the goals scored in the tournament
var canvas = d3.select('body')
			.append("div")
			.style("width","95%")
			.style("margin","auto");

canvas.append("h3")
	.text("Copa America 2015 - Goals Scored")
	.style("color","blue")
	.style("position","relative")
	.style("text-align","center")

canvas.append("p")
	.text("Check the positions of all the goals scored during the Copa America 2015 - Penalties rounds are not included")

// Adding the field from svg file	
d3.xml("field.svg", function(xml) {
	svgdom = document.body.childNodes[2].appendChild(xml.documentElement);
	
	// Selecting the field and displaying it on the center of the screen
	var svg = d3.select('svg')
		.style("display", "block")
		.style("margin","auto");

	var xVals = [990,1008,1030.5,811.8];
	var yVals = [360,315,328.5,382.5];
	var texto = ["CH","CH","U","E"];
	var colors = ["red","red","blue","yellow"]

	var circle = svg.selectAll("g")
			.data(xVals)
			.enter()
			.append("circle")
			.attr("cx", function(d){return d;} )
			.attr("cy",function(d,i){return yVals[i];})
			.attr("r",12)
			.style("fill",function(d,i){return colors[i];});

	var lables = svg.selectAll("text")
				.data(texto)
				.enter()
				.append("text")
				.attr("text-anchor", "middle")
				.attr("x", function(d,i){return xVals[i];})
				.attr("y",function(d,i){return yVals[i]+3.5;})
				.text(function(d){return d;})
				.style("font-family","Arial")
				.style("fill","black")
				.style("stroke","black")
				.style("font-size","10px");

});
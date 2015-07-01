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

	// Loading the CSV file and parsing through the data
	d3.csv("ca2015.csv", function(d) {
  		return {
		    team: d.Team, // convert "Year" column to Date
		    opp: d.Against,
		    player: d.Player,
		    type: d.Type,
		    round: +d.Round,
		    color: d.Color,
		    game: +d.Game,
		    x: +d.x_true,
		    y: +d.y_true,
		    label: d.Team.substring(0,2).toUpperCase()
  			};
		}, 
		// Function that uses the data 
		function(error, rows) {
			var circle = svg.selectAll("g")
				.data(rows)
				.enter()
				.append("circle")
				.attr("cx", function(d){return d.x;} )
				.attr("cy",function(d){return d.y;})
				.attr("r",function(d){ if (d.round==1) {return 10}
									   else if (d.round==2) {return 12}
									   else if (d.round==3) {return 14}
									   	else {return 16};})
				.style("fill",function(d){return d.color;});

			var lables = svg.selectAll("text")
				.data(rows)
				.enter()
				.append("text")
				.attr("text-anchor", "middle")
				.attr("x", function(d){return d.x;})
				.attr("y",function(d){return d.y+3.5;})
				.text(function(d){return d.label;})
				.style("font-family","Arial")
				.style("fill","black")
				.style("stroke","black")
				.style("font-size","10px");
	});

});

/* TESTING CODE ------
	// var xVals = [990,1008,1030.5,811.8,162];
	// var yVals = [360,315,328.5,382.5,216];
	// var texto = ["CH","CH","U","E","A"];
	// var colors = ["red","red","DodgerBlue","yellow","DeepSkyBlue"]

	// var circle = svg.selectAll("g")
	// 		.data(xVals)
	// 		.enter()
	// 		.append("circle")
	// 		.attr("cx", function(d){return d;} )
	// 		.attr("cy",function(d,i){return yVals[i];})
	// 		.attr("r",12)
	// 		.style("fill",function(d,i){return colors[i];});

	// var lables = svg.selectAll("text")
	// 			.data(texto)
	// 			.enter()
	// 			.append("text")
	// 			.attr("text-anchor", "middle")
	// 			.attr("x", function(d,i){return xVals[i];})
	// 			.attr("y",function(d,i){return yVals[i]+3.5;})
	// 			.text(function(d){return d;})
	// 			.style("font-family","Arial")
	// 			.style("fill","black")
	// 			.style("stroke","black")
	// 			.style("font-size","10px");
	*/
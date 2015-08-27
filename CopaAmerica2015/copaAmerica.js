//******COPA AMERICA 2015*****************
// Display of all the goals scored in the tournament
var canvas = d3.select('body')
			.append("div")
			.attr("class","page")
			.style("width","95%")
			.style("margin","auto");

// Adding the field from svg file	
d3.xml("field.svg", function(xml) {
	// We want to append the xml file to the "page" div
	svgdom = document.getElementsByClassName("page")[0].appendChild(xml.documentElement);
	
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
		    tpe: d.Type,
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
				.append("g")
				.attr("class",function(d){return d.label + " team";});

			// Addind circles to represent players
			circle.append("circle")
				.attr("class",".playerCircle")
				.attr("cx", function(d){return d.x;} )
				.attr("cy",function(d){return d.y;})
				.attr("r",function(d){ if (d.round== 1) {return 10}
									   else if (d.round== 2) {return 11}
									   else if (d.round== 3) {return 12}
									   	else {return 13};})
				.style("fill",function(d){return d.color;});
				
			// Adding the corresponding labels
			circle.append("text")
				.attr("text-anchor", "middle")
				.attr("x", function(d){return d.x;})
				.attr("y",function(d){return d.y+3.5;})
				.text(function(d){return d.label;})
				.style("font-family","Arial")
				.style("fill","black")
				.style("stroke","black")
				.style("font-size","10px");

			// Adding functionality for mouse over
			circle.on("mouseover", function(d) {

					// var xPosition = parseFloat(d3.select(this.children[0]).attr("cx"));
					// var yPosition = parseFloat(d3.select(this.children[0]).attr("cy"));

					var xPosition = parseFloat(d3.select("body").style("width"))/2.0-75 ;
					var yPosition = parseFloat(d3.select(this.parentNode).attr("height"))/2.0 + 150;

					d3.select("#description")
					  .style("left", xPosition + "px")
					  .style("top", yPosition + "px")
					  .select("#name")
					  .text(d.player);
					 
					d3.select("#description") 
					  .select("#team")
					  .text(d.team);

				  	d3.select("#description")
					  .select("#opp")
					  .text(d.opp);

					d3.select("#description")
					  .select("#rnd")
					  .text(d.round);

					d3.select("#description")
					  .select("#type")
					  .text(function(s){
					  	if(d.tpe == "K") {return "Kick"}
				  		else if(d.tpe == "H") {return "Header"}
			  			else if(d.tpe == "P") {return "Penalty"}
			  			else {return "Own goal"}
					  });

					d3.select("#description").classed("hidden", false);
					   
				})
				.on("mouseout", function(d) {
					d3.select("#description").classed("hidden", true);
				});
	});

});

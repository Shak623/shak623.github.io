var width = 500,
    height = 500;

d3.select("#chi_t3").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "chi-t3")
    .attr("id", "chi-t3");

var force = d3.layout.force()
    .size([width, height]);

d3.select("#chi_t3")
  .append("div")
  .attr("id", "tooltip-chi-t3")
	.attr("class", "tooltip-chi-t3")
    .style("opacity", 0);
    
d3.csv("graphs/Chicago/data/CHI_T3_SNA_deidentified.csv", function(error, links) {
  if (error) throw error;

  var nodesByName = {};
  var rels = [];
  var linkedByIndex = {};

  // Create nodes for each unique source and target.
  links.forEach(function(link) {
    var id = nodeByName(link.PPID);
    var friend1 = nodeByName(link.Friend1Name);
    var friend2 = nodeByName(link.Friend2Name);
    var friend3 = nodeByName(link.Friend3Name);
    var friend4 = nodeByName(link.Friend4Name);
    var friend5 = nodeByName(link.Friend5Name);
    var friend6 = nodeByName(link.Friend6Name);

    if(link.Friend1Name != ""){
        rels.push({
            source: id,
            target: friend1,
            closeness: link.FriendStrength1
        });
    }

    if(link.Friend2Name != ""){
        rels.push({
            source: id,
            target: friend2,
            closeness: link.FriendStrength2
        });
    }

    if(link.Friend3Name != ""){
        rels.push({
            source: id,
            target: friend3,
            closeness: link.FriendStrength3
        });
    }

    if(link.Friend4Name != ""){
        rels.push({
            source: id,
            target: friend4,
            closeness: link.FriendStrength4
        });
    }

    if(link.Friend5Name != ""){
        rels.push({
            source: id,
            target: friend5,
            closeness: link.FriendStrength5
        });
    }

    if(link.Friend6Name != ""){
        rels.push({
            source: id,
            target: friend6,
            closeness: link.FriendStrength6
        });
    }

  });

  rels.forEach(function(d) {

    link = {
        source: d.source,
        target: d.target,
        closeness: d.closeness
    };
    linkedByIndex[`${d.source.name},${d.target.name}`] = 1;
  });

  // Extract the array of nodes from the map by name.
  delete nodesByName[""];
  var nodes = d3.values(nodesByName);

  // Create the link lines.
  var link = d3.select("#chi-t3").selectAll("link-chi-t3")
      .data(rels)
    .enter().append("line")
      .attr("class", "link-chi-t3")
      .on('mouseover.tooltip', function(d) {
        d3.select("#tooltip-chi-t3").transition()
          .duration(300)
          .style("opacity", .8);
        d3.select("#tooltip-chi-t3").html("Source: "+ d.source.name + 
                    "<p/>Target: " + d.target.name + 
                    "<p/>Closeness: " + d.closeness)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY + 10) + "px");
      })
      .on("mouseout.tooltip", function() {
        d3.select("#tooltip-chi-t3").transition()
          .duration(100)
          .style("opacity", 0);
      })
      .on('mouseout.fade', fade(1))
      .on("mousemove", function() {
        d3.select("#tooltip-chi-t3").style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY + 10) + "px");
      });
      ;

  // Create the node circles.
  var node = d3.select("#chi-t3").selectAll("node-chi-t3")
      .data(nodes)
    .enter().append("circle")
      .attr("class", "node-chi-t3")
      .attr("r", 4.5)
      .call(force.drag)
      .on('mouseover.tooltip', function(d) {
        d3.select("#tooltip-chi-t3").transition()
          .duration(300)
          .style("opacity", .8);
        d3.select("#tooltip-chi-t3").html("ID:" + d.name)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY + 10) + "px");
      })
      .on('mouseover.fade', fade(0.1))
      .on("mouseout.tooltip", function() {
        d3.select("#tooltip-chi-t3").transition()
          .duration(100)
          .style("opacity", 0);
      })
      .on('mouseout.fade', fade(1))
      .on("mousemove", function() {
        d3.select("#tooltip-chi-t3").style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY + 10) + "px");
      })
      
      
    node.append('text')
        .attr('x', 0)
        .attr('dy', '.35em')
        .text(d => d.name);

  // Start the force layout.
  force
      .nodes(nodes)
      .links(rels)
      .on("tick", tick)
      .start();

  function tick() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })

        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; })

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }

  function nodeByName(name) {
    return nodesByName[name] || (nodesByName[name] = {name: name});
  }

  function isConnected(a, b) {
    return linkedByIndex[`${a.name},${b.name}`] || linkedByIndex[`${b.name},${a.name}`] || a.name === b.name;
  }

  function fade(opacity) {
    return d => {
      node.style('stroke-opacity', function (o) {
        const thisOpacity = isConnected(d, o) ? 1 : opacity;
        this.setAttribute('fill-opacity', thisOpacity);
        return thisOpacity;
      });

      link.style('stroke-opacity', o => (o.source === d || o.target === d ? 1 : opacity));

    };
  }
});
const svg = d3.select('svg');

margin = 100;
const width = +svg.attr("width")-2*margin;
const height = +svg.attr("height")-2*margin;

d3.csv('./Olympics.csv').then(data =>{
    data.forEach(d => {
        d["Medals_Gold"] = +d["Medals_Gold"]
        d["Medals_Silver"] = +d["Medals_Silver"]
        d["Medals_Bronze"] = +d["Medals_Bronze"]
        d["Medals_Tot"] = +d["Medals_Tot"]
    });
    console.log(data);
    barplot(data);

});

const barplot = (data) => {

    const bandScale = d3.scaleBand().range ([0, height]).padding(0.2)
                    .domain(data.map(function(d) { return d.Country; }));
                        //["USA", "Great Britain","Russia" ,"Australia", "China","Germany"])
    const valueScale = d3.scaleLinear().range ([width, 0]).domain([d3.max(data, function(d) { return d.Medals_Tot; })+50, 10 ]);

    var g = svg.append("g")
    g.append("text")
        .attr("x", (width )-300)             
        .attr("y", height - height*0.85)
        .attr("text-anchor", "middle") 
        .style("font-size", "20px") 
        .text("Total Number of Medals in Olympics 2016")

    var g = svg.append("g")
                .attr("transform", "translate(" + margin + "," + margin + ")");

    g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(valueScale));

    g.append("g")
        .attr("transform", "translate( 0 , -20)")
         .call(d3.axisLeft(bandScale));

    

    //console.log(yScale.bandwidth())
    g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("y", function(d) { 
        //console.log(d,d.Country,bandScale(d.Country))
        return bandScale(d.Country); })
    .style("fill","#87CEFA")
    .attr("height", bandScale.bandwidth())
    .attr("width",function(d) {
        return valueScale(d.Medals_Tot);
    })
    .on('mouseover', function(d, i) {  
        console.log() 
        d3.select(this)
        .transition()     // adds animation
        .duration(600)
        .style('fill', 'orange')
        .attr("opacity",0.8)
        
        g.append("text")
         .attr('class', 'val') 
         .attr('x', function() {
             return  valueScale(d.Medals_Tot)+20;
         })
         .attr('y', function() {
             return bandScale(d.Country)+30;
         })
         .text(d.Medals_Tot)
          
      })
      .on('mouseout', function(d, i) {
        d3.select(this)
        .style('fill', '87CEFA')
        
        d3.selectAll('.val')
          .remove()

      });
      

    

};
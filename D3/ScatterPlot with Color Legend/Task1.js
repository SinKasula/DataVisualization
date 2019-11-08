const svg = d3.select('svg');

const margin = {"left":80, "right":100, "top":60, "bottom":30};
const width = +svg.attr('width') - margin.left - margin.right;
const height = +svg.attr('height') - margin.top - margin.bottom;


// loading the data , parsing the values as integers with +
// and calling scatterplot function and passing data
d3.csv('./Task1_dataset.csv').then(data =>{
    data.forEach(d => {
        d["sepal length"] = +d["sepal length"]
        d["sepal width"] = +d["sepal width"]
        d["petal length"] = +d["petal length"]
        d["petal width"] = +d["petal width"]
    });
    
    scatterplot(data);

});


const scatterplot = (data) => {

        //xValue -> what does values on x axis represent?
        xValue = data =>((data["sepal length"]))
        
        //yValue -> what does values on y axis represent? 
        yValue = data => ((data["petal length"]))

        // xMax -> The max value in x Domain
        xMax = d3.max(data, xValue);
        xMin = d3.min(data, xValue);
        //console.log(xMax);

        // yMax -> The max value in y Domain
        yMax = d3.max(data, yValue);
        yMin = d3.min(data, yValue);
        //console.log(yMax);

        // domain in the set of min,max values of data
        // range is the screen size min and max

        // Adding Title
        svg.append("text")
        .attr("x", (width )-150)             
        .attr("y", height - height*0.96)
        .attr("text-anchor", "middle") 
        .style("font-size", "20px") 
        .style("text-decoration", "underline")  
        .text("Petal Length Vs Sepal Length of Iris Dataset")

        // creating an xscale using scaleLinear
        const xScale = d3.scaleLinear()
                        .domain([xMin-1, xMax+1])
                        .range([0, width])
                        
        
        // append x axis to svg
        svg.append("g")
        .attr("transform", "translate("+margin.left+","+ height +")")
        .text("Sepal Length")
        .call(d3.axisBottom(xScale));

        // adding x label
        svg.append("text")             
            .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top ) + ")")
            .style("text-anchor", "middle")
            .text("Sepal Length");

        
        // creating a yscale using scaleLinear
        const yScale = d3.scaleLinear()
                        .domain([yMax+1, yMin-1])
                        .range([0, height])
                        
        
        
        // appenging yscale to svg                
        svg.append("g")
        .attr("transform", "translate("+margin.left+", 0 )")
        .call(d3.axisLeft(yScale))
        .append('text')
        .text("Petal Length")
        .attr("text-anchor", "left");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", margin.left-50)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Petal Length"); 

        


        // defining color for three different category
        colorLabels = ["setosa", "virginica", "versicolour"]
        colorValue = data => ((data["species"]));
        const colorScale =  d3.scaleOrdinal().domain(colorLabels).range(d3.schemeDark2)
        
    
        // adding circles to plot
        svg.append('g')
        .selectAll('circle')
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("cx", d=> xScale(d["sepal length"]) )
        .attr("cy", d => yScale(d["petal length"]) )
        .attr("fill","white")
        .attr("stroke", d => colorScale(d["species"]))
        .attr("stroke-width", 2)
        
        svg.attr("transform", "translate(0,50)")


        // Adding legend

        // Adding circles to reprsent the color 
        svg.selectAll("mydots")
            .data(colorLabels)
            .enter()
            .append("circle")
                .attr("cx", width)
                .attr("cy", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
                .attr("r", 5)
                .attr("fill", "white")
                .attr("stroke-width", 3)
                .style("stroke", function(d){ return colorScale(d)})

        // Adding text to reprsent the color 
        svg.selectAll("mylabels")
            .data(colorLabels)
            .enter()
            .append("text")
                .attr("x", width+10)
                .attr("y", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
                .text(function(d){ return d})
                .attr("font-size", 20)
                .attr("text-anchor", "left")
                .style("alignment-baseline", "middle")


        
       
}
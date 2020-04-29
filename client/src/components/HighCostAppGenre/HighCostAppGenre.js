import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

import "./HighCostAppGenre.css";

export default function HighCostAppGenre() {
  const [containerClass, setContainerClass] = useState("");

  const d3Container2 = useRef(null);

  useEffect(() => {
    if (d3Container2.current) {
      const margin = 100;
      const width = 1000 - 2 * margin;
      const height = 600 - 2 * margin;

      var svg = d3.select(d3Container2.current);

      // Remove all if the svg is being re-rendered
      svg.selectAll("*").remove();

      const chart = svg
        .append("g")
        .attr("transform", `translate(${margin}, ${margin})`);

      // Set the y-scale
      const yScale = d3.scaleLinear().range([height, 0]);

      // Set the x-scale
      const xScale = d3.scaleBand().range([0, width]).padding(0.2);

      // Make a direct call to the API to get the JSON data
      d3.json("http://localhost:5000/api/applications/cost")
        .then((data) => {
          // Sort the data by genre alphabetically
          data.sort(function (x, y) {
            return d3.ascending(x._id, y._id);
          });

          // Convert to numerical values
          data.forEach((d) => {
            d.count = +d.count;
          });

          // Set the x and y scales based on the data
          yScale
            .domain([
              0,
              d3.max(data, function (d) {
                return d.count;
              }),
            ])
            .nice();

          // Set the domain to genres
          xScale.domain(data.map((s) => s._id));

          // Set the x-scale and rotate the x values to be more readable
          chart
            .append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.15em")
            .attr("transform", "rotate(-65)");

          // Set the y-scale
          chart.append("g").call(d3.axisLeft(yScale));

          //Create Title
          chart
            .append("text")
            .attr("x", width / 2)
            .attr("y", 0 - margin / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "24px")
            .style("text-decoration", "underline")
            .text("Count of Apps vs. Genre for Apps Over $20")
            .style("fill", "#1774e4");

          // X axis label
          chart
            .append("text")
            .attr("x", width / 2)
            .attr("y", height + margin)
            .style("text-anchor", "middle")
            .text("Genre");

          // Y axis label
          chart
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin)
            .attr("x", 0 - height / 2)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Count");

          // Initialize the tooltip
          var div = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

          // Draw the rectanges for each data point
          chart
            .selectAll()
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (s) => xScale(s._id))
            .attr("y", (s) => yScale(s.count))
            .attr("height", (s) => height - yScale(s.count))
            .attr("width", xScale.bandwidth())
            .attr("fill", "#36454f")
            .on("mouseover", function (d, i) {
              // Calculate the relative x and y of the hovered bar to calculate the tooltip location
              var tipx =
                d3.select(this).node().getBoundingClientRect().left +
                window.pageXOffset -
                50;
              var tipy =
                d3.select(this).node().getBoundingClientRect().top +
                window.pageYOffset -
                40;
              div.transition().duration(200).style("opacity", 0.9);
              div
                .html(`${d.count} App(s) Over $20`)
                .style("left", tipx + "px")
                .style("top", tipy + "px");

              d3.select(this).attr("fill", "orange");
            })
            .on("mouseout", function () {
              div.transition().duration(500).style("opacity", 0);
              d3.select(this).attr("fill", "#36454f");
            });
          setContainerClass("visual-container");
        })
        .catch((err) => console.log(err));
    }
  }, [d3Container2]);

  return (
    <div className={`${containerClass}`}>
      <svg className="app-rating-count" ref={d3Container2} />
    </div>
  );
}

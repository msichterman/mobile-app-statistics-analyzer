import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

import "./PriceRatingCount.css";

export default function AppRatingCount() {
  const [containerClass, setContainerClass] = useState("");

  const d3Container3 = useRef(null);

  useEffect(() => {
    if (d3Container3.current) {
      const margin = 100;
      const width = 1000 - 2 * margin;
      const height = 600 - 2 * margin;

      var svg = d3.select(d3Container3.current);

      // Remove all if the svg is being re-rendered
      svg.selectAll("*").remove();

      const chart = svg
        .append("g")
        .attr("transform", `translate(${margin}, ${margin})`);

      // Set the y-scale
      const yScale = d3.scaleLinear().range([height, 0]);

      // Set the x-scale
      const xScale = d3.scaleLinear().range([0, width]);

      // Make a direct call to the API to get the JSON data
      d3.json(`http://localhost:5000/api/applications/price-ratings`)
        .then((data) => {
          data.forEach((d) => {
            d.rating_count_tot = +d.rating_count_tot;
            d.price = +d.price;
          });

          // Set the x and y scales based on the data
          yScale
            .domain([
              0,
              d3.max(data, function (d) {
                return d.rating_count_tot / 1000;
              }),
            ])
            .nice();

          xScale
            .domain([
              0,
              d3.max(data, function (d) {
                return d.price;
              }),
            ])
            .nice();

          // Set the x-scale
          chart
            .append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(xScale));

          // Set the y-scale
          chart.append("g").call(d3.axisLeft(yScale));

          // Create Title
          chart
            .append("text")
            .attr("x", width / 2)
            .attr("y", 0 - margin / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "24px")
            .style("text-decoration", "underline")
            .text(`Price vs. Total Rating Count for All Apps`)
            .style("fill", "#1774e4");

          // X axis label
          chart
            .append("text")
            .attr("x", width / 2)
            .attr("y", height + margin - 25)
            .style("text-anchor", "middle")
            .text("Price (USD)");

          // Y axis label
          chart
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin)
            .attr("x", 0 - height / 2)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Total Rating Count (Thousands)");

          // Initialize the tooltip
          var div = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

          // Draw the circles for each data point
          chart
            .selectAll()
            .data(data)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("cx", (s) => xScale(s.price))
            .attr("cy", (s) => yScale(s.rating_count_tot / 1000))
            .attr("fill", "#36454f")
            .on("mouseover", function (d, i) {
              // Calculate the relative x and y of the hovered bar to calculate the tooltip location
              var tipx =
                d3.select(this).node().getBoundingClientRect().left +
                window.pageXOffset -
                80;
              var tipy =
                d3.select(this).node().getBoundingClientRect().top +
                window.pageYOffset -
                105;
              div.transition().duration(200).style("opacity", 0.9);
              div
                .html(
                  `<nobr>Name: ${d.track_name}</nobr><br/>Price: $${d.price}<br/>Tot. Rating Count: ${d.rating_count_tot}<br/>User Rating: ${d.user_rating}<br/>Genre: ${d.prime_genre}`
                )
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
  }, [d3Container3]);

  return (
    <div className={`${containerClass}`}>
      <svg className="app-rating-count" ref={d3Container3} />
    </div>
  );
}

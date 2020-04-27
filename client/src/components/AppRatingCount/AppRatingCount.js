import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

import "./AppRatingCount.css";
import { getGenres, getAppsByGenre } from "../../api";

import Select from "react-select";

export default function AppRatingCount() {
  const [genre, setGenre] = useState(null);
  const [options, setOptions] = useState([]);

  const d3Container = useRef(null);

  const handleChange = (e) => {
    setGenre(e);
  };

  // Retrieve data from the database via API call on page load
  useEffect(() => {
    setOptions(getGenres());
  }, []);

  // // Get the applications for a secific genre when the genre is selected
  // useEffect(() => {
  //   if (genre) {
  //     const apps = getAppsByGenre(genre.label);
  //     setData(apps);
  //   }
  // }, [genre]);

  useEffect(() => {
    if (genre && d3Container.current) {
      const margin = 100;
      const width = 1000 - 2 * margin;
      const height = 600 - 2 * margin;

      var svg = d3.select(d3Container.current);

      // Remove all if the svg is being re-rendered
      svg.selectAll("*").remove();

      const chart = svg
        .append("g")
        .attr("transform", `translate(${margin}, ${margin})`);

      // Set the y-scale
      const yScale = d3.scaleLinear().range([height, 0]);

      // Set the x-scale
      const xScale = d3.scaleLinear().range([0, width]);
      // Read the json file
      d3.json(`http://localhost:5000/api/applications/${genre.value}`)
        .then((data) => {
          data.forEach((d) => {
            d.rating_count_tot = +d.rating_count_tot;
            d.user_rating = +d.user_rating;
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

          xScale.domain([0, 5]);

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

          // Create Title
          chart
            .append("text")
            .attr("x", width / 2)
            .attr("y", 0 - margin / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "24px")
            .style("text-decoration", "underline")
            .text(
              `Total Rating Count vs. User Rating of Apps for Genre: ${genre.label}`
            )
            .style("fill", "#1774e4");

          // X axis label
          chart
            .append("text")
            .attr("x", width / 2)
            .attr("y", height + margin - 25)
            .style("text-anchor", "middle")
            .text("User Rating");

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

          // Draw the rectanges for each data point
          chart
            .selectAll()
            .data(data)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("cx", (s) => xScale(s.user_rating))
            .attr("cy", (s) => yScale(s.rating_count_tot / 1000))
            .attr("fill", "#36454f")
            .on("mouseover", function (d, i) {
              // Calculate the relative x and y of the hovered bar to calculate the tooltip location
              var tipx =
                d3.select(this).node().getBoundingClientRect().left +
                window.pageXOffset -
                90;
              var tipy =
                d3.select(this).node().getBoundingClientRect().top +
                window.pageYOffset -
                90;
              div.transition().duration(200).style("opacity", 0.9);
              div
                .html(
                  `<nobr>Name: ${d.track_name}</nobr><br/>Price: $${d.price}<br/>Tot. Rating Count: ${d.rating_count_tot}<br/>User Rating: ${d.user_rating}`
                )
                .style("left", tipx + "px")
                .style("top", tipy + "px");

              d3.select(this).attr("fill", "orange");
            })
            .on("mouseout", function () {
              div.transition().duration(500).style("opacity", 0);
              d3.select(this).attr("fill", "#36454f");
            });
        })
        .catch((err) => console.log(err));
    }
  }, [genre, d3Container]);

  return (
    <div>
      <label htmlFor="genre-picker">Please Select an App Genre:</label>
      <Select
        id="genre-picker"
        name="genre-picker"
        value={genre}
        onChange={handleChange}
        options={options}
      />
      <div className="visual-container">
        <svg className="app-rating-count" ref={d3Container} />
      </div>
    </div>
  );
}

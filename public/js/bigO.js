(() => {
  const stroke = 0.1;
  const width = 50;
  const height = 25;
  const fontSize = 10 * stroke;

  function chart(selector, data, options) {
    const svg = d3
      .select(selector)
      .attr("viewBox", `-3 -1 ${width + 3} ${height + 5}`)
      .style("color", "#555555")
      .style("stroke-width", stroke);

    const domainX = options?.maxX || width;
    const domainY = options?.maxY || (domainX * height) / width;

    const scaleX = d3.scaleLinear().domain([0, domainX]).range([0, width]).nice();
    const scaleY = d3.scaleLinear().domain([0, domainY]).range([height, 0]).nice();

    const curve = (selection) => {
      selection
        .append("path")
        .attr("fill", "none")
        .attr("stroke", ({ color }) => color)
        .attr("stroke-width", stroke)
        .attr("stroke-dasharray", ({ dashes }) => dashes)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .datum(({ f }) => d3.range(0, domainX, (domainX / width) * 0.1).map((x) => [x, f(x)]))
        .attr(
          "d",
          d3
            .line()
            .defined(([x, y]) => x >= 0 && y >= 0 && x <= domainX && y <= domainY)
            .x((v) => scaleX(v[0]))
            .y((v) => scaleY(v[1]))
        );
    };

    const legend = (selection) => {
      selection
        .append("text")
        .attr("x", 5)
        .attr("y", ({ index }) => index * 1.25 * fontSize)
        .attr("fill", ({ color }) => color)
        .style("font-size", `${fontSize}px`)
        .text(({ name }) => name);

      selection
        .append("line")
        .attr("x1", 0)
        .attr("x2", 4)
        .attr("y1", ({ index }) => index * 1.25 * fontSize - 0.5)
        .attr("y2", ({ index }) => index * 1.25 * fontSize - 0.5)
        .attr("stroke-dasharray", ({ dashes }) => dashes)
        .attr("stroke", ({ color }) => color)
        .attr("stroke-width", stroke);
    };

    svg.append("g").selectAll("path").data(data).enter().call(curve);

    const legendX = scaleX(options?.legend?.x || domainX - 5);
    const legendY = scaleY(options?.legend?.y || 5);
    svg
      .append("g")
      .attr("transform", `translate(${legendX}, ${legendY})`)
      .selectAll("text")
      .data(data)
      .enter()
      .call(legend);

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -scaleY(domainY / 2))
      .attr("y", scaleX(0) - 3 * fontSize)
      .style("text-anchor", "middle")
      .style("font-size", `${fontSize}px`)
      .style("font-weight", "bold")
      .text("f(n)");

    svg
      .append("g")
      .style("font-size", `${fontSize}px`)
      .call(
        d3
          .axisLeft(scaleY)
          .tickSize(stroke * 3)
          .tickPadding(stroke * 3)
      );

    svg
      .append("text")
      .attr("x", scaleX(domainX / 2))
      .attr("y", scaleY(0) + 3 * fontSize)
      .style("text-anchor", "middle")
      .style("font-size", `${fontSize}px`)
      .style("font-weight", "bold")
      .text("n");

    svg
      .append("g")
      .attr("transform", `translate(0, ${scaleY(0)})`)
      .style("font-size", `${fontSize}px`)
      .call(
        d3
          .axisBottom(scaleX)
          .tickSize(stroke * 3)
          .tickPadding(stroke * 3)
      );

    const f = data[0].f;
    const points = options?.showPoints || [];
    for (const point of points) {
      const x = scaleX(point);
      const y = scaleY(f(point));
      const x0 = scaleX(0);
      const y0 = scaleY(0);
      svg
        .append("polyline")
        .attr("points", `${x0},${y} ${x},${y} ${x},${y0}`)
        .attr("fill", "none")
        .attr("stroke", "currentColor")
        .attr("stroke-dasharray", `${stroke} ${3 * stroke}`);
    }
  }

  function example1() {
    chart(
      "#bigO_graph1",
      [
        { f: (n) => n, color: "steelblue", dashes: "", name: "n", index: 0 },
        {
          f: (n) => n * n,
          color: "red",
          dashes: `${10 * stroke} ${5 * stroke}`,
          name: "n²",
          index: 1,
        },
        {
          f: (n) => Math.log(n + 1) / Math.log(2),
          dashes: `${stroke} ${5 * stroke}`,
          color: "green",
          name: "lg(n)",
          index: 2,
        },
        {
          f: (n) => (n * Math.log(n + 1)) / Math.log(2),
          dashes: `${10 * stroke} ${5 * stroke} ${stroke} ${5 * stroke}`,
          color: "purple",
          name: "n•lg(n)",
          index: 3,
        },
        {
          f: (n) => Math.pow(Math.log(n + 1) / Math.log(2), 2),
          dashes: `${5 * stroke} ${5 * stroke} ${stroke} ${5 * stroke} ${stroke} ${5 * stroke}`,
          color: "orange",
          name: "lg²(n)",
          index: 4,
        },
      ],
      {
        legend: { x: 32, y: 18 },
      }
    );
  }

  function example2() {
    chart(
      "#bigO_graph2",
      [
        {
          f: (n) => n,
          dashes: "",
          color: "green",
          name: "n → O(n)",
          index: 0,
        },
        {
          f: (n) => 0.00125 * n * n,
          dashes: `${5 * stroke} ${5 * stroke}`,
          color: "orange",
          name: "n² / 800 → O(n²)",
          index: 1,
        },
      ],
      {
        maxX: 1000,
        maxY: 1000,
        showPoints: [800],
        legend: { x: 710, y: 200 },
      }
    );
  }

  window.addEventListener("DOMContentLoaded", (_event) => {
    example1();
    example2();
  });
})();

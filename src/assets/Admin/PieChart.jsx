import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"; // ✅ default import

const PieChart = () => {
  useEffect(() => {
    // Create root element
    let root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]); // ✅ works now

    // Create chart
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        radius: am5.percent(90),
        innerRadius: am5.percent(50),
        layout: root.horizontalLayout,
      })
    );

    // Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: "sales",
        categoryField: "country",
      })
    );

    // Set data
    series.data.setAll([
      { country: "Lithuania", sales: 501.9 },
      { country: "Czechia", sales: 301.9 },
      { country: "Ireland", sales: 201.1 },
      { country: "Germany", sales: 165.8 },
      { country: "Australia", sales: 139.9 },
      { country: "Austria", sales: 128.3 },
      { country: "UK", sales: 99 },
      { country: "Belgium", sales: 60 },
      { country: "The Netherlands", sales: 50 },
    ]);

    // Disable labels and ticks
    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);

    // Add gradients
    series.slices.template.set("strokeOpacity", 0);
    series.slices.template.set(
      "fillGradient",
      am5.RadialGradient.new(root, {
        stops: [
          { brighten: -0.8 },
          { brighten: -0.8 },
          { brighten: -0.5 },
          { brighten: 0 },
          { brighten: -0.5 },
        ],
      })
    );

    // Create legend
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerY: am5.percent(50),
        y: am5.percent(50),
        layout: root.verticalLayout,
      })
    );

    legend.valueLabels.template.setAll({ textAlign: "right" });
    legend.labels.template.setAll({
      maxWidth: 140,
      width: 140,
      oversizedBehavior: "wrap",
    });

    legend.data.setAll(series.dataItems);

    // Play initial series animation
    series.appear(1000, 100);

    // Cleanup on unmount
    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: "100%", height: "400px" }}></div>;
};

export default PieChart;

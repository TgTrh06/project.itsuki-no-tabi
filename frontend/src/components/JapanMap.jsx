import React, { useLayoutEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_japanLow from "@amcharts/amcharts5-geodata/japanLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useNavigate, useParams } from "react-router-dom";

export default function JapanMap({ slug }) {
  const navigate = useNavigate();
  const [selectedPolygon, setSelectedPolygon] = useState(null);

  useLayoutEffect(() => {
    const root = am5.Root.new("japanMapDiv");
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "translateX",
        panY: "translateY",
        wheelY: "zoom",
        projection: am5map.geoMercator(),
      })
    );

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_japanLow,
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
      fill: am5.color(0xffffff),
      stroke: am5.color(0x0F52BA),
      strokeWidth: 1.5,
      cursorOverStyle: "pointer",
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x0000FF),
      strokeWidth: 2,
    });

    // Tô màu vùng được chọn
    polygonSeries.events.on("datavalidated", () => {
      polygonSeries.mapPolygons.each((polygon) => {
        const name = polygon.dataItem.dataContext.name.toLowerCase().replace(/\s+/g, "-");
        if (name === slug) {
          polygon.set("fill", am5.color(0x0000FF)); // màu tô mặc định cho vùng được chọn
          setSelectedPolygon(polygon);
        }
      });
    });

    // Hover logic: giữ màu vùng được chọn khi không hover
    polygonSeries.mapPolygons.template.events.on("pointerout", () => {
      if (selectedPolygon) {
        selectedPolygon.set("fill", am5.color(0x16a34a)); // khôi phục màu vùng được chọn
      }
    });

    // Click để điều hướng
    polygonSeries.mapPolygons.template.events.on("click", function (ev) {
      const regionName = ev.target.dataItem.dataContext.name;
      const regionSlug = regionName.toLowerCase().replace(/\s+/g, "-");
      navigate(`/destinations/${regionSlug}`);
    });

    return () => root.dispose();
  }, [navigate, slug]);

  return <div id="japanMapDiv" className="w-full h-[600px] rounded-lg shadow-md" />;
}
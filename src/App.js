

import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


am4core.useTheme(am4themes_animated);
// Themes end


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

  }
}

  componentDidMount(){

    let chart = am4core.create("chartdiv", am4charts.XYChart);

    let valueAxisX = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxisX.renderer.ticks.template.disabled = true;
    valueAxisX.renderer.axisFills.template.disabled = true;
    
    let valueAxisY = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxisY.renderer.ticks.template.disabled = true;
    valueAxisY.renderer.axisFills.template.disabled = true;
    
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueX = "x";
    series.dataFields.valueY = "y";
    series.dataFields.value = "value";
    series.strokeOpacity = 0;
    series.sequencedInterpolation = true;
    series.tooltip.pointerOrientation = "vertical";
    
    let bullet = series.bullets.push(new am4core.Circle());
    bullet.fill = am4core.color("#ff0000");
    bullet.propertyFields.fill = "color";
    bullet.strokeOpacity = 0;
    bullet.strokeWidth = 2;
    bullet.fillOpacity = 0.5;
    bullet.stroke = am4core.color("#ffffff");
    bullet.hiddenState.properties.opacity = 0;
    bullet.tooltipText = "[bold]{title}:[/]\nPopulation: {value.value}\nIncome: {valueX.value}\nLife expectancy:{valueY.value}";
    
    let outline = chart.plotContainer.createChild(am4core.Circle);
    outline.fillOpacity = 0;
    outline.strokeOpacity = 0.8;
    outline.stroke = am4core.color("#ff0000");
    outline.strokeWidth = 2;
    outline.hide(0);
    
    let blurFilter = new am4core.BlurFilter();
    outline.filters.push(blurFilter);
    
    bullet.events.on("over", function(event) {
        let target = event.target;
        chart.cursor.triggerMove({ x: target.pixelX, y: target.pixelY }, "hard");
        chart.cursor.lineX.y = target.pixelY;
        chart.cursor.lineY.x = target.pixelX - chart.plotContainer.pixelWidth;
        valueAxisX.tooltip.disabled = false;
        valueAxisY.tooltip.disabled = false;
    
        outline.radius = target.pixelRadius + 2;
        outline.x = target.pixelX;
        outline.y = target.pixelY;
        outline.show();
    })
    
    bullet.events.on("out", function(event) {
        chart.cursor.triggerMove(event.pointer.point, "none");
        chart.cursor.lineX.y = 0;
        chart.cursor.lineY.x = 0;
        valueAxisX.tooltip.disabled = true;
        valueAxisY.tooltip.disabled = true;
        outline.hide();
    })
    
    let hoverState = bullet.states.create("hover");
    hoverState.properties.fillOpacity = 1;
    hoverState.properties.strokeOpacity = 1;
    
    series.heatRules.push({ target: bullet, min: 2, max: 60, property: "radius" });
    
    bullet.adapter.add("tooltipY", function (tooltipY, target) {
        return -target.radius;
    })
    
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomXY";
    
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();
    
    chart.data = [
        {
            "title": "Afghanistan",
            "id": "AF",
            "color": "#eea638",
            "continent": "asia",
            "x": 1349.69694102398,
            "y": 60.524,
            "value": 33397058
        },
        {
            "title": "Albania",
            "id": "AL",
            "color": "#d8854f",
            "continent": "europe",
            "x": 6969.30628256456,
            "y": 77.185,
            "value": 3227373
        },
        {
            "title": "Algeria",
            "id": "DZ",
            "color": "#de4c4f",
            "continent": "africa",
            "x": 6419.12782939372,
            "y": 70.874,
            "value": 36485828
        },
        {
            "title": "Angola",
            "id": "AO",
            "color": "#de4c4f",
            "continent": "africa",
            "x": 5838.15537582502,
            "y": 51.498,
            "value": 20162517
        },
        {
            "title": "Argentina",
            "id": "AR",
            "color": "#86a965",
            "continent": "south_america",
            "x": 15714.1031814398,
            "y": 76.128,
            "value": 41118986
        },
        {
            "title": "Armenia",
            "id": "AM",
            "color": "#d8854f",
            "continent": "europe",
            "x": 5059.0879636443,
            "y": 74.469,
            "value": 3108972
        },
        {
            "title": "Australia",
            "id": "AU",
            "color": "#8aabb0",
            "continent": "australia",
            "x": 36064.7372768548,
            "y": 82.364,
            "value": 22918688
        },
        {
            "title": "Austria",
            "id": "AT",
            "color": "#d8854f",
            "continent": "europe",
            "x": 36731.6287741081,
            "y": 80.965,
            "value": 8428915
        },
        {
            "title": "Azerbaijan",
            "id": "AZ",
            "color": "#d8854f",
            "continent": "europe",
            "x": 9291.02626998762,
            "y": 70.686,
            "value": 9421233
        },
        {
            "title": "Bahrain",
            "id": "BH",
            "color": "#eea638",
            "continent": "asia",
            "x": 24472.896235865,
            "y": 76.474,
            "value": 1359485
        },
        {
            "title": "Bangladesh",
            "id": "BD",
            "color": "#eea638",
            "continent": "asia",
            "x": 1792.55023464123,
            "y": 70.258,
            "value": 152408774
        },
        {
            "title": "Belarus",
            "id": "BY",
            "color": "#d8854f",
            "continent": "europe",
            "x": 13515.1610255056,
            "y": 69.829,
            "value": 9527498
        },
        {
            "title": "Belgium",
            "id": "BE",
            "color": "#d8854f",
            "continent": "europe",
            "x": 32585.0119650436,
            "y": 80.373,
            "value": 10787788
        },
        {
            "title": "Benin",
            "id": "BJ",
            "color": "#de4c4f",
            "continent": "africa",
            "x": 1464.13825459126,
            "y": 59.165,
            "value": 9351838
        },        {
            "title": "Switzerland",
            "id": "CH",
            "color": "#d8854f",
            "continent": "europe",
            "x": 37678.3928108684,
            "y": 82.471,
            "value": 7733709
        },
        {
            "title": "Syria",
            "id": "SY",
            "color": "#eea638",
            "continent": "asia",
            "x": 4432.01553897559,
            "y": 71,
            "value": 21117690
        },
        {
            "title": "Taiwan",
            "id": "TW",
            "color": "#eea638",
            "continent": "asia",
            "x": 32840.8623523232,
            "y": 79.45,
            "value": 23114000
        },
        {
            "title": "Tajikistan",
            "id": "TJ",
            "color": "#eea638",
            "continent": "asia",
            "x": 1952.10042735043,
            "y": 67.118,
            "value": 7078755
        },
        {
            "title": "Tanzania",
            "id": "TZ",
            "color": "#de4c4f",
            "continent": "africa",
            "x": 1330.05614548839,
            "y": 60.885,
            "value": 47656367
        },
        {
            "title": "Thailand",
            "id": "TH",
            "color": "#eea638",
            "continent": "asia",
            "x": 8451.15964058768,
            "y": 74.225,
            "value": 69892142
        },
        {
            "title": "Timor-Leste",
            "id": "TL",
            "color": "#eea638",
            "continent": "asia",
            "x": 3466.08281224683,
            "y": 67.033,
            "value": 1187194
        }
    ];
    
    
    
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }


  render() {
    return (
        <div>
          <div
            className="chart-area"
            id="chartdiv"
            style={{ width: "500px", height: "300px" }}
          />
          <button>click to take shot</button>
        </div>
    );
  }
}

export default App;

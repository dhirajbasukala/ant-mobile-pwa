import React, { Component } from "react";
import autoBind from 'auto-bind';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalRectSeries,
  DiscreteColorLegend,
  Hint
} from "react-vis";

const items = ["Data Set A ", "Data Set B"];
class HistogramExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hintData: {}
    };
    autoBind(this);
  }
  
  render() {

    const timestamp = new Date().getTime();
    const ONE_DAY = 86400000;
    const DATA1 = [
      { x0: ONE_DAY * 6, x: ONE_DAY * 3, y: 1 },
      { x0: ONE_DAY * 7, x: ONE_DAY * 8, y: 1.2 },
      { x0: ONE_DAY * 8, x: ONE_DAY * 9, y: 1.4 },
      { x0: ONE_DAY * 9, x: ONE_DAY * 10, y: 1.9 }
    ].map(el => ({ x0: el.x0 + timestamp, x: el.x + timestamp, y: el.y }));

    const DATA2 = [
      { x0: ONE_DAY * 10, x: ONE_DAY * 11, y: 1.2 },
      { x0: ONE_DAY * 19, x: ONE_DAY * 20, y: 1.1 },
      { x0: ONE_DAY * 20, x: ONE_DAY * 21, y: 2 },
      { x0: ONE_DAY * 21, x: ONE_DAY * 22, y: 2.8 }
    ].map(el => ({ x0: el.x0 + timestamp, x: el.x + timestamp, y: el.y }));
    const { viewport } = this.props; 
    const { hintData } = this.state;

    return (
      <div className="graph">
        <XYPlot
          xDomain={[timestamp - 2 * ONE_DAY, timestamp + 30 * ONE_DAY]}
          yDomain={[0.1, 2.1]}
          xType="time"
          width={viewport.width-300}
          height={300}
          className='histogram-graph'
          
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalRectSeries 
            data={DATA1}
            style={{stroke: '#fff'}}
            onValueMouseOver={v => this.setState({ hintData: v })}
            onSeriesMouseOut={() => this.setState({ hintData: {} })}
          />
          <VerticalRectSeries
            data={DATA2}
            style={{stroke: '#fff'}}
            onValueMouseOver={v => this.setState({ hintData: v })}
            onSeriesMouseOut={() => this.setState({ hintData: {} })}
          />
          {Object.keys(hintData).length >0 && <Hint value={hintData} />}
        </XYPlot>
        <div className="graph-legend">
          <DiscreteColorLegend width={300} items={items} />
        </div>
      </div>
    );
  }
}

export default HistogramExample;

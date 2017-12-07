import React from 'react';
import ReactDOM from 'react-dom';
import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryCursorContainer,
  VictoryTheme,
  VictoryTooltip,
  VictoryAxis,
  VictoryLine,
  Flyout,
  Line
} from 'victory';

class CrossLines extends React.Component {
  render() {
    console.log('render', this.props);
    const { height, width, padding } = this.props.theme.chart;
    return (
      <svg>
        <Line
          x1={this.props.x}
          x2={this.props.x}
          y1={padding}
          y2={height - padding}
          style={{
            stroke: 'red'
          }}
        />
        <Line
          x1={padding}
          x2={width - padding}
          y1={this.props.y}
          y2={this.props.y}
          style={{
            stroke: 'green'
          }}
        />
      </svg>
    );
  }
}

class Main extends React.Component {
  render() {
    return (
      <div style={{ width: '80%', height: '80%' }}>
        <VictoryChart
          theme={VictoryTheme.material}
          containerComponent={
            <VictoryVoronoiContainer
              labels={d => `x: ${d.x} y: ${d.y}`}
              labelComponent={<CrossLines />}
            />
          }
        >
          <VictoryAxis
            dependentAxis
            tickValues={[1, 2, 3, 4, 5]}
            style={{
              axis: { stroke: 'red' },
              grid: { opacity: 0 },
              ticks: { opacity: 0 }
            }}
          />
          <VictoryLine
            interpolation="natural"
            data={[
              { x: 1, y: 1 },
              { x: 2, y: 2 },
              { x: 3, y: 3 },
              { x: 4, y: 4 },
              { x: 5, y: 5 }
            ]}
            style={{
              data: { stroke: 'blue' }
            }}
          />
          <VictoryAxis
            name="x-axis"
            tickValues={[1, 2, 3, 4, 5]}
            style={{
              axis: { stroke: 'green' },
              grid: { opacity: 0 },
              ticks: { opacity: 0 }
            }}
          />
        </VictoryChart>
      </div>
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Main />, app);

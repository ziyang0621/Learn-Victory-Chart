import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
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
    // console.log('render', this.props);
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

class CursorLine extends React.Component {
  render() {
    return (
      <Line
        x1={this.props.x1}
        x2={this.props.x1}
        y1={this.props.y1}
        y2={this.props.y2}
        style={{
          stroke: 'red'
        }}
      />
    );
  }
}

const data = [
  { x: 0, y: 0 },
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: 3 },
  { x: 4, y: 4 },
  { x: 5, y: 5 }
];

class Main extends React.Component {
  state = {
    dataToDisplay: ''
  };

  render() {
    return (
      <div style={{ width: '80%', height: '80%' }}>
        <h3>{this.state.dataToDisplay}</h3>
        <VictoryChart
          domainPadding={{ x: [1, 1], y: [1, 1] }}
          theme={VictoryTheme.material}
          containerComponent={
            <VictoryCursorContainer
              cursorLabel={d => `${d.x}, ${d.y}`}
              cursorComponent={<CursorLine />}
              onCursorChange={(value, props) => {
                if (value) {
                  _.forEach(data, (val, key) => {
                    console.log(
                      'inside',
                      val.x,
                      val.y,
                      key,
                      Math.round(value.x)
                    );
                    if (val.x === Math.round(value.x)) {
                      this.setState({
                        dataToDisplay: `${val.x} ${val.y}`
                      });
                    }
                  });
                }
              }}
            />
          }
        >
          <VictoryAxis
            dependentAxis
            tickValues={[0, 1, 2, 3, 4, 5]}
            style={{
              axis: { stroke: 'green' },
              grid: { opacity: 0 },
              ticks: { opacity: 0 }
            }}
          />
          <VictoryLine
            interpolation="natural"
            data={data}
            style={{
              data: { stroke: 'blue' }
            }}
          />
          <VictoryAxis
            name="x-axis"
            tickValues={[0, 1, 2, 3, 4, 5]}
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

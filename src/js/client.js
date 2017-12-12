import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import moment from 'moment';
import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryTheme,
  VictoryAxis,
  VictoryLine,
  Line
} from 'victory';
import axios from 'axios';

class CrossLine extends React.Component {
  render() {
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
      </svg>
    );
  }
}

class Main extends React.Component {
  state = {
    dataToDisplay: '',
    priceData: []
  };

  componentDidMount = async () => {
    const yesterday = moment()
      .add(-1, 'days')
      .valueOf();
    const today = moment().valueOf();
    const { data: coinData } = await axios.get(`/api/coininfo`, {
      params: {
        coin: 'bitcoin',
        start: yesterday,
        end: today
      }
    });

    const priceData = _.map(coinData.price_usd, price => {
      const time = moment(price[0]).format('hh:mm a');
      return { x: price[0], y: price[1], time: time };
    });
    this.setState({
      priceData
    });
  };

  render() {
    const { priceData } = this.state;
    if (priceData.length === 0) {
      return <div />;
    }

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <h3>{this.state.dataToDisplay}</h3>
        <VictoryChart
          theme={VictoryTheme.material}
          containerComponent={
            <VictoryVoronoiContainer
              voronoiDimension="x"
              labels={d => `x: ${d.time} y: ${d.y}`}
              labelComponent={<CrossLine />}
              onActivated={(points, props) => {
                _.forEach(this.state.priceData, (dataPoint, key) => {
                  if (dataPoint.x === points[0].x) {
                    this.setState({
                      dataToDisplay: `${dataPoint.time} $${dataPoint.y}`
                    });
                  }
                });
              }}
            />
          }
        >
          <VictoryAxis
            dependentAxis
            tickFormat={t => {
              return `$${t}`;
            }}
            style={{
              axis: { stroke: 'green' },
              grid: { opacity: 0 },
              ticks: { opacity: 0 }
            }}
          />
          <VictoryLine
            interpolation="natural"
            data={priceData}
            style={{
              data: { stroke: 'blue' }
            }}
          />
          <VictoryAxis
            tickFormat={t => {
              return moment(t).format('hh:mm a');
            }}
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

import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import { render } from 'react-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useState, useEffect } from "react";

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);




// const App = () => (
//   <div>
//   <p> Data is {testData}</p>
//     <HighchartsReact highcharts={Highcharts} options={options} />
//   </div>
// );


export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://localhost:7129/api/EnergyRecords')
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

//console.log(data);
var TempArr=[];
var HumArr=[];
var ConsArr=[];
TempArr = data.map((entry) => ([Date.parse(entry.recordTime), entry.averageTemp]));
HumArr = data.map((entry) => ([Date.parse(entry.recordTime), entry.averageHumidity]));
ConsArr= data.map((entry) => ([Date.parse(entry.recordTime), entry.consumption]));

const optionsComb = {
  chart: {
    type: 'spline'
  },
  title: {
    text: 'Combined View'
  },
  xAxis: {
        type: 'datetime',
        // dateTimeLabelFormats: { // don't display the year
        //     month: '%e. %b',
        //     hour: '%H:%M',
        // },
        // labels: {
        //   format: '{value:%H:%M}'
        // },
        title: {
            text: 'DateTime'
        }
    },
    yAxis: {
        title: {
            text: ''
        },
        min: -5.0
    },
  series: [
    { 
      color: '#FF0000',
      name: 'Average Temperature',
      data: TempArr
    },
    { 
      color: '#0000FF',
      name: 'Average Humidity',
      data: HumArr
    },
    { 
      color: '#00FF00',
      name: 'Consumption',
      data: ConsArr
    }
  ],
  tooltip: {
  formatter: function() {
    // If you want to see what is available in the formatter, you can
    // examine the `this` variable.
        // console.log(this);
    const pointData = data.find(entry => Date.parse(entry.recordTime) === this.point.x)
    return new Date(this.x).toLocaleString()+'<br/><b>'+this.series.name+': '+ Highcharts.numberFormat(this.y, 2) +'</b><br/>Anomalous='+pointData.isAnomaly
  }}
};
const optionsTemp = {
  chart: {
    type: 'spline'
  },
  title: {
    text: 'Temperature View'
  },
  xAxis: {
        type: 'datetime',
        // dateTimeLabelFormats: { // don't display the year
        //     month: '%e. %b',
        //     hour: '%H:%M',
        // },
        // labels: {
        //   format: '{value:%H:%M}'
        // },
        title: {
            text: 'DateTime'
        }
    },
    yAxis: {
        title: {
            text: 'Average Temperature'
        },
        min: -5.0
    },
  series: [
    { 
      color: '#FF0000',
      name: 'Average Temperature',
      data: TempArr
    }
  ],
  tooltip: {
  formatter: function() {
    // If you want to see what is available in the formatter, you can
    // examine the `this` variable.
        // console.log(this);
    const pointData = data.find(entry => Date.parse(entry.recordTime) === this.point.x)
    return new Date(this.x).toLocaleString()+'<br/><b>'+this.series.name+': '+ Highcharts.numberFormat(this.y, 2) +'</b><br/>Anomalous='+pointData.isAnomaly
  }}
};
const optionsHumidity = {
  chart: {
    type: 'spline'
  },
  title: {
    text: 'Himidity View'
  },
  xAxis: {
        type: 'datetime',
        // dateTimeLabelFormats: { // don't display the year
        //     month: '%e. %b',
        //     hour: '%H:%M',
        // },
        // labels: {
        //   format: '{value:%H:%M}'
        // },
        title: {
            text: 'DateTime'
        }
    },
    yAxis: {
        title: {
            text: 'Average Humidity'
        },
        // min: -5.0
    },
  series: [
        { 
          color: '#0000FF',
      name: 'Average Humidity',
      data: HumArr
    },
  ],
  tooltip: {
  formatter: function() {
    // If you want to see what is available in the formatter, you can
    // examine the `this` variable.
        // console.log(this);
    const pointData = data.find(entry => Date.parse(entry.recordTime) === this.point.x)
    return new Date(this.x).toLocaleString()+'<br/><b>'+this.series.name+': '+ Highcharts.numberFormat(this.y, 2) +'</b><br/>Anomalous='+pointData.isAnomaly
  }}
};
const optionsConsumption = {
  chart: {
    type: 'spline'
  },
  title: {
    text: 'Combined View'
  },
  xAxis: {
        type: 'datetime',
        // dateTimeLabelFormats: { // don't display the year
        //     month: '%e. %b',
        //     hour: '%H:%M',
        // },
        // labels: {
        //   format: '{value:%H:%M}'
        // },
        title: {
            text: 'DateTime'
        }
    },
    yAxis: {
        title: {
            text: 'Consumption'
        },
        // min: -5.0
    },
  series: [
    { 
      color: '#00FF00',
      name: 'Consumption',
      data: ConsArr
    }
  ],
  tooltip: {
  formatter: function() {
    // If you want to see what is available in the formatter, you can
    // examine the `this` variable.
        // console.log(this);
    const pointData = data.find(entry => Date.parse(entry.recordTime) === this.point.x)
    return new Date(this.x).toLocaleString()+'<br/><b>'+this.series.name+': '+ Highcharts.numberFormat(this.y, 2) +'</b><br/>Anomalous='+pointData.isAnomaly
  }}
};

  return (
    <div className="App">
      
      <center><h1>Dashboard</h1></center>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <HighchartsReact highcharts={Highcharts} options={optionsComb} />
      <HighchartsReact highcharts={Highcharts} options={optionsTemp} />
      <HighchartsReact highcharts={Highcharts} options={optionsHumidity} />
      <HighchartsReact highcharts={Highcharts} options={optionsConsumption} />
    </div>);
}

root.render(
  <BrowserRouter basename={baseUrl}>
    <App />
  </BrowserRouter>);

// root.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

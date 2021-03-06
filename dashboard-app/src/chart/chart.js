import React from 'react';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import { Chart, Axis, Tooltip, Geom, Coord, Legend } from 'bizcharts';

const stackedChartData = (resultSet) => {
    const data = resultSet.pivot().map(
        ({ xValues, yValuesArray }) =>
            yValuesArray.map(([yValues, m]) => ({
                x: resultSet.axisValuesString(xValues, ', '),
                color: resultSet.axisValuesString(yValues, ', '),
                measure: m && Number.parseFloat(m)
            }))
    ).reduce((a, b) => a.concat(b));

    return data;
}

const barRender = ({ resultSet }) => (
    <Chart scale={{ x: { tickCount: 8 } }} height={400} data={stackedChartData(resultSet)} forceFit>
        <Axis name="x" />
        <Axis name="measure" />
        <Tooltip />
        <Geom type="intervalStack" position={`x*measure`} color="color" />
    </Chart>
);

const API_URL = "http://localhost:4000"; // change to your actual endpoint

const cubejsApi = cubejs(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjU0MjQ5MzIsImV4cCI6MTU2NTUxMTMzMn0.fhTW-z49DWnHmOPin8ricj1FpMadmDzJf4zS1RHiXac",
    { apiUrl: API_URL + "/cubejs-api/v1" }
);

const renderChart = (Component) => ({ resultSet, error }) => (
    (resultSet && <Component resultSet={resultSet} />) ||
    (error && error.toString()) ||
    (<Spin />)
)

const ChartRenderer = () => <QueryRenderer
    query={{
        "dimensions": [
            "Zips.state"
        ],
        "timeDimensions": [],
        "filters": []
    }}
    cubejsApi={cubejsApi}
    render={renderChart(barRender)}
/>;

export default ChartRenderer;

import React from 'react';
import Highcharts from 'highcharts';
import './Chart.css'

export default function Chart({ data }) {
    const chartRef = React.useRef(null);

    React.useEffect(() => {
        if (!data || !data.data || data.data.length === 0) {
            return;
        }
        console.log(data);

        Highcharts.chart(chartRef.current, {
            chart: {
                type: 'bar',
                height: 400
            },
            title: {
                text: 'Air Quality Index (AQI) in Chiang Mai Stations'
            },
            xAxis: {
                categories: data.data.map(item => item.station.name),
                title: {
                    text: 'Station'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'AQI Value'
                }
            },
            series: [{
                name: 'AQI',
                data: data.data.map(item => parseInt(item.aqi)),
                color: '#10B981'
            }],
            credits: {
                enabled: false
            }
        });
    }, [data]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div ref={chartRef} className='chart'>chart</div>
        </div>
    );
}

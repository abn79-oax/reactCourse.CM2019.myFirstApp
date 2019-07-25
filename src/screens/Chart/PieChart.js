import React, { PureComponent } from 'react';
import {
    PieChart, Pie, Legend, Tooltip,
} from 'recharts';

export default class PieChartUsable extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/k9jkog04/';

    render() {
        const {data} = this.props;
        return (
            <PieChart width={400} height={400}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <Pie dataKey="value" isAnimationActive={false} data={data} innerRadius={10} cx={200} cy={200} outerRadius={80} fill="url(#colorUv)" label />
                <Tooltip />
            </PieChart>
        );
    }
}

import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class SimpleBarChart extends PureComponent {
//    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';
render() {
    const {newData,label,llaves,ancho,alto} = this.props;
        return (
            <BarChart
                width={ancho===undefined?80:ancho}
                height={alto === undefined ? 300 : alto}
                data={newData}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />
                <YAxis /> */}
                <YAxis yAxisId="left"/> 
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar  dataKey={llaves[0]} fill="#486de8" />
                <Bar dataKey={llaves[1]} fill="#ff54ea" />
                <Bar dataKey={llaves[2]} fill="#594e3a" />
                console.log(llaves);
            </BarChart>
        );
    }
}

"use client"

import React from "react";
import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from "recharts"

interface OverviewProps {
    data: any[]
}
export const Overview: React.FC<OverviewProps> = ({data}) => {
    return ( <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
            <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            tick={{fill: "#888888"}}
            axisLine={false}
            />
            <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            tick={{fill: "#888888"}}
            axisLine={false}
            tickFormatter={value => `KSh${value}`}
            />
            <Bar dataKey="total" fill="#3498db" radius={[4, 4, 0, 0]}/>
        </BarChart>
    </ResponsiveContainer> );
}
 
export default Overview;
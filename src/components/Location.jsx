import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Location({stats}) {

  // console.log(stats);
  const cityCount = stats.reduce((accum, item) => {
    if (accum[item.city]) {
      accum[item.city]+=1;
    } else {
      accum[item.city] = 1;
    }
    return accum;
  },{});

  // converting an obkect into array of key value pairs  (each pair is an array with two elements: [key, value]).
  const cities = Object.entries(cityCount).map(([city, count]) => ({
    city, 
    count
  }));

  return (
    <div style={{width: "90%", height: 400}} >
      <ResponsiveContainer>
        <LineChart width={600} height={300} data={cities.slice(0,8)}>
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip labelStyle={{color: "green"}} />
          <Legend />

          <Line type="monotone" dataKey="count" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

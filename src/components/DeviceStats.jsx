import {PieChart, Pie, Cell, ResponsiveContainer} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function DeviceStats({stats}) {

  const deviceCount = stats.reduce((accum, item) => {
    if (!accum[item.device]) {
      accum[item.device] = 0;
    }
    accum[item.device]++;

    return accum;
  }, {});

  const results = Object.keys(deviceCount).map((device) => ({
    device,
    count: deviceCount[device],
  }));
  // console.log(results);


  return (
    <div style={{width: "100%", height: 300}}>
      <ResponsiveContainer>
        <PieChart width={700} height={300}>
          <Pie
            data={results}
            labelLine={false}
            label={({device, percent}) => `${device} : ${(percent * 100).toFixed(0)}%`}
            dataKey="count">
            {results.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

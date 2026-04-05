import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

interface Props {
  totalFamilies: number;
  totalMembers: number;
  newThisMonth: number;
}

const DashboardChart = ({
  totalFamilies,
  totalMembers,
  newThisMonth,
}: Props) => {
  const data = [
    { name: "Families", value: totalFamilies },
    { name: "Members", value: totalMembers },
    { name: "New Members", value: newThisMonth },
  ];

  //  Colors for each bar
  const colors = ["#3b82f6", "#10b981", "#f59e0b"];
  // blue, green, yellow

  return (
    <div className="w-full h-[350px] bg-white p-6 rounded-2xl shadow-md border">
      <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>

      <ResponsiveContainer width="40%" height="85%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data?.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;

export function StatCard({ title, value, icon, trend }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>

        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
          {icon}
        </div>
      </div>

      <p className="text-green-600 text-sm mt-3 font-medium">
        {trend} this month
      </p>
    </div>
  );
}

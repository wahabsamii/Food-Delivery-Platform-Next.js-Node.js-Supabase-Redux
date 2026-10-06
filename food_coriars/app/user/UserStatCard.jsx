function UserStatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>

      <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
        {icon}
      </div>
    </div>
  );
}

function QuickAction({ title, desc }) {
  return (
    <div className="bg-yellow-400 rounded-2xl p-6 text-black flex items-center justify-between hover:bg-yellow-500 transition cursor-pointer">
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm opacity-80">{desc}</p>
      </div>
      <FaArrowRight />
    </div>
  );
}

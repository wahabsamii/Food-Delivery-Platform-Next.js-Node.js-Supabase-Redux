
import ProtectedRoute from "../components/ProtectedRoute";
import { Sidebar } from "./Sidebar";

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute role="admin">
      <div className="min-h-screen bg-gray-50">

        {/* Fixed Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="ml-64 min-h-screen p-6">
          <div className="mx-auto max-w-[1600px]">
            {children}
          </div>
        </main>

      </div>
    </ProtectedRoute>
  );
}

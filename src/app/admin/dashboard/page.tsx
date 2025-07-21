// app/admin/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/authOptions";
import { redirect } from "next/navigation";
import AdminDashbord from "@/component/AdminDashbord";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login"); // Not logged in → redirect to login
  }

  return <AdminDashbord />;
}

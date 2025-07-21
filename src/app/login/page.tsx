// app/login/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/authOptions";

import { redirect } from "next/navigation";
import BlogAdminLogin from '@/component/BlogAdminLogin'

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/admin/dashboard"); // Already logged in → redirect to dashboard
  }

  return <BlogAdminLogin />;
}

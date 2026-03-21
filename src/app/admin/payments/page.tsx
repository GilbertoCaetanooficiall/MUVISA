import PaymentsClient from "@/app/admin/payments/PaymentsClient";
import AdminLayout from '@/components/admin/AdminLayout';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pagamentos | Admin MUVISA",
  description: "Gestão de pagamentos e faturamento das candidaturas",
};

export default function PaymentsPage() {
  return (
    <AdminLayout>
      <PaymentsClient />
    </AdminLayout>
  );
}

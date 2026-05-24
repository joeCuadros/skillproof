import DashboardLayout from "@/components/layout/dashboard-layout";
import CompanySidebar from "@/components/sidebar/company-sidebar";
import DashboardNavbar from "@/components/navbar/dashboard-navbar";
import CompanyOverview from "@/components/company/company-overview";
import CompanyChallenges from "@/components/company/company-challenges";
import CompanyCandidates from "@/components/company/company-candidates";

export default function CompanyDashboard() {
  return (
    <DashboardLayout sidebar={<CompanySidebar />}>
      <DashboardNavbar />

      <div className="space-y-10">
        <CompanyOverview />
        <CompanyChallenges />
        <CompanyCandidates />
      </div>
    </DashboardLayout>
  );
}
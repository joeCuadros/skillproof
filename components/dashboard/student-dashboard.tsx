import DashboardLayout from "@/components/layout/dashboard-layout";
import StudentSidebar from "@/components/sidebar/student-sidebar";
import StudentNavbar from "@/components/navbar/student-navbar";
import StudentOverview from "@/components/student/student-overview";
import StudentCV from "@/components/student/student-cv";
import StudentChallenges from "@/components/student/student-challenges";

export default function StudentDashboard() {
  return (
    <DashboardLayout sidebar={<StudentSidebar />}>
      <StudentNavbar />

      <div className="space-y-10">
        <StudentOverview />
        <StudentCV />
        <StudentChallenges />
      </div>
    </DashboardLayout>
  );
}
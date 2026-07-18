import HeadingPage from "@/components/HeadingPage";
import ProfileForm from "./components/ProfileForm";
import DashboardPreferences from "./components/DashboardPreferences";

export default function page() {
  return (
    <div className="settings">
      <div className="container mx-auto py-5 px-3 md:px-10 flex flex-col gap-5">
        <HeadingPage
          title="settings"
          subtitle="Manage your account preferences, security settings, and dashboard configurations."
        />

        <ProfileForm />
        <DashboardPreferences />
      </div>
    </div>
  );
}

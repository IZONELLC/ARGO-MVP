import { AccountSetupWizard } from "@/components/auth/account-setup-wizard";

export default function WelcomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0F0F0F] text-white">
      <AccountSetupWizard />
    </div>
  );
}

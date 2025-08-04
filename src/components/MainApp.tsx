import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Dashboard } from "@/components/Dashboard";
import { InventorySection } from "@/components/sections/InventorySection";
import { AlertsPanel } from "@/components/AlertsPanel";
import { ReportsSection } from "@/components/sections/ReportsSection";
import { SettingsSection } from "@/components/sections/SettingsSection";

export const MainApp = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "inventory":
        return <InventorySection />;
      case "alerts":
        return (
          <div className="container mx-auto px-4 py-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight">Alertes & Notifications</h1>
              <p className="text-muted-foreground">
                Gérez toutes vos alertes de stock et notifications
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <div className="lg:col-span-1 xl:col-span-2">
                <AlertsPanel />
              </div>
            </div>
          </div>
        );
      case "reports":
        return (
          <div className="container mx-auto px-4 py-6">
            <ReportsSection />
          </div>
        );
      case "settings":
      case "profile":
        return (
          <div className="container mx-auto px-4 py-6">
            <SettingsSection />
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        alertCount={5}
      />
      <main className="pb-6">
        {renderSection()}
      </main>
    </div>
  );
};
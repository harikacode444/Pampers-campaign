import { Sidebar } from "@/components/Sidebar";

const ActiveCampaigns = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Active Campaigns</h1>
          <p className="text-muted-foreground">Your live campaigns will appear here.</p>
        </div>
      </main>
    </div>
  );
};

export default ActiveCampaigns;

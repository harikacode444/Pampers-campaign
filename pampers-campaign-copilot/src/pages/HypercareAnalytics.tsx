import { Sidebar } from "@/components/Sidebar";

const HypercareAnalytics = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Hypercare Analytics</h1>
          <p className="text-muted-foreground">Campaign performance analytics and insights will appear here.</p>
        </div>
      </main>
    </div>
  );
};

export default HypercareAnalytics;

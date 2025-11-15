import { Sidebar } from "@/components/Sidebar";

const Drafts = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Draft Campaigns</h1>
          <p className="text-muted-foreground">Your saved campaign drafts will appear here.</p>
        </div>
      </main>
    </div>
  );
};

export default Drafts;

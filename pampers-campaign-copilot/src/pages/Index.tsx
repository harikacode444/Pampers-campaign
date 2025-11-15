import { Sidebar } from "@/components/Sidebar";
import { ChatSection } from "@/components/ChatSection";
import { SimulationSection } from "@/components/SimulationSection";
import { QASection } from "@/components/QASection";
import { GoLiveSection } from "@/components/GoLiveSection";
import { HypercareSection } from "@/components/HypercareSection";

const Index = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
          <ChatSection />
          <SimulationSection />
          <QASection />
          <GoLiveSection />
          <HypercareSection />
        </div>
      </main>
    </div>
  );
};

export default Index;

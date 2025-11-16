import { useState, useEffect } from "react";
import { chatWithCopilot, goLive, fetchHypercare, checkBackendHealth } from "@/lib/api";
import { Sidebar } from "@/components/Sidebar";
import { ChatSection } from "@/components/ChatSection";
import { SimulationSection } from "@/components/SimulationSection";
import { QASection } from "@/components/QASection";
import { GoLiveSection } from "@/components/GoLiveSection";
import { HypercareSection } from "@/components/HypercareSection";
import type { ChatResponse, GoLiveResponse, HypercareResponse } from "@/lib/api";

const Index = () => {
  // State management
  const [brief, setBrief] = useState<string>("");
  const [spec, setSpec] = useState<ChatResponse["spec"] | null>(null);
  const [journey, setJourney] = useState<ChatResponse["journey"] | null>(null);
  const [messages, setMessages] = useState<ChatResponse["messages"] | null>(null);
  const [qa, setQa] = useState<ChatResponse["qa"] | null>(null);
  const [goLiveResult, setGoLiveResult] = useState<GoLiveResponse | null>(null);
  const [hypercare, setHypercare] = useState<HypercareResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);

  // Check backend health on mount
  useEffect(() => {
    checkBackendHealth().then((isOnline) => {
      setBackendOnline(isOnline);
      if (!isOnline) {
        setError("Backend server is not running. Please start it at http://localhost:4000");
      }
    });
  }, []);

  // Handler functions
  async function handleGenerate() {
    if (!brief.trim()) {
      setError("Please enter a campaign brief");
      return;
    }

    setLoading(true);
    setError(null);
    setGoLiveResult(null);
    setHypercare(null);

    try {
      console.log("🚀 Starting campaign generation with brief:", brief);
      const result = await chatWithCopilot(brief);
      console.log("✅ Campaign generated successfully:", result);
      
      setSpec(result.spec);
      setJourney(result.journey);
      setMessages(result.messages);
      setQa(result.qa);
      
      console.log("✅ State updated with campaign data");
    } catch (err) {
      console.error("❌ Error generating campaign:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to generate campaign";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoLive() {
    if (!spec || !journey || !messages || !qa) {
      setError("Please generate a campaign first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await goLive({ spec, journey, messages, qa });
      setGoLiveResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to launch campaign");
    } finally {
      setLoading(false);
    }
  }

  async function handleHypercare() {
    const campaignId = goLiveResult?.brazeCampaignId || "mock_raf_001";
    
    setLoading(true);
    setError(null);

    try {
      const result = await fetchHypercare(campaignId);
      setHypercare(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch hypercare data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
          <ChatSection 
            brief={brief}
            setBrief={setBrief}
            onGenerate={handleGenerate}
            loading={loading}
            spec={spec}
            journey={journey}
            messages={messages}
            qa={qa}
          />
          {spec && journey && messages && (
            <SimulationSection 
              spec={spec}
              journey={journey}
              messages={messages}
            />
          )}
          {qa && (
            <QASection qa={qa} />
          )}
          <GoLiveSection 
            onGoLive={handleGoLive}
            loading={loading}
            disabled={!spec || !journey || !messages || !qa}
            spec={spec}
          />
          <HypercareSection 
            onHypercare={handleHypercare}
            loading={loading}
            disabled={!goLiveResult}
            hypercare={hypercare}
          />

          {/* Error display */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
              <p className="text-sm font-semibold text-destructive mb-1">Error</p>
              <p className="text-sm text-destructive">{error}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Make sure the backend server is running at http://localhost:4000
              </p>
            </div>
          )}
          
          {/* Backend status */}
          {backendOnline !== null && (
            <div className={`border rounded-xl p-4 text-xs ${backendOnline ? "bg-success/10 border-success/20" : "bg-destructive/10 border-destructive/20"}`}>
              <p className="font-semibold mb-1">
                Backend Status: {backendOnline ? "✅ Online" : "❌ Offline"}
              </p>
              {!backendOnline && (
                <p className="text-muted-foreground">
                  Start the backend server: <code className="bg-background px-1 rounded">cd backend && npm start</code>
                </p>
              )}
            </div>
          )}

          {/* Debug info - remove in production */}
          {process.env.NODE_ENV === "development" && (
            <div className="bg-muted/50 border border-border rounded-xl p-4 text-xs">
              <p className="font-semibold mb-2">Debug Info:</p>
              <p>Loading: {loading ? "Yes" : "No"}</p>
              <p>Has Spec: {spec ? "Yes" : "No"}</p>
              <p>Has Journey: {journey ? "Yes" : "No"}</p>
              <p>Has Messages: {messages ? "Yes" : "No"}</p>
              <p>Has QA: {qa ? "Yes" : "No"}</p>
              <p>API Base URL: http://localhost:4000</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;

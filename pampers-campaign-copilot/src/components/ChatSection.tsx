import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage, mockInitialMessages } from "@/lib/mockData";
import type { ChatResponse } from "@/lib/api";

interface ChatSectionProps {
  brief: string;
  setBrief: (brief: string) => void;
  onGenerate: () => void;
  loading: boolean;
  spec?: ChatResponse["spec"] | null;
  journey?: ChatResponse["journey"] | null;
  messages?: ChatResponse["messages"] | null;
  qa?: ChatResponse["qa"] | null;
}

export const ChatSection = ({ brief, setBrief, onGenerate, loading, spec, journey, messages, qa }: ChatSectionProps) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockInitialMessages);

  // Update chat when API response comes in
  useEffect(() => {
    if (spec && journey && messages && qa) {
      setChatMessages(prev => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage?.role === "copilot" && lastMessage.content === "Generating campaign...") {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            role: "copilot",
            content: `✅ Campaign "${spec.campaign_name}" generated successfully! ${journey.steps.length} journey steps, ${Object.keys(messages).length} languages, QA ${qa.passed ? "passed" : "has issues"}.`,
            timestamp: new Date(),
          };
          return newMessages;
        }
        return prev;
      });
    }
  }, [spec, journey, messages, qa]);

  const handleSend = () => {
    if (!brief.trim() || loading) return;

    const newUserMessage: ChatMessage = {
      role: "user",
      content: brief,
      timestamp: new Date(),
    };

    const copilotResponse: ChatMessage = {
      role: "copilot",
      content: "Generating campaign...",
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, newUserMessage, copilotResponse]);
    onGenerate();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Create your campaign</h2>
        <p className="text-sm text-muted-foreground">
          Describe the campaign you want. I'll design, simulate, QA and prep it for launch.
        </p>
      </div>

      <div className="h-80 overflow-y-auto mb-4 space-y-3 p-4 bg-background rounded-xl">
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                message.role === "user"
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your campaign brief..."
          className="flex-1"
          disabled={loading}
        />
        <Button 
          onClick={handleSend} 
          size="icon" 
          className="bg-accent hover:bg-accent/90"
          disabled={loading || !brief.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
      {loading && (
        <div className="mt-2 text-sm text-muted-foreground">Generating campaign...</div>
      )}
    </div>
  );
};

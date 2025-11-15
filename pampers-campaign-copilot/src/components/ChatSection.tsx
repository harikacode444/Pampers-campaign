import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage, mockInitialMessages } from "@/lib/mockData";

export const ChatSection = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockInitialMessages);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: ChatMessage = {
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    const copilotResponse: ChatMessage = {
      role: "copilot",
      content: "Thinking...",
      timestamp: new Date(),
    };

    setMessages([...messages, newUserMessage, copilotResponse]);
    setInputValue("");
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
        {messages.map((message, index) => (
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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your campaign brief..."
          className="flex-1"
        />
        <Button onClick={handleSend} size="icon" className="bg-accent hover:bg-accent/90">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

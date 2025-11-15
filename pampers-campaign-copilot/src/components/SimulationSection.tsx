import { mockSpec, mockJourney, mockCopy } from "@/lib/mockData";
import { Calendar, Globe, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const SimulationSection = () => {
  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Simulation</h2>
        <p className="text-sm text-muted-foreground">
          Preview the journey, localized messages, and AI optimizations before going live.
        </p>
      </div>

      {/* Campaign Summary */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">Campaign Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background p-4 rounded-xl">
            <p className="text-xs text-muted-foreground mb-1">Type</p>
            <p className="text-sm font-medium text-foreground">{mockSpec.type}</p>
          </div>
          <div className="bg-background p-4 rounded-xl">
            <p className="text-xs text-muted-foreground mb-1">Objective</p>
            <p className="text-sm font-medium text-foreground">{mockSpec.objective}</p>
          </div>
          <div className="bg-background p-4 rounded-xl">
            <p className="text-xs text-muted-foreground mb-1">Markets</p>
            <p className="text-sm font-medium text-foreground">{mockSpec.markets.join(", ")}</p>
          </div>
          <div className="bg-background p-4 rounded-xl">
            <p className="text-xs text-muted-foreground mb-1">Duration</p>
            <p className="text-sm font-medium text-foreground">{mockSpec.duration}</p>
          </div>
          <div className="bg-background p-4 rounded-xl">
            <p className="text-xs text-muted-foreground mb-1">Channels</p>
            <p className="text-sm font-medium text-foreground">{mockSpec.channels.join(", ")}</p>
          </div>
          <div className="bg-background p-4 rounded-xl">
            <p className="text-xs text-muted-foreground mb-1">Campaign Name</p>
            <p className="text-sm font-medium text-foreground">{mockSpec.name}</p>
          </div>
        </div>
      </div>

      {/* Journey Timeline */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">Journey Timeline</h3>
        <div className="space-y-4">
          {mockJourney.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary-foreground" />
                </div>
                {index < mockJourney.length - 1 && (
                  <div className="w-0.5 h-12 bg-border mt-2" />
                )}
              </div>
              <div className="flex-1 pb-8">
                <p className="text-sm font-semibold text-foreground mb-1">
                  Day {step.day} – {step.channels.join(" + ")}
                </p>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Localized Messages */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">Localized Message Previews</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockCopy.messages.map((message, index) => (
            <div key={index} className="bg-background p-4 rounded-xl border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-4 h-4 text-primary" />
                <p className="text-xs font-semibold text-foreground">
                  {message.market} – {message.language}
                </p>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Push</p>
                  <p className="text-sm text-foreground">{message.pushCopy}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Email Subject</p>
                  <p className="text-sm text-foreground">{message.emailSubject}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Braze AI Features */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Braze AI Features</h3>
        <div className="flex flex-wrap gap-2">
          {mockSpec.brazeAI.map((feature, index) => (
            <Badge
              key={index}
              className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
            >
              <Zap className="w-3 h-3 mr-1" />
              {feature}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

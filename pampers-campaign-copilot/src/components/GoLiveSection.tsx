import { useState } from "react";
import { mockSpec } from "@/lib/mockData";
import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const GoLiveSection = () => {
  const [isLaunching, setIsLaunching] = useState(false);
  const { toast } = useToast();

  const handleLaunch = async () => {
    setIsLaunching(true);

    // Simulate API call to /api/go-live
    setTimeout(() => {
      setIsLaunching(false);
      toast({
        title: "Campaign Launched Successfully! 🚀",
        description: "Your campaign is now live and running across all markets.",
        className: "bg-success text-white",
      });
    }, 2000);
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Launch Campaign</h2>
        <p className="text-sm text-muted-foreground">
          Review the final details and launch your campaign to all markets.
        </p>
      </div>

      <div className="bg-background p-5 rounded-xl mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Campaign Name</p>
            <p className="text-sm font-medium text-foreground">{mockSpec.name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Markets</p>
            <p className="text-sm font-medium text-foreground">{mockSpec.markets.join(", ")}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Duration</p>
            <p className="text-sm font-medium text-foreground">{mockSpec.duration}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Channels</p>
            <p className="text-sm font-medium text-foreground">{mockSpec.channels.join(", ")}</p>
          </div>
        </div>
      </div>

      <Button
        onClick={handleLaunch}
        disabled={isLaunching}
        size="lg"
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
      >
        <Rocket className="w-5 h-5 mr-2" />
        {isLaunching ? "Launching..." : "🚀 Launch Campaign"}
      </Button>
    </div>
  );
};

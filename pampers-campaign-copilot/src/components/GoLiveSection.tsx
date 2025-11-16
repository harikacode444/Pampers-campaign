import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { ChatResponse } from "@/lib/api";

interface GoLiveSectionProps {
  onGoLive: () => void;
  loading: boolean;
  disabled?: boolean;
  spec?: ChatResponse["spec"] | null;
}

export const GoLiveSection = ({ onGoLive, loading, disabled, spec }: GoLiveSectionProps) => {
  const { toast } = useToast();

  const handleLaunch = async () => {
    if (disabled || loading) return;
    
    try {
      await onGoLive();
      toast({
        title: "Campaign Launched Successfully! 🚀",
        description: "Your campaign is now live and running across all markets.",
        className: "bg-success text-white",
      });
    } catch (err) {
      toast({
        title: "Launch Failed",
        description: err instanceof Error ? err.message : "Failed to launch campaign",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Launch Campaign</h2>
        <p className="text-sm text-muted-foreground">
          Review the final details and launch your campaign to all markets.
        </p>
      </div>

      {spec && (
        <div className="bg-background p-5 rounded-xl mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Campaign Name</p>
              <p className="text-sm font-medium text-foreground">{spec.campaign_name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Markets</p>
              <p className="text-sm font-medium text-foreground">{spec.markets.join(", ")}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Duration</p>
              <p className="text-sm font-medium text-foreground">{spec.duration}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Channels</p>
              <p className="text-sm font-medium text-foreground">{spec.channels.join(", ")}</p>
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={handleLaunch}
        disabled={disabled || loading}
        size="lg"
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
      >
        <Rocket className="w-5 h-5 mr-2" />
        {loading ? "Launching..." : "🚀 Launch Campaign"}
      </Button>
    </div>
  );
};

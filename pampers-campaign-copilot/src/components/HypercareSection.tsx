import { mockHypercare } from "@/lib/mockData";
import { RefreshCw, TrendingUp, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HypercareResponse } from "@/lib/api";

interface HypercareSectionProps {
  onHypercare: () => void;
  loading: boolean;
  disabled?: boolean;
  hypercare?: HypercareResponse | null;
}

export const HypercareSection = ({ onHypercare, loading, disabled, hypercare }: HypercareSectionProps) => {
  const handleRefresh = async () => {
    if (disabled || loading) return;
    await onHypercare();
  };

  // Use real data if available, otherwise fall back to mock
  const displayData = hypercare || {
    stats: {
      sends: 0,
      opens: 0,
      clicks: 0,
      referrals: 0,
      optOuts: 0,
    },
    aiInsights: [],
  };

  // Transform stats to metrics format
  const metrics = [
    {
      label: "Sends",
      value: displayData.stats.sends.toLocaleString(),
      change: "+0%",
    },
    {
      label: "Opens",
      value: displayData.stats.opens.toLocaleString(),
      change: displayData.stats.sends > 0 
        ? `+${Math.round((displayData.stats.opens / displayData.stats.sends) * 100)}%`
        : "+0%",
    },
    {
      label: "Clicks",
      value: displayData.stats.clicks.toLocaleString(),
      change: displayData.stats.opens > 0
        ? `+${Math.round((displayData.stats.clicks / displayData.stats.opens) * 100)}%`
        : "+0%",
    },
    {
      label: "Referrals",
      value: displayData.stats.referrals.toLocaleString(),
      change: "+0%",
    },
    {
      label: "Opt-outs",
      value: displayData.stats.optOuts.toLocaleString(),
      change: "+0%",
    },
  ];

  const insights = displayData.aiInsights.length > 0 
    ? displayData.aiInsights 
    : mockHypercare.insights;

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Hypercare & Performance</h2>
          <p className="text-sm text-muted-foreground">
            Real-time metrics and AI-powered insights for your live campaign.
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={disabled || loading}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Loading..." : "Hypercare"}
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {metrics.slice(0, 3).map((metric, index) => (
          <div key={index} className="bg-background p-5 rounded-xl border border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">{metric.label}</p>
              <TrendingUp className="w-4 h-4 text-success" />
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">{metric.value}</p>
            <p className="text-xs text-success">vs previous day: {metric.change}</p>
          </div>
        ))}
      </div>

      {/* AI Insights */}
      {insights.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-pampers-yellow" />
            AI Insights
          </h3>
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div key={index} className="bg-pampers-yellow/10 p-4 rounded-xl border border-pampers-yellow/20">
                <p className="text-sm text-foreground">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

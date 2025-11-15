import { useState } from "react";
import { mockHypercare } from "@/lib/mockData";
import { RefreshCw, TrendingUp, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HypercareSection = () => {
  const [metrics, setMetrics] = useState(mockHypercare);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);

    // Simulate API call to /api/hypercare/:campaignId
    setTimeout(() => {
      // In a real app, this would update with fresh data from the API
      setMetrics({ ...mockHypercare });
      setIsRefreshing(false);
    }, 1500);
  };

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
          disabled={isRefreshing}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {metrics.metrics.map((metric, index) => (
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
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-pampers-yellow" />
          AI Insights
        </h3>
        <div className="space-y-3">
          {metrics.insights.map((insight, index) => (
            <div key={index} className="bg-pampers-yellow/10 p-4 rounded-xl border border-pampers-yellow/20">
              <p className="text-sm text-foreground">{insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

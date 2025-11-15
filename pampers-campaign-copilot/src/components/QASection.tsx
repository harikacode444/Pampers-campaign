import { mockQa } from "@/lib/mockData";
import { AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "High":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "Medium":
      return "bg-warning/10 text-warning border-warning/20";
    case "Low":
      return "bg-success/10 text-success border-success/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case "High":
      return <AlertCircle className="w-4 h-4" />;
    case "Medium":
      return <AlertTriangle className="w-4 h-4" />;
    case "Low":
      return <CheckCircle2 className="w-4 h-4" />;
    default:
      return null;
  }
};

export const QASection = () => {
  const handleApplyFix = (issueDescription: string) => {
    console.log("Applying fix for:", issueDescription);
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Quality Assurance Report</h2>
          <p className="text-sm text-muted-foreground">
            Automated checks for segments, timing, and compliance.
          </p>
        </div>
        <Badge className="bg-warning/10 text-warning border-warning/20">
          {mockQa.status}
        </Badge>
      </div>

      <div className="space-y-4">
        {mockQa.issues.map((issue, index) => (
          <div key={index} className="bg-background p-5 rounded-xl border border-border">
            <div className="flex items-start gap-4">
              <Badge className={getSeverityColor(issue.severity)}>
                {getSeverityIcon(issue.severity)}
                <span className="ml-1">{issue.severity}</span>
              </Badge>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-2">{issue.description}</p>
                <div className="bg-muted/50 p-3 rounded-lg mb-3">
                  <p className="text-xs text-muted-foreground mb-1">Suggested Fix</p>
                  <p className="text-sm text-foreground">{issue.suggestedFix}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleApplyFix(issue.description)}
                  className="text-xs"
                >
                  Apply Fix
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

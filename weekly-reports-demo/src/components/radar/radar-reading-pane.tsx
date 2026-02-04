import {
  AlertTriangle,
  Clock,
  Folder,
  ExternalLink,
  Users,
  FileText,
  Monitor,
  Calendar,
  Link2,
} from "lucide-react";
import { motion } from "motion/react";
import { springs, fadeVariants } from "../../lib/motion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import type { RadarItem, RadarSeverity, RadarSource } from "../../types/radar";

interface RadarReadingPaneProps {
  item: RadarItem | null;
}

const severityBadgeVariant: Record<
  RadarSeverity,
  "urgent" | "high" | "medium" | "low"
> = {
  critical: "urgent",
  high: "high",
  medium: "medium",
  low: "low",
};

const severityLabels: Record<RadarSeverity, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

const statusLabels: Record<string, string> = {
  new: "New",
  acknowledged: "Acknowledged",
  resolved: "Resolved",
};

const sourceIcons: Record<RadarSource["type"], typeof FileText> = {
  system: Monitor,
  report: FileText,
  external: ExternalLink,
  meeting: Calendar,
};

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function RadarReadingPane({ item }: RadarReadingPaneProps) {
  if (!item) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <AlertTriangle
            className="size-12 mx-auto mb-4 opacity-20"
            strokeWidth={1}
          />
          <p className="text-ui">Select an alert to view details</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      key={item.id}
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      transition={springs.gentle}
      className="flex-1 overflow-y-auto"
    >
      {/* Match exact positioning of reports reading pane */}
      <div
        className="max-w-2xl py-12 px-8 lg:px-12 lg:py-16"
        style={{
          // Center content on viewport, accounting for nav (52px) + sidebar (220px) = 272px
          marginLeft: "calc((100vw - 672px) / 2 - 272px)",
        }}
      >
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant={severityBadgeVariant[item.severity]}>
              {severityLabels[item.severity]}
            </Badge>
            <Badge variant="outline">
              {statusLabels[item.status] ?? item.status}
            </Badge>
          </div>

          <h1 className="text-display font-semibold text-foreground mb-4">
            {item.title}
          </h1>

          <div className="flex items-center gap-4 text-caption text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Folder className="size-3.5" strokeWidth={1.5} />
              <span>{item.category}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="size-3.5" strokeWidth={1.5} />
              <span>{formatDate(item.detectedAt)}</span>
            </div>
          </div>
        </header>

        {/* Description */}
        <section className="mb-10">
          <h2 className="text-caption font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Overview
          </h2>
          <p className="text-body text-foreground leading-relaxed">
            {item.description}
          </p>
        </section>

        {/* Impact */}
        {item.impact && (
          <section className="mb-10">
            <h2 className="text-caption font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Business Impact
            </h2>
            <div className="pl-4 border-l-2 border-accent/30">
              <p className="text-body text-foreground leading-relaxed">
                {item.impact}
              </p>
            </div>
          </section>
        )}

        {/* Stakeholders */}
        {item.stakeholders && item.stakeholders.length > 0 && (
          <section className="mb-10">
            <h2 className="text-caption font-medium text-muted-foreground uppercase tracking-wider mb-4">
              <span className="flex items-center gap-2">
                <Users className="size-3.5" strokeWidth={1.5} />
                People Involved
              </span>
            </h2>
            <div className="flex flex-wrap gap-3">
              {item.stakeholders.map((stakeholder, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/30 border border-border/50"
                >
                  <div className="size-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-xs font-medium text-accent">
                      {stakeholder.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="text-ui font-medium text-foreground">
                      {stakeholder.name}
                    </p>
                    <p className="text-caption text-muted-foreground">
                      {stakeholder.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Sources */}
        {item.sources && item.sources.length > 0 && (
          <section className="mb-10">
            <h2 className="text-caption font-medium text-muted-foreground uppercase tracking-wider mb-4">
              <span className="flex items-center gap-2">
                <Link2 className="size-3.5" strokeWidth={1.5} />
                Sources
              </span>
            </h2>
            <div className="space-y-2">
              {item.sources.map((source, idx) => {
                const SourceIcon = sourceIcons[source.type];
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-ui text-foreground"
                  >
                    <SourceIcon
                      className="size-4 text-muted-foreground"
                      strokeWidth={1.5}
                    />
                    <span>{source.name}</span>
                    <span className="text-caption text-muted-foreground/60 capitalize">
                      ({source.type})
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Legacy source fallback */}
        {!item.sources && item.source && (
          <section className="mb-10">
            <h2 className="text-caption font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Source
            </h2>
            <div className="flex items-center gap-2 text-ui text-foreground">
              <ExternalLink
                className="size-4 text-muted-foreground"
                strokeWidth={1.5}
              />
              <span>{item.source}</span>
            </div>
          </section>
        )}

        {/* Next Steps / Actions */}
        <section className="pt-8 border-t border-border">
          <h2 className="text-caption font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Suggested Next Steps
          </h2>
          <div className="flex flex-wrap gap-3">
            {item.nextSteps && item.nextSteps.length > 0 ? (
              item.nextSteps.map((step, idx) => (
                <Button
                  key={idx}
                  variant={step.action === "primary" ? "default" : "outline"}
                >
                  {step.label}
                </Button>
              ))
            ) : (
              <>
                {item.status === "new" && (
                  <Button variant="default">Acknowledge</Button>
                )}
                {item.status === "acknowledged" && (
                  <Button variant="default">Mark Resolved</Button>
                )}
                <Button variant="outline">View Full Report</Button>
              </>
            )}
          </div>
        </section>

        {/* Footer flourish - matching reports */}
        <div className="mt-20 pt-10 border-t border-border-subtle flex items-center justify-center gap-4">
          <div className="w-8 h-px bg-accent/30" />
          <span className="text-micro text-muted-foreground/50 uppercase tracking-widest">
            End of Alert
          </span>
          <div className="w-8 h-px bg-accent/30" />
        </div>
      </div>
    </motion.div>
  );
}

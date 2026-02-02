import { motion } from "motion/react";
import { Sparkles, User, MessageCircle, Activity, Clock } from "lucide-react";
import { cn } from "../../../../lib/utils";
import { Badge } from "../../../ui/badge";
import { ActivityTimeline } from "../../shared/activity-timeline";
import { springs } from "../../../../lib/motion";
import type { Contact } from "../../../../types/contact";

/**
 * Contact Expanded Content
 *
 * The "pokedex" reveal - detailed contact information that appears
 * when a contact card is expanded. Features beautiful staggered animations
 * and a clear information hierarchy.
 */

interface ContactExpandedContentProps {
  contact: Contact;
}

// Staggered reveal animation for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      ...springs.quick,
    },
  }),
};

// Section header component
function SectionHeader({
  icon: Icon,
  title,
}: {
  icon: typeof Sparkles;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon className="size-3.5 text-accent" />
      <h4 className="text-micro font-semibold text-muted-foreground uppercase tracking-wider">
        {title}
      </h4>
    </div>
  );
}

export function ContactExpandedContent({
  contact,
}: ContactExpandedContentProps) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ ...springs.default, opacity: { duration: 0.2 } }}
      className="overflow-hidden"
    >
      <div className="px-5 pb-5 pt-4 border-t border-border-subtle">
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          {/* Left column - Primary info */}
          <div className="space-y-6">
            {/* AI Summary - The "Pokedex" tagline */}
            <motion.section
              custom={0}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <SectionHeader icon={Sparkles} title="AI Insight" />
              <div className="relative">
                <div className="absolute -left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-transparent rounded-full" />
                <p className="text-body text-foreground leading-relaxed pl-1">
                  {contact.insights.aiSummary}
                </p>
              </div>
            </motion.section>

            {/* Role Badges */}
            <motion.section
              custom={1}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <SectionHeader icon={User} title="Role" />
              <div className="flex flex-wrap gap-1.5">
                {contact.roleBadges.map((badge) => (
                  <Badge
                    key={badge}
                    variant="accent"
                    className="px-2.5 py-1 text-micro"
                  >
                    {badge}
                  </Badge>
                ))}
                {contact.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="px-2.5 py-1 text-micro"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.section>

            {/* Custom Notes */}
            {contact.notes.customSummary && (
              <motion.section
                custom={2}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                <SectionHeader icon={MessageCircle} title="Notes" />
                <p className="text-ui text-muted-foreground leading-relaxed">
                  {contact.notes.customSummary}
                </p>
                {contact.notes.quickFacts &&
                  contact.notes.quickFacts.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {contact.notes.quickFacts.map((fact, i) => (
                        <li
                          key={i}
                          className="text-caption text-muted-foreground/80 flex items-start gap-2"
                        >
                          <span className="text-accent mt-1">•</span>
                          {fact}
                        </li>
                      ))}
                    </ul>
                  )}
              </motion.section>
            )}

            {/* Recent Topics */}
            {contact.recentTopics.length > 0 && (
              <motion.section
                custom={3}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                <SectionHeader icon={MessageCircle} title="Recent Topics" />
                <div className="flex flex-wrap gap-1.5">
                  {contact.recentTopics.map((topic) => (
                    <span
                      key={topic}
                      className={cn(
                        "px-2.5 py-1 rounded-md text-micro",
                        "bg-muted/60 text-muted-foreground",
                        "border border-border-subtle"
                      )}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Right column - Activity & Timing */}
          <div className="space-y-6 lg:border-l lg:border-border-subtle lg:pl-6">
            {/* Activity Timeline */}
            <motion.section
              custom={2}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <SectionHeader icon={Activity} title="Recent Activity" />
              <ActivityTimeline
                interactions={contact.interactions}
                limit={4}
                animated={true}
              />
            </motion.section>

            {/* Timing Info */}
            <motion.section
              custom={3}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <SectionHeader icon={Clock} title="Timing" />
              <div className="space-y-2">
                {contact.insights.bestReachTime && (
                  <div className="flex items-start gap-2">
                    <span className="text-micro text-muted-foreground/60 shrink-0 w-20">
                      Best time
                    </span>
                    <span className="text-micro text-muted-foreground">
                      {contact.insights.bestReachTime}
                    </span>
                  </div>
                )}
                {contact.nextFollowUp && (
                  <div className="flex items-start gap-2">
                    <span className="text-micro text-muted-foreground/60 shrink-0 w-20">
                      Follow up
                    </span>
                    <span
                      className={cn(
                        "text-micro font-medium",
                        contact.nextFollowUp <= new Date()
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-muted-foreground"
                      )}
                    >
                      {contact.nextFollowUp <= new Date()
                        ? "Overdue"
                        : contact.nextFollowUp.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                    </span>
                  </div>
                )}
              </div>
            </motion.section>

            {/* Talking Points */}
            {contact.insights.talkingPoints &&
              contact.insights.talkingPoints.length > 0 && (
                <motion.section
                  custom={4}
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <SectionHeader icon={MessageCircle} title="Talking Points" />
                  <ul className="space-y-1.5">
                    {contact.insights.talkingPoints.map((point, i) => (
                      <li
                        key={i}
                        className="text-micro text-muted-foreground flex items-start gap-2"
                      >
                        <span className="size-1 rounded-full bg-accent mt-1.5 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.section>
              )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

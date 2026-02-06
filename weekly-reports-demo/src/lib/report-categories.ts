import {
  Crown,
  Target,
  Package,
  Code,
  DollarSign,
  type LucideIcon,
} from "lucide-react";
import type { ReportCategory } from "../data/mock-reports";

export interface CategoryConfig {
  label: string;
  icon: LucideIcon;
  color: string;
}

export const CATEGORY_CONFIG: Record<ReportCategory, CategoryConfig> = {
  leadership: { label: "Leadership", icon: Crown, color: "text-purple-500" },
  gtm: { label: "GTM", icon: Target, color: "text-blue-500" },
  product: { label: "Product", icon: Package, color: "text-green-500" },
  engineering: { label: "Engineering", icon: Code, color: "text-orange-500" },
  finance: { label: "Finance", icon: DollarSign, color: "text-amber-500" },
};

export const CATEGORY_ORDER: ReportCategory[] = [
  "leadership",
  "gtm",
  "product",
  "engineering",
  "finance",
];

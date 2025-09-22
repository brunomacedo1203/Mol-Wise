// src/features/shared/events/sessionEngagementEvents.ts

import { event } from "@/lib/gtag";

export const trackSessionStart = ({
  user_type = "anonymous",
  entry_page,
  referrer_source,
}: {
  user_type?: "anonymous" | "returning";
  entry_page?: string;
  referrer_source?: string;
}): void => {
  console.log("[SESSION_ENGAGEMENT_EVENTS] Disparando trackSessionStart:", {
    user_type,
    entry_page,
    referrer_source,
  });

  event("session_start", {
    user_type,
    entry_page,
    referrer_source,
  });
};

export const trackSessionEnd = ({
  session_duration,
  pages_visited,
  interactions_count,
  bounce_rate,
}: {
  session_duration: number; // em segundos
  pages_visited: number;
  interactions_count: number;
  bounce_rate?: boolean;
}): void => {
  console.log("[SESSION_ENGAGEMENT_EVENTS] Disparando trackSessionEnd:", {
    session_duration,
    pages_visited,
    interactions_count,
    bounce_rate,
  });

  event("session_end", {
    session_duration,
    pages_visited,
    interactions_count,
    bounce_rate,
  });
};

export const trackUserEngagement = ({
  engagement_type,
  feature_used,
  time_spent,
  interaction_depth = "low",
}: {
  engagement_type: "feature_usage" | "page_interaction" | "tool_usage" | "content_view";
  feature_used: string;
  time_spent: number; // em segundos
  interaction_depth?: "low" | "medium" | "high";
}): void => {
  console.log("[SESSION_ENGAGEMENT_EVENTS] Disparando trackUserEngagement:", {
    engagement_type,
    feature_used,
    time_spent,
    interaction_depth,
  });

  event("user_engagement", {
    engagement_type,
    feature_used,
    time_spent,
    interaction_depth,
  });
};

export const trackFeatureUsage = ({
  feature_name,
  usage_duration,
  success = true,
  feature_section,
}: {
  feature_name: string;
  usage_duration: number; // em segundos
  success?: boolean;
  feature_section?: string;
}): void => {
  console.log("[SESSION_ENGAGEMENT_EVENTS] Disparando trackFeatureUsage:", {
    feature_name,
    usage_duration,
    success,
    feature_section,
  });

  event("feature_usage", {
    feature_name,
    usage_duration,
    success,
    section: feature_section,
  });
};

export const trackPageEngagement = ({
  page_name,
  time_on_page,
  scroll_depth,
  interactions_count,
}: {
  page_name: string;
  time_on_page: number; // em segundos
  scroll_depth: number; // porcentagem (0-100)
  interactions_count: number;
}): void => {
  console.log("[SESSION_ENGAGEMENT_EVENTS] Disparando trackPageEngagement:", {
    page_name,
    time_on_page,
    scroll_depth,
    interactions_count,
  });

  event("page_engagement", {
    page_name,
    time_on_page,
    scroll_depth,
    interactions_count,
  });
};
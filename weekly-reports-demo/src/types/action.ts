export type ActionType = "meeting" | "email";

export type MatchStatus = "matched" | "suggested" | "manual" | "none";

export interface Participant {
  id: string;
  name: string;
  email: string;
  matchStatus: MatchStatus;
  matchedContactId?: string;
}

interface BaseAction {
  id: string;
  reportId: string;
  title: string;
  status: "pending" | "completed" | "skipped";
}

export interface MeetingAction extends BaseAction {
  type: "meeting";
  meetingName: string;
  description: string;
  participants: Participant[];
  calendarConnected: boolean;
}

export interface EmailAction extends BaseAction {
  type: "email";
  subject: string;
  message: string;
  recipients: Participant[];
}

export type Action = MeetingAction | EmailAction;

// Type guards for narrowing
export function isMeetingAction(action: Action): action is MeetingAction {
  return action.type === "meeting";
}

export function isEmailAction(action: Action): action is EmailAction {
  return action.type === "email";
}

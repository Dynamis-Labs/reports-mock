import { create } from "zustand";
import type {
  Action,
  MeetingAction,
  EmailAction,
  Participant,
  MatchStatus,
} from "../types/action";

interface ReviewActionsState {
  // Modal state
  isOpen: boolean;
  actions: Action[];
  currentIndex: number;

  // Draft state for editing without committing
  draftAction: Action | null;

  // Navigation direction for animations
  direction: number;

  // Actions
  openModal: (actions: Action[]) => void;
  closeModal: () => void;
  goToNext: () => void;
  goToPrevious: () => void;

  // Draft mutations
  updateDraft: (updates: Partial<Action>) => void;
  addParticipant: (participant: Participant) => void;
  removeParticipant: (participantId: string) => void;
  updateParticipantMatch: (participantId: string, status: MatchStatus) => void;
  confirmParticipant: (participantId: string) => void;

  // Action completion
  markCompleted: () => void;
  skipAction: () => void;

  // Computed
  currentAction: () => Action | null;
  remainingCount: () => number;
}

export const useReviewActionsStore = create<ReviewActionsState>((set, get) => ({
  isOpen: false,
  actions: [],
  currentIndex: 0,
  draftAction: null,
  direction: 0,

  openModal: (actions) => {
    const pendingActions = actions.filter((a) => a.status === "pending");
    const firstAction = pendingActions[0] ?? null;
    set({
      isOpen: true,
      actions: pendingActions,
      currentIndex: 0,
      draftAction: firstAction ? { ...firstAction } : null,
      direction: 0,
    });
  },

  closeModal: () =>
    set({
      isOpen: false,
      draftAction: null,
      direction: 0,
    }),

  goToNext: () => {
    const { actions, currentIndex, draftAction } = get();
    if (currentIndex >= actions.length - 1) return;

    // Save current draft back to actions before moving
    const updatedActions = draftAction
      ? actions.map((a, i) => (i === currentIndex ? { ...draftAction } : a))
      : actions;

    const nextIndex = currentIndex + 1;
    set({
      actions: updatedActions,
      currentIndex: nextIndex,
      draftAction: { ...updatedActions[nextIndex] },
      direction: 1,
    });
  },

  goToPrevious: () => {
    const { actions, currentIndex, draftAction } = get();
    if (currentIndex <= 0) return;

    // Save current draft back to actions before moving
    const updatedActions = draftAction
      ? actions.map((a, i) => (i === currentIndex ? { ...draftAction } : a))
      : actions;

    const prevIndex = currentIndex - 1;
    set({
      actions: updatedActions,
      currentIndex: prevIndex,
      draftAction: { ...updatedActions[prevIndex] },
      direction: -1,
    });
  },

  updateDraft: (updates) => {
    const { draftAction } = get();
    if (!draftAction) return;
    set({ draftAction: { ...draftAction, ...updates } as Action });
  },

  addParticipant: (participant) => {
    const { draftAction } = get();
    if (!draftAction) return;

    if (draftAction.type === "meeting") {
      set({
        draftAction: {
          ...draftAction,
          participants: [...draftAction.participants, participant],
        } as MeetingAction,
      });
    } else {
      set({
        draftAction: {
          ...draftAction,
          recipients: [...draftAction.recipients, participant],
        } as EmailAction,
      });
    }
  },

  removeParticipant: (participantId) => {
    const { draftAction } = get();
    if (!draftAction) return;

    if (draftAction.type === "meeting") {
      set({
        draftAction: {
          ...draftAction,
          participants: draftAction.participants.filter(
            (p) => p.id !== participantId,
          ),
        } as MeetingAction,
      });
    } else {
      set({
        draftAction: {
          ...draftAction,
          recipients: draftAction.recipients.filter(
            (p) => p.id !== participantId,
          ),
        } as EmailAction,
      });
    }
  },

  updateParticipantMatch: (participantId, status) => {
    const { draftAction } = get();
    if (!draftAction) return;

    const updateParticipants = (participants: Participant[]) =>
      participants.map((p) =>
        p.id === participantId ? { ...p, matchStatus: status } : p,
      );

    if (draftAction.type === "meeting") {
      set({
        draftAction: {
          ...draftAction,
          participants: updateParticipants(draftAction.participants),
        } as MeetingAction,
      });
    } else {
      set({
        draftAction: {
          ...draftAction,
          recipients: updateParticipants(draftAction.recipients),
        } as EmailAction,
      });
    }
  },

  confirmParticipant: (participantId) => {
    const { draftAction } = get();
    if (!draftAction) return;

    const confirmInList = (participants: Participant[]) =>
      participants.map((p) =>
        p.id === participantId ? { ...p, matchStatus: "matched" as const } : p,
      );

    if (draftAction.type === "meeting") {
      set({
        draftAction: {
          ...draftAction,
          participants: confirmInList(draftAction.participants),
        } as MeetingAction,
      });
    } else {
      set({
        draftAction: {
          ...draftAction,
          recipients: confirmInList(draftAction.recipients),
        } as EmailAction,
      });
    }
  },

  markCompleted: () => {
    const { actions, currentIndex, draftAction } = get();
    if (!draftAction) return;

    const completedAction: Action = { ...draftAction, status: "completed" };
    const updatedActions = actions.map((a, i) =>
      i === currentIndex ? completedAction : a,
    );

    // Move to next pending action or close
    const nextPendingIndex = updatedActions.findIndex(
      (a, i) => i > currentIndex && a.status === "pending",
    );

    if (nextPendingIndex === -1) {
      // No more pending actions
      set({
        actions: updatedActions,
        isOpen: false,
        draftAction: null,
      });
    } else {
      set({
        actions: updatedActions,
        currentIndex: nextPendingIndex,
        draftAction: { ...updatedActions[nextPendingIndex] },
        direction: 1,
      });
    }
  },

  skipAction: () => {
    const { actions, currentIndex, draftAction } = get();
    if (!draftAction) return;

    const skippedAction: Action = { ...draftAction, status: "skipped" };
    const updatedActions = actions.map((a, i) =>
      i === currentIndex ? skippedAction : a,
    );

    // Move to next pending action or close
    const nextPendingIndex = updatedActions.findIndex(
      (a, i) => i > currentIndex && a.status === "pending",
    );

    if (nextPendingIndex === -1) {
      // No more pending actions
      set({
        actions: updatedActions,
        isOpen: false,
        draftAction: null,
      });
    } else {
      set({
        actions: updatedActions,
        currentIndex: nextPendingIndex,
        draftAction: { ...updatedActions[nextPendingIndex] },
        direction: 1,
      });
    }
  },

  currentAction: () => {
    const { draftAction } = get();
    return draftAction;
  },

  remainingCount: () => {
    const { actions } = get();
    return actions.filter((a) => a.status === "pending").length;
  },
}));

import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { Mic, Paperclip, ArrowUp } from "lucide-react";
import { useChatboxStore } from "../../stores/chatbox-store";
import { springs } from "../../lib/motion";
import { cn } from "../../lib/utils";
import { ChatMessage } from "./chat-message";
import { ThinkingIndicator } from "./thinking-indicator";

const HEIGHTS = {
  collapsed: 52,
  expanded: 52,
  chat: 420,
};

export function AskSentraChatbox() {
  const {
    state,
    messages,
    inputValue,
    isTyping,
    loadingPhase,
    loadingContext,
    expand,
    collapse,
    setInputValue,
    sendMessage,
  } = useChatboxStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (state === "chat") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, state]);

  // Focus input when expanding
  useEffect(() => {
    if (state === "expanded") {
      inputRef.current?.focus();
    }
  }, [state]);

  // Handle click outside - works from ANY non-collapsed state
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        collapse();
      }
    }

    if (state !== "collapsed") {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [state, collapse]);

  // Handle escape key - works from ANY non-collapsed state
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && state !== "collapsed") {
        collapse();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [state, collapse]);

  const handleInputClick = useCallback(() => {
    if (state === "collapsed") {
      expand();
    }
  }, [state, expand]);

  const handleSubmit = useCallback(() => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
    }
  }, [inputValue, sendMessage]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  const content = (
    <motion.div
      ref={containerRef}
      initial={{ height: HEIGHTS.collapsed, opacity: 0, y: 20 }}
      animate={{
        height: HEIGHTS[state],
        opacity: 1,
        y: 0,
      }}
      transition={springs.default}
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
        "w-[min(640px,calc(100vw-48px))]",
        "bg-surface-elevated border border-border shadow-float",
        "flex flex-col justify-end overflow-hidden",
        // Dynamic border-radius: pill when collapsed/expanded, rounded when chat
        state === "chat" ? "rounded-3xl" : "rounded-full",
      )}
      role="dialog"
      aria-expanded={state !== "collapsed"}
      aria-label="Ask Sentra chat"
    >
      {/* Chat Mode: Messages area */}
      <AnimatePresence>
        {state === "chat" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 overflow-y-auto p-4 space-y-3"
          >
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                message={message}
                isLatest={index === messages.length - 1}
              />
            ))}
            {isTyping && messages[messages.length - 1]?.role === "user" && (
              <ThinkingIndicator
                phase={loadingPhase}
                context={loadingContext}
              />
            )}
            <div ref={messagesEndRef} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input area */}
      <div
        className={cn(
          "flex items-center h-[52px] shrink-0 px-5 gap-3",
          state === "chat" && "border-t border-border-subtle",
        )}
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onClick={handleInputClick}
          onKeyDown={handleKeyDown}
          placeholder={
            state === "chat" ? "Type a message..." : "Ask Sentra anything..."
          }
          style={{ outline: "none", boxShadow: "none" }}
          className={cn(
            "flex-1 bg-transparent text-ui text-foreground",
            "placeholder:text-muted-foreground/50",
            "[&:focus]:outline-none [&:focus]:ring-0 [&:focus]:border-none",
            "outline-none ring-0 border-none",
          )}
        />

        {/* Collapsed: arrow submit button */}
        {state === "collapsed" && (
          <button
            className="flex items-center justify-center size-8 rounded-full bg-muted text-white hover:bg-muted/80 transition-colors shrink-0"
            aria-label="Submit"
          >
            <ArrowUp className="size-4" strokeWidth={2} />
          </button>
        )}

        {/* Expanded/Chat: action buttons */}
        {state !== "collapsed" && (
          <div className="flex items-center gap-1">
            <button
              className={cn(
                "px-2 py-1 rounded-lg text-muted-foreground",
                "hover:bg-muted hover:text-white transition-colors",
              )}
              aria-label="Auto"
            >
              <span className="text-caption font-medium">Auto</span>
            </button>
            <button
              className={cn(
                "p-1.5 rounded-lg text-muted-foreground",
                "hover:bg-muted hover:text-white transition-colors",
              )}
              aria-label="Attach file"
            >
              <Paperclip className="size-4" strokeWidth={1.5} />
            </button>
            <button
              className={cn(
                "p-1.5 rounded-lg text-muted-foreground",
                "hover:bg-muted hover:text-white transition-colors",
              )}
              aria-label="Voice input"
            >
              <Mic className="size-4" strokeWidth={1.5} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );

  return createPortal(content, document.body);
}

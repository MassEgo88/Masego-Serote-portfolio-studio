import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().max(100).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email").max(255),
});

export function NewsletterForm({
  source = "footer",
  variant = "inline",
}: {
  source?: string;
  variant?: "inline" | "stacked";
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error" | "duplicate">(
    "idle",
  );
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ name, email });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || "Invalid input");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setError("");
    const { error: insertError } = await supabase.from("newsletter_subscribers").insert({
      name: parsed.data.name || null,
      email: parsed.data.email.toLowerCase(),
      source,
    });
    if (insertError) {
      if (insertError.code === "23505" || insertError.message.toLowerCase().includes("duplicate")) {
        setStatus("duplicate");
        return;
      }
      setStatus("error");
      setError(insertError.message);
      return;
    }
    setStatus("success");
    setName("");
    setEmail("");
  }

  if (status === "success") {
    return (
      <p className="text-sm text-primary">
        ✓ You're on the list — thanks for subscribing.
      </p>
    );
  }
  if (status === "duplicate") {
    return (
      <p className="text-sm text-muted-foreground">
        You're already subscribed with that email. Thank you!
      </p>
    );
  }

  const input =
    "bg-background border border-border rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors flex-1 min-w-0";

  return (
    <form
      onSubmit={onSubmit}
      className={
        variant === "inline"
          ? "flex flex-col sm:flex-row gap-2 items-stretch"
          : "flex flex-col gap-2"
      }
    >
      <input
        type="text"
        placeholder="Your name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={input}
        aria-label="Name"
      />
      <input
        type="email"
        required
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={input}
        aria-label="Email address"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-primary text-primary-foreground rounded-sm px-5 py-3 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap"
      >
        {status === "submitting" ? "…" : "Subscribe"}
      </button>
      {status === "error" && (
        <p className="text-xs text-destructive sm:basis-full">{error}</p>
      )}
    </form>
  );
}

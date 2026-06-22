import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  job_title: z.string().trim().max(150).optional().or(z.literal("")),
  subject: z.string().trim().min(2, "Subject is required").max(200),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
  consent: z.literal(true, { errorMap: () => ({ message: "You must agree before submitting" }) }),
  // honeypot — must be empty
  website: z.string().max(0).optional().or(z.literal("")),
});

type FormState = z.infer<typeof schema>;

const initial: FormState = {
  full_name: "",
  email: "",
  company: "",
  job_title: "",
  subject: "",
  message: "",
  consent: true as const,
  website: "",
};

export function ContactForm() {
  const [values, setValues] = useState<Record<string, string | boolean>>({ ...initial, consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const set = (k: string, v: string | boolean) => setValues((p) => ({ ...p, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setErrorMessage("");
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        fieldErrors[i.path[0] as string] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }
    // Honeypot tripped silently
    if (parsed.data.website) {
      setStatus("success");
      return;
    }
    setStatus("submitting");
    const { error } = await supabase.from("contact_submissions").insert({
      full_name: parsed.data.full_name,
      email: parsed.data.email,
      company: parsed.data.company || null,
      job_title: parsed.data.job_title || null,
      subject: parsed.data.subject,
      message: parsed.data.message,
      consent: parsed.data.consent,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
    });
    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }
    setStatus("success");
    setValues({ ...initial, consent: false });
  }

  if (status === "success") {
    return (
      <div className="rounded-sm border border-border bg-card p-8">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Thank you</p>
        <h3 className="font-display text-3xl mb-3">Message received.</h3>
        <p className="text-muted-foreground">
          I'll get back to you at the email you provided as soon as I can. In the meantime, feel
          free to ping me on WhatsApp or LinkedIn.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-primary hover:underline"
        >
          Send another message →
        </button>
      </div>
    );
  }

  const input =
    "w-full bg-background border border-border rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors";

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        value={values.website as string}
        onChange={(e) => set("website", e.target.value)}
        aria-hidden
      />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name *" error={errors.full_name}>
          <input
            className={input}
            value={values.full_name as string}
            onChange={(e) => set("full_name", e.target.value)}
            required
          />
        </Field>
        <Field label="Email *" error={errors.email}>
          <input
            type="email"
            className={input}
            value={values.email as string}
            onChange={(e) => set("email", e.target.value)}
            required
          />
        </Field>
        <Field label="Company (optional)" error={errors.company}>
          <input
            className={input}
            value={values.company as string}
            onChange={(e) => set("company", e.target.value)}
          />
        </Field>
        <Field label="Job title (optional)" error={errors.job_title}>
          <input
            className={input}
            value={values.job_title as string}
            onChange={(e) => set("job_title", e.target.value)}
          />
        </Field>
      </div>
      <Field label="Subject *" error={errors.subject}>
        <input
          className={input}
          value={values.subject as string}
          onChange={(e) => set("subject", e.target.value)}
          required
        />
      </Field>
      <Field label="Message *" error={errors.message}>
        <textarea
          className={`${input} min-h-32 resize-y`}
          value={values.message as string}
          onChange={(e) => set("message", e.target.value)}
          required
        />
      </Field>
      <label className="flex items-start gap-3 text-xs text-muted-foreground">
        <input
          type="checkbox"
          checked={Boolean(values.consent)}
          onChange={(e) => set("consent", e.target.checked)}
          className="mt-0.5"
        />
        <span>
          I agree that the information above will be stored so Masego can respond to my message
          (GDPR/POPIA). It won't be shared or used for marketing.
        </span>
      </label>
      {errors.consent && <p className="text-xs text-destructive">{errors.consent}</p>}
      {status === "error" && (
        <p className="text-xs text-destructive">Something went wrong: {errorMessage}</p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Send message →"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
        {label}
      </span>
      {children}
      {error && <span className="block text-xs text-destructive mt-1">{error}</span>}
    </label>
  );
}

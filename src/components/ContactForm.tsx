"use client";

import { useSearchParams } from "next/navigation";
import { useId, useRef, useState } from "react";
import { SITE } from "@/lib/content";

const TYPES = ["Studio rental", "Set building", "Studio rental and set building", "Something else"];
const DURATIONS = ["Half day (5 hours)", "Full day (10 hours)", "More than one day", "Not sure yet"];

type Fields = { name: string; email: string; phone: string; type: string; date: string; duration: string; details: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "sent" | "error" | "mailto";

/** If set, enquiries POST as JSON to this URL (e.g. a Formspree or Resend-backed endpoint). */
const ENDPOINT = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (f.phone && !/^[+\d][\d\s()-]{6,}$/.test(f.phone.trim())) e.phone = "Use digits, spaces and + only.";
  if (f.date) {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (new Date(f.date) < today) e.date = "Choose today or a later date.";
  }
  if (f.details.trim().length < 10) e.details = "Tell us a little about the shoot (10+ characters).";
  return e;
}

export function ContactForm() {
  const uid = useId();
  const initialType = useSearchParams().get("type") ?? undefined;
  const [f, setF] = useState<Fields>({
    name: "", email: "", phone: "", date: "", duration: DURATIONS[3], details: "",
    type: TYPES.includes(initialType ?? "") ? initialType! : TYPES[0],
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");
  const summary = useRef<HTMLDivElement>(null);

  const set = (k: keyof Fields) => (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setF((p) => ({ ...p, [k]: ev.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const body = () =>
    [`Name: ${f.name}`, `Email: ${f.email}`, `Phone: ${f.phone || "-"}`, `Enquiry type: ${f.type}`,
      `Preferred date: ${f.date || "Flexible"}`, `Preferred duration: ${f.duration}`, "", f.details].join("\n");

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate(f);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    if (!ENDPOINT) {
      // No delivery service configured: hand off to the visitor's mail client. Nothing is sent from here.
      const href = `mailto:${SITE.email}?subject=${encodeURIComponent(`Studio enquiry: ${f.type}`)}&body=${encodeURIComponent(body())}`;
      window.location.href = href;
      setStatus("mailto");
      return;
    }
    setStatus("sending"); setServerMsg("");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...f, _subject: `Studio enquiry: ${f.type}` }),
      });
      if (!res.ok) throw new Error(`The server answered ${res.status}.`);
      setStatus("sent");
    } catch (err) {
      setServerMsg(err instanceof Error ? err.message : "Network error.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="border border-line p-8 md:p-12">
        <p className="eyebrow !text-accent">Enquiry received</p>
        <h2 className="display h-md mt-4">Thank you, {f.name.split(" ")[0]}.</h2>
        <p className="lede mt-4">We have your enquiry and will reply to {f.email}.</p>
      </div>
    );
  }

  const fieldProps = (k: keyof Fields) => ({
    id: `${uid}-${k}`, name: k, value: f[k], onChange: set(k),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${uid}-${k}-err` : undefined,
    className: "input",
  });
  const err = (k: keyof Fields) =>
    errors[k] ? <p id={`${uid}-${k}-err`} className="err" role="alert">{errors[k]}</p> : null;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-x-10 gap-y-8 md:grid-cols-2" aria-busy={status === "sending"}>
      <div className="field"><label htmlFor={`${uid}-name`}>Name *</label>
        <input {...fieldProps("name")} type="text" autoComplete="name" required />{err("name")}</div>
      <div className="field"><label htmlFor={`${uid}-email`}>Email *</label>
        <input {...fieldProps("email")} type="email" autoComplete="email" inputMode="email" required />{err("email")}</div>
      <div className="field"><label htmlFor={`${uid}-phone`}>Phone</label>
        <input {...fieldProps("phone")} type="tel" autoComplete="tel" inputMode="tel" />{err("phone")}</div>
      <div className="field"><label htmlFor={`${uid}-type`}>Enquiry type</label>
        <select {...fieldProps("type")}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select></div>
      <div className="field"><label htmlFor={`${uid}-date`}>Preferred shoot date</label>
        <input {...fieldProps("date")} type="date" />{err("date")}</div>
      <div className="field"><label htmlFor={`${uid}-duration`}>Preferred duration</label>
        <select {...fieldProps("duration")}>{DURATIONS.map((t) => <option key={t}>{t}</option>)}</select></div>
      <div className="field md:col-span-2"><label htmlFor={`${uid}-details`}>Project details *</label>
        <textarea {...fieldProps("details")} rows={5} placeholder="What are you shooting, how many people, and what do you need on set?" required />
        {err("details")}</div>

      <div className="md:col-span-2" ref={summary}>
        <button type="submit" className="btn btn-primary btn-block-sm" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : ENDPOINT ? "Send enquiry" : "Email enquiry"} <span className="arrow" aria-hidden>→</span>
        </button>
        {!ENDPOINT && status !== "mailto" && (
          <p className="mt-4 text-sm text-muted">This opens your email app with the enquiry filled in. Nothing is sent until you press send there.</p>
        )}
        {status === "mailto" && (
          <p role="status" className="mt-4 text-sm text-paper">
            Your email app should now be open with the enquiry ready. If nothing opened, write to{" "}
            <a className="ulink text-accent" href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="err mt-4">
            We could not send your enquiry. {serverMsg} Please try again, or email{" "}
            <a className="ulink" href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        )}
      </div>
    </form>
  );
}

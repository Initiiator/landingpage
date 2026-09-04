"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EASE } from "@/components/animations";

/* ════════════════════════════════════════════════════════════════════════
   LOCATION SELECT

   A custom combobox rather than a native <select>: a native one can't be
   styled to match the rest of the form, and on mobile it hands off to an OS
   picker that looks nothing like the page.

   Boroughs, not "Central London", because the launch question is *where* in
   the pilot city someone is — "Central London" doesn't say whether to start in
   Camden or Westminster. Boroughs are also exhaustive: everyone in London has
   exactly one, so nobody hits a missing option the way they would with a
   neighbourhood list (Peckham would be there, Nunhead wouldn't).

   The selection is mirrored into a hidden input so it rides along in the
   FormData the form already posts. Validation is the parent's job — browsers
   ignore `required` on a hidden input.
   ════════════════════════════════════════════════════════════════════════ */

export const LOCATION_GROUPS: { label: string; options: string[] }[] = [
  {
    label: "Central London",
    options: ["Camden", "City of London", "Islington", "Kensington and Chelsea", "Westminster"],
  },
  {
    label: "North London",
    options: ["Barnet", "Brent", "Enfield", "Haringey", "Harrow"],
  },
  {
    label: "East London",
    options: [
      "Barking and Dagenham",
      "Hackney",
      "Havering",
      "Newham",
      "Redbridge",
      "Tower Hamlets",
      "Waltham Forest",
    ],
  },
  {
    label: "South London",
    options: [
      "Bexley",
      "Bromley",
      "Croydon",
      "Greenwich",
      "Kingston upon Thames",
      "Lambeth",
      "Lewisham",
      "Merton",
      "Richmond upon Thames",
      "Southwark",
      "Sutton",
      "Wandsworth",
    ],
  },
  {
    label: "West London",
    options: ["Ealing", "Hammersmith and Fulham", "Hillingdon", "Hounslow"],
  },
  {
    label: "Not in London",
    options: ["Elsewhere in the UK", "Outside the UK"],
  },
];

export function LocationSelect({
  name,
  value,
  onChange,
  invalid = false,
  placeholder = "Select your area",
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  invalid?: boolean;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Filter inside groups so the headings stay meaningful while searching.
  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LOCATION_GROUPS;
    return LOCATION_GROUPS.map((g) => ({
      label: g.label,
      options: g.options.filter((o) => o.toLowerCase().includes(q)),
    })).filter((g) => g.options.length > 0);
  }, [query]);

  // Flat list drives keyboard navigation across group boundaries.
  const flat = useMemo(() => groups.flatMap((g) => g.options), [groups]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    if (open) searchRef.current?.focus();
    else setQuery("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Keep the highlighted row in view when arrowing through a long list.
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  function choose(option: string) {
    onChange(option);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (flat[active]) choose(flat[active]);
    }
  }

  const border = invalid
    ? "border-[rgba(210,58,0,0.55)]"
    : open
      ? "border-[rgba(255,90,0,0.4)]"
      : "border-[rgba(0,0,0,0.06)]";

  return (
    <div ref={rootRef} className="relative" onKeyDown={onKeyDown}>
      {/* The value the form actually posts. */}
      <input type="hidden" name={name} value={value} />

      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between gap-[12px] rounded-[12px] bg-[#f9f6f2] border ${border} px-[18px] h-[clamp(46px,5vw,52px)] text-left outline-none transition-colors cursor-pointer`}
      >
        <span
          className={`font-['Poppins:Regular',sans-serif] text-body truncate ${
            value ? "text-[#1a1a1a]" : "text-[rgba(26,26,26,0.4)]"
          }`}
        >
          {value || placeholder}
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="size-[18px] shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="#ff5a00"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: EASE }}
            className="absolute z-50 mt-[6px] w-full rounded-[12px] bg-white border border-[rgba(0,0,0,0.08)] shadow-[0_18px_44px_rgba(0,0,0,0.14)] overflow-hidden"
          >
            <div className="p-[10px] border-b border-[rgba(0,0,0,0.06)]">
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search area…"
                aria-label="Search areas"
                className="w-full rounded-[8px] bg-[#f9f6f2] border border-[rgba(0,0,0,0.06)] px-[12px] h-[38px] font-['Poppins:Regular',sans-serif] text-sm text-[#1a1a1a] placeholder:text-[rgba(26,26,26,0.4)] outline-none focus:border-[rgba(255,90,0,0.4)]"
              />
            </div>

            <div ref={listRef} role="listbox" className="max-h-[240px] overflow-y-auto py-[6px]">
              {flat.length === 0 && (
                <p className="px-[16px] py-[12px] font-['Poppins:Regular',sans-serif] text-sm text-[rgba(26,26,26,0.5)]">
                  No areas match that search.
                </p>
              )}

              {groups.map((group) => (
                <div key={group.label}>
                  <p className="px-[16px] pt-[10px] pb-[4px] font-['Poppins:SemiBold',sans-serif] text-[11px] tracking-[0.08em] uppercase text-[rgba(26,26,26,0.4)]">
                    {group.label}
                  </p>
                  {group.options.map((option) => {
                    const i = flat.indexOf(option);
                    const selected = option === value;
                    return (
                      <button
                        key={option}
                        type="button"
                        role="option"
                        aria-selected={selected}
                        data-index={i}
                        onPointerEnter={() => setActive(i)}
                        onClick={() => choose(option)}
                        className={`w-full text-left px-[16px] py-[9px] font-['Poppins:Regular',sans-serif] text-body transition-colors ${
                          i === active ? "bg-[rgba(255,90,0,0.08)]" : "bg-transparent"
                        } ${selected ? "text-[#ff5a00]" : "text-[#1a1a1a]"}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

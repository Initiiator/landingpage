import type { ReactNode } from "react";

/**
 * initiiator design-system button — the orange→amber gradient pill used for
 * every primary CTA across the landing page. Styling lives in the `.btn-brand`
 * component class (see src/styles/theme.css), so the gradient/shadow are
 * defined in exactly one place.
 *
 * `size`:
 *   - "md": standard text button (hero, navbar, download)
 *   - "icon": square 74px icon button (section accents)
 */
export function Button({
  children,
  href = "#",
  size = "md",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  size?: "md" | "icon";
  className?: string;
}) {
  const sizeClasses =
    size === "icon"
      ? "size-[74.496px] rounded-[20px] p-[18px]"
      : "h-[55px] px-[28px] py-[14px] text-[16px] whitespace-nowrap";

  return (
    <a href={href} className={`btn-brand ${sizeClasses} ${className}`} data-name="Button">
      {children}
    </a>
  );
}

import { Link } from "react-router-dom";

interface LogoProps {
  variant?: "full" | "mark";
  className?: string;
  tagline?: boolean;
  asLink?: boolean;
}

/**
 * Brand mark: a single stylized matcha leaf inside a thin circle.
 * Used everywhere — header, footer, favicon, packaging mockups.
 */
export const BrandMark = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1" />
    {/* central leaf */}
    <path
      d="M16 7c-3.2 2.4-5 5.3-5 8.2 0 2.7 1.6 4.6 5 6.8 3.4-2.2 5-4.1 5-6.8 0-2.9-1.8-5.8-5-8.2z"
      fill="currentColor"
    />
    {/* leaf vein */}
    <path d="M16 9.5v12" stroke="hsl(var(--background))" strokeWidth="0.6" strokeLinecap="round" />
  </svg>
);

const Logo = ({ variant = "full", className = "", tagline = true, asLink = true }: LogoProps) => {
  const content = (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      <BrandMark className="w-7 h-7 text-primary transition-transform duration-500 group-hover:rotate-[15deg]" />
      {variant === "full" && (
        <div className="flex flex-col items-start leading-none">
          <span className="font-heading text-lg md:text-xl font-semibold tracking-[0.22em] text-foreground">
            YOURMATCHA
          </span>
          {tagline && (
            <span className="hidden md:block mt-1 text-[8px] tracking-[0.45em] uppercase text-muted-foreground">
              Premium · Japan
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (!asLink) return content;
  return (
    <Link to="/" aria-label="YourMatcha home">
      {content}
    </Link>
  );
};

export default Logo;

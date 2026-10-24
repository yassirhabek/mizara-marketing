export function Container({
  children,
  className = "",
  size = "wide",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "wide" | "text";
}) {
  const max = size === "text" ? "max-w-3xl" : "max-w-7xl";
  return <div className={`mx-auto w-full ${max} px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

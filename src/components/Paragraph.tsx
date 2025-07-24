export function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-raleway text-base text-text mb-3 leading-relaxed">
      {children}
    </p>
  );
}
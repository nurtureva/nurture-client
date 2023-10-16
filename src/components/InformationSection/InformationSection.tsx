export const InformationSection: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) => {
  return (
    <section className={`bg-green information-section ${className}`}>
      {children}
    </section>
  );
};

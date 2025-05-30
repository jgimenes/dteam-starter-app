type FooterProps = {
  children?: React.ReactNode;
};
export const Header = ({ children, ...rest }: FooterProps) => {
  return (
    <header className="flex" {...rest}>
      {children}
    </header>
  );
};

import { Header } from '@/components/header/header';

type PageLayoutProps = {
  children?: React.ReactNode;
};
export const PageLayout = ({ children, ...rest }: PageLayoutProps) => {
  return (
    <div className="flex h-full w-full" {...rest}>
      <Header></Header>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
};

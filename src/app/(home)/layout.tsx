import { Navbar } from "@/modules/home/ui/components/navbar";
interface Props {
    children: React.ReactNode;
  }
  
  const Layout = ({ children }: Props) => {
    return (
      <main className="relative min-h-screen">
        <Navbar />
        <div
          className="fixed inset-0 -z-10 h-full w-full bg-background 
          dark:bg-[radial-gradient(#171717_1px,transparent_1px)] 
          bg-[radial-gradient(#dadde2_1px,transparent_1px)] 
          [background-size:16px_16px]"
        />
        <div className="relative pt-16">
          {children}
        </div>
      </main>
    );
  };
  
  export default Layout;
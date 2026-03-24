import { AuthContextProvider } from "./_utils/auth-context";
 
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContextProvider>
        {children}
    </AuthContextProvider>
  );
};
 
export default Layout;
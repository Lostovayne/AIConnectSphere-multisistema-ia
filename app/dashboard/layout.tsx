import { JSX } from "react";

const LayoutDashboard = ({ children }: { children: JSX.Element }) => {
  return <div className="h-screen bg-ref-200 relative">{children}</div>;
};
export default LayoutDashboard;

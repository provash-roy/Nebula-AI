import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div>sidebar</div>
      <div>{children}</div>
    </div>
  );
}

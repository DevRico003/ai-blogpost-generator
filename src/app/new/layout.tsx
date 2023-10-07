import React from "react";
export const metadata = {
  title: "New post | Bloggify",
  description:
    "NextJS template with TypeScript, TailwindCSS, and MongoDB.",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
import { ReactNode } from 'react';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return <section className="flex w-full flex-1 flex-col">{children}</section>;
}

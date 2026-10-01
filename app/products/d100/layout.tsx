import type {Metadata} from 'next';

export const metadata: Metadata = {title: 'D100 drone SoC · DeepGrid Semi'};

export default function Layout({children}: {children: React.ReactNode}) {
  return children;
}

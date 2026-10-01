import type {Metadata} from 'next';

export const metadata: Metadata = {title: 'Source document · DeepGrid Semi'};

export default function Layout({children}: {children: React.ReactNode}) {
  return children;
}

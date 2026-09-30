import type {Metadata} from 'next';

// The page itself is a client component, so its title is set here, in the static HTML.
export const metadata: Metadata = {title: 'Evidence · DeepGrid Semi'};

export default function Layout({children}: {children: React.ReactNode}) {
  return children;
}

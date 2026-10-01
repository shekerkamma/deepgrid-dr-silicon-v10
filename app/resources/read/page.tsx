'use client';

import {Shell} from '../../shell';
import DocReader from '../../doc-reader';
import Related from '../../related';

export default function Page() {
  return (
    <Shell route="read">
      <div className="page-wrap"><DocReader/><Related route="read"/></div>
    </Shell>
  );
}

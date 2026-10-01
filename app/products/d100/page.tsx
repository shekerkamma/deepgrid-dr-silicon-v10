'use client';

import {Shell} from '../../shell';
import ProductPageView from '../../product-page';
import Related from '../../related';

export default function Page() {
  return (
    <Shell route="d100">
      <div className="page-wrap"><ProductPageView slug="d100"/><Related route="d100"/></div>
    </Shell>
  );
}

'use client';

import {Shell} from '../../shell';
import ProductPageView from '../../product-page';
import Related from '../../related';

export default function Page() {
  return (
    <Shell route="sku7">
      <div className="page-wrap"><ProductPageView slug="sku-7"/><Related route="sku7"/></div>
    </Shell>
  );
}

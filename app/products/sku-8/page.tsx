'use client';

import {Shell} from '../../shell';
import ProductPageView from '../../product-page';
import Related from '../../related';

export default function Page() {
  return (
    <Shell route="sku8">
      <div className="page-wrap"><ProductPageView slug="sku-8"/><Related route="sku8"/></div>
    </Shell>
  );
}

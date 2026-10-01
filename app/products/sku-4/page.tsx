'use client';

import {Shell} from '../../shell';
import ProductPageView from '../../product-page';
import Related from '../../related';

export default function Page() {
  return (
    <Shell route="sku4">
      <div className="page-wrap"><ProductPageView slug="sku-4"/><Related route="sku4"/></div>
    </Shell>
  );
}

'use client';

import {Shell} from '../../shell';
import ProductPageView from '../../product-page';
import Related from '../../related';

export default function Page() {
  return (
    <Shell route="sku3">
      <div className="page-wrap"><ProductPageView slug="sku-3"/><Related route="sku3"/></div>
    </Shell>
  );
}

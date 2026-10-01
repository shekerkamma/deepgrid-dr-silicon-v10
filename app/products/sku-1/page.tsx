'use client';

import {Shell} from '../../shell';
import ProductPageView from '../../product-page';
import Related from '../../related';

export default function Page() {
  return (
    <Shell route="sku1">
      <div className="page-wrap"><ProductPageView slug="sku-1"/><Related route="sku1"/></div>
    </Shell>
  );
}

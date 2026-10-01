'use client';

import {Shell} from '../../shell';
import ProductPageView from '../../product-page';
import Related from '../../related';

export default function Page() {
  return (
    <Shell route="sku6">
      <div className="page-wrap"><ProductPageView slug="sku-6"/><Related route="sku6"/></div>
    </Shell>
  );
}

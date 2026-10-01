'use client';

import {Shell} from '../../shell';
import ProductPageView from '../../product-page';
import Related from '../../related';

export default function Page() {
  return (
    <Shell route="sku2">
      <div className="page-wrap"><ProductPageView slug="sku-2"/><Related route="sku2"/></div>
    </Shell>
  );
}

'use client';

import {Shell} from '../../shell';
import ProductPageView from '../../product-page';
import Related from '../../related';

export default function Page() {
  return (
    <Shell route="sku9">
      <div className="page-wrap"><ProductPageView slug="sku-9"/><Related route="sku9"/></div>
    </Shell>
  );
}

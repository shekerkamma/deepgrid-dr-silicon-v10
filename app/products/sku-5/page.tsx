'use client';

import {Shell} from '../../shell';
import ProductPageView from '../../product-page';
import Related from '../../related';

export default function Page() {
  return (
    <Shell route="sku5">
      <div className="page-wrap"><ProductPageView slug="sku-5"/><Related route="sku5"/></div>
    </Shell>
  );
}

import type { Product } from "@common/types";
import { Image } from "@components/image";

export interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div className="row">
      <div className="col-12 col-sm-5 col-lg-4">
        <Image />
      </div>
      <div className="col-12 col-sm-7 col-lg-6">
        <p>{product.description}</p>
        <p className="fs-3">${product.price}</p>
        <p>
          <button className="btn btn-primary btn-lg">Add to Cart</button>
        </p>
        <dl>
          <dt>Color</dt>
          <dd className="text-capitalize">{product.color}</dd>
          <dt>Material</dt>
          <dd className="text-capitalize">{product.material}</dd>
        </dl>
      </div>
    </div>
  );
};

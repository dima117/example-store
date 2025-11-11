import { addToCart, useAppDispatch } from '@/store';
import type { Product } from '@common/types';
import { Image } from '@components/image';
import { useCallback } from 'react';

interface ProductDetailsProps {
    product: Product;
}

/** компонент отображения подробной информации о товаре */
export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const dispatch = useAppDispatch();

    const onClick = useCallback(() => {
        dispatch(addToCart(product));
    }, [dispatch, product]);

    return (
        <div className="row">
            <div className="col-12 col-sm-5 col-lg-4">
                <Image />
            </div>
            <div className="col-12 col-sm-7 col-lg-6">
                <p>{product.description}</p>
                <p className="fs-3">${product.price}</p>
                <p>
                    <button className="btn btn-primary btn-lg" onClick={onClick}>
                        Add to Cart
                    </button>
                </p>
                <dl>
                    <dt>Color</dt>
                    <dd className="text-capitalize">{product.color}</dd>
                    <dt>Material</dt>
                    <dd className="text-capitalize">{product.material}</dd>
                </dl>
                <p>{product.fullDescription}</p>
            </div>
        </div>
    );
};

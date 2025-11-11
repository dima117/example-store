import { useCallback, type FC } from 'react';
import { Link } from 'react-router';

import { Image } from '@components/image';
import type { ProductShortInfo } from '@common/types';
import { addToCart, useAppDispatch } from '@/store';

interface ProductItemProps {
    product: ProductShortInfo;
}

/** компонент карточки товара в каталоге */
export const ProductItem: FC<ProductItemProps> = ({ product }) => {
    const dispatch = useAppDispatch();

    const onClick = useCallback(() => {
        dispatch(addToCart(product));
    }, [dispatch, product]);

    return (
        <div data-testid="product-list-item" className="card w-100 mb-4">
            <Image className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title">
                    <Link to={`/catalog/${product.id}`} data-testid="name">
                        {product.name}
                    </Link>
                </h5>
                <div className="row">
                    <div className="col">
                        <span className="fs-3">${product.price}</span>
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-outline-primary" onClick={onClick}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

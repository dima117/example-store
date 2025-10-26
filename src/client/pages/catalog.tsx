import type { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../../common/types";
import axios from "axios";

interface ProductItemProps {
  product: Product;
}

export const ProductItem: FC<ProductItemProps> = ({ product }) => {
  return <div>{product.name}</div>;
};

export const Catalog: FC = () => {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: [],
    queryFn: async () => {
      return (await axios.get<Product[]>("/api/products")).data;
    },
  });

  if (isLoading || !data) {
    return "Loading...";
  }

  if (error) {
    return error.message;
  }

  const content = data.map((p) => <ProductItem key={p.id} product={p} />);

  return <div className="catalog">{content}</div>;
};

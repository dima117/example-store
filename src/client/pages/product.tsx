import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { useParams } from "react-router";

import type { Product as ProductInfo } from "@common/types";
import axios from "axios";
import { ProductDetails } from "@components/product-details";
import { PageTitle } from "@/components/page-title";

export const Product: FC = () => {
  let { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["details", id],
    queryFn: async () => {
      return (await axios.get<ProductInfo>(`/api/products/${id}`)).data;
    },
  });

  if (isLoading || !data) {
    return "Loading...";
  }

  if (error) {
    return error.message;
  }

  return (
    <>
      <title>{data.name}</title>
      <PageTitle>{data.name}</PageTitle>
      <ProductDetails product={data} />
    </>
  );
};

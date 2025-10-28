import type { FC } from "react";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import type { ProductShortInfo } from "@common/types";
import { ProductItem } from "@components/product-item";
import { PageTitle } from "@/components/page-title";

export const Catalog: FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return (await axios.get<ProductShortInfo[]>("/api/products")).data;
    },
  });

  if (isLoading || !data) {
    return "Loading...";
  }

  if (error) {
    return error.message;
  }

  const content = data.map((p) => (
    <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
      <ProductItem product={p} />
    </div>
  ));

  return (
    <>
      <title>Catalog — Example Store</title>
      <PageTitle>Catalog</PageTitle>
      <div className="row">{content}</div>
    </>
  );
};

import { useCallback, type FC } from "react";
import { PageTitle } from "@/components/page-title";
import { CheckoutForm } from "@/components/checkout-form";
import { clearCart, checkout, useAppDispatch, useAppSelector } from "@/store";
import { formatDate } from "@/utils";
import { Link } from "react-router";
import type { CheckoutFormData } from "@/types";
import { DocumentTitle } from "@/components/document-title";

/** страница корзины с формой оформления заказа */
export const Cart: FC = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((s) => s.cart);
  const lastOrder = useAppSelector((s) => s.lastOrder);

  const onClear = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const onSubmit = useCallback(
    (form: CheckoutFormData) => {
      dispatch(checkout({ form, cart }));
    },
    [dispatch, cart]
  );

  let content: React.ReactNode = null;
  let lastOrderInfo: React.ReactNode = null;

  const cartIsEmpty = !Object.values(cart).some((i) => i.count > 0);
  
  if (cartIsEmpty && lastOrder) {
    const orderDate = formatDate(new Date(lastOrder.createdAt));
    lastOrderInfo = (
      <div className="alert alert-success mb-4" role="alert">
        {orderDate} был оформлен заказ №{lastOrder.id} на сумму ${lastOrder.totalAmount}
      </div>
    );
  }

  if (!cartIsEmpty) {
    const rows = Object.entries(cart).map(([id, item], index) => {
      return (
        <tr key={id} data-testid={id}>
          <th scope="row">{index + 1}</th>
          <td>{item.name}</td>
          <td>${item.price}</td>
          <td>{item.count}</td>
          <td>${item.count * item.price}</td>
        </tr>
      );
    });

    const total = Object.values(cart).reduce(
      (sum, { count, price }) => sum + count * price,
      0
    );

    content = (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Count</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>Order price:</td>
            <td>${total}</td>
          </tr>
        </tfoot>
      </table>
    );
  } else {
    content = (
      <>
        Cart is empty. Please select products in the{" "}
        <Link to="/catalog">catalog</Link>.
      </>
    );
  }

  const actions = cartIsEmpty ? null : (
    <div className="row mb-4">
      <div className="col-6">
        <button className="btn btn-outline-secondary" onClick={onClear}>
          Clear shopping cart
        </button>
      </div>
    </div>
  );

  const form = cartIsEmpty ? null : (
    <div className="row">
      <div className="col-12 col-sm-8 col-md-6 col-lg-4">
        <h2>Сheckout</h2>
        <CheckoutForm onSubmit={onSubmit} />
      </div>
    </div>
  );

  return (
    <>
      <DocumentTitle text="Shopping cart" />
      <div className="row">
        <div className="col-6">
          <PageTitle>Shopping cart</PageTitle>
          {lastOrderInfo}
          <div data-testid="content">{content}</div>
        </div>
      </div>
      {actions}
      {form}
    </>
  );
};

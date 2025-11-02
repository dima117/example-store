import type { CheckoutFormData } from "@/types";
import { useCallback, useState, type ChangeEvent, type FC } from "react";

const PHONE_REGEX = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
}

function getControlClass(isValid: boolean, submitted: boolean) {
  return !isValid && submitted ? "form-control is-invalid" : "form-control";
}

/** форма оформления заказа */
export const CheckoutForm: FC<CheckoutFormProps> = ({ onSubmit }) => {
  const [sent, setSent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const nameIsValid = Boolean(name.trim());
  const phoneIsValid = PHONE_REGEX.test(phone.trim());
  const addressIsValid = Boolean(address.trim());

  const onChangeName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    [setName]
  );

  const onChangePhone = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPhone(e.target.value);
    },
    [setPhone]
  );

  const onChangeAddress = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setAddress(e.target.value);
    },
    [setAddress]
  );

  const onClick = useCallback(() => {
    setSubmitted(true);

    if (nameIsValid && phoneIsValid && addressIsValid) {
      setSent(true);
      onSubmit({
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
      });
    }
  }, [
    nameIsValid,
    phoneIsValid,
    addressIsValid,
    setSubmitted,
    setSent,
    onSubmit,
    name,
    phone,
    address,
  ]);

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="f-name" className="form-label">
          Name
        </label>
        <input
          id="f-name"
          type="text"
          disabled={sent}
          className={getControlClass(nameIsValid, submitted)}
          autoComplete="off"
          onChange={onChangeName}
          value={name}
        />
        <div className="invalid-feedback">Please provide your name</div>
      </div>
      <div className="mb-3">
        <label htmlFor="f-phone" className="form-label">
          Phone
        </label>
        <input
          id="f-phone"
          type="text"
          disabled={sent}
          className={getControlClass(phoneIsValid, submitted)}
          onChange={onChangePhone}
          value={phone}
        />
        <div className="invalid-feedback">Please provide a valid phone</div>
      </div>
      <div className="mb-3">
        <label htmlFor="f-address" className="form-label">
          Address
        </label>
        <textarea
          id="f-address"
          disabled={sent}
          rows={3}
          className={getControlClass(addressIsValid, submitted)}
          onChange={onChangeAddress}
          value={address}
        ></textarea>
        <div className="invalid-feedback">Please provide a valid address</div>
      </div>

      <button className="btn btn-primary" disabled={sent} onClick={onClick}>
        Checkout
      </button>
    </div>
  );
};

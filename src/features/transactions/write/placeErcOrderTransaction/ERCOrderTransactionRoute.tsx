import { Button, Heading, Input } from "@components";
import { Loader } from "@components/Loader";
import { Assets, USDC, WBTC } from "@contracts/assets";
import { ApproveTransaction } from "@features/transactions/components/ApproveTransaction";
import { useCheckAllowanceAmount } from "@features/transactions/hooks/useCheckAllowanceAmount";
import { usePlaceERCOrder } from "@features/transactions/hooks/usePlaceERCOrder";
import {
  defaultBuyAmount,
  defaultSaleAmount,
  FormErrors,
  Option,
  TokenAmount,
} from "@features/transactions/write/placeErcOrderTransaction/types/ercOrderTxTypes";
import {
  type SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Select, { type SingleValue } from "react-select";
import { type Address, formatUnits, parseUnits } from "viem";

export default function ERCOrderTransactionRoute() {
  const [isApprovalPending, setIsApprovalPending] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({
    buyAmount: undefined,
    saleAmount: undefined,
  });

  // TODO: remove this and formErrors state after adding form library
  const hasFormErrors = useMemo(
    () =>
      formErrors.buyAmount !== undefined || formErrors.saleAmount !== undefined,
    [formErrors]
  );

  const [sellingToken, setSellingToken] = useState<Address>(USDC.address);
  const [saleAmount, setSaleAmount] = useState(defaultSaleAmount);
  const [buyingToken, setBuyingToken] = useState<Address>(WBTC.address);
  const [buyAmount, setBuyAmount] = useState<TokenAmount>(defaultBuyAmount);

  const { isOrderConfirmed, isOrderPending, placeERCOrder } =
    usePlaceERCOrder();

  const { allowance, isAllowanceLoading } =
    useCheckAllowanceAmount(sellingToken);

  const shouldRenderApproveButton = useMemo(
    () => (!allowance || allowance < saleAmount.amount) && !isAllowanceLoading,
    [allowance, isAllowanceLoading, saleAmount.amount]
  );

  const isFormDisabled = useMemo(
    () => isApprovalPending || isOrderPending || isAllowanceLoading,
    [isApprovalPending, isOrderPending, isAllowanceLoading]
  );

  const options: Option[] = Assets.map((asset) => ({
    value: asset.address,
    label: asset.symbol,
  }));

  const setTokenToSwap = useCallback(
    (address: Address) =>
      Assets.filter((asset) => asset.address !== address)[0].address,
    []
  );

  const getTokenDecimalUnits = useCallback(
    (token: Address) =>
      Assets.find((asset) => asset.address === token)?.decimals ?? 0,
    []
  );

  const handleSetSellToken = useCallback(
    (option: SingleValue<Option>) => {
      if (!option?.value) return null;
      setSellingToken(option.value);
      setBuyingToken(setTokenToSwap(option.value));
    },
    [setTokenToSwap]
  );

  const handleSetBuyToken = useCallback(
    (option: SingleValue<Option>) => {
      if (!option?.value) return null;
      setBuyingToken(option.value);
      setSellingToken(setTokenToSwap(option.value));
    },
    [setTokenToSwap]
  );

  const handleSetSaleAmount = useCallback(
    (amount: string) => {
      if (formErrors.saleAmount) {
        setFormErrors((errors) => ({ ...errors, saleAmount: undefined }));
      }

      const units = getTokenDecimalUnits(sellingToken);
      return setSaleAmount({ amount: parseUnits(amount, units), units });
    },
    [sellingToken, formErrors.saleAmount, getTokenDecimalUnits]
  );

  const handleSetBuyAmount = useCallback(
    (amount: string) => {
      if (formErrors.buyAmount) {
        setFormErrors((errors) => ({ ...errors, buyAmount: undefined }));
      }

      const units = getTokenDecimalUnits(buyingToken);
      return setBuyAmount({ amount: parseUnits(amount, units), units });
    },
    [buyingToken, formErrors.buyAmount, getTokenDecimalUnits]
  );

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      // TODO: replace with form library
      if (!buyAmount.amount)
        setFormErrors((errors) => ({
          ...errors,
          buyAmount: "Buy amount cannot be 0",
        }));
      if (!saleAmount.amount)
        setFormErrors((errors) => ({
          ...errors,
          saleAmount: "Sale amount cannot be 0",
        }));
      if (!saleAmount.amount || !buyAmount.amount) {
        throw new Error("You are missing some data!");
      }

      await placeERCOrder({
        sellingToken,
        saleAmount: saleAmount.amount,
        buyingToken,
        buyAmount: buyAmount.amount,
      });
    },
    [sellingToken, saleAmount, buyingToken, buyAmount, placeERCOrder]
  );

  const clearForm = useCallback(() => {
    setSaleAmount(defaultSaleAmount);
    setBuyAmount(defaultBuyAmount);
  }, []);

  useEffect(() => {
    if (isOrderConfirmed) {
      clearForm();
    }
  }, [clearForm, isOrderConfirmed]);

  return (
    <>
      {isFormDisabled ? <Loader /> : null}
      {/* TODO: turn this into a modal that launches from submit button */}
      {shouldRenderApproveButton ? (
        <ApproveTransaction
          tokenAddress={sellingToken}
          amount={saleAmount.amount}
          setIsApprovalPending={setIsApprovalPending}
        />
      ) : null}
      <Heading>Place ERC Order</Heading>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <div>
          <label htmlFor="sellingToken">Sell Token</label>
          <Select
            required
            options={options}
            name="sellingToken"
            aria-label="selling token"
            placeholder="selling token"
            value={options.find((option) =>
              sellingToken ? option.value === sellingToken : null
            )}
            onChange={(option) => handleSetSellToken(option)}
            isDisabled={isFormDisabled}
            styles={{
              menuList: (baseStyles, _) => ({
                ...baseStyles,
                color: "black",
              }),
            }}
          />
        </div>
        <div>
          <label htmlFor="saleAmount">Sale Amount</label>
          <div>
            <Input
              title="tokenAmount"
              required
              name="saleAmount"
              type="number"
              min={0}
              step="any"
              aria-label="sale amount"
              placeholder="sale amount"
              value={formatUnits(saleAmount.amount, saleAmount.units)}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                handleSetSaleAmount(e.currentTarget.value)
              }
              disabled={isFormDisabled}
            />
          </div>
          <p style={{ color: "red", marginTop: "4px", marginBottom: "0px" }}>
            {formErrors.saleAmount ? formErrors.saleAmount : null}
          </p>
        </div>
        <div>
          <label htmlFor="buyingToken">Buy Token</label>
          <Select
            required
            options={options}
            name="buyingToken"
            aria-label="buying token"
            placeholder="buying token"
            value={options.find((option) =>
              buyingToken ? option.value === buyingToken : null
            )}
            onChange={(option) => handleSetBuyToken(option)}
            isDisabled={isFormDisabled}
            styles={{
              menuList: (baseStyles, _) => ({
                ...baseStyles,
                color: "black",
              }),
            }}
          />
        </div>
        <div>
          <label htmlFor="buyAmount">Buy Amount</label>
          <div>
            <Input
              required
              title="tokenAmount"
              name="buyAmount"
              type="number"
              min={0}
              step="any"
              aria-label="buy amount"
              placeholder="buy amount"
              value={formatUnits(buyAmount.amount, buyAmount.units)}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                handleSetBuyAmount(e.currentTarget.value)
              }
              disabled={isFormDisabled}
            />
          </div>
          <p style={{ color: "red", marginTop: "4px", marginBottom: "0px" }}>
            {formErrors.buyAmount ? formErrors.buyAmount : null}
          </p>
        </div>
        <div style={{ textAlign: "right", marginTop: "1rem" }}>
          <Button type="submit" disabled={isOrderPending || hasFormErrors}>
            Submit
          </Button>
        </div>
        <h3>{isOrderPending ? "Order is pending..." : null}</h3>
      </form>
    </>
  );
}

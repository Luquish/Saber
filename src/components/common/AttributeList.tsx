import { Percent, Price, Token, TokenAmount } from "@saberhq/token-utils";
import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import { startCase } from "lodash-es";
import React from "react";
import tw from "twin.macro";

import { formatPercent } from "../../utils/format";
import { NamedAddressLink } from "./account/NamedAddressLink";
import { AddressLink } from "./AddressLink";
import { DisplayValue } from "./DisplayValue";
import { LoadingSpinner } from "./LoadingSpinner";
import { TokenAmountDisplay } from "./TokenAmountDisplay";

interface Props {
  className?: string;
  loading?: boolean;
  attributes: Record<string, unknown>;
  rowStyles?: React.CSSProperties;
  labelStyles?: React.CSSProperties;
  valueStyles?: React.CSSProperties;
  transformLabel?: boolean;
}

export const AttributeList: React.FC<Props> = ({
  className,
  loading = true,
  attributes,
  rowStyles,
  labelStyles,
  valueStyles,
  transformLabel = true,
}: Props) => {
  return (
    <div tw="flex flex-col text-sm" className={className}>
      {Object.entries(attributes).map(([label, attribute], i) => (
        <div
          tw="flex justify-between items-center px-6 py-2 gap-4"
          css={[i !== 0 && tw`border-t dark:border-warmGray-800`]}
          key={label}
          style={rowStyles}
        >
          <div
            tw="text-secondary dark:text-gray-400 font-semibold"
            style={labelStyles}
          >
            {transformLabel ? startCase(label) : label}
          </div>
          <div tw="font-medium" style={valueStyles}>
            {attribute === undefined ? (
              loading ? (
                <LoadingSpinner />
              ) : (
                "(undefined)"
              )
            ) : attribute === null ? (
              "(null)"
            ) : attribute instanceof Date ? (
              attribute.getTime() === 0 ? (
                "never"
              ) : (
                attribute.toLocaleString()
              )
            ) : attribute instanceof PublicKey ? (
              <AddressLink address={attribute} showCopy />
            ) : typeof attribute === "object" &&
              "_bn" in (attribute as Record<string, unknown>) ? (
              <AddressLink
                address={new PublicKey((attribute as PublicKey).toString())}
                showCopy
              />
            ) : attribute instanceof TokenAmount ? (
              <TokenAmountDisplay showIcon amount={attribute} />
            ) : attribute instanceof Token ? (
              <NamedAddressLink address={attribute.mintAccount} showCopy>
                {attribute.name}
              </NamedAddressLink>
            ) : attribute instanceof Price ? (
              <>
                {attribute.asFraction.toFixed(3)}{" "}
                {attribute.quoteCurrency.symbol} /{" "}
                {attribute.baseCurrency.symbol}
              </>
            ) : attribute instanceof Percent ||
              (typeof attribute === "object" &&
                (attribute as Record<string, unknown>)?.isPercent) ? (
              formatPercent(attribute as Percent)
            ) : typeof attribute === "string" ? (
              attribute
            ) : typeof attribute === "number" ? (
              attribute.toLocaleString()
            ) : typeof attribute === "boolean" ? (
              attribute.toLocaleString()
            ) : BN.isBN(attribute) ? (
              attribute.toString()
            ) : Array.isArray(attribute) ? (
              attribute.length === 0 ? (
                "(empty)"
              ) : (
                <div tw="flex flex-col gap-2">
                  {(attribute as PublicKey[]).map((at, i) => (
                    <DisplayValue key={i} value={at} />
                  ))}
                </div>
              )
            ) : Buffer.isBuffer(attribute) ? (
              attribute.toString("hex")
            ) : // eslint-disable-next-line @typescript-eslint/ban-types
            React.isValidElement(attribute as {} | null | undefined) ? (
              (attribute as React.ReactNode)
            ) : (
              "unknown"
              // (attribute as React.ReactNode)
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

import { formatNumberWithCommas } from "../utils/format";

interface IntegerProps {
  value: number;
}

export const Integer = ({ value }: IntegerProps) => {
  return (
    <>
      {formatNumberWithCommas(value)}
    </>
  )
}
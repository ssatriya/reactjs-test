import useInvoiceStore from "@/hooks/useInvoiceStore";
import { getCurrentDate } from "@/lib/utils";

export default function Invoice() {
  const { invoiceDetail } = useInvoiceStore();

  const total =
    invoiceDetail?.itemData.reduce((accu, item) => {
      // Convert itemAmount to a number and add it to the accumulator
      return accu + parseFloat(item.itemAmount);
    }, 0) ?? 0; // Default to 0 if invoiceDetail is null

  return (
    <div className="flex max-w-[700px] flex-col bg-slate-900 mx-auto p-3 rounded-md">
      <div className="flex flex-col items-end w-full space-y-4">
        <span className="text-2xl font-bold">INVOICE</span>
        <div>
          <span>{getCurrentDate()}</span>
        </div>
      </div>
      <div className="flex flex-col items-start mt-4">
        {invoiceDetail?.itemData.map((inv, idx) => (
          <div
            key={idx}
            className="grid w-full grid-cols-4 p-2 mb-2 rounded-md bg-slate-800"
          >
            <span className="text-left">{inv.itemDescription}</span>
            <span>{inv.itemQuantity}</span>
            <span>{inv.itemRate}</span>
            <span>{inv.itemAmount}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-end p-3 rounded-md bg-slate-800">
        <div className="flex justify-end gap-8">
          <span>Total</span>
          <span>{total}</span>
        </div>
      </div>
    </div>
  );
}

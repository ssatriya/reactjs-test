import { create } from "zustand";

interface InvoiceItem {
  invoiceNumber: string;
  itemData: {
    itemDescription: string;
    itemQuantity: string;
    itemRate: string;
    itemAmount: string;
  }[];
}

interface InvoiceStoreState {
  invoiceDetail: InvoiceItem | null;
  setInvoice: (invoice: InvoiceItem) => void;
}

const useInvoiceStore = create<InvoiceStoreState>()((set) => ({
  invoiceDetail: null,
  setInvoice: (item) => set(() => ({ invoiceDetail: item })),
}));

export default useInvoiceStore;

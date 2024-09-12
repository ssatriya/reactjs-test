import { create } from "zustand";

import { FormField } from "@/lib/type";

interface FormStoreState {
  formFields: FormField[];
  saveFormFields: (fields: FormField[]) => void;
  clearFormFields: () => void;
}

const useFormStore = create<FormStoreState>()((set) => ({
  formFields: [],
  saveFormFields: (form) => set(() => ({ formFields: form })),
  clearFormFields: () => set(() => ({ formFields: [] })),
}));

export default useFormStore;

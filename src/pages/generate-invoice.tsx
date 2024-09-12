import { InputInvoiceSchema, InputInvoiceType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import useInvoiceStore from "@/hooks/useInvoiceStore";
import { useNavigate } from "react-router-dom";

export default function GenerateInvoice() {
  const navigate = useNavigate();
  const { setInvoice } = useInvoiceStore();

  const form = useForm<InputInvoiceType>({
    resolver: zodResolver(InputInvoiceSchema),
    defaultValues: {
      invoiceNumber: "",
      itemData: [
        {
          itemDescription: "",
          itemQuantity: "",
          itemRate: "",
          itemAmount: "",
        },
      ],
    },
  });

  const { control, watch, handleSubmit, setValue, getValues } = form;

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "itemData",
  });

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.itemData) {
        value.itemData.forEach((item, index) => {
          const qty = Number(item?.itemQuantity) || 0;
          const rate = Number(item?.itemRate) || 0;
          const totalAmount = qty * rate;
          const currentAmount = Number(
            getValues(`itemData.${index}.itemAmount`)
          );

          if (currentAmount !== totalAmount) {
            setValue(`itemData.${index}.itemAmount`, String(totalAmount), {
              shouldValidate: false,
            });
          }
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (values: InputInvoiceType) => {
    setInvoice(values);
    navigate("/invoice");
  };

  return (
    <div className="container p-4 mx-auto rounded-md bg-slate-700">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-6"
          id="invoice-form"
        >
          <FormField
            control={control}
            name="invoiceNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invoice Number</FormLabel>
                <FormControl>
                  <Input placeholder="PSA1119923" type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {fields.map((field, index) => {
            return (
              <Card key={field.id} className="flex items-center">
                <CardContent className="flex items-end w-full gap-4 p-8">
                  <div className="flex justify-between w-full gap-8">
                    <div className="w-full">
                      <FormField
                        control={control}
                        name={`itemData.${index}.itemDescription`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Mineral water"
                                type="text"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full">
                      <FormField
                        control={control}
                        name={`itemData.${index}.itemQuantity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                              <Input placeholder="2" type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full">
                      <FormField
                        control={control}
                        name={`itemData.${index}.itemRate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rate</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="12"
                                type="number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full">
                      <FormField
                        control={control}
                        name={`itemData.${index}.itemAmount`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="24"
                                type="number"
                                readOnly
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="default"
                    onClick={() => remove(index)}
                    disabled={index === 0}
                  >
                    <TrashIcon />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() =>
              append({
                itemDescription: "",
                itemQuantity: "",
                itemRate: "",
                itemAmount: "",
              })
            }
          >
            <PlusIcon />
          </Button>
        </form>
      </Form>
      <Button type="submit" form="invoice-form" className="mt-10">
        Submit
      </Button>
    </div>
  );
}

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui"
import { Button, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "../../ui"
import { AddressStepSchema, addressStepSchema } from "../MultiStepForm.types"

interface AddressFormProps {
  onSubmit: (values: AddressStepSchema) => void
  defaultValues: AddressStepSchema
  onBack: () => void
  onExit: () => void
}

export const AddressForm = (
  { onSubmit, onBack, onExit, defaultValues }: AddressFormProps
) => {
  const form = useForm<AddressStepSchema>({
    resolver: zodResolver(addressStepSchema),
    defaultValues
  })


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <span>Address</span>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="zip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip</FormLabel>
              <FormControl>
                <Input placeholder="Zip" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button
            type="button"
            variant="destructive"
            onClick={onExit}
          >
            exit
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onBack}
          >
            back
          </Button>
          <Button type="submit">next</Button>
        </div>
      </form>
    </Form>
  )
}
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui"
import { Button, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "../../ui"
import { PetDataStepSchema, petDataStepSchema } from "../MultiStepForm.types"

interface PetDataStepProps {
  onSubmit: (values: PetDataStepSchema) => void
  defaultValues: PetDataStepSchema
  onBack: () => void
  onExit: () => void
}

export const PetDataForm = (
  { onSubmit, onExit, onBack, defaultValues }: PetDataStepProps
) => {
  const form = useForm<PetDataStepSchema>({
    resolver: zodResolver(petDataStepSchema),
    defaultValues
  })


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <span>Pet Data</span>

        <FormField
          control={form.control}
          name="petName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pet Name</FormLabel>
              <FormControl>
                <Input placeholder="Pet Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="petAge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pet Age</FormLabel>
              <FormControl>
                <Input placeholder="Pet Age" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="petIdNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pet ID Number</FormLabel>
              <FormControl>
                <Input placeholder="Pet ID Number" {...field} />
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
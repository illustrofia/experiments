import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui"
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "../../ui"
import {
  ContactInfoStepSchema,
  contactInfoStepSchema,
} from "../MultiStepForm.types"
import { useForm } from "react-hook-form"

interface ContactInfoFormProps {
  onSubmit: (values: ContactInfoStepSchema) => void
  defaultValues: ContactInfoStepSchema
  onBack: () => void
  onExit: () => void
}

export const ContactInfoForm = ({
  onSubmit,
  onExit,
  defaultValues,
}: ContactInfoFormProps) => {
  const form = useForm<ContactInfoStepSchema>({
    resolver: zodResolver(contactInfoStepSchema),
    defaultValues,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <span>Contact Info</span>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="button" variant="destructive" onClick={onExit}>
            exit
          </Button>
          <Button type="submit">next</Button>
        </div>
      </form>
    </Form>
  )
}

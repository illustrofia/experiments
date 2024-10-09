import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMachine } from "@xstate/react"
import { useForm } from "react-hook-form"
import { multiStepFormMachine } from "./MultiStepForm.machine"
import {
  addressStepSchema,
  AddressStepSchema,
  contactInfoStepSchema,
  ContactInfoStepSchema,
  petDataStepSchema,
  PetDataStepSchema,
} from "./MultiStepForm.types"

export const ContactInfoStep = () => {
  const [snapshot, send] = useMachine(multiStepFormMachine)

  const form = useForm<ContactInfoStepSchema>({
    resolver: zodResolver(contactInfoStepSchema),
    defaultValues: snapshot.context.data.contactInfoStep,
  })

  const onSubmit = (values: ContactInfoStepSchema) => {
    console.log({ values })
    send({
      type: "contactInfoStep.next",
      data: values,
    })
  }

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
          {/* <Button
            type="button"
            variant="destructive"
            onClick={() => send({ type: "exit" })}
          >
            exit
          </Button> */}
          <Button type="submit">next</Button>
        </div>
      </form>
    </Form>
  )
}

export const AddressStep = () => {
  const [snapshot, send] = useMachine(multiStepFormMachine)
  const form = useForm<AddressStepSchema>({
    resolver: zodResolver(addressStepSchema),
    defaultValues: snapshot.context.data.addressStep,
  })

  const onSubmit = (values: AddressStepSchema) => {
    send({
      type: "addressStep.next",
      data: values,
    })
  }

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
          {/* <Button
            type="button"
            variant="destructive"
            onClick={() => send({ type: "exit" })}
          >
            exit
          </Button> */}
          <Button
            type="button"
            variant="secondary"
            onClick={() => send({ type: "back" })}
          >
            back
          </Button>
          <Button type="submit">next</Button>
        </div>
      </form>
    </Form>
  )
}

export const PetDataStep = () => {
  const [snapshot, send] = useMachine(multiStepFormMachine)
  const form = useForm<PetDataStepSchema>({
    resolver: zodResolver(petDataStepSchema),
    defaultValues: snapshot.context.data.petDataStep,
  })

  const onSubmit = (values: PetDataStepSchema) => {
    send({
      type: "petDataStep.next",
      data: values,
    })
  }

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
          {/* <Button
            type="button"
            variant="destructive"
            onClick={() => send({ type: "exit" })}
          >
            exit
          </Button> */}
          <Button
            type="button"
            variant="secondary"
            onClick={() => send({ type: "back" })}
          >
            back
          </Button>
          <Button type="submit">next</Button>
        </div>
      </form>
    </Form>
  )
}

export const ReviewDataStep = () => {
  const [snapshot] = useMachine(multiStepFormMachine)

  return (
    <div className="space-y-4">
      <span>Review Data</span>

      <div className="space-y-4">
        <div className="space-y-2">
          <span>Contact Info</span>
          <div className="flex flex-col gap-1 text-green-300">
            <span>Name: {snapshot.context.data.contactInfoStep.name}</span>
            <span>Email: {snapshot.context.data.contactInfoStep.email}</span>
          </div>
        </div>

        <div className="space-y-2">
          <span>Address</span>
          <div className="flex flex-col gap-1 text-green-300">
            <span>Address: {snapshot.context.data.addressStep.address}</span>
            <span>City: {snapshot.context.data.addressStep.city}</span>
            <span>Zip: {snapshot.context.data.addressStep.zip}</span>
          </div>
        </div>

        <div className="space-y-2">
          <span>Pet Data</span>
          <div className="flex flex-col gap-1 text-green-300">
            <span>Pet Name: {snapshot.context.data.petDataStep.petName}</span>
            <span>Pet Age: {snapshot.context.data.petDataStep.petAge}</span>
            <span>
              Pet ID Number: {snapshot.context.data.petDataStep.petIdNumber}
            </span>
          </div>
        </div>
      </div>

      {/* <div className="flex gap-4">
        <Button
          type="button"
          variant="destructive"
          onClick={() => send({ type: "back" })}
        >
          back
        </Button>
        <Button onClick={() => send({ type: "submit" })}>submit</Button>
      </div> */}
    </div>
  )
}

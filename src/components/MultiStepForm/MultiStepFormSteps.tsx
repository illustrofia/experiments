import { Button, Form } from "@/components"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMachine } from "@xstate/react"
import {
  addressStepSchema,
  AddressStepSchema,
  contactInfoStepSchema,
  ContactInfoStepSchema,
  petDataStepSchema,
  PetDataStepSchema,
} from "./MultiStepForm.types"
import { multiStepFormMachine } from "./MultiStepForm.machine"

export const ContactInfoStep = () => {
  const [snapshot, send] = useMachine(multiStepFormMachine)

  const form = useForm<ContactInfoStepSchema>({
    resolver: zodResolver(contactInfoStepSchema),
    defaultValues: snapshot.context.data.contactInfoStep,
  })

  const onSubmit = (values: ContactInfoStepSchema) => {
    send({
      type: "contactInfoStep.next",
      data: values
    })
  }

  return (
    <Form {...form}>
      <form>
        
      </form>
      <span>Contact Info</span>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />

      <div className="flex gap-1">
        <Button>exit</Button>
        <Button>next</Button>
      </div>
    </Form>
  )
}

export const AddressStep = () => {
  const [snapshot, send] = useMachine(multiStepFormMachine)
  const form = useForm<AddressStepSchema>({
    resolver: zodResolver(addressStepSchema),
  })

  return (
    <form className="flex flex-col gap-2">
      <span>Address</span>
      <input type="text" placeholder="Address" />
      <input type="text" placeholder="City" />
      <input type="text" placeholder="Zip" />

      <div className="flex gap-1">
        <Button>back</Button>
        <Button>next</Button>
      </div>
    </form>
  )
}

export const PetDataStep = () => {
  const form = useForm<PetDataStepSchema>({
    resolver: zodResolver(petDataStepSchema),
  })

  return (
    <form className="flex flex-col gap-2">
      <span>Pet Data</span>
      <input type="text" placeholder="Pet Name" />
      <input type="text" placeholder="Pet Age" />
      <input type="text" placeholder="Pet ID Number" />

      <div className="flex gap-1">
        <Button>back</Button>
        <Button>next</Button>
      </div>
    </form>
  )
}

export const ReviewData = () => (
  <div className="flex flex-col gap-2">
    <span>Review Data</span>

    <div className="flex gap-1">
      <Button>back</Button>
      <Button>submit</Button>
    </div>
  </div>
)

import { assign, setup } from "xstate"
import {
  AddressStepSchema,
  ContactInfoStepSchema,
  MultiStepFormSchema,
  PetDataStepSchema,
} from "./MultiStepForm.types"

type FormContext = {
  data: MultiStepFormSchema
}

type FormEvent =
  | {
      type: "contactInfoStep.next"
      data: ContactInfoStepSchema
    }
  | { type: "addressStep.next"; data: AddressStepSchema }
  | { type: "petDataStep.next"; data: PetDataStepSchema }
  | { type: "back" }
  | { type: "submit" }
  | { type: "exit" }

const initialData = {
  contactInfoStep: {
    name: "",
    email: "",
  },
  addressStep: {
    address: "",
    city: "",
    zip: "",
  },
  petDataStep: {
    petName: "",
    petAge: "",
    petIdNumber: "",
  },
} satisfies MultiStepFormSchema

export const multiStepFormMachine = setup({
  types: {
    context: {} as FormContext,
    events: {} as FormEvent,
  },
  actions: {},
}).createMachine({
  id: "form",
  initial: "contactInfoStep",
  context: {
    data: initialData,
  },
  on: {
    exit: {
      actions: () => {
        assign({
          data: initialData,
        })
        console.log("Exiting form!")
      },
      target: "contactInfoStep",
    },
  },
  states: {
    contactInfoStep: {
      on: {
        "contactInfoStep.next": {
          actions: assign({
            data: ({ context, event }) => ({
              ...context.data,
              contactInfoStep: event.data,
            }),
          }),
          target: "addressStep",
        },
      },
    },
    addressStep: {
      on: {
        "addressStep.next": {
          actions: assign({
            data: ({ context, event }) => ({
              ...context.data,
              addressStep: event.data,
            }),
          }),
          target: "petDataStep",
        },
        back: {
          target: "contactInfoStep",
        },
      },
    },
    petDataStep: {
      on: {
        "petDataStep.next": {
          actions: assign({
            data: ({ context, event }) => ({
              ...context.data,
              petDataStep: event.data,
            }),
          }),
          target: "reviewDataStep",
        },
        back: {
          target: "addressStep",
        },
      },
    },
    reviewDataStep: {
      on: {
        back: {
          target: "petDataStep",
        },
        submit: {
          actions: () => {
            console.log("Submitting data!")
          },
          target: "done",
        },
      },
    },
    done: {
      type: "final",
      entry: assign({
        data: initialData,
      }),
    },
  },
})

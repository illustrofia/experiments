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
  /** @xstate-layout N4IgpgJg5mDOIC5QDMD2AnAtgYjADwEsAXAbQAYBdRUAB1VmINQDtqQ9EBaAJgDYBOAHT8AHAEZ+vEQFYAzFIDss2QBoQAT0R9ZgstP6y9vMUe5jpAXwtq0WQQGMWRAIb2iASWZoAykTA1sR2YXN08fPxpBZnxSSjY6BiImViR2LgUxQRE+XgAWbhF+aTJ+flzctU0EfMzeaTExXgzeKX4FfisbDExBZwgIdDhYX39sPoGhkcjovFiqVITGFjYOBEayQSVzWREFXNl6sRFKxBrBOoamxtb2zpBbHvHB2GGI7AAjVwBrcnnaeiWKVAq04Ym4mzEymMeWKpXKJwQZiESN2vDIBTI2UhdweghoYCIABFnC4pth8USSc4plEYr94gCkstUqtZG1NtIpJzeNwyGIFIUEWcLo1mjcOtZ7t08QTiaS3p97D84gtGckVloyApBLJuPwJLlSgcGiJeAikYIUQo0RisbIcdLBgA3AhgADucupCu+9NViXVLNO5V04i1cgUfIF-HNEktElR6JEmLM9sluOdro9VLJsAAru9MMRff9-czgYgBdr+AUBNJuNJpNajjGdGJyrl+aJJHXslZJcxUBA4GwHgzS0C0ghOLJ+cJxJIZPJdsoEWDpOd2wZubJcr209KgiEPF5UFMx4CNVPGuDZAo9qUmtxedJcmaNFoDOcJLy2-tCg2HTsJ5Jgic8mQnVY9kEfYI3EApuCUetpHNT9jGrPlyh2IpLH3OwKU9M8-QvQNEQFL9TXnApGxKCp30RVDvwwv9sMAnoM3dAjQKI8DL05dduBndEFGKNESmQui9R0NCf0w-8cKsIA */
  id: "form",
  initial: "contactInfoStep",
  context: {
    data: initialData,
  },
  // on: {
  //   exit: {
  //     actions: () => {
  //       assign({
  //         data: initialData,
  //       })
  //       console.log("Exiting form!")
  //     },
  //     target: "#form.contactInfoStep",
  //   },
  // },
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
          // target: "done",
        },
      },
    },
    // done: {
    //   type: "final",
    // entry: assign({
    //   data: initialData,
    // }),
    // },
  },
})

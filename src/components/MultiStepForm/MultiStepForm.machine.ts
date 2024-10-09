import { assign, enqueueActions, setup } from "xstate"
import { MultiStepFormSchema } from "./MultiStepForm.types"

type FormContext = {
  data: MultiStepFormSchema
}

type FormEvent =
  | { type: "back" }
  | { type: "exit" }
  | {
      type: "next"
      data: Partial<MultiStepFormSchema>
    }

const initialData: MultiStepFormSchema = {
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
}

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
  on: {
    exit: {
      actions: enqueueActions(({ enqueue }) => {
        enqueue.assign({
          data: () => initialData,
        })
      }),
      target: "#form.contactInfoStep",
    },
  },
  states: {
    contactInfoStep: {
      on: {
        next: {
          actions: assign({
            data: ({ context, event }) => ({
              ...context.data,
              ...event.data,
            }),
          }),
          target: "addressStep",
        },
      },
    },
    addressStep: {
      on: {
        next: {
          actions: assign({
            data: ({ context, event }) => ({
              ...context.data,
              ...event.data,
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
        next: {
          actions: assign({
            data: ({ context, event }) => ({
              ...context.data,
              ...event.data,
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
      },
    },
  },
})

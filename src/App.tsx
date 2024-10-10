import { multiStepFormMachine } from "@/components"
import { useMachine } from "@xstate/react"
import {
  AddressForm,
  ContactInfoForm,
  PetDataForm,
} from "./components/MultiStepForm/forms"
import { ReviewData } from "./components/MultiStepForm/ReviewData"

function App() {
  const [state, send] = useMachine(multiStepFormMachine)

  return (
    <div className="dark flex h-screen w-screen bg-background text-foreground">
      <div className="flex basis-1/2 flex-col items-center gap-6 py-4">
        <span>Multi-step form with XState</span>

        {state.value}

        {state.matches("contactInfoStep") && (
          <ContactInfoForm
            defaultValues={state.context.data.contactInfoStep}
            onSubmit={(contactInfoStep) =>
              send({ type: "next", data: { contactInfoStep } })
            }
            onBack={() => send({ type: "back" })}
            onExit={() => send({ type: "exit" })}
          />
        )}

        {state.matches("addressStep") && (
          <AddressForm
            defaultValues={state.context.data.addressStep}
            onSubmit={(addressStep) =>
              send({ type: "next", data: { addressStep } })
            }
            onBack={() => send({ type: "back" })}
            onExit={() => send({ type: "exit" })}
          />
        )}

        {state.matches("petDataStep") && (
          <PetDataForm
            onSubmit={(petDataStep) =>
              send({ type: "next", data: { petDataStep } })
            }
            defaultValues={state.context.data.petDataStep}
            onBack={() => send({ type: "back" })}
            onExit={() => send({ type: "exit" })}
          />
        )}
      </div>

      <div className="h-full w-0.5 bg-neutral-700" />

      <div className="flex basis-1/2 flex-col items-center py-4">
        <ReviewData
          data={state.context.data}
          onBack={() => send({ type: "back" })}
          onExit={() => send({ type: "exit" })}
        />
      </div>
    </div>
  )
}

export default App

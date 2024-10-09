import {
  multiStepFormMachine
} from "@/components"
import { useMachine } from "@xstate/react"
import { AddressForm, ContactInfoForm, PetDataForm } from "./components/MultiStepForm/forms"
import { ReviewData } from "./components/MultiStepForm/ReviewData"

function App() {
  const [state, send] = useMachine(multiStepFormMachine)

  return (
    <div className="flex h-screen w-screen bg-neutral-800 text-neutral-100">
      <div className="flex basis-1/2 flex-col items-center gap-6 py-4">
        <span>Multi-step form with XState</span>

        {state.value}

        {state.matches("contactInfoStep") &&
          <ContactInfoForm
            defaultValues={state.context.data.contactInfoStep}
            onSubmit={(data) => send({ type: "contactInfoStep.next", data })}
            onBack={() => send({ type: 'back' })}
            onExit={() => { }}
          />}

        {state.matches("addressStep") &&
          <AddressForm
            defaultValues={state.context.data.addressStep}
            onSubmit={(data) => send({ type: 'addressStep.next', data })}
            onBack={() => send({ type: 'back' })}
            onExit={() => { }}
          />}

        {state.matches("petDataStep") &&
          <PetDataForm
            onSubmit={(data) => send({ type: 'petDataStep.next', data })}
            defaultValues={state.context.data.petDataStep}
            onBack={() => send({ type: 'back' })}
            onExit={() => { }}
          />}
      </div>

      <div className="h-full w-0.5 bg-neutral-700" />

      <div className="flex basis-1/2 flex-col items-center py-4">
        <ReviewData
          data={state.context.data}
          onBack={() => send({ type: 'back' })}
          onExit={() => { }}
        />
      </div>
    </div >
  )
}

export default App

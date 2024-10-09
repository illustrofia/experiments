import {
  AddressStep,
  ContactInfoStep,
  multiStepFormMachine,
  PetDataStep,
  ReviewDataStep,
} from "@/components"
import { useMachine } from "@xstate/react"

function App() {
  const [snapshot] = useMachine(multiStepFormMachine)
  return (
    <div className="flex h-screen w-screen bg-neutral-800 text-neutral-100">
      <div className="flex basis-1/2 flex-col items-center gap-6 py-4">
        <span>Multi-step form with XState</span>

        {snapshot.matches("contactInfoStep") && <ContactInfoStep />}

        {snapshot.matches("addressStep") && <AddressStep />}

        {snapshot.matches("petDataStep") && <PetDataStep />}
      </div>

      <div className="h-full w-0.5 bg-neutral-700" />

      <div className="flex basis-1/2 flex-col items-center py-4">
        <ReviewDataStep />
        {/* {snapshot.matches("reviewDataStep") && <ReviewDataStep />} */}
      </div>
    </div>
  )
}

export default App

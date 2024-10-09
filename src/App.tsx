import {
  ContactInfoStep,
  AddressStep,
  PetDataStep,
  ReviewData,
} from "./components/MultiStepForm/MultiStepFormSteps"

function App() {
  return (
    <div className="flex h-screen w-screen bg-neutral-800 text-neutral-100">
      <div className="flex basis-1/2 flex-col items-center gap-6 py-4">
        <span>Multi-step form with XState</span>

        <ContactInfoStep />

        <AddressStep />

        <PetDataStep />

        <ReviewData />
      </div>

      <div className="h-full w-0.5 bg-neutral-700" />

      <div className="flex basis-1/2 flex-col items-center py-4">
        <span>Results</span>
      </div>
    </div>
  )
}

export default App

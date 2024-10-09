import { Button } from "../ui"
import { MultiStepFormSchema } from "./MultiStepForm.types"

interface ReviewDataProps {
  data: MultiStepFormSchema
  onBack: () => void
  onExit: () => void
}

export const ReviewData = (
  { data, onExit, onBack }: ReviewDataProps
) => {

  return (
    <div className="space-y-4">
      <span>Review Data</span>

      <div className="space-y-4">
        <div className="space-y-2">
          <span>Contact Info</span>
          <div className="flex flex-col gap-1 text-green-300">
            <span>Name: {data.contactInfoStep.name}</span>
            <span>Email: {data.contactInfoStep.email}</span>
          </div>
        </div>

        <div className="space-y-2">
          <span>Address</span>
          <div className="flex flex-col gap-1 text-green-300">
            <span>Address: {data.addressStep.address}</span>
            <span>City: {data.addressStep.city}</span>
            <span>Zip: {data.addressStep.zip}</span>
          </div>
        </div>

        <div className="space-y-2">
          <span>Pet Data</span>
          <div className="flex flex-col gap-1 text-green-300">
            <span>Pet Name: {data.petDataStep.petName}</span>
            <span>Pet Age: {data.petDataStep.petAge}</span>
            <span>
              Pet ID Number: {data.petDataStep.petIdNumber}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button onClick={onBack}>Back</Button>
        <Button onClick={onExit}>Exit</Button>
      </div>
    </div>
  )
}

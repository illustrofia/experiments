import { z } from "zod"

export const contactInfoStepSchema = z.object({
  name: z.string().min(1, "This field cannot be blank."),
  email: z.string().email(),
})

export type ContactInfoStepSchema = z.infer<typeof contactInfoStepSchema>

export const addressStepSchema = z.object({
  address: z.string().min(1, "This field cannot be blank."),
  city: z.string().min(1, "This field cannot be blank."),
  zip: z.string().min(1, "This field cannot be blank."),
})

export type AddressStepSchema = z.infer<typeof addressStepSchema>

export const petDataStepSchema = z.object({
  petName: z.string().min(1, "This field cannot be blank."),
  petAge: z.string().min(1, "This field cannot be blank."),
  petIdNumber: z.string().min(1, "This field cannot be blank."),
})

export type PetDataStepSchema = z.infer<typeof petDataStepSchema>

export const multiStepFormSchema = z.object({
  contactInfoStep: contactInfoStepSchema,
  addressStep: addressStepSchema,
  petDataStep: petDataStepSchema,
})

export type MultiStepFormSchema = z.infer<typeof multiStepFormSchema>

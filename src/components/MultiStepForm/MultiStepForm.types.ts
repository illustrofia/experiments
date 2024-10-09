import { z } from "zod"

export const contactInfoStepSchema = z.object({
  name: z.string(),
  email: z.string().email(),
})

export type ContactInfoStepSchema = z.infer<typeof contactInfoStepSchema>

export const addressStepSchema = z.object({
  address: z.string(),
  city: z.string(),
  zip: z.string(),
})

export type AddressStepSchema = z.infer<typeof addressStepSchema>

export const petDataStepSchema = z.object({
  petName: z.string(),
  petAge: z.string(),
  petIdNumber: z.string(),
})

export type PetDataStepSchema = z.infer<typeof petDataStepSchema>

export const multiStepFormSchema = z.object({
  contactInfoStep: contactInfoStepSchema,
  addressStep: addressStepSchema,
  petDataStep: petDataStepSchema,
})

export type MultiStepFormSchema = z.infer<typeof multiStepFormSchema>

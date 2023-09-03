import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

import {
  userTable,
  insertUserSchema,
  insertPetSchema,
  insertServiceSchema,
  insertAppointmentSchema,
  insertVetSchema,
} from "@lib/db/schema";

// Auth
export const loginSchema = insertUserSchema.pick({
  email: true,
  password: true,
});

export const registerSchema = insertUserSchema
  .pick({
    email: true,
    password: true,
    fullName: true,
    phoneNumber: true,
  })
  .required();

export const forgotPasswordSchema = insertUserSchema.pick({
  id: true,
  email: true,
});

export const resetPasswordSchema = insertUserSchema.pick({
  id: true,
  password: true,
});

// Profile
export const updateSchema = createInsertSchema(userTable, {
  id: (schema) => schema.id.positive(),
  fullName: (schema) => schema.fullName.max(255),
  phoneNumber: (schema) => schema.phoneNumber.regex(/^\d{10}$/),
}).pick({
  id: true,
  fullName: true,
  phoneNumber: true,
});

// Pet
export const getOnePetSchema = insertPetSchema
  .pick({
    id: true,
    ownerId: true,
  })
  .required();

export const getByIdPetSchema = insertPetSchema.pick({
  id: true,
});

export const getByTypePetSchema = insertPetSchema
  .pick({
    type: true,
    ownerId: true,
  })
  .required();

export const updatePetSchema = insertPetSchema.pick({
  id: true,
  ownerId: true,
  name: true,
  type: true,
  breed: true,
  age: true,
});

// Vet
export const getOneVetSchema = insertVetSchema.pick({
  id: true,
});

export const updateVetSchema = insertVetSchema.pick({
  id: true,
  userId: true,
  startHour: true,
  endHour: true,
  days: true,
});

// Service
export const updateServiceSchema = insertServiceSchema.pick({
  id: true,
  name: true,
  description: true,
  applicablePetType: true,
  price: true,
});

export const getOneServiceSchema = insertServiceSchema.pick({
  id: true,
});

// Appointment

// NOTE: what can you change after you create an appointment?
export const updateAppointmentSchema = insertAppointmentSchema.pick({
  id: true,
  petId: true,
  serviceId: true,
  date: true,
  time: true,
  status: true,
});

export const getOneAppointmentSchema = insertAppointmentSchema.pick({
  id: true,
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;

export type UpdateSchema = z.infer<typeof updateSchema>;

export type GetOnePetSchema = z.infer<typeof getOnePetSchema>;
export type GetByTypePetSchema = z.infer<typeof getByTypePetSchema>;
export type CreatePetSchema = z.infer<typeof insertPetSchema>;
export type UpdatePetSchema = z.infer<typeof updatePetSchema>;

export type UpdateVetSchema = z.infer<typeof updateVetSchema>;

export type UpdateServiceSchema = z.infer<typeof updateServiceSchema>;
export type CreateServiceSchema = z.infer<typeof insertServiceSchema>;

export type UpdateAppointmentSchema = z.infer<typeof updateAppointmentSchema>;
export type CreateAppointmentSchema = z.infer<typeof insertAppointmentSchema>;

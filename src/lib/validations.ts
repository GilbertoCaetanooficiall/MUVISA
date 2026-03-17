import { z } from 'zod';
// isomorphic-dompurify funciona tanto no servidor como no browser
import DOMPurify from 'isomorphic-dompurify';

/** Helper para sanitizar strings com DOMPurify */
function sanitize(value: string): string {
  return DOMPurify.sanitize(value, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
}

/** Schema de login */
export const loginSchema = z.object({
  email: z
    .string()
    .email('Email inválido')
    .transform((v) => sanitize(v.toLowerCase().trim())),
  password: z.string().min(1, 'Password obrigatória'),
});

/** Schema de registo (estudante) */
export const registerSchema = z.object({
  // Passo 1 — dados pessoais
  nome_completo: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(120)
    .transform((v) => sanitize(v.trim())),
  email: z
    .string()
    .email('Email inválido')
    .transform((v) => sanitize(v.toLowerCase().trim())),
  telefone: z
    .string()
    .min(7, 'Telefone inválido')
    .max(20)
    .transform((v) => sanitize(v.trim())),

  // Passo 2 — destino
  universidade_destino: z
    .string()
    .min(1, 'Universidade obrigatória')
    .transform((v) => sanitize(v.trim())),
  tipo_visto: z
    .string()
    .min(1, 'Tipo de visto obrigatório')
    .transform((v) => sanitize(v.trim())),
  pais_destino: z
    .string()
    .default('Portugal')
    .transform((v) => sanitize(v.trim())),

  // Passo 3 — password
  password: z
    .string()
    .min(8, 'Mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Deve conter pelo menos 1 maiúscula')
    .regex(/[0-9]/, 'Deve conter pelo menos 1 número')
    .regex(/[^A-Za-z0-9]/, 'Deve conter pelo menos 1 caractere especial'),
});

/** Schema de criação de staff (só senior_admin) */
export const createStaffSchema = z.object({
  nome_completo: z
    .string()
    .min(3)
    .max(120)
    .transform((v) => sanitize(v.trim())),
  email: z
    .string()
    .email()
    .transform((v) => sanitize(v.toLowerCase().trim())),
  telefone: z
    .string()
    .min(7)
    .max(20)
    .optional()
    .transform((v) => (v ? sanitize(v.trim()) : undefined)),
  role: z.enum(['admin', 'senior_admin']),
  cargo: z
    .string()
    .min(2)
    .max(100)
    .transform((v) => sanitize(v.trim())),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[0-9]/)
    .regex(/[^A-Za-z0-9]/),
});

/** Schema de upload de ficheiro */
export const uploadSchema = z.object({
  nome: z
    .string()
    .min(1, 'Nome obrigatório')
    .max(255)
    .transform((v) => sanitize(v.trim())),
  tamanho: z
    .number()
    .max(10 * 1024 * 1024, 'Ficheiro deve ter no máximo 10 MB'),
  tipo: z.union([
    z.literal('application/pdf'),
    z.literal('image/jpeg'),
    z.literal('image/png'),
    z.literal('image/webp'),
  ], { message: 'Tipo não permitido. Use PDF, JPEG, PNG ou WebP.' }),
  documento_id: z.string().min(1, 'ID do documento ou "novo" obrigatório'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CreateStaffInput = z.infer<typeof createStaffSchema>;
export type UploadInput = z.infer<typeof uploadSchema>;

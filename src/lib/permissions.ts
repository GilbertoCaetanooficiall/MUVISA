/**
 * MUVISA – Sistema de Permissões
 * ---------------------------------
 * Define os papéis (roles) e as ações que cada papel pode executar.
 * Este ficheiro é a fonte de verdade para controlo de acesso tanto
 * no frontend como nos middlewares e nas políticas RLS do Supabase.
 */

// ─── Roles ────────────────────────────────────────────────────────────────────

export type UserRole = 'estudante' | 'consultor' | 'admin';

// ─── Ações disponíveis na plataforma ─────────────────────────────────────────

export type Action =
  // Tickets / Chamados
  | 'ticket:create'          // Criar novo chamado
  | 'ticket:view:own'        // Ver os seus próprios chamados
  | 'ticket:view:all'        // Ver todos os chamados
  | 'ticket:resolve'         // Marcar chamado como resolvido
  | 'ticket:reopen'          // Reabrir chamado

  // Documentos
  | 'document:upload'        // Enviar documentos pessoais
  | 'document:view:own'      // Ver os seus próprios documentos
  | 'document:view:all'      // Ver documentos de todos os estudantes
  | 'document:validate'      // Validar/aprovar documentos enviados
  | 'document:send'          // Enviar documentos da agência para o estudante
  | 'document:reject'        // Rejeitar documentos com observação
  | 'document:delete'        // Apagar documentos

  // Pagamentos / Faturas
  | 'invoice:view:own'       // Ver as suas faturas
  | 'invoice:view:all'       // Ver faturas de todos os estudantes
  | 'invoice:pay'            // Registar/simular pagamento
  | 'invoice:create'         // Criar nova fatura (apenas admin/consultor)
  | 'invoice:cancel'         // Cancelar fatura

  // Processo de Visto
  | 'visa:view:own'          // Ver o seu próprio processo
  | 'visa:view:all'          // Ver todos os processos
  | 'visa:update:stage'      // Atualizar etapa do processo
  | 'visa:update:status'     // Atualizar estado (Aprovado, Pendente, etc.)
  | 'visa:create'            // Criar novo processo de visto

  // Perfil / Estudante
  | 'student:view:own'       // Ver o seu próprio perfil
  | 'student:view:all'       // Ver o perfil de todos os estudantes
  | 'student:edit:own'       // Editar o seu próprio perfil
  | 'student:edit:all'       // Editar o perfil de qualquer estudante

  // Chat / Suporte
  | 'chat:send'              // Enviar mensagem no chat
  | 'chat:view:own'          // Ver o seu chat
  | 'chat:view:all'          // Ver todos os chats

  // Admin exclusivo
  | 'admin:manage:users'     // Criar/desativar utilizadores
  | 'admin:manage:staff'     // Gerir consultores
  | 'admin:view:reports';    // Ver relatórios e estatísticas gerais

// ─── Mapa de permissões por papel ─────────────────────────────────────────────

const rolePermissions: Record<UserRole, Action[]> = {

  estudante: [
    'ticket:create',
    'ticket:view:own',

    'document:upload',
    'document:view:own',

    'invoice:view:own',
    'invoice:pay',

    'visa:view:own',

    'student:view:own',
    'student:edit:own',

    'chat:send',
    'chat:view:own',
  ],

  consultor: [
    // Tickets
    'ticket:view:all',
    'ticket:resolve',
    'ticket:reopen',

    // Documentos
    'document:view:all',
    'document:validate',
    'document:send',
    'document:reject',

    // Pagamentos
    'invoice:view:all',
    'invoice:create',
    'invoice:cancel',

    // Processo de Visto
    'visa:view:all',
    'visa:update:stage',
    'visa:update:status',
    'visa:create',

    // Estudantes
    'student:view:all',
    'student:edit:all',

    // Chat
    'chat:send',
    'chat:view:all',
  ],

  admin: [
    // Admin tem todas as permissões: herda consultor + exclusivas
    'ticket:create',
    'ticket:view:all',
    'ticket:resolve',
    'ticket:reopen',

    'document:upload',
    'document:view:all',
    'document:validate',
    'document:send',
    'document:reject',
    'document:delete',

    'invoice:view:all',
    'invoice:create',
    'invoice:cancel',
    'invoice:pay',

    'visa:view:all',
    'visa:update:stage',
    'visa:update:status',
    'visa:create',

    'student:view:all',
    'student:edit:all',

    'chat:send',
    'chat:view:all',

    'admin:manage:users',
    'admin:manage:staff',
    'admin:view:reports',
  ],
};

// ─── Função de verificação ─────────────────────────────────────────────────────

/**
 * Verifica se um papel tem permissão para executar uma ação.
 *
 * @example
 * can('consultor', 'ticket:resolve') // true
 * can('estudante', 'ticket:resolve') // false
 */
export function can(role: UserRole, action: Action): boolean {
  return rolePermissions[role]?.includes(action) ?? false;
}

/**
 * Verifica se um papel tem TODAS as ações fornecidas.
 */
export function canAll(role: UserRole, actions: Action[]): boolean {
  return actions.every((action) => can(role, action));
}

/**
 * Verifica se um papel tem PELO MENOS UMA das ações fornecidas.
 */
export function canAny(role: UserRole, actions: Action[]): boolean {
  return actions.some((action) => can(role, action));
}

/**
 * Retorna todas as permissões de um papel.
 */
export function getPermissions(role: UserRole): Action[] {
  return rolePermissions[role] ?? [];
}

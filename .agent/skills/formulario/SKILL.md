---
name: formulario
description: Utiliza esta skill para criar formulários simples e elegantes que seguem a linguagem visual principal do site (limpo, direto, com cantos arredondados, mesmo tipo de letra e cores da marca).
---

# Formulário Padrão MUVISA

Esta skill define o guia de estilos e a estrutura para criar um formulário consistente no projeto. Deve ser usado sempre que o utilizador pedir para criar um "formulário", "form" ou para aplicar a "skill formulario". Se o formulário tiver que surgir num *popup*, deve ser sempre combinado com a skill `modal-component`.

## Diretrizes de Design

A linguagem do formulário é pensada para ser limpa e profissional:
- **Espaçamento**: As margens entre os campos devem ser controladas por `space-y-4` no `<form>`.
- **Labels**: Discretas, de leitura fácil (sem demasiado peso), cor slate clássica.
- **Inputs**: Fundos claros `bg-slate-50`, ligeira borda `border-slate-200`, cantos redondos contidos `rounded-lg`, foco que usa a cor primária `ring-primary`.
- **Animações (Focus)**: Focus simples (apenas outline/ring primário suave, sem animações pesadas).
- **Botões**: Cancelar (Outline / Ghost simples) e Submeter (Fundo Primário). 
- **Cores**: Muito simples. Evita usar cores berrantes; cinge-te aos cinzas neutros (`slate`) e `primary`. 

## Estrutura de Código (Template)

Aqui tens um template pronto a utilizar com todas as classes exatas do Tailwind. Utiliza sempre esta estrutura quando construíres ou refatorizar um formulário. O `div.p-6` é ideal para encapsular o formulário num `Modal` ou em qualquer *card* branco.

```tsx
import { X } from 'lucide-react';

// Exemplo da estrutura se estiver inserido dentro de um <Modal> ou Card
<div className="p-6 relative">
  
  {/* Opcional: Botão de Fechar se for Modal */}
  <button 
    onClick={() => { /* lógica de fechar */ }} 
    className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
  >
    <X size={20} />
  </button>
  
  {/* Título do Formulário */}
  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Título do Formulário</h2>
  
  <form onSubmit={handleSubmit} className="space-y-4">
    
    {/* Campo de Texto (Input) */}
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
        Nome do Campo
      </label>
      <input 
        name="inputName" 
        type="text" 
        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" 
        required 
      />
    </div>

    {/* Campo de Seleção (Select) */}
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
        Tipo de Opção
      </label>
      <select 
        name="selectName" 
        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" 
        required
      >
        <option value="">Selecione...</option>
        <option value="1">Opção 1</option>
      </select>
    </div>

    {/* Área de Botões (Footer do Formulário) */}
    <div className="pt-2 flex justify-end gap-2">
      <button 
        type="button" 
        onClick={() => { /* lógica de cancelar */ }} 
        className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors"
      >
        Cancelar
      </button>
      <button 
        type="submit" 
        className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 shadow-sm transition-colors"
      >
        Gravar
      </button>
    </div>
    
  </form>
</div>
```

### Regras de Ouro
1. **Nunca inventes cores novas para os fundos (`bg-*`) ou texto (`text-*`)**. Utiliza sempre a família `slate` e `primary`, exatamente como listado no template.
2. Os **cantos (`rounded-**`) são sempre `rounded-lg` nos inputs e botões. As exceções são o component `Modal` exterior que dita a curvatura do ecrã pop-up completo.
3. Não incluas divisórias (`<hr />` ou borders horizontais pesadas). O espaçamento `space-y-4` organiza naturalmente os campos.
4. **Dark Mode**: Garante que usas smpre a variante `dark:` equivalente em todos os elementos, tal como o template mostra (ex: `bg-slate-50 dark:bg-slate-800`).

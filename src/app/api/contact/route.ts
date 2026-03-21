// ──────────────────────────────────────────────────────────────────
// API Route: POST /api/contact
// Responsabilidade: Recebe os dados do formulário de contato do site
// e envia um e-mail formatado para a caixa da MUVISA via Resend.
// ──────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Garante que esta rota nunca seja pré-renderizada no build
export const dynamic = 'force-dynamic';

// E-mail de destino onde todas as mensagens serão recebidas.
const DESTINATION_EMAIL = 'muvisaintercambio@gmail.com';

export async function POST(req: NextRequest) {
  try {
    // Verifica se a chave da API está configurada
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('[Resend] RESEND_API_KEY não está definida nas variáveis de ambiente.');
      return NextResponse.json(
        { error: 'Serviço de e-mail não configurado. Contacte o administrador.' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    // 1. Lê e valida o corpo da requisição
    const body = await req.json();
    const { nome, email, assunto, mensagem } = body;

    // Validação básica no servidor (nunca confie apenas no cliente)
    if (!nome || !email || !assunto || !mensagem) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios.' },
        { status: 400 }
      );
    }

    // 2. Constrói e envia o e-mail via Resend
    const { error } = await resend.emails.send({
      // "from" deve ser um domínio verificado no Resend.
      // Em modo de teste, pode usar: onboarding@resend.dev
      // Em produção, use: noreply@seudominio.com
      from: 'MUVISA Intercâmbio <onboarding@resend.dev>',

      // Envia para o e-mail oficial da MUVISA
      to: [DESTINATION_EMAIL],

      // O assunto digital inclui o assunto escrito pelo utilizador
      subject: `${assunto}`,

      // "reply_to" aponta para o e-mail da pessoa que enviou o formulário,
      // assim quando clicar em "Responder" no Gmail, vai direto para o cliente.
      replyTo: email,

      // Corpo do e-mail em HTML para um visual profissional na caixa de entrada
      html: `
        <!DOCTYPE html>
        <html lang="pt">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Nova Mensagem - MUVISA</title>
        </head>
        <body style="margin:0; padding:0; background-color:#f0f4f8; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f4f8; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
                  
                  <!-- ── Cabeçalho com cor da marca ── -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%); padding: 36px 40px; text-align:center;">
                      <h1 style="color:#ffffff; margin:0; font-size:24px; font-weight:800; letter-spacing:-0.5px;">Nova Mensagem Recebida</h1>
                      <p style="color:rgba(255,255,255,0.75); margin:8px 0 0 0; font-size:14px;">Site Oficial MUVISA Intercâmbio</p>
                    </td>
                  </tr>

                  <!-- ── Corpo da Mensagem ── -->
                  <tr>
                    <td style="padding: 40px;">
                      <p style="color:#475569; font-size:15px; line-height:1.7; margin: 0 0 24px 0;">
                        Olá equipa, foi submetido um novo contacto através do site. Aqui estão os detalhes:
                      </p>

                      <!-- Tabela de dados do remetente -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e2e8f0; border-radius: 12px; overflow:hidden; margin-bottom: 24px;">
                        <tr style="background-color:#f8fafc;">
                          <td style="padding: 12px 20px; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; width: 120px;">De</td>
                          <td style="padding: 12px 20px; font-size: 15px; color: #1e293b; font-weight: 600;">${nome}</td>
                        </tr>
                        <tr style="border-top: 1px solid #e2e8f0;">
                          <td style="padding: 12px 20px; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">E-mail</td>
                          <td style="padding: 12px 20px; font-size: 15px;">
                            <a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${email}</a>
                          </td>
                        </tr>
                        <tr style="border-top: 1px solid #e2e8f0; background-color:#f8fafc;">
                          <td style="padding: 12px 20px; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">Assunto</td>
                          <td style="padding: 12px 20px; font-size: 15px; color: #1e293b; font-weight: 600;">${assunto}</td>
                        </tr>
                      </table>

                      <!-- Bloco da mensagem -->
                      <div style="background-color:#f8fafc; border-left: 4px solid #2563eb; border-radius: 4px 12px 12px 4px; padding: 20px 24px;">
                        <p style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px 0;">Mensagem</p>
                        <p style="font-size:15px; color:#334155; line-height:1.8; margin:0; white-space: pre-line;">${mensagem.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
                      </div>

                      <!-- Botão de resposta rápida -->
                      <div style="text-align:center; margin-top: 36px;">
                        <a href="mailto:${email}?subject=Re: ${encodeURIComponent(assunto)}" 
                           style="display:inline-block; background-color:#2563eb; color:#ffffff; text-decoration:none; padding: 14px 32px; border-radius: 10px; font-weight: 700; font-size: 14px; letter-spacing: 0.3px;">
                          ✉ Responder a ${nome.split(' ')[0]}
                        </a>
                      </div>
                    </td>
                  </tr>

                  <!-- ── Rodapé ── -->
                  <tr>
                    <td style="background-color:#f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 40px; text-align:center;">
                      <p style="margin:0; font-size:12px; color:#94a3b8;">
                        Esta mensagem foi gerada automaticamente pelo formulário de contacto em <strong>muvisa.pt</strong>.
                      </p>
                      <p style="margin:8px 0 0 0; font-size:12px; color:#cbd5e1;">
                        © ${new Date().getFullYear()} MUVISA Intercâmbio — Todos os direitos reservados.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    // 3. Verifica se houve algum erro ao enviar
    if (error) {
      console.error('[Resend] Erro ao enviar e-mail de contacto:', error);
      return NextResponse.json(
        { error: 'Falha ao enviar o e-mail. Tente novamente mais tarde.' },
        { status: 500 }
      );
    }

    // 4. Sucesso — responde com 200 OK
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (err) {
    console.error('[Resend] Erro inesperado:', err);
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}

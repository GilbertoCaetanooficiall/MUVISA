import React from 'react';

interface ContactEmailTemplateProps {
  nome: string;
  email: string;
  whatsapp: string;
  tipoVisto: string;
  nivelEnsino: string;
  cidadeUniversidade: string;
  data: string;
  horario: string;
}

export const ContactEmailTemplate: React.FC<ContactEmailTemplateProps> = ({
  nome,
  email,
  whatsapp,
  tipoVisto,
  nivelEnsino,
  cidadeUniversidade,
  data,
  horario,
}) => {
  return (
    <div style={{
      fontFamily: 'Helvetica, Arial, sans-serif',
      backgroundColor: '#f8fafc',
      padding: '40px 20px',
      color: '#1e293b'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: '#2563eb',
          padding: '30px',
          textAlign: 'center'
        }}>
          <h1 style={{
            color: '#ffffff',
            margin: '0',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>Novo Agendamento MUVISA</h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            margin: '10px 0 0 0',
            fontSize: '14px'
          }}>Consultoria Acadêmica Gratuita</p>
        </div>

        {/* Content */}
        <div style={{ padding: '40px' }}>
          <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
            Olá equipe MUVISA,
          </p>
          <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '32px' }}>
            Um novo estudante acaba de solicitar uma sessão estratégica através do site. Aqui estão os detalhes:
          </p>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {[
                { label: 'Nome', value: nome },
                { label: 'E-mail', value: email },
                { label: 'WhatsApp', value: whatsapp },
                { label: 'Tipo de Visto', value: tipoVisto },
                { label: 'Nível de Ensino', value: nivelEnsino },
                { label: 'Cidade/Univ.', value: cidadeUniversidade },
                { label: 'Data Sugerida', value: data },
                { label: 'Horário', value: horario },
              ].map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{
                    padding: '12px 0',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#64748b',
                    width: '140px'
                  }}>
                    {item.label}
                  </td>
                  <td style={{
                    padding: '12px 0',
                    fontSize: '14px',
                    color: '#1e293b'
                  }}>
                    {item.value || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{
            marginTop: '40px',
            padding: '24px',
            backgroundColor: '#f1f5f9',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <p style={{
              margin: '0',
              fontSize: '14px',
              color: '#475569',
              marginBottom: '16px'
            }}>
              Deseja entrar em contato agora mesmo?
            </p>
            <a href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#22c55e',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '14px'
            }}>
              Abrir no WhatsApp
            </a>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#f8fafc',
          borderTop: '1px solid #f1f5f9'
        }}>
          <p style={{
            margin: '0',
            fontSize: '12px',
            color: '#94a3b8'
          }}>
            © 2026 MUVISA Consultoria - Todas as solicitações são automáticas.
          </p>
        </div>
      </div>
    </div>
  );
};

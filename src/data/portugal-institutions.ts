// ─── Dados de Instituições de Ensino em Portugal ───────────────────────────
// Fonte: A3ES, DGES, DGERT (dados representativos de cursos reais)

export type StudyLevelKey = 'Licenciatura' | 'Mestrado' | 'Ctesp' | 'Formação Profissional';

export interface Course {
  name: string;
  duration: number; // anos
}

export interface Institution {
  name: string;
  city: string;
  type: 'Universidade' | 'Instituto Politécnico' | 'Centro de Formação';
  levels: StudyLevelKey[];
  courses: Record<StudyLevelKey, Course[]>;
}

export const CITIES = [
  'Aveiro', 'Beja', 'Braga', 'Bragança', 'Castelo Branco',
  'Coimbra', 'Évora', 'Faro', 'Guarda', 'Leiria',
  'Lisboa', 'Portalegre', 'Porto', 'Santarém', 'Setúbal',
  'Viana do Castelo', 'Vila Real', 'Viseu',
];

export const INSTITUTIONS: Institution[] = [

  // ─── LISBOA ────────────────────────────────────────────────────────────────

  {
    name: 'Universidade de Lisboa',
    city: 'Lisboa',
    type: 'Universidade',
    levels: ['Licenciatura', 'Mestrado'],
    courses: {
      'Licenciatura': [
        { name: 'Direito', duration: 3 },
        { name: 'Gestão', duration: 3 },
        { name: 'Economia', duration: 3 },
        { name: 'Medicina', duration: 6 },
        { name: 'Farmácia', duration: 5 },
        { name: 'Psicologia', duration: 5 },
        { name: 'Educação', duration: 3 },
        { name: 'Biologia', duration: 3 },
        { name: 'Química', duration: 3 },
        { name: 'Matemática', duration: 3 },
        { name: 'Física', duration: 3 },
        { name: 'Informática', duration: 3 },
        { name: 'Engenharia Geográfica', duration: 3 },
        { name: 'História', duration: 3 },
        { name: 'Filosofia', duration: 3 },
      ],
      'Mestrado': [
        { name: 'Gestão de Empresas (MBA)', duration: 2 },
        { name: 'Direito Empresarial', duration: 2 },
        { name: 'Economia', duration: 2 },
        { name: 'Bioquímica', duration: 2 },
        { name: 'Ciências da Educação', duration: 2 },
        { name: 'Psicologia Clínica', duration: 2 },
        { name: 'Informática', duration: 2 },
        { name: 'Matemática', duration: 2 },
        { name: 'Saúde Pública', duration: 2 },
        { name: 'História Contemporânea', duration: 2 },
      ],
      'Ctesp': [],
      'Formação Profissional': [],
    },
  },

  {
    name: 'Universidade Nova de Lisboa',
    city: 'Lisboa',
    type: 'Universidade',
    levels: ['Licenciatura', 'Mestrado'],
    courses: {
      'Licenciatura': [
        { name: 'Gestão', duration: 3 },
        { name: 'Economia', duration: 3 },
        { name: 'Direito', duration: 3 },
        { name: 'Ciências da Comunicação', duration: 3 },
        { name: 'Sociologia', duration: 3 },
        { name: 'Ciências Biomédicas', duration: 3 },
        { name: 'Relações Internacionais', duration: 3 },
        { name: 'Engenharia e Gestão Industrial', duration: 3 },
        { name: 'Matemática Aplicada à Economia e Gestão', duration: 3 },
        { name: 'Línguas e Estudos Editoriais', duration: 3 },
      ],
      'Mestrado': [
        { name: 'Finanças', duration: 2 },
        { name: 'Marketing', duration: 2 },
        { name: 'Gestão de Recursos Humanos', duration: 2 },
        { name: 'Direito e Prática Jurídica', duration: 2 },
        { name: 'Relações Internacionais', duration: 2 },
        { name: 'Ciências da Comunicação', duration: 2 },
        { name: 'Saúde Pública', duration: 2 },
      ],
      'Ctesp': [],
      'Formação Profissional': [],
    },
  },

  {
    name: 'Universidade Católica Portuguesa (Lisboa)',
    city: 'Lisboa',
    type: 'Universidade',
    levels: ['Licenciatura', 'Mestrado'],
    courses: {
      'Licenciatura': [
        { name: 'Direito', duration: 3 },
        { name: 'Gestão', duration: 3 },
        { name: 'Economia', duration: 3 },
        { name: 'Ciências da Comunicação', duration: 3 },
        { name: 'Engenharia Informática', duration: 5 },
        { name: 'Psicologia', duration: 5 },
        { name: 'Medicina', duration: 6 },
        { name: 'Enfermagem', duration: 4 },
        { name: 'Arquitetura', duration: 5 },
        { name: 'Filosofia', duration: 3 },
      ],
      'Mestrado': [
        { name: 'Gestão (MBA)', duration: 2 },
        { name: 'Direito da Empresa', duration: 2 },
        { name: 'Liderança', duration: 2 },
        { name: 'Psicologia', duration: 2 },
        { name: 'Ciências da Educação', duration: 2 },
      ],
      'Ctesp': [],
      'Formação Profissional': [],
    },
  },

  {
    name: 'ISCTE - Instituto Universitário de Lisboa',
    city: 'Lisboa',
    type: 'Universidade',
    levels: ['Licenciatura', 'Mestrado'],
    courses: {
      'Licenciatura': [
        { name: 'Gestão', duration: 3 },
        { name: 'Finanças', duration: 3 },
        { name: 'Marketing', duration: 3 },
        { name: 'Sociologia', duration: 3 },
        { name: 'Ciência Política', duration: 3 },
        { name: 'Antropologia', duration: 3 },
        { name: 'Engenharia Informática e de Computadores', duration: 3 },
        { name: 'Engenharia de Telecomunicações e Informática', duration: 3 },
        { name: 'Arquitetura', duration: 5 },
        { name: 'Psicologia Social e das Organizações', duration: 3 },
      ],
      'Mestrado': [
        { name: 'Gestão de Empresas', duration: 2 },
        { name: 'Marketing', duration: 2 },
        { name: 'Finanças', duration: 2 },
        { name: 'Engenharia Informática', duration: 2 },
        { name: 'Sociologia', duration: 2 },
        { name: 'Ciência Política', duration: 2 },
      ],
      'Ctesp': [],
      'Formação Profissional': [],
    },
  },

  {
    name: 'Instituto Politécnico de Lisboa',
    city: 'Lisboa',
    type: 'Instituto Politécnico',
    levels: ['Licenciatura', 'Mestrado', 'Ctesp'],
    courses: {
      'Licenciatura': [
        { name: 'Enfermagem', duration: 4 },
        { name: 'Fisioterapia', duration: 4 },
        { name: 'Radiologia', duration: 4 },
        { name: 'Análises Clínicas e Saúde Pública', duration: 4 },
        { name: 'Engenharia Civil', duration: 3 },
        { name: 'Engenharia Mecânica', duration: 3 },
        { name: 'Engenharia Eletrotécnica e de Computadores', duration: 3 },
        { name: 'Design de Comunicação', duration: 3 },
        { name: 'Contabilidade e Administração', duration: 3 },
        { name: 'Comunicação e Media', duration: 3 },
        { name: 'Turismo e Lazer', duration: 3 },
      ],
      'Mestrado': [
        { name: 'Enfermagem', duration: 2 },
        { name: 'Engenharia Civil', duration: 2 },
        { name: 'Contabilidade e Finanças', duration: 2 },
        { name: 'Design', duration: 2 },
      ],
      'Ctesp': [
        { name: 'Tecnologias e Programação de Sistemas de Informação', duration: 2 },
        { name: 'Contabilidade e Fiscalidade', duration: 2 },
        { name: 'Gestão de Recursos Humanos', duration: 2 },
        { name: 'Marketing e Publicidade', duration: 2 },
        { name: 'Técnicas de Laboratório', duration: 2 },
        { name: 'Gestão Hoteleira', duration: 2 },
      ],
      'Formação Profissional': [],
    },
  },

  // ─── PORTO ─────────────────────────────────────────────────────────────────

  {
    name: 'Universidade do Porto',
    city: 'Porto',
    type: 'Universidade',
    levels: ['Licenciatura', 'Mestrado'],
    courses: {
      'Licenciatura': [
        { name: 'Engenharia Informática e Computação', duration: 3 },
        { name: 'Engenharia Civil', duration: 3 },
        { name: 'Engenharia Mecânica', duration: 3 },
        { name: 'Engenharia Eletrotécnica e de Computadores', duration: 3 },
        { name: 'Engenharia Química', duration: 3 },
        { name: 'Medicina', duration: 6 },
        { name: 'Farmácia', duration: 5 },
        { name: 'Direito', duration: 3 },
        { name: 'Gestão', duration: 3 },
        { name: 'Economia', duration: 3 },
        { name: 'Psicologia', duration: 5 },
        { name: 'Arquitetura', duration: 5 },
        { name: 'Biologia', duration: 3 },
        { name: 'Química', duration: 3 },
        { name: 'Matemática', duration: 3 },
        { name: 'Física', duration: 3 },
        { name: 'Ciências da Comunicação', duration: 3 },
        { name: 'Línguas e Relações Empresariais', duration: 3 },
      ],
      'Mestrado': [
        { name: 'Engenharia Informática', duration: 2 },
        { name: 'Engenharia Civil', duration: 2 },
        { name: 'Gestão de Empresas', duration: 2 },
        { name: 'Economia', duration: 2 },
        { name: 'Direito', duration: 2 },
        { name: 'Medicina', duration: 2 },
        { name: 'Psicologia', duration: 2 },
        { name: 'Bioquímica', duration: 2 },
        { name: 'Automação, Instrumentação e Controlo', duration: 2 },
      ],
      'Ctesp': [],
      'Formação Profissional': [],
    },
  },

  {
    name: 'Universidade Católica Portuguesa (Porto)',
    city: 'Porto',
    type: 'Universidade',
    levels: ['Licenciatura', 'Mestrado'],
    courses: {
      'Licenciatura': [
        { name: 'Direito', duration: 3 },
        { name: 'Gestão', duration: 3 },
        { name: 'Economia', duration: 3 },
        { name: 'Engenharia Informática', duration: 5 },
        { name: 'Ciências da Comunicação', duration: 3 },
        { name: 'Psicologia', duration: 5 },
        { name: 'Enfermagem', duration: 4 },
        { name: 'Arquitetura', duration: 5 },
      ],
      'Mestrado': [
        { name: 'Gestão (MBA)', duration: 2 },
        { name: 'Direito', duration: 2 },
        { name: 'Recursos Humanos', duration: 2 },
      ],
      'Ctesp': [],
      'Formação Profissional': [],
    },
  },

  {
    name: 'Instituto Politécnico do Porto',
    city: 'Porto',
    type: 'Instituto Politécnico',
    levels: ['Licenciatura', 'Mestrado', 'Ctesp'],
    courses: {
      'Licenciatura': [
        { name: 'Engenharia Civil', duration: 3 },
        { name: 'Engenharia Mecânica', duration: 3 },
        { name: 'Engenharia Eletrotécnica', duration: 3 },
        { name: 'Engenharia Informática', duration: 3 },
        { name: 'Enfermagem', duration: 4 },
        { name: 'Fisioterapia', duration: 4 },
        { name: 'Terapia Ocupacional', duration: 4 },
        { name: 'Contabilidade e Administração', duration: 3 },
        { name: 'Gestão de Empresas', duration: 3 },
        { name: 'Marketing', duration: 3 },
        { name: 'Design de Comunicação', duration: 3 },
        { name: 'Fotografia', duration: 3 },
        { name: 'Design de Produto', duration: 3 },
        { name: 'Turismo e Lazer', duration: 3 },
        { name: 'Jornalismo e Comunicação', duration: 3 },
      ],
      'Mestrado': [
        { name: 'Engenharia Civil', duration: 2 },
        { name: 'Engenharia Eletrotécnica e de Computadores', duration: 2 },
        { name: 'Contabilidade e Finanças', duration: 2 },
        { name: 'Design', duration: 2 },
        { name: 'Enfermagem', duration: 2 },
      ],
      'Ctesp': [
        { name: 'Programação de Sistemas de Informação', duration: 2 },
        { name: 'Cibersegurança', duration: 2 },
        { name: 'Contabilidade e Fiscalidade', duration: 2 },
        { name: 'Automação Industrial', duration: 2 },
        { name: 'Manutenção de Sistemas Mecatrónicos', duration: 2 },
        { name: 'Design de Calçado e Acessórios', duration: 2 },
        { name: 'Turismo e Animação Turística', duration: 2 },
      ],
      'Formação Profissional': [],
    },
  },

  // ─── COIMBRA ───────────────────────────────────────────────────────────────

  {
    name: 'Universidade de Coimbra',
    city: 'Coimbra',
    type: 'Universidade',
    levels: ['Licenciatura', 'Mestrado'],
    courses: {
      'Licenciatura': [
        { name: 'Direito', duration: 3 },
        { name: 'Medicina', duration: 6 },
        { name: 'Farmácia', duration: 5 },
        { name: 'Engenharia Informática', duration: 3 },
        { name: 'Engenharia Civil', duration: 3 },
        { name: 'Engenharia Mecânica', duration: 3 },
        { name: 'Engenharia Química', duration: 3 },
        { name: 'Economia', duration: 3 },
        { name: 'Gestão', duration: 3 },
        { name: 'Psicologia', duration: 5 },
        { name: 'Biologia', duration: 3 },
        { name: 'Física', duration: 3 },
        { name: 'Química', duration: 3 },
        { name: 'Matemática', duration: 3 },
        { name: 'Arquitetura', duration: 5 },
        { name: 'Língua e Literatura Portuguesa', duration: 3 },
        { name: 'História', duration: 3 },
      ],
      'Mestrado': [
        { name: 'Gestão', duration: 2 },
        { name: 'Direito', duration: 2 },
        { name: 'Ciências Farmacêuticas', duration: 2 },
        { name: 'Engenharia Biomédica', duration: 2 },
        { name: 'Economia', duration: 2 },
        { name: 'Psicologia', duration: 2 },
        { name: 'Bioquímica', duration: 2 },
      ],
      'Ctesp': [],
      'Formação Profissional': [],
    },
  },

  {
    name: 'Instituto Politécnico de Coimbra',
    city: 'Coimbra',
    type: 'Instituto Politécnico',
    levels: ['Licenciatura', 'Mestrado', 'Ctesp'],
    courses: {
      'Licenciatura': [
        { name: 'Engenharia Civil', duration: 3 },
        { name: 'Engenharia Mecânica', duration: 3 },
        { name: 'Engenharia Eletrotécnica', duration: 3 },
        { name: 'Engenharia Informática', duration: 3 },
        { name: 'Enfermagem', duration: 4 },
        { name: 'Fisioterapia', duration: 4 },
        { name: 'Radiologia', duration: 4 },
        { name: 'Contabilidade e Administração', duration: 3 },
        { name: 'Gestão de Empresas', duration: 3 },
        { name: 'Marketing e Comunicação', duration: 3 },
        { name: 'Design', duration: 3 },
        { name: 'Turismo', duration: 3 },
        { name: 'Educação Básica', duration: 3 },
      ],
      'Mestrado': [
        { name: 'Engenharia Informática', duration: 2 },
        { name: 'Enfermagem', duration: 2 },
        { name: 'Contabilidade e Finanças', duration: 2 },
        { name: 'Marketing e Comunicação Empresarial', duration: 2 },
      ],
      'Ctesp': [
        { name: 'Programação e Desenvolvimento de Software', duration: 2 },
        { name: 'Gestão Financeira', duration: 2 },
        { name: 'Redes e Sistemas Informáticos', duration: 2 },
        { name: 'Turismo e Animação', duration: 2 },
      ],
      'Formação Profissional': [],
    },
  },

  // ─── BRAGA ─────────────────────────────────────────────────────────────────

  {
    name: 'Universidade do Minho',
    city: 'Braga',
    type: 'Universidade',
    levels: ['Licenciatura', 'Mestrado'],
    courses: {
      'Licenciatura': [
        { name: 'Engenharia Informática', duration: 3 },
        { name: 'Engenharia Civil', duration: 3 },
        { name: 'Engenharia Mecânica', duration: 3 },
        { name: 'Engenharia de Sistemas', duration: 3 },
        { name: 'Engenharia Têxtil', duration: 3 },
        { name: 'Gestão', duration: 3 },
        { name: 'Economia', duration: 3 },
        { name: 'Direito', duration: 3 },
        { name: 'Psicologia', duration: 5 },
        { name: 'Comunicação e Ciências Empresariais', duration: 3 },
        { name: 'Arquitetura', duration: 5 },
        { name: 'Biologia', duration: 3 },
        { name: 'Química', duration: 3 },
        { name: 'Física', duration: 3 },
        { name: 'Educação', duration: 3 },
      ],
      'Mestrado': [
        { name: 'Engenharia Informática', duration: 2 },
        { name: 'Gestão de Empresas', duration: 2 },
        { name: 'Direito', duration: 2 },
        { name: 'Psicologia', duration: 2 },
        { name: 'Educação', duration: 2 },
        { name: 'Inteligência Artificial', duration: 2 },
      ],
      'Ctesp': [],
      'Formação Profissional': [],
    },
  },

  {
    name: 'Instituto Politécnico do Cávado e do Ave',
    city: 'Braga',
    type: 'Instituto Politécnico',
    levels: ['Licenciatura', 'Mestrado', 'Ctesp'],
    courses: {
      'Licenciatura': [
        { name: 'Engenharia Informática', duration: 3 },
        { name: 'Engenharia Civil', duration: 3 },
        { name: 'Design de Moda', duration: 3 },
        { name: 'Design de Comunicação', duration: 3 },
        { name: 'Gestão de Empresas', duration: 3 },
        { name: 'Contabilidade', duration: 3 },
        { name: 'Turismo', duration: 3 },
        { name: 'Enfermagem', duration: 4 },
      ],
      'Mestrado': [
        { name: 'Design de Produto', duration: 2 },
        { name: 'Gestão', duration: 2 },
        { name: 'Engenharia Informática', duration: 2 },
      ],
      'Ctesp': [
        { name: 'Desenvolvimento de Software', duration: 2 },
        { name: 'Design Gráfico e Multimédia', duration: 2 },
        { name: 'Contabilidade e Fiscalidade', duration: 2 },
        { name: 'Turismo e Animação', duration: 2 },
        { name: 'Construção Civil', duration: 2 },
      ],
      'Formação Profissional': [],
    },
  },

  // ─── AVEIRO ────────────────────────────────────────────────────────────────

  {
    name: 'Universidade de Aveiro',
    city: 'Aveiro',
    type: 'Universidade',
    levels: ['Licenciatura', 'Mestrado'],
    courses: {
      'Licenciatura': [
        { name: 'Engenharia Informática', duration: 3 },
        { name: 'Engenharia Eletrónica e Telecomunicações', duration: 3 },
        { name: 'Engenharia Civil', duration: 3 },
        { name: 'Engenharia Mecânica', duration: 3 },
        { name: 'Engenharia de Materiais', duration: 3 },
        { name: 'Engenharia Química e Biológica', duration: 3 },
        { name: 'Gestão', duration: 3 },
        { name: 'Economia', duration: 3 },
        { name: 'Biologia', duration: 3 },
        { name: 'Física', duration: 3 },
        { name: 'Química', duration: 3 },
        { name: 'Matemática', duration: 3 },
        { name: 'Ciências do Desporto', duration: 3 },
        { name: 'Línguas e Relações Empresariais', duration: 3 },
        { name: 'Comunicação e Multimédia', duration: 3 },
        { name: 'Design', duration: 3 },
      ],
      'Mestrado': [
        { name: 'Engenharia Informática', duration: 2 },
        { name: 'Gestão', duration: 2 },
        { name: 'Biologia Marinha', duration: 2 },
        { name: 'Ciências do Desporto', duration: 2 },
        { name: 'Design', duration: 2 },
        { name: 'Cibersegurança', duration: 2 },
      ],
      'Ctesp': [],
      'Formação Profissional': [],
    },
  },

  {
    name: 'Instituto Politécnico de Aveiro',
    city: 'Aveiro',
    type: 'Instituto Politécnico',
    levels: ['Licenciatura', 'Ctesp'],
    courses: {
      'Licenciatura': [
        { name: 'Enfermagem', duration: 4 },
        { name: 'Engenharia Civil', duration: 3 },
        { name: 'Contabilidade e Administração', duration: 3 },
        { name: 'Design', duration: 3 },
        { name: 'Gestão', duration: 3 },
      ],
      'Mestrado': [],
      'Ctesp': [
        { name: 'Desenvolvimento Web e Multimédia', duration: 2 },
        { name: 'Contabilidade e Gestão', duration: 2 },
        { name: 'Turismo e Lazer', duration: 2 },
      ],
      'Formação Profissional': [],
    },
  },

  // ─── LEIRIA ────────────────────────────────────────────────────────────────

  {
    name: 'Instituto Politécnico de Leiria',
    city: 'Leiria',
    type: 'Instituto Politécnico',
    levels: ['Licenciatura', 'Mestrado', 'Ctesp'],
    courses: {
      'Licenciatura': [
        { name: 'Engenharia Informática', duration: 3 },
        { name: 'Engenharia Civil', duration: 3 },
        { name: 'Engenharia Mecânica', duration: 3 },
        { name: 'Enfermagem', duration: 4 },
        { name: 'Fisioterapia', duration: 4 },
        { name: 'Gestão', duration: 3 },
        { name: 'Contabilidade e Finanças', duration: 3 },
        { name: 'Marketing', duration: 3 },
        { name: 'Turismo e Lazer', duration: 3 },
        { name: 'Design', duration: 3 },
        { name: 'Comunicação Social', duration: 3 },
        { name: 'Educação Básica', duration: 3 },
        { name: 'Gestão Hoteleira', duration: 3 },
      ],
      'Mestrado': [
        { name: 'Engenharia Informática', duration: 2 },
        { name: 'Gestão de Empresas', duration: 2 },
        { name: 'Turismo e Gestão de Destinos', duration: 2 },
        { name: 'Design de Produto', duration: 2 },
      ],
      'Ctesp': [
        { name: 'Programação de Sistemas de Informação', duration: 2 },
        { name: 'Cibersegurança', duration: 2 },
        { name: 'Redes e Sistemas Informáticos', duration: 2 },
        { name: 'Gestão de Marketing', duration: 2 },
        { name: 'Contabilidade e Fiscalidade', duration: 2 },
        { name: 'Animação Turística', duration: 2 },
        { name: 'Higiene e Segurança no Trabalho', duration: 2 },
      ],
      'Formação Profissional': [],
    },
  },

  // ─── SETÚBAL ───────────────────────────────────────────────────────────────

  {
    name: 'Instituto Politécnico de Setúbal',
    city: 'Setúbal',
    type: 'Instituto Politécnico',
    levels: ['Licenciatura', 'Mestrado', 'Ctesp'],
    courses: {
      'Licenciatura': [
        { name: 'Engenharia Mecânica', duration: 3 },
        { name: 'Engenharia Civil', duration: 3 },
        { name: 'Engenharia Informática', duration: 3 },
        { name: 'Engenharia Eletrotécnica', duration: 3 },
        { name: 'Enfermagem', duration: 4 },
        { name: 'Contabilidade e Finanças', duration: 3 },
        { name: 'Gestão', duration: 3 },
        { name: 'Secretariado e Comunicação Empresarial', duration: 3 },
        { name: 'Educação Social', duration: 3 },
        { name: 'Animação Cultural', duration: 3 },
      ],
      'Mestrado': [
        { name: 'Engenharia Mecânica', duration: 2 },
        { name: 'Contabilidade e Finanças', duration: 2 },
        { name: 'Gestão de Saúde', duration: 2 },
      ],
      'Ctesp': [
        { name: 'Desenvolvimento de Aplicações Informáticas', duration: 2 },
        { name: 'Gestão de Recursos Humanos', duration: 2 },
        { name: 'Contabilidade e Fiscalidade', duration: 2 },
        { name: 'Soldadura e Estruturas Metálicas', duration: 2 },
        { name: 'Instalações Elétricas', duration: 2 },
      ],
      'Formação Profissional': [],
    },
  },

  // ─── SANTARÉM ─────────────────────────────────────────────────────────────

  {
    name: 'Instituto Politécnico de Santarém',
    city: 'Santarém',
    type: 'Instituto Politécnico',
    levels: ['Licenciatura', 'Mestrado', 'Ctesp'],
    courses: {
      'Licenciatura': [
        { name: 'Educação Social', duration: 3 },
        { name: 'Desporto e Lazer', duration: 3 },
        { name: 'Gestão', duration: 3 },
        { name: 'Contabilidade e Finanças', duration: 3 },
        { name: 'Enfermagem', duration: 4 },
        { name: 'Agronomia', duration: 3 },
        { name: 'Zootecnia', duration: 3 },
        { name: 'Gestão Agrícola', duration: 3 },
        { name: 'Animação Sociocultural', duration: 3 },
        { name: 'Comunicação Social', duration: 3 },
      ],
      'Mestrado': [
        { name: 'Educação Social e Intervenção Comunitária', duration: 2 },
        { name: 'Gestão de Empresas', duration: 2 },
        { name: 'Agricultura Sustentável', duration: 2 },
      ],
      'Ctesp': [
        { name: 'Marketing e Comunicação Digital', duration: 2 },
        { name: 'Contabilidade e Gestão', duration: 2 },
        { name: 'Produção Agrícola', duration: 2 },
        { name: 'Animação Turística', duration: 2 },
      ],
      'Formação Profissional': [],
    },
  },

  // ─── VISEU ────────────────────────────────────────────────────────────────

  {
    name: 'Instituto Politécnico de Viseu',
    city: 'Viseu',
    type: 'Instituto Politécnico',
    levels: ['Licenciatura', 'Mestrado', 'Ctesp'],
    courses: {
      'Licenciatura': [
        { name: 'Engenharia Civil', duration: 3 },
        { name: 'Engenharia Eletrotécnica', duration: 3 },
        { name: 'Engenharia Informática', duration: 3 },
        { name: 'Engenharia Alimentar', duration: 3 },
        { name: 'Enfermagem', duration: 4 },
        { name: 'Fisioterapia', duration: 4 },
        { name: 'Educação Básica', duration: 3 },
        { name: 'Contabilidade e Administração', duration: 3 },
        { name: 'Gestão', duration: 3 },
        { name: 'Turismo', duration: 3 },
        { name: 'Design de Ambientes', duration: 3 },
      ],
      'Mestrado': [
        { name: 'Enfermagem', duration: 2 },
        { name: 'Engenharia Civil', duration: 2 },
        { name: 'Contabilidade e Finanças', duration: 2 },
        { name: 'Gestão de PME', duration: 2 },
      ],
      'Ctesp': [
        { name: 'Desenvolvimento de Jogos Digitais', duration: 2 },
        { name: 'Programação e Sistemas Web', duration: 2 },
        { name: 'Gestão de Marketing', duration: 2 },
        { name: 'Energias Renováveis', duration: 2 },
        { name: 'Construção e Manutenção', duration: 2 },
      ],
      'Formação Profissional': [],
    },
  },

  // ─── CASTELO BRANCO ────────────────────────────────────────────────────────

  {
    name: 'Instituto Politécnico de Castelo Branco',
    city: 'Castelo Branco',
    type: 'Instituto Politécnico',
    levels: ['Licenciatura', 'Mestrado', 'Ctesp'],
    courses: {
      'Licenciatura': [
        { name: 'Engenharia Informática', duration: 3 },
        { name: 'Enfermagem', duration: 4 },
        { name: 'Fisioterapia', duration: 4 },
        { name: 'Design de Moda', duration: 3 },
        { name: 'Gestão de Empresas', duration: 3 },
        { name: 'Agronomia', duration: 3 },
        { name: 'Comunicação Social', duration: 3 },
        { name: 'Educação Básica', duration: 3 },
        { name: 'Artes do Espetáculo', duration: 3 },
      ],
      'Mestrado': [
        { name: 'Gestão de Pequenas e Médias Empresas', duration: 2 },
        { name: 'Design de Moda', duration: 2 },
        { name: 'Reabilitação', duration: 2 },
      ],
      'Ctesp': [
        { name: 'Desenvolvimento de Aplicações Móveis', duration: 2 },
        { name: 'Moda e Têxtil', duration: 2 },
        { name: 'Gestão e Marketing', duration: 2 },
        { name: 'Produção Agrícola Biológica', duration: 2 },
      ],
      'Formação Profissional': [],
    },
  },

  // ─── VILA REAL ─────────────────────────────────────────────────────────────

  {
    name: 'Universidade de Trás-os-Montes e Alto Douro',
    city: 'Vila Real',
    type: 'Universidade',
    levels: ['Licenciatura', 'Mestrado'],
    courses: {
      'Licenciatura': [
        { name: 'Engenharia Informática', duration: 3 },
        { name: 'Engenharia Civil', duration: 3 },
        { name: 'Gestão', duration: 3 },
        { name: 'Medicina Veterinária', duration: 6 },
        { name: 'Agronomia', duration: 3 },
        { name: 'Biologia', duration: 3 },
        { name: 'Enologia', duration: 3 },
        { name: 'Desporto', duration: 3 },
        { name: 'Educação', duration: 3 },
      ],
      'Mestrado': [
        { name: 'Engenharia Informática', duration: 2 },
        { name: 'Gestão', duration: 2 },
        { name: 'Enologia e Viticultura', duration: 2 },
        { name: 'Medicina Veterinária', duration: 2 },
      ],
      'Ctesp': [],
      'Formação Profissional': [],
    },
  },

  // ─── BRAGANÇA ─────────────────────────────────────────────────────────────

  {
    name: 'Instituto Politécnico de Bragança',
    city: 'Bragança',
    type: 'Instituto Politécnico',
    levels: ['Licenciatura', 'Mestrado', 'Ctesp'],
    courses: {
      'Licenciatura': [
        { name: 'Engenharia Informática', duration: 3 },
        { name: 'Engenharia Eletrotécnica e de Computadores', duration: 3 },
        { name: 'Engenharia Civil', duration: 3 },
        { name: 'Engenharia Alimentar e Biológica', duration: 3 },
        { name: 'Gestão de Empresas', duration: 3 },
        { name: 'Contabilidade e Administração', duration: 3 },
        { name: 'Comunicação e Relações Empresariais', duration: 3 },
        { name: 'Enfermagem', duration: 4 },
        { name: 'Educação Social', duration: 3 },
        { name: 'Turismo', duration: 3 },
        { name: 'Agricultura Biológica', duration: 3 },
      ],
      'Mestrado': [
        { name: 'Engenharia Informática', duration: 2 },
        { name: 'Gestão de PME', duration: 2 },
        { name: 'Tecnologia Alimentar e Controlo de Qualidade', duration: 2 },
      ],
      'Ctesp': [
        { name: 'Desenvolvimento de Software', duration: 2 },
        { name: 'Redes e Sistemas Informáticos', duration: 2 },
        { name: 'Contabilidade e Fiscalidade', duration: 2 },
        { name: 'Turismo e Animação', duration: 2 },
      ],
      'Formação Profissional': [],
    },
  },

  // ─── FARO ─────────────────────────────────────────────────────────────────

  {
    name: 'Universidade do Algarve',
    city: 'Faro',
    type: 'Universidade',
    levels: ['Licenciatura', 'Mestrado'],
    courses: {
      'Licenciatura': [
        { name: 'Gestão', duration: 3 },
        { name: 'Economia', duration: 3 },
        { name: 'Turismo', duration: 3 },
        { name: 'Engenharia Informática', duration: 3 },
        { name: 'Engenharia Civil', duration: 3 },
        { name: 'Biologia Marinha e Pescas', duration: 3 },
        { name: 'Ciências Biomédicas', duration: 3 },
        { name: 'Psicologia', duration: 5 },
        { name: 'Arqueologia', duration: 3 },
        { name: 'Design', duration: 3 },
      ],
      'Mestrado': [
        { name: 'Gestão', duration: 2 },
        { name: 'Turismo e Gestão de Destinos', duration: 2 },
        { name: 'Biologia Marinha', duration: 2 },
        { name: 'Engenharia Informática', duration: 2 },
      ],
      'Ctesp': [],
      'Formação Profissional': [],
    },
  },

  {
    name: 'Instituto Politécnico de Faro',
    city: 'Faro',
    type: 'Instituto Politécnico',
    levels: ['Licenciatura', 'Ctesp'],
    courses: {
      'Licenciatura': [
        { name: 'Gestão Hoteleira', duration: 3 },
        { name: 'Gestão do Turismo', duration: 3 },
        { name: 'Enfermagem', duration: 4 },
        { name: 'Contabilidade e Finanças', duration: 3 },
        { name: 'Design de Comunicação', duration: 3 },
      ],
      'Mestrado': [],
      'Ctesp': [
        { name: 'Gestão e Animação Turística', duration: 2 },
        { name: 'Culinária e Restauração', duration: 2 },
        { name: 'Contabilidade e Fiscalidade', duration: 2 },
      ],
      'Formação Profissional': [],
    },
  },

  // ─── ÉVORA ─────────────────────────────────────────────────────────────────

  {
    name: 'Universidade de Évora',
    city: 'Évora',
    type: 'Universidade',
    levels: ['Licenciatura', 'Mestrado'],
    courses: {
      'Licenciatura': [
        { name: 'Gestão', duration: 3 },
        { name: 'Economia', duration: 3 },
        { name: 'Direito', duration: 3 },
        { name: 'Engenharia Civil', duration: 3 },
        { name: 'Engenharia Informática', duration: 3 },
        { name: 'Medicina', duration: 6 },
        { name: 'Biologia', duration: 3 },
        { name: 'Geologia', duration: 3 },
        { name: 'Arqueologia', duration: 3 },
        { name: 'Artes Visuais', duration: 3 },
        { name: 'Música', duration: 4 },
        { name: 'Filosofia', duration: 3 },
        { name: 'História', duration: 3 },
      ],
      'Mestrado': [
        { name: 'Gestão', duration: 2 },
        { name: 'Engenharia Civil', duration: 2 },
        { name: 'Biologia da Conservação', duration: 2 },
        { name: 'Arqueologia e Ambiente', duration: 2 },
      ],
      'Ctesp': [],
      'Formação Profissional': [],
    },
  },

  // ─── GUARDA ────────────────────────────────────────────────────────────────

  {
    name: 'Instituto Politécnico da Guarda',
    city: 'Guarda',
    type: 'Instituto Politécnico',
    levels: ['Licenciatura', 'Mestrado', 'Ctesp'],
    courses: {
      'Licenciatura': [
        { name: 'Enfermagem', duration: 4 },
        { name: 'Engenharia Informática', duration: 3 },
        { name: 'Contabilidade e Finanças', duration: 3 },
        { name: 'Gestão de Empresas', duration: 3 },
        { name: 'Turismo', duration: 3 },
        { name: 'Comunicação, Cultura e Organizações', duration: 3 },
      ],
      'Mestrado': [
        { name: 'Gestão de PME', duration: 2 },
        { name: 'Turismo de Interior', duration: 2 },
      ],
      'Ctesp': [
        { name: 'Programação de Aplicações Web', duration: 2 },
        { name: 'Contabilidade e Fiscalidade', duration: 2 },
        { name: 'Animação Turística', duration: 2 },
      ],
      'Formação Profissional': [],
    },
  },

  // ─── PORTALEGRE ────────────────────────────────────────────────────────────

  {
    name: 'Instituto Politécnico de Portalegre',
    city: 'Portalegre',
    type: 'Instituto Politécnico',
    levels: ['Licenciatura', 'Ctesp'],
    courses: {
      'Licenciatura': [
        { name: 'Enfermagem', duration: 4 },
        { name: 'Gestão de Empresas', duration: 3 },
        { name: 'Contabilidade', duration: 3 },
        { name: 'Turismo', duration: 3 },
        { name: 'Educação Social', duration: 3 },
      ],
      'Mestrado': [],
      'Ctesp': [
        { name: 'Desenvolvimento de Software', duration: 2 },
        { name: 'Gestão e Marketing', duration: 2 },
        { name: 'Animação Turística', duration: 2 },
      ],
      'Formação Profissional': [],
    },
  },

  // ─── BEJA ─────────────────────────────────────────────────────────────────

  {
    name: 'Instituto Politécnico de Beja',
    city: 'Beja',
    type: 'Instituto Politécnico',
    levels: ['Licenciatura', 'Ctesp'],
    courses: {
      'Licenciatura': [
        { name: 'Engenharia Agronómica', duration: 3 },
        { name: 'Enfermagem', duration: 4 },
        { name: 'Gestão de Empresas', duration: 3 },
        { name: 'Contabilidade', duration: 3 },
        { name: 'Serviço Social', duration: 3 },
        { name: 'Educação Social', duration: 3 },
        { name: 'Turismo', duration: 3 },
        { name: 'Engenharia de Energias Renováveis', duration: 3 },
      ],
      'Mestrado': [],
      'Ctesp': [
        { name: 'Agricultura Biológica e Proteção de Plantas', duration: 2 },
        { name: 'Energias Renováveis e Eficiência Energética', duration: 2 },
        { name: 'Gestão de Marketing', duration: 2 },
      ],
      'Formação Profissional': [],
    },
  },

  // ─── VIANA DO CASTELO ──────────────────────────────────────────────────────

  {
    name: 'Instituto Politécnico de Viana do Castelo',
    city: 'Viana do Castelo',
    type: 'Instituto Politécnico',
    levels: ['Licenciatura', 'Mestrado', 'Ctesp'],
    courses: {
      'Licenciatura': [
        { name: 'Enfermagem', duration: 4 },
        { name: 'Fisioterapia', duration: 4 },
        { name: 'Engenharia Civil', duration: 3 },
        { name: 'Engenharia Eletrotécnica e de Computadores', duration: 3 },
        { name: 'Engenharia Náutica', duration: 3 },
        { name: 'Gestão', duration: 3 },
        { name: 'Contabilidade', duration: 3 },
        { name: 'Turismo e Lazer', duration: 3 },
        { name: 'Design do Produto', duration: 3 },
        { name: 'Desporto', duration: 3 },
        { name: 'Educação Básica', duration: 3 },
      ],
      'Mestrado': [
        { name: 'Gestão de PME', duration: 2 },
        { name: 'Enfermagem', duration: 2 },
        { name: 'Desporto', duration: 2 },
      ],
      'Ctesp': [
        { name: 'Tecnologias e Programação de Sistemas de Informação', duration: 2 },
        { name: 'Contabilidade e Fiscalidade', duration: 2 },
        { name: 'Náutica de Embarcações Miúdas', duration: 2 },
        { name: 'Turismo e Animação', duration: 2 },
        { name: 'Manutenção Eletromecânica Industrial', duration: 2 },
      ],
      'Formação Profissional': [],
    },
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────

/** Retorna todas as cidades únicas disponíveis */
export function getAvailableCities(): string[] {
  return Array.from(new Set(INSTITUTIONS.map(i => i.city))).sort();
}

/** Filtra instituições por cidade */
export function getInstitutionsByCity(city: string): Institution[] {
  return INSTITUTIONS.filter(i => i.city === city);
}

/** Filtra instituições por cidade e nível de ensino */
export function getInstitutionsByCityAndLevel(city: string, level: StudyLevelKey): Institution[] {
  return INSTITUTIONS.filter(i => i.city === city && i.levels.includes(level));
}

/** Retorna os cursos de uma instituição para um dado nível */
export function getCourses(institutionName: string, level: StudyLevelKey): Course[] {
  const inst = INSTITUTIONS.find(i => i.name === institutionName);
  if (!inst) return [];
  return inst.courses[level] ?? [];
}

/** Duração padrão por nível */
export const LEVEL_DURATION: Record<StudyLevelKey, number> = {
  'Licenciatura': 3,
  'Mestrado': 2,
  'Ctesp': 2,
  'Formação Profissional': 1,
};

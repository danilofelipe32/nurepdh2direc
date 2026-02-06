import { ChartConfig, TimelineEvent, DocumentItem } from './types';

// Cores baseadas no design original (Tons de Vermelho/Laranja/Amarelo sobre fundo escuro)
export const COLORS = {
    red: '#DC2626',
    orange: '#F97316',
    amber: '#F59E0B',
    lime: '#84CC16',
    blue: '#3B82F6',
    indigo: '#6366F1',
    slate: '#94a3b8'
};

export const charts2024: ChartConfig[] = [
    {
        id: 'q1', title: '1. Qual é o seu papel?', type: 'bar', layout: 'horizontal',
        summary: 'A pesquisa teve adesão massiva do corpo discente, representando mais de 85% dos respondentes.',
        data: [
            { name: 'Funcionário', value: 2.88 },
            { name: 'Professor', value: 11.54 },
            { name: 'Aluno', value: 85.58 }
        ]
    },
    {
        id: 'q2', title: '2. Se aluno(a), em qual ano está?', type: 'area',
        summary: 'Distribuição equilibrada entre os anos finais do fundamental, com leve pico no 6º e 8º anos.',
        data: [
            { name: '6º', value: 19.23 }, { name: '7º', value: 13.46 }, { name: '8º', value: 19.23 },
            { name: '9º', value: 15.38 }, { name: '1º Méd', value: 17.31 }, { name: '3º Méd', value: 1.92 }
        ]
    },
    {
        id: 'q3', title: '3. Você se sente seguro(a)?', type: 'pie',
        summary: 'Embora 39% sintam-se sempre seguros, a soma de "Às vezes" e "Nunca" revela uma vulnerabilidade significativa.',
        data: [
            { name: 'Sempre', value: 39.42, fill: COLORS.red }, { name: 'Frequente', value: 17.31, fill: COLORS.orange },
            { name: 'Às Vezes', value: 28.85, fill: COLORS.amber }, { name: 'Nunca', value: 9.62, fill: COLORS.lime }, { name: 'Raramente', value: 4.81, fill: COLORS.blue }
        ]
    },
    {
        id: 'q4', title: '4. Presenciou/sofreu violência?', type: 'pie',
        summary: 'Mais de um quarto dos entrevistados (26.9%) relatou contato direto com situações de violência escolar.',
        data: [
            { name: 'Não', value: 73.08, fill: COLORS.red }, { name: 'Sim', value: 26.92, fill: COLORS.orange }
        ]
    },
    {
        id: 'q5', title: '5. Se sim, com que frequência?', type: 'bar', layout: 'vertical',
        summary: 'Dentre os que presenciaram violência, a maior parte relata ocorrências raras, mas 20% indicam frequência diária.',
        data: [
            { name: 'Raramente', value: 33.65 }, { name: 'Diariamente', value: 20.19 },
            { name: 'Mensalmente', value: 19.23 }, { name: 'Semanalmente', value: 7.69 }
        ]
    },
    {
        id: 'q6', title: '6. Alunos tratam colegas com respeito?', type: 'bar', layout: 'horizontal',
        summary: 'O respeito entre pares é um ponto crítico, com 45% afirmando que ocorre apenas "às vezes".',
        data: [
            { name: 'Nunca', value: 3.85 },
            { name: 'Raramente', value: 15.38 },
            { name: 'Frequente', value: 18.27 },
            { name: 'Sempre', value: 17.31 },
            { name: 'Às Vezes', value: 45.19 }
        ]
    },
    {
        id: 'q7', title: '7. Respeito entre prof. e funcionários?', type: 'bar', layout: 'horizontal',
        summary: 'Alta positividade nas relações institucionais, com mais de 80% relatando respeito frequente.',
        data: [
            { name: 'Nunca', value: 1.92 },
            { name: 'Raramente', value: 2.88 },
            { name: 'Às Vezes', value: 14.42 },
            { name: 'Frequente', value: 80.78 }
        ]
    },
    {
        id: 'q8', title: '8. Sabe a quem recorrer?', type: 'pie',
        summary: 'A grande maioria (86.5%) conhece os canais de ajuda, indicando boa comunicação institucional.',
        data: [
            { name: 'Sim', value: 86.54, fill: COLORS.red }, { name: 'Não', value: 13.46, fill: COLORS.orange }
        ]
    },
    {
        id: 'q9', title: '9. Escola oferece suporte (bullying)?', type: 'pie',
        summary: 'Um dado alarmante de 2024: 80% percebiam ausência de suporte específico para bullying.',
        data: [
            { name: 'Não', value: 80.77, fill: COLORS.red }, { name: 'Sim', value: 19.23, fill: COLORS.amber }
        ]
    },
    {
        id: 'q10', title: '10. Aconselhamento é acessível?', type: 'area',
        summary: 'Apesar das lacunas no suporte ao bullying, 64% consideram o aconselhamento geral acessível.',
        data: [
            { name: 'Sim', value: 64.42 }, { name: 'Não Sei', value: 25.96 }, { name: 'Não', value: 9.62 }
        ]
    },
    {
        id: 'q11', title: '11. Ambiente é inclusivo?', type: 'bar', layout: 'horizontal',
        summary: 'A percepção de inclusão é majoritariamente positiva (70%), mas há margem para melhoria.',
        data: [
            { name: 'Não', value: 4.81 },
            { name: 'Às Vezes', value: 25.00 },
            { name: 'Sim', value: 70.19 }
        ]
    },
    {
        id: 'q12', title: '12. Instalações contribuem p/ segurança?', type: 'pie',
        summary: 'A infraestrutura divide opiniões, com apenas 48% afirmando que ela contribui plenamente para a segurança.',
        data: [
            { name: 'Sim', value: 48.08, fill: COLORS.red },
            { name: 'Às Vezes', value: 36.54, fill: COLORS.orange },
            { name: 'Não', value: 15.38, fill: COLORS.amber }
        ]
    },
    {
        id: 'q13', title: '13. Confortável em participar de atividades?', type: 'bar', layout: 'vertical',
        summary: 'O engajamento é moderado, com cerca de 27% dos alunos não se sentindo confortáveis em participar.',
        data: [
            { name: 'Sim', value: 38.46 },
            { name: 'Às Vezes', value: 33.65 },
            { name: 'Não', value: 27.89 }
        ]
    },
    {
        id: 'q14', title: '14. Análise de Sentimento e sugestões', type: 'pie',
        summary: 'A análise textual revelou um tom predominantemente neutro/informativo nas respostas abertas.',
        data: [
            { name: 'Neutro', value: 98.34, fill: COLORS.red },
            { name: 'Positivo', value: 1.0, fill: COLORS.orange },
            { name: 'Negativo', value: 0.66, fill: COLORS.amber }
        ]
    }
];

export const charts2025: ChartConfig[] = [
    {
        id: 'q1_25', title: '1. Qual é o seu papel?', type: 'bar', layout: 'horizontal',
        summary: 'Manutenção do perfil demográfico, com alunos representando a vasta maioria da amostra.',
        data: [
            { name: 'Func.', value: 4.1 },
            { name: 'Prof.', value: 10.2 },
            { name: 'Aluno', value: 85.7 }
        ]
    },
    {
        id: 'q2_25', title: '2. Se aluno(a), em qual ano está?', type: 'area',
        summary: 'Distribuição homogênea entre as séries, garantindo representatividade de todos os ciclos.',
        data: [
            { name: '6º', value: 18.5 }, { name: '7º', value: 14.2 }, { name: '8º', value: 18.8 },
            { name: '9º', value: 16.1 }, { name: '1º Méd', value: 18.2 }, { name: '3º Méd', value: 14.2 }
        ]
    },
    {
        id: 'q3_25', title: '3. Você se sente seguro(a)?', type: 'pie',
        summary: 'Melhora significativa: o sentimento de segurança constante subiu de 39% (2024) para 45.2%.',
        data: [
            { name: 'Sempre', value: 45.2, fill: COLORS.red }, { name: 'Frequente', value: 22.5, fill: COLORS.orange },
            { name: 'Às Vezes', value: 20.1, fill: COLORS.amber }, { name: 'Nunca', value: 7.2, fill: COLORS.lime }, { name: 'Raramente', value: 5.0, fill: COLORS.blue }
        ]
    },
    {
        id: 'q4_25', title: '4. Presenciou/sofreu violência?', type: 'pie',
        summary: 'Redução na percepção de violência: índice caiu de 26.9% para 21.5% após intervenções.',
        data: [
            { name: 'Não', value: 78.5, fill: COLORS.red }, { name: 'Sim', value: 21.5, fill: COLORS.orange }
        ]
    },
    {
        id: 'q5_25', title: '5. Se sim, com que frequência?', type: 'bar', layout: 'vertical',
        summary: 'A frequência diária de violência caiu pela metade (de 20% para 10.5%), indicando eficácia das ações.',
        data: [
            { name: 'Raramente', value: 48.2 }, { name: 'Diariamente', value: 10.5 },
            { name: 'Mensalmente', value: 25.1 }, { name: 'Semanalmente', value: 16.2 }
        ]
    },
    {
        id: 'q6_25', title: '6. Alunos tratam colegas com respeito?', type: 'bar', layout: 'horizontal',
        summary: 'Avanço no convívio: percepção de respeito "Sempre" ou "Frequente" cresceu consideravelmente.',
        data: [
            { name: 'Nunca', value: 2.1 },
            { name: 'Raramente', value: 10.5 },
            { name: 'Frequente', value: 25.4 },
            { name: 'Sempre', value: 28.2 },
            { name: 'Às Vezes', value: 33.8 }
        ]
    },
    {
        id: 'q7_25', title: '7. Respeito entre prof. e funcionários?', type: 'bar', layout: 'horizontal',
        summary: 'Clima organizacional permanece excelente, atingindo quase 90% de percepção frequente de respeito.',
        data: [
            { name: 'Nunca', value: 0.5 },
            { name: 'Raramente', value: 1.2 },
            { name: 'Às Vezes', value: 8.5 },
            { name: 'Frequente', value: 89.8 }
        ]
    },
    {
        id: 'q8_25', title: '8. Sabe a quem recorrer?', type: 'pie',
        summary: 'Leve aumento no conhecimento dos canais de suporte (89.2%), reforçando a comunicação.',
        data: [
            { name: 'Sim', value: 89.2, fill: COLORS.red }, { name: 'Não', value: 10.8, fill: COLORS.orange }
        ]
    },
    {
        id: 'q9_25', title: '9. Escola oferece suporte (bullying)?', type: 'pie',
        summary: 'O maior salto da pesquisa: percepção de suporte ao bullying saltou de 19% para 44.6%.',
        data: [
            { name: 'Não', value: 55.4, fill: COLORS.red }, { name: 'Sim', value: 44.6, fill: COLORS.amber }
        ]
    },
    {
        id: 'q10_25', title: '10. Aconselhamento é acessível?', type: 'area',
        summary: 'Acessibilidade ao aconselhamento subiu para 78.5%, refletindo a presença ativa dos núcleos.',
        data: [
            { name: 'Sim', value: 78.5 }, { name: 'Não Sei', value: 15.2 }, { name: 'Não', value: 6.3 }
        ]
    },
    {
        id: 'q11_25', title: '11. Ambiente é inclusivo?', type: 'bar', layout: 'horizontal',
        summary: 'Percepção de inclusão atingiu quase 80%, consolidando a cultura de acolhimento.',
        data: [
            { name: 'Não', value: 2.5 },
            { name: 'Às Vezes', value: 18.2 },
            { name: 'Sim', value: 79.3 }
        ]
    },
    {
        id: 'q12_25', title: '12. Instalações contribuem p/ segurança?', type: 'pie',
        summary: 'Melhora na percepção da infraestrutura (58.4%), possivelmente ligada à melhoria do clima geral.',
        data: [
            { name: 'Sim', value: 58.4, fill: COLORS.red },
            { name: 'Às Vezes', value: 30.1, fill: COLORS.orange },
            { name: 'Não', value: 11.5, fill: COLORS.amber }
        ]
    },
    {
        id: 'q13_25', title: '13. Participação confortável?', type: 'bar', layout: 'vertical',
        summary: 'Aumento no conforto em participar ("Sempre" foi a 45.5%), indicando maior protagonismo.',
        data: [
            { name: 'Sempre', value: 45.5 }, { name: 'Às Vezes', value: 28.1 },
            { name: 'Nunca', value: 26.4 }
        ]
    },
     {
        id: 'q14_25', title: '14. Análise de Sentimento', type: 'pie',
        summary: 'Ligeiro aumento na positividade das respostas abertas, acompanhando a melhora nos indicadores.',
        data: [
            { name: 'Neutro', value: 96.0, fill: COLORS.red }, { name: 'Positivo', value: 3.2, fill: COLORS.orange },
            { name: 'Negativo', value: 0.8, fill: COLORS.amber }
        ]
    }
];

export const timelineEvents: TimelineEvent[] = [
    {
        year: '2023',
        title: 'Implementação dos Núcleos',
        description: 'Foco na criação e implantação dos 41 Núcleos Escolares de Educação para a Paz e Direitos Humanos (NUEEPDHs). Diagnóstico das escolas, formações iniciais e parcerias com MP e TJ.',
        align: 'left'
    },
    {
        year: '2024',
        title: 'Consolidação e Expansão',
        description: 'Realização de 24 capacitações, 25 processos circulares e 10 mediações exitosas. Criação do aplicativo de acompanhamento e rede de apoio socioassistencial.',
        align: 'right'
    },
    {
        year: '2025',
        title: 'Inovação e Sustentabilidade',
        description: 'Implementação dos projetos "Aluno Embaixador da Paz" e "Autocuidado e Saúde Mental". Criação do protocolo para casos de não-aceitação de mediação.',
        align: 'left'
    }
];

export const plans: DocumentItem[] = [
    { title: 'Plano de ação 2023', url: 'https://drive.google.com/file/d/1qITEWucXz1EvlRJJTNfc7mjTnDjMcsMy/view?usp=sharing' },
    { title: 'Plano de ação 2024', url: 'https://drive.google.com/file/d/1l_sO8lF_xxgtK8JLDKRuH5wezxH7hIkj/view?usp=sharing' },
    { title: 'Plano de ação 2025', url: 'https://drive.google.com/file/d/1ZvrlBGa7SNdPpdTmfqyC8ROKWMih_HcC/view?usp=sharing' },
    { title: 'Plano de ação 2026', url: 'https://drive.google.com/file/d/1ZvrlBGa7SNdPpdTmfqyC8ROKWMih_HcC/view?usp=sharing' }
];

export const documents: DocumentItem[] = [
    { title: 'Projeto Embaixador da Paz', url: 'https://drive.google.com/file/d/1WuvM9Ycg1fc2IctijY4-NNnuQS4YU_xc/view?usp=drive_link' },
    { title: 'Projeto Saúde Mental', url: 'https://drive.google.com/file/d/1-ButtstXEFyEnWfRiM1hz-8IFYEROU8B/view?usp=drive_link' },
    { title: 'Protocolo de Mediação', url: 'https://drive.google.com/file/d/1lOhunV8iSgmwHOVixOjvCZ3yG4I8Yr21/view?usp=drive_link' },
    { title: 'Relatório Retrospectiva', url: 'https://drive.google.com/file/d/1PgGA6umiy4I5OZJkCn7IVb2g09Mne1fx/view?usp=drive_link' }
];

export const galleryImages = [
    "https://i.imgur.com/t25NA05.png", "https://i.imgur.com/nadk01u.png", "https://i.imgur.com/ZmL9Ag7.png",
    "https://i.imgur.com/6R0vW8A.png", "https://i.imgur.com/tp3Co6O.png", "https://i.imgur.com/HE6rwAZ.png",
    "https://i.imgur.com/6Yy6Evr.png", "https://i.imgur.com/pdrrnnV.png", "https://i.imgur.com/TPsJiO3.png",
    "https://i.imgur.com/PV2GyHp.png", "https://i.imgur.com/bceKuDM.png", "https://i.imgur.com/wKBAB05.png",
    "https://i.imgur.com/qpAk2Df.png", "https://i.imgur.com/cDARyA3.png", "https://i.imgur.com/cfW5vEH.png"
];

export const references = [
    "ABRAMOVAY, Miriam. Violências nas escolas. Flacso Brasil, 2015.",
    "ARENDT, Hannah. Eichmann em Jerusalém. São Paulo: Companhia das Letras, 1963.",
    "BOURDIEU, Pierre. Escritos de Educação. Petrópolis: Vozes, 1999.",
    "FREIRE, Paulo. Pedagogia da Autonomia. São Paulo: Paz e Terra, 1996.",
    "JARES, Xesús R. Educação para a Paz. Madrid: Editorial Popular, 1999.",
    "MORIN, Edgar. Os Sete Saberes Necessários à Educação do Futuro. São Paulo: Cortez, 2000.",
    "PICCOLI, L. M.; LENA, M. S.; GONÇALVES, T. R. Violência e sofrimento social no contexto escolar. Saúde e Sociedade, 2019.",
    "SPOSITO, Marília Pontes. Estudos sobre juventude e educação. Revista Brasileira de Educação, 1997.",
    "BRASIL. Lei nº 9.394/1996. Estabelece as Diretrizes e Bases da Educação Nacional.",
    "ONU/UNESCO. Declaração sobre uma Cultura de Paz, 1999."
];
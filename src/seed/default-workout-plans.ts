import type { WorkoutPlan } from '../common/types/workout-plan.types';

export const defaultWorkoutPlans: WorkoutPlan[] = [
  {
    id: '1',
    name: 'Dia 1 – HIIT Metabólico Corpo Inteiro',
    description:
      'Circuito de alta intensidade com foco em queima calórica máxima e condicionamento cardiovascular.',
    sections: [
      {
        name: 'Aquecimento (8 minutos)',
        exercises: [
          {
            name: 'Remo + Mobilidade Dinâmica',
            description:
              'Remar a ritmo moderado durante 5 minutos seguido de mobilidade de ancas, ombros e coluna torácica.',
            tips: 'Aumentar progressivamente o ritmo. Peito aberto. Respiração controlada.'
          }
        ]
      },
      {
        name: 'Circuito A (4 voltas – 40" ATIVO / 15" DESCANSO)',
        exercises: [
          {
            name: 'Kettlebell Swing Duplo',
            description:
              'Swing explosivo com dois kettlebells simultaneamente para máxima ativação da cadeia posterior e frequência cardíaca elevada.',
            tips: 'Explosão total das ancas. Costas neutras. Kettlebells ao nível dos ombros.',
            media: {
              type: 'video',
              url: 'https://www.youtube.com/embed/sSESeQAir2c',
              thumbnail: 'https://img.youtube.com/vi/sSESeQAir2c/maxresdefault.jpg'
            }
          },
          {
            name: 'Burpee com Salto para Caixa',
            description:
              'Burpee completo seguido de salto explosivo para a caixa. Combina força, potência e condicionamento.',
            tips: 'Aterrar suavemente na caixa. Descer controlado. Manter ritmo constante.'
          },
          {
            name: 'Thruster com Barbell',
            description:
              'Agachamento frontal combinado com press acima da cabeça num movimento contínuo e explosivo.',
            tips: 'Usar a impulsão das pernas para o press. Core firme. Carga moderada para manter velocidade.',
            media: {
              type: 'video',
              url: 'https://www.youtube.com/embed/L219gSLnFwI',
              thumbnail: 'https://img.youtube.com/vi/L219gSLnFwI/maxresdefault.jpg'
            }
          },
          {
            name: 'Slam Ball com Agachamento',
            description:
              'Pegar na bola do chão com agachamento, subir explosivamente e lançar com força máxima.',
            tips: 'Extensão total do corpo no lançamento. Costas neutras no agachamento. Máxima potência.',
            media: {
              type: 'video',
              url: 'https://www.youtube.com/embed/k9W6g9LvXDI',
              thumbnail: 'https://img.youtube.com/vi/k9W6g9LvXDI/maxresdefault.jpg'
            }
          }
        ]
      },
      {
        name: 'Circuito B (3 voltas – 30" ATIVO / 15" DESCANSO)',
        exercises: [
          {
            name: 'Empurrar Trenó (Sprint)',
            description: 'Empurrar o trenó a sprint máximo por 20–25 metros.',
            tips: 'Inclinação do tronco para a frente. Passos curtos e rápidos. Recuperação ativa entre voltas.'
          },
          {
            name: 'Bicicleta de Ar – Sprint',
            description:
              'Sprint máximo na bicicleta de ar durante 30 segundos seguido de recuperação.',
            tips: 'Braços e pernas em simultâneo. Máxima potência desde o início.'
          },
          {
            name: 'Mountain Climbers Cruzados',
            description:
              'Mountain climbers com joelho a tocar o cotovelo oposto, aumentando a rotação e ativação oblíqua.',
            tips: 'Ancas baixas. Ritmo alto. Não deixar as ancas subir.',
            media: {
              type: 'video',
              url: 'https://www.youtube.com/embed/cnyTQDSE884',
              thumbnail: 'https://img.youtube.com/vi/cnyTQDSE884/maxresdefault.jpg'
            }
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Dia 2 – Força + Hipertrofia Membros Superiores (Alta Intensidade)',
    description:
      'Treino de membros superiores com cargas elevadas, supersets e drop sets para máxima queima calórica e estímulo muscular.',
    sections: [
      {
        name: 'Ativação (5 minutos)',
        exercises: [
          {
            name: 'Band Pull-Apart + Rotação de Ombros',
            description:
              'Ativação dos rotadores externos e deltoides posteriores com elástico.',
            tips: 'Movimento controlado. Escápulas juntas no final.'
          }
        ]
      },
      {
        name: 'Bloco de Força – Supersets (4 séries x 8–10 reps / 60" descanso)',
        exercises: [
          {
            name: 'Bench Press com Barbell (Superset A1)',
            description:
              'Press de peito com barbell a carga elevada. Executar imediatamente antes do A2.',
            tips: 'Descida de 3 segundos. Explosão na subida. Omoplatas retraídas.'
          },
          {
            name: 'Remada Bent-Over com Barbell (Superset A2)',
            description:
              'Remada bilateral com barbell focada nas costas e bíceps. Executar após o A1 sem descanso.',
            tips: 'Tronco quase paralelo ao chão. Puxar até ao abdómen. Controlar a descida.',
            media: {
              type: 'video',
              url: 'https://www.youtube.com/embed/FWJR5Ve8bnQ',
              thumbnail: 'https://img.youtube.com/vi/FWJR5Ve8bnQ/maxresdefault.jpg'
            }
          },
          {
            name: 'Arnold Press com Halteres (Superset B1)',
            description:
              'Press de ombros com rotação para máxima ativação dos deltoides.',
            tips: 'Rotar suavemente. Sem arquear a lombar. Carga progressiva.',
            media: {
              type: 'video',
              url: 'https://www.youtube.com/embed/mXRhpXwW-gs',
              thumbnail: 'https://img.youtube.com/vi/mXRhpXwW-gs/maxresdefault.jpg'
            }
          },
          {
            name: 'Remada Alta com Barbell (Superset B2)',
            description:
              'Remada explosiva com barbell puxando até ao queixo para deltoides e trapézio.',
            tips: 'Cotovelos acima dos ombros. Explosão concentrica. Controlar a descida.',
            media: {
              type: 'video',
              url: 'https://www.youtube.com/embed/VSnBMZUqQnA',
              thumbnail: 'https://img.youtube.com/vi/VSnBMZUqQnA/maxresdefault.jpg'
            }
          }
        ]
      },
      {
        name: 'Bloco de Isolamento – Drop Sets (3 séries)',
        exercises: [
          {
            name: 'Curl de Bíceps com Barbell – Drop Set',
            description:
              'Iniciar com carga máxima até falha, reduzir 20% e continuar sem descanso. Repetir 3x.',
            tips: 'Cotovelos fixos. Não balançar. Reduzir carga rapidamente entre sets.'
          },
          {
            name: 'Tricep Pushdown em Cabo – Drop Set',
            description:
              'Extensão de tríceps em cabo com corda até falha, reduzir carga e continuar imediatamente.',
            tips: 'Cotovelos junto ao corpo. Extensão completa. Manter tensão durante toda a amplitude.',
            media: {
              type: 'video',
              url: 'https://www.youtube.com/embed/vB5OHsJ3EME',
              thumbnail: 'https://img.youtube.com/vi/vB5OHsJ3EME/maxresdefault.jpg'
            }
          },
          {
            name: 'Crossover de Cabos – Drop Set',
            description:
              'Cruzamento alto-para-baixo até falha, reduzir carga e continuar. Máxima ativação do peitoral.',
            tips: 'Cotovelos ligeiramente dobrados. Apertar no centro. Controlar a fase excêntrica.',
            media: {
              type: 'video',
              url: 'https://www.youtube.com/embed/Lc-cv1iLLrw',
              thumbnail: 'https://img.youtube.com/vi/Lc-cv1iLLrw/maxresdefault.jpg'
            }
          }
        ]
      },
      {
        name: 'Finisher Cardiovascular (1 volta)',
        exercises: [
          {
            name: "Farmer's Carry Sprint",
            description:
              'Carregar kettlebells pesados e caminhar o mais rápido possível por 40 metros. Repetir 3x.',
            tips: 'Core firme. Ombros para trás. Passos controlados e rápidos.'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Dia 3 – Potência de Membros Inferiores + Condicionamento Extremo',
    description:
      'Treino de pernas com cargas elevadas combinado com condicionamento metabólico de alta intensidade.',
    sections: [
      {
        name: 'Aquecimento Dinâmico (8 minutos)',
        exercises: [
          {
            name: 'Agachamento com Peso Corporal + Rotações de Anca',
            description:
              'Agachamentos lentos com pausa no fundo combinados com rotações de anca e mobilidade torácica.',
            tips: 'Foco na amplitude. Joelhos alinhados. Respiração ritmada.'
          }
        ]
      },
      {
        name: 'Bloco de Força (4 séries x 6–8 reps / 90" descanso)',
        exercises: [
          {
            name: 'Agachamento com Barbell (Back Squat)',
            description:
              'Agachamento traseiro a carga elevada. Base de todos os movimentos de pernas.',
            tips: 'Peito alto. Joelhos alinhados com os pés. Descer abaixo do paralelo.',
            media: {
              type: 'video',
              url: 'https://www.youtube.com/embed/ultWZbUMPL8',
              thumbnail: 'https://img.youtube.com/vi/ultWZbUMPL8/maxresdefault.jpg'
            }
          },
          {
            name: 'Peso Morto Romeno com Barbell',
            description: 'RDL com carga elevada focado nos isquiotibiais e glúteos.',
            tips: 'Coluna neutra. Ancas para trás. Sentir o alongamento dos isquiotibiais.',
            media: {
              type: 'video',
              url: 'https://www.youtube.com/embed/hFoLEO8TrSk',
              thumbnail: 'https://img.youtube.com/vi/hFoLEO8TrSk/maxresdefault.jpg'
            }
          },
          {
            name: 'Hip Thrust com Barbell',
            description:
              'Levantamento de ancas com barbell a carga máxima para glúteos e cadeia posterior.',
            tips: 'Apertar os glúteos no topo. Queixo para baixo. Pausa de 1 segundo no topo.',
            media: {
              type: 'video',
              url: 'https://www.youtube.com/embed/4z_2oHvIvkA',
              thumbnail: 'https://img.youtube.com/vi/4z_2oHvIvkA/maxresdefault.jpg'
            }
          }
        ]
      },
      {
        name: 'Circuito Metabólico (4 voltas – 40" ATIVO / 20" DESCANSO)',
        exercises: [
          {
            name: 'Salto para Caixa com Descida Controlada',
            description:
              'Salto máximo para caixa alta seguido de descida excêntrica lenta (3 segundos).',
            tips: 'Máxima potência no salto. Aterrar com os dois pés. Descer com controlo total.'
          },
          {
            name: 'Kettlebell Snatch',
            description:
              'Movimento balístico completo do chão acima da cabeça num só movimento explosivo.',
            tips: 'Explosão das ancas. Puxar próximo ao corpo. Estabilizar acima da cabeça.',
            media: {
              type: 'video',
              url: 'https://www.youtube.com/embed/lMSPauXpsSM',
              thumbnail: 'https://img.youtube.com/vi/lMSPauXpsSM/maxresdefault.jpg'
            }
          },
          {
            name: 'Lunge com Halteres – Ritmo Explosivo',
            description:
              'Afundos alternados em ritmo elevado com halteres, mantendo a frequência cardíaca alta.',
            tips: 'Passos longos. Joelho traseiro quase no chão. Subir explosivamente.'
          },
          {
            name: 'Empurrar + Puxar Trenó',
            description:
              'Empurrar o trenó 15 metros e puxar de volta com corda. Uma volta completa = 1 repetição.',
            tips: 'Máxima potência em cada volta. Recuperação apenas entre séries.'
          }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Dia 4 – Força Funcional Total + Finisher AMRAP',
    description:
      'Movimentos funcionais completos com cargas elevadas seguidos de um AMRAP final de alta intensidade para queima máxima.',
    sections: [
      {
        name: 'Aquecimento (8 minutos)',
        exercises: [
          {
            name: 'Remo + Mobilidade Torácica',
            description:
              'Remo a intensidade moderada durante 5 minutos seguido de mobilidade torácica e de ombros.',
            tips: 'Progressivo. Ativar as costas. Preparar os ombros para cargas overhead.'
          }
        ]
      },
      {
        name: 'Bloco Funcional (4 séries x 8 reps / 75" descanso)',
        exercises: [
          {
            name: 'Clean & Press com Barbell',
            description:
              'Power clean seguido de push press. Movimento total corpo máxima potência.',
            tips: 'Puxar com as pernas no clean. Usar a impulsão para o press. Carga progressiva.',
            media: {
              type: 'video',
              url: 'https://www.youtube.com/embed/jpsEEBGUSWs',
              thumbnail: 'https://img.youtube.com/vi/jpsEEBGUSWs/maxresdefault.jpg'
            }
          },
          {
            name: 'Pull-up com Carga',
            description:
              'Pull-up com colete de peso ou kettlebell preso ao cinto para máxima resistência.',
            tips: 'Peito à barra. Controlar a descida (3 segundos). Sem balanço.'
          },
          {
            name: 'Turkish Get-Up com Kettlebell',
            description:
              'Movimento de solo completo passando de deitado a de pé com kettlebell elevado. Força funcional total.',
            tips: 'Olhar para o kettlebell sempre. Movimento lento e controlado. Carga moderada.',
            media: {
              type: 'video',
              url: 'https://www.youtube.com/embed/0bWRPC49-KI',
              thumbnail: 'https://img.youtube.com/vi/0bWRPC49-KI/maxresdefault.jpg'
            }
          },
          {
            name: "Farmer's Carry com Kettlebells Pesados",
            description:
              'Transporte de carga máxima por 40 metros para fortalecer pega, core e postura.',
            tips: 'Ombros para trás e para baixo. Core firme. Passos controlados.',
            media: {
              type: 'video',
              url: 'https://www.youtube.com/embed/8OtwXwrJizk',
              thumbnail: 'https://img.youtube.com/vi/8OtwXwrJizk/maxresdefault.jpg'
            }
          }
        ]
      },
      {
        name: 'Core de Alta Intensidade (3 voltas – 45" ATIVO / 15" DESCANSO)',
        exercises: [
          {
            name: 'Elevação de Pernas em Suspensão com Rotação',
            description:
              'Elevação de joelhos em barra com rotação lateral alternada para ativação completa do core.',
            tips: 'Sem balançar. Rotação controlada. Respirar na descida.'
          },
          {
            name: 'Ab Wheel Rollout',
            description:
              'Extensão completa com roda abdominal para máxima ativação do core e estabilizadores.',
            tips: 'Core firme durante toda a amplitude. Não deixar a lombar ceder. Voltar devagar.',
            media: {
              type: 'video',
              url: 'https://www.youtube.com/embed/5dhDDiECaI4',
              thumbnail: 'https://img.youtube.com/vi/5dhDDiECaI4/maxresdefault.jpg'
            }
          },
          {
            name: 'Slam Ball com Rotação',
            description:
              'Slam lateral alternado – elevar a bola e lançar com rotação para o lado, alternando.',
            tips: 'Rotação a partir do tronco. Extensão total acima da cabeça. Máxima potência.',
            media: {
              type: 'video',
              url: 'https://www.youtube.com/embed/k9W6g9LvXDI',
              thumbnail: 'https://img.youtube.com/vi/k9W6g9LvXDI/maxresdefault.jpg'
            }
          }
        ]
      },
      {
        name: 'Finisher – AMRAP 8 minutos',
        exercises: [
          {
            name: 'AMRAP: Thruster + Burpee + Swing',
            description:
              'O máximo de rondas possível em 8 minutos: 5 Thrusters com barbell + 5 Burpees + 10 Kettlebell Swings.',
            tips: 'Ritmo sustentável desde o início. Não parar. Registar o número de rondas para progressão.'
          }
        ]
      }
    ]
  }
];

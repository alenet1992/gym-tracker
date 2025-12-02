import type { WorkoutPlan } from '@/types';

export const workoutPlans: WorkoutPlan[] = [
  {
    "id": "1",
    "name": "Dia 1 – Circuito Funcional Corpo Inteiro",
    "description": "Circuito funcional de corpo inteiro desenhado para melhorar a condição física, força e perda de gordura.",
    "sections": [
      {
        "name": "Aquecimento (8–10 minutos)",
        "exercises": [
          {
            "name": "Remo + mobilidade dinâmica",
            "description": "Remar levemente durante 4–5 minutos seguido de mobilidade para ancas, ombros e coluna torácica.",
            "tips": "Ritmo suave. Peito aberto. Mobilizar ancas de forma controlada.",
          }
        ]
      },
      {
        "name": "Circuito (3 voltas – 40\" ATIVO / 20\" DESCANSO)",
        "exercises": [
          {
            "name": "Kettlebell Deadlift High Pull",
            "description": "Padrão de anca com puxada explosiva levando o kettlebell à altura do peito.",
            "tips": "Explodir com as ancas. Cotovelos altos. Costas direitas.",
            "media": {
              "type": "video",
              "url": "https://www.youtube.com/embed/kmmnVzHlWmU?si=5bEDBSEu0KfObodC",
              "thumbnail": "https://img.youtube.com/vi/kmmnVzHlWmU/maxresdefault.jpg"
            }
          },
          {
            "name": "Salto para Caixa",
            "description": "Salto explosivo para cima da caixa para desenvolvimento de potência.",
            "tips": "Aterrar suavemente. Usar os braços. Escolher altura segura.",
          },
          {
            "name": "Remada TRX",
            "description": "Remada em suspensão envolvendo costas, bíceps e core.",
            "tips": "Corpo direito. Puxar com as costas. Controlar a descida.",
          },
          {
            "name": "Flexão com Rotação em T",
            "description": "Flexão seguida de rotação abrindo o peito para o lado.",
            "tips": "Core firme. Controlar a rotação.",
            "media": {
              "type": "video",
              "url": "https://www.youtube.com/embed/dSDoVEV2298?si=cnB6X3tXRcczVxO6",
              "thumbnail": "https://img.youtube.com/vi/2XFaK3bgT7w/maxresdefault.jpg"
            }
          },
          {
            "name": "Slam Ball",
            "description": "Slam explosivo usando a força do corpo inteiro.",
            "tips": "Ativar o core. Costas direitas. Extensão total.",
            "media": {
              "type": "video",
              "url": "https://www.youtube.com/embed/k9W6g9LvXDI?si=grZDBS41S0TaPE3I",
              "thumbnail": "https://img.youtube.com/vi/k9W6g9LvXDI/maxresdefault.jpg"
            }
          },
          {
            "name": "Bicicleta de Ar (intensidade)",
            "description": "Intervalos de alta intensidade envolvendo o corpo inteiro.",
            "tips": "Ritmo consistente. Usar braços e pernas."
          }
        ]
      }
    ]
  },
  {
    "id": "2",
    "name": "Dia 2 – Hipertrofia de Membros Superiores",
    "description": "Treino focado em hipertrofia dos membros superiores para força e crescimento muscular.",
    "sections": [
      {
        "name": "Força (3–4 séries de 10–12 repetições)",
        "exercises": [
          {
            "name": "Press de Peito",
            "description": "Movimento de empurrar horizontal focado no peito e tríceps.",
            "tips": "Controlar o ritmo. Ombros estáveis."
          },
          {
            "name": "Remada Unilateral com Haltere",
            "description": "Remada unilateral para ativação das costas e simetria.",
            "tips": "Puxar em direção à anca. Controlar a fase descendente."
          },
          {
            "name": "Arnold Press",
            "description": "Variação de press de ombro aumentando a ativação dos deltoides.",
            "tips": "Rodar suavemente. Evitar arquear.",
            "media": {
              "type": "video",
              "url": "https://www.youtube.com/embed/mXRhpXwW-gs?si=fWxZyO464ZB9a5oS",
              "thumbnail": "https://img.youtube.com/vi/mXRhpXwW-gs/maxresdefault.jpg"
            }
          },
          {
            "name": "Crossover de Cabos (Alto para Baixo)",
            "description": "Crossover de cabos enfatizando a ativação do peito inferior.",
            "tips": "Cotovelos ligeiramente dobrados. Apertar em baixo.",
            "media": {
              "type": "video",
              "url": "https://www.youtube.com/embed/Lc-cv1iLLrw?si=u5eeTaIPTzJTu4M7",
              "thumbnail": "https://img.youtube.com/vi/Lc-cv1iLLrw/maxresdefault.jpg"
            }
          },
          {
            "name": "Curl de Bíceps com Halteres em Banco Inclinado",
            "description": "Curl de bíceps em banco inclinado aumentando o alongamento e tensão.",
            "tips": "Manter cotovelos fixos. Descida lenta.",
            "media": {
              "type": "video",
              "url": "https://www.youtube.com/embed/9-V1xBBCRW4?si=Q3G44RpCFRkUV3sK",
              "thumbnail": "https://img.youtube.com/vi/soxrZlIl35U/maxresdefault.jpg"
            }
          },
          {
            "name": "Dips de Tríceps",
            "description": "Dips com peso corporal focados nos tríceps.",
            "tips": "Tronco vertical. Dobrar até 90 graus.",
            "media": {
              "type": "video",
              "url": "https://www.youtube.com/embed/0326dy_-CzM",
              "thumbnail": "https://img.youtube.com/vi/0326dy_-CzM/maxresdefault.jpg"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "3",
    "name": "Dia 3 – Membros Inferiores + Condicionamento",
    "description": "Força dos membros inferiores combinada com condicionamento metabólico.",
    "sections": [
      {
        "name": "Força + Condicionamento (10–12 repetições)",
        "exercises": [
          {
            "name": "Agachamento com Barra",
            "description": "Exercício composto principal para quadríceps e glúteos.",
            "tips": "Peito alto. Pés à largura dos ombros."
          },
          {
            "name": "Peso Morto Romeno",
            "description": "Padrão de anca focado nos isquiotibiais.",
            "tips": "Coluna neutra. Ancas para trás.",
            "media": {
              "type": "video",
              "url": "https://www.youtube.com/embed/hFoLEO8TrSk?si=oaejWXnPNW27AB1X",
              "thumbnail": "https://img.youtube.com/vi/hFoLEO8TrSk/maxresdefault.jpg"
            }
          },
          {
            "name": "Longe Caminhando",
            "description": "Exercício unilateral dinâmico para pernas e glúteos.",
            "tips": "Passos longos e controlados.",
          },
          {
            "name": "Empurrar Trenó",
            "description": "Movimento de condicionamento baseado em potência.",
            "tips": "Impulsionar com as pernas. Peito baixo.",
          },
          {
            "name": "Corda de Saltar",
            "description": "Condicionamento leve que melhora agilidade e queima de gordura.",
            "tips": "Saltos pequenos. Ombros relaxados."
          }
        ]
      }
    ]
  },
  {
    "id": "4",
    "name": "Dia 4 – Força Funcional + Core",
    "description": "Movimentos de força funcional combinados com trabalho de estabilidade do core.",
    "sections": [
      {
        "name": "Força + Core",
        "exercises": [
          {
            "name": "Kettlebell Clean & Press",
            "description": "Clean explosivo seguido de press acima da cabeça.",
            "tips": "Usar as pernas para potência. Estabilizar acima da cabeça.",
            "media": {
              "type": "video",
              "url": "https://www.youtube.com/embed/ckjR4jYtuYc?si=p21ShZo1bjnF8nHh",
              "thumbnail": "https://img.youtube.com/vi/8ZxP5d8QZ7o/maxresdefault.jpg"
            }
          },
          {
            "name": "Pull-up",
            "description": "Puxada vertical ativando costas e bíceps.",
            "tips": "Peito em direção à barra. Controlar a descida."
          },
          {
            "name": "Hip Thrust",
            "description": "Levantamento dominante de glúteos aumentando a potência da cadeia posterior.",
            "tips": "Apertar no topo. Queixo para baixo.",
            "media": {
              "type": "video",
              "url": "https://www.youtube.com/embed/4z_2oHvIvkA?si=mWiPlFkJ2KpaMAvk",
              "thumbnail": "https://img.youtube.com/vi/MN0C-xRRny8/maxresdefault.jpg"
            }
          },
          {
            "name": "Farmer’s Carry",
            "description": "Transporte carregado fortalecendo a pega, core e postura.",
            "tips": "Caminhar direito. Core firme.",
            "media": {
              "type": "image",
              "url": "https://www.youtube.com/embed/8OtwXwrJizk?si=97YSF_pQAtjHwvrK",
              "alt": "Exercício de Farmer’s Carry"
            }
          },
          {
            "name": "Elevação de Joelhos Suspenso",
            "description": "Exercício de ativação abdominal inferior.",
            "tips": "Evitar balançar. Movimento controlado."
          },
          {
            "name": "Prancha",
            "description": "Estabilização estática do core mantendo o alinhamento.",
            "tips": "Core firme. Coluna neutra."
          }
        ]
      }
    ]
  }, 
  {
    "id": "5",
    "name": "Abdominal + Cardio Blast",
    "description": "Focused conditioning session combining high-intensity cardio with core strengthening.",
    "sections": [
      {
        "name": "Warm-up (5 minutes)",
        "exercises": [
          {
            "name": "Light Jog + Torso Mobility",
            "description": "Jog slowly for 2 minutes followed by torso rotations and side bends.",
            "tips": "Keep movement relaxed. Increase body temperature gradually.",
            "media": {
              "type": "video",
              "url": "https://www.youtube.com/embed/2vjVfT1YxR0",
              "thumbnail": "https://img.youtube.com/vi/2vjVfT1YxR0/maxresdefault.jpg"
            }
          }
        ]
      },

      {
        "name": "Cardio Block (3 rounds – 45\" ON / 15\" OFF)",
        "exercises": [
          {
            "name": "High Knees",
            "description": "Run on the spot bringing knees to hip height.",
            "tips": "Stay tall. Fast footwork.",
            "media": {
              "type": "video",
              "url": "https://www.youtube.com/embed/OAJ_J3EZkdY",
              "thumbnail": "https://img.youtube.com/vi/OAJ_J3EZkdY/maxresdefault.jpg"
            }
          },
          {
            "name": "Mountain Climbers",
            "description": "Fast knee drives from plank position.",
            "tips": "Keep hips low. Rhythm over speed.",
            "media": {
              "type": "video",
              "url": "https://www.youtube.com/embed/cnyTQDSE884",
              "thumbnail": "https://img.youtube.com/vi/cnyTQDSE884/maxresdefault.jpg"
            }
          },
          {
            "name": "Jump Rope",
            "description": "Continuous rope jumping for cardio endurance.",
            "tips": "Small jumps. Relax shoulders.",
            "media": {
              "type": "video",
              "url": "https://www.youtube.com/embed/u3zgHI8QnqE",
              "thumbnail": "https://img.youtube.com/vi/u3zgHI8QnqE/maxresdefault.jpg"
            }
          }
        ]
      },

      {
        "name": "Core Block (3 rounds)",
        "exercises": [
          {
            "name": "Bicycle Crunch",
            "description": "Rotation-based abdominal exercise engaging obliques.",
            "tips": "Elbow to opposite knee. Don't pull neck.",
            "media": {
              "type": "video",
              "url": "https://www.youtube.com/embed/9FGilxCbdz8",
              "thumbnail": "https://img.youtube.com/vi/9FGilxCbdz8/maxresdefault.jpg"
            }
          },
          {
            "name": "Leg Raises",
            "description": "Lower-ab movement lifting legs upward with control.",
            "tips": "Lower slowly. Avoid arching the lower back.",
            "media": {
              "type": "video",
              "url": "https://www.youtube.com/embed/JB2oyawG9KI",
              "thumbnail": "https://img.youtube.com/vi/JB2oyawG9KI/maxresdefault.jpg"
            }
          },
          {
            "name": "Russian Twist",
            "description": "Seated rotation for oblique activation.",
            "tips": "Keep core tight. Rotate from torso.",
            "media": {
              "type": "video",
              "url": "https://www.youtube.com/embed/wkD8rjkodUI",
              "thumbnail": "https://img.youtube.com/vi/wkD8rjkodUI/maxresdefault.jpg"
            }
          }
        ]
      },

      {
        "name": "Finisher (1 round)",
        "exercises": [
          {
            "name": "Plank Hold",
            "description": "Static core stabilization maintaining alignment.",
            "tips": "Glutes squeezed. Neutral spine.",
            "media": {
              "type": "image",
              "url": "https://images.unsplash.com/photo-1594737625785-c03242e8e2b1?w=800",
              "alt": "Plank position"
            }
          },
          {
            "name": "Sprint Burst (20 seconds)",
            "description": "Maximum-effort sprint to finish the session.",
            "tips": "Lean slightly forward. Fast turnover.",
            "media": {
              "type": "video",
              "url": "https://www.youtube.com/embed/0YHBDZgN3Vw",
              "thumbnail": "https://img.youtube.com/vi/0YHBDZgN3Vw/maxresdefault.jpg"
            }
          }
        ]
      }
    ]
  }
];
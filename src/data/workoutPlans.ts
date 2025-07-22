import type { WorkoutPlan } from '@/types';

export const workoutPlans: WorkoutPlan[] = [
  {
    id: '1',
    name: 'Plan 1 – Functional + Full Body (Circuit)',
    description: 'Complete functional workout with full-body exercises in circuit format',
    sections: [
      {
        name: 'Warm-up (10 minutes)',
        exercises: [
          {
            name: 'Bike + joint mobility',
            description: 'Pedal on a stationary bike for 5-7 minutes, followed by mobility exercises for shoulders, hips and knees.',
            tips: 'Maintain a moderate pace on the bike. Make circular movements with your shoulders. Perform squats to mobilize hips and knees.'
          }
        ]
      },
      {
        name: 'Circuit 1 (3 rounds - 45" ON / 15" OFF)',
        exercises: [
          {
            name: 'Kettlebell Swing',
            description: 'Explosive movement with kettlebell, starting with hip flexion and powerful extension.',
            tips: 'Keep your back straight. Use hip power, not arms. Always look forward.',
            media: {
              type: 'video',
              url: 'https://www.youtube.com/embed/YSxHifyI6s8',
              thumbnail: 'https://img.youtube.com/vi/YSxHifyI6s8/maxresdefault.jpg'
            }
          },
          {
            name: 'Burpee with jump',
            description: 'Complete exercise that combines squat, plank, push-up and vertical jump.',
            tips: 'Keep your core engaged. Land softly after jumping. Maintain a steady pace.',
            media: {
              type: 'video',
              url: 'https://www.youtube.com/embed/TU8QYVW0gDU',
              thumbnail: 'https://img.youtube.com/vi/TU8QYVW0gDU/maxresdefault.jpg'
            }
          },
          {
            name: 'Rowing (cardio)',
            description: 'Cardiovascular exercise on the rowing machine, working the whole body.',
            tips: 'Pull with your back, not just your arms. Keep your legs firm. Breathe in a controlled manner.', 
          },
          {
            name: 'Pull Up (with elastic band)',
            description: 'Assisted pull exercise with elastic band to work back and biceps.',
            tips: 'Lower in a controlled manner. Squeeze your shoulder blades. Use the elastic only as assistance.', 
            media: {
              type: 'image',
              url: 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/12/pull-up-pullup-gym-1296x728-header-1296x728.jpg?w=1155&h=1528',
              alt: 'Dynamic plank with shoulder tap demonstration'
            }
          },
          {
            name: 'Dynamic plank (with shoulder tap)',
            description: 'Plank with alternating movement of touching the opposite shoulder, maintaining core stability.',
            tips: 'Avoid swaying your hips. Keep your core engaged. Controlled movements.',
            media: {
              type: 'image',
              url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              alt: 'Demonstração de prancha com toque no ombro'
            }
          },
          {
            name: 'Jump squat',
            description: 'Explosive squat followed by vertical jump, working leg power.',
            tips: 'Lower to 90 degrees. Jump as high as possible. Land softly.',
            media: {
              type: 'video',
              url: 'https://www.youtube.com/embed/CVaEhXotL7M',
              thumbnail: 'https://img.youtube.com/vi/CVaEhXotL7M/maxresdefault.jpg'
            }
          },
          {
            name: 'Shoulder Press with dumbbells',
            description: 'Shoulder press with dumbbells, working deltoids and triceps.',
            tips: 'Keep your core stable. Don\'t arch your back. Controlled movement.', 
            media: {
              type: 'image',
              url: 'https://www.nit.pt/wp-content/uploads/2016/10/886ac4a2-afe5-44f8-bdcd-355dafb924da-754x394.jpg',
              alt: 'Shoulder Press with dumbbells'
            }
          }
        ]
      },
      {
        name: 'Core',
        exercises: [
          {
            name: 'Bicycle crunches',
            description: 'Alternating movement simulating pedaling, working obliques and rectus abdominis.',
            tips: 'Touch elbow to opposite knee. Keep your back on the floor. Controlled movement.'
          },
          {
            name: 'Front plank',
            description: 'Static position maintaining body alignment, strengthening the entire core.',
            tips: 'Body in straight line. Don\'t let your hips drop. Breathe normally.'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Plan 2 – Upper Body Strength (Progressive Load)',
    description: 'Training focused on upper body muscle development with load progression',
    sections: [
      {
        name: 'Warm-up (10 minutes)',
        exercises: [
          {
            name: 'Elliptical or rope + miniband activation',
            description: 'Cardiovascular warm-up followed by muscle activation with minibands.',
            tips: '5-7 minutes of light cardio. Activate shoulders and back with minibands. Prepare the joints.'
          }
        ]
      },
      {
        name: 'Strength (3 sets of 15 reps)',
        exercises: [
          {
            name: 'Seated Row (back)',
            description: 'Seated rowing working latissimus dorsi and rhomboids.',
            tips: 'Squeeze your shoulder blades. Keep your back straight. Pull to your abdomen.',
            media: {
              type: 'image',
              url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              alt: 'Seated row demonstration'
            }
          },
          {
            name: 'Lat Pulldown (back)',
            description: 'High pull working latissimus dorsi and biceps.',
            tips: 'Pull to your chest. Lean your torso slightly. Lower in a controlled manner.',
            media: {
              type: 'image',
              url: 'https://training.fit/wp-content/uploads/2020/02/latzug-enger-griff-800x448.png',
              alt: 'Lat Pulldown (back)'
            }
          },
          {
            name: 'Incline barbell bench press (chest)',
            description: 'Exercise for upper chest, anterior deltoids and triceps.',
            tips: 'Bench at 30-45 degrees. Lower to your chest. Keep your feet on the floor.', 
            media: {
              type: 'image',
              url: 'https://www.hipertrofia.org/blog/wp-content/uploads/2018/08/supino-inclinado-com-barra.jpg',
              alt: 'Incline barbell bench press (chest)'
            }
          },
          {
            name: 'Dumbbell flyes (chest)',
            description: 'Chest isolation with opening and closing movement.',
            tips: 'Slight bend in elbows. Lower until you feel a stretch. Controlled movement.',
            media: {
              type: 'image',
              url: 'https://www.fitness4all.pt/wp-content/uploads/2016/02/supino3-wpp1660516778830.jpg',
              alt: 'Dumbbell flyes (chest)'
            }
          },
          {
            name: 'Bicep curl com barra',
            description: 'Flexão de cotovelo trabalhando bíceps braquial.',
            tips: 'Cotovelos fixos ao corpo. Movimento completo. Desça controladamente.',
            media: {
              type: 'image',
              url: 'https://www.hipertrofia.org/blog/wp-content/uploads/2019/04/ez-barbell-curl.gif',
              alt: 'Bicep curl com barra'
            }
          },
          {
            name: 'Tricep na polia com corda',
            description: 'Extensão de cotovelo trabalhando tríceps braquial.',
            tips: 'Cotovelos fixos. Abra a corda no final. Movimento controlado.',
            media: {
              type: 'image',
              url: 'https://static.strengthlevel.com/images/exercises/tricep-rope-pushdown/tricep-rope-pushdown-400.avif',
              alt: 'Tricep na polia com corda'
            }
          }
        ]
      },
      {
        name: 'Cardio final (10 minutos)',
        exercises: [
          {
            name: 'Bike: moderado/intenso',
            description: 'Finalização cardiovascular com intensidade moderada a intensa.',
            tips: 'Varie a intensidade. Mantenha boa postura. Hidrate-se bem.'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Plano 3 – Funcional + Pernas (Potência e Resistência)',
    description: 'Treino funcional focado no desenvolvimento de potência e resistência das pernas',
    sections: [
      {
        name: 'Aquecimento (8-10 minutos)',
        exercises: [
          {
            name: 'Escadas + mobilidade dinâmica',
            description: 'Subida de escadas seguida de exercícios de mobilidade dinâmica.',
            tips: 'Suba 2 degraus de cada vez. Mobilize quadris e tornozelos. Aqueça gradualmente.'
          }
        ]
      },
      {
        name: 'Circuito (2 a 3 voltas)',
        exercises: [
          {
            name: 'Walking Lunge com halteres',
            description: 'Passadas alternadas com halteres, trabalhando quadríceps e glúteos.',
            tips: 'Desça até 90 graus. Mantenha o tronco ereto. Passo amplo.',
            media: {
              type: 'image',
              thumbnail: 'https://img.youtube.com/vi/L8fvypPrzzs/maxresdefault.jpg',
              url: 'https://www.myprotein.pt/images?url=https://blogscdn.thehut.net/app/uploads/sites/461/2019/08/Walking-Lungesopt_hero_1566910002.jpg&auto=avif&width=1800&fit=crop'
            }
          },
          {
            name: 'Wall Ball',
            description: 'Agachamento com arremesso de bola medicinal na parede.',
            tips: 'Agache profundo. Arremesse acima da cabeça. Movimento explosivo.'
          },
          {
            name: 'Corda naval',
            description: 'Ondulações com corda pesada, trabalhando todo o corpo.',
            tips: 'Mantenha o core contraído. Movimento alternado. Intensidade alta.',
          },
          {
            name: 'Mountain Climbers',
            description: 'Simulação de escalada em posição de prancha.',
            tips: 'Mantenha a prancha. Movimento rápido. Core sempre contraído.',
            media: {
              type: 'image',
              url: 'https://hips.hearstapps.com/hmg-prod/images/rw-jess-mountain-climber-1596573079.jpg?crop=0.673xw:1.00xh;0.0993xw,0&resize=1200:*',
              alt: 'Demonstração de Mountain Climbers'
            }
          },
          {
            name: 'Subida na caixa com salto',
            description: 'Subida explosiva na caixa seguida de salto.',
            tips: 'Aterrisse suavemente. Use os braços para impulso. Caixa na altura do joelho.'
          },
          {
            name: 'Agachamento com kettlebell',
            description: 'Agachamento segurando kettlebell junto ao peito.',
            tips: 'Desça até paralelo. Mantenha o peito alto. Peso nos calcanhares.',
            media: {
              type: 'image',
              url: 'https://www.myprotein.pt/images?url=https://blogscdn.thehut.net/wp-content/uploads/sites/461/2015/11/24222433/genuflexiuni.jpg&format=webp&auto=avif&width=587&height=408&fit=crop',
              alt: 'Agachamento com kettlebell'
            }
          },
          {
            name: 'Tríceps na caixa',
            description: 'Flexão de tríceps usando caixa ou banco como apoio.',
            tips: 'Desça até 90 graus. Mantenha o corpo próximo. Movimento controlado.',
            media: {
              type: 'image',
              url: 'https://www.nit.pt/wp-content/uploads/2016/10/a0bbdbf5-5535-4311-9de7-d56c571fe536-754x394.jpg',
              alt: 'Tríceps na caixa'
            }
          }
        ]
      },      
      {
        name: 'Core final (1 round)',
        exercises: [
          {
            name: 'Prancha lateral com elevação de perna',
            description: 'Prancha lateral com movimento de elevação da perna superior.',
            tips: 'Mantenha o corpo alinhado. Eleve a perna controladamente. Não deixe o quadril cair.'
          },
          {
            name: 'Abdominal V-up',
            description: 'Flexão simultânea de tronco e pernas formando um V.',
            tips: 'Toque os pés com as mãos. Mantenha as pernas estendidas. Movimento controlado.'
          }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Plano 4 – Musculação Inferior (Carga Progressiva)',
    description: 'Treino focado no desenvolvimento da musculatura inferior com progressão de carga',
    sections: [
      {
        name: 'Aquecimento (5-7 minutos)',
        exercises: [
          {
            name: 'Caminhada inclinada ou elíptica + mobilidade',
            description: 'Aquecimento cardiovascular seguido de mobilidade específica.',
            tips: 'Inclinação moderada. Mobilize quadris em todas as direções. Circule os tornozelos.'
          }
        ]
      },
      {
        name: 'Força (3 séries, aumentar peso por série)',
        exercises: [
          {
            name: 'Leg Extension',
            description: 'Extensão de joelhos trabalhando quadríceps.',
            tips: 'Movimento controlado. Pausa no topo. Não trave os joelhos.',
            media: {
              type: 'image',
              url: 'https://gymgeek.com/wp-content/uploads/2024/02/machine-leg-extensions.png',
              alt: 'Leg Extension'
            }
          },
          {
            name: 'Leg Curl',
            description: 'Flexão de joelhos trabalhando isquiotibiais.',
            tips: 'Quadris fixos no banco. Movimento completo. Desça controladamente.',
            media: {
              type: 'image',
              url: 'https://gymgeek.com/wp-content/uploads/2024/02/machine-leg-extensions.png',
              alt: 'Leg Extension'
            }
          },
          {
            name: 'Leg Press',
            description: 'Pressão de pernas trabalhando quadríceps e glúteos.',
            tips: 'Desça até 90 graus. Pés na largura dos ombros. Não trave os joelhos.',
            media: {
              type: 'image',
              url: 'https://training.fit/wp-content/uploads/2020/03/beinbeugen-liegend-geraet.png',
              alt: 'Leg Press'
            }
          },
          {
            name: 'Gémeos na Leg Press',
            description: 'Elevação de calcanhares na leg press trabalhando panturrilhas.',
            tips: 'Movimento completo. Pausa no topo. Desça controladamente.',
            media: {
              type: 'image',
              url: 'https://ginasiovirtual.com/wp-content/uploads/2021/06/Gemeos-na-prensa.jpg',
              alt: 'Gémeos na Leg Press'
            }
          },
          {
            name: 'Deadlift com barra',
            description: 'Levantamento terra trabalhando posterior da coxa e glúteos.',
            tips: 'Mantenha as costas retas. Barra próxima ao corpo. Movimento dos quadris.',
            media: {
              type: 'video',
              url: 'https://nerdfit.com.br/wp-content/uploads/coluna-netra.jpg',
              thumbnail: 'Deadlift com barra'
            }
          },
          {
            name: 'Bulgarian Split Squat',
            description: 'Agachamento unilateral com pé traseiro elevado.',
            tips: 'Desça verticalmente. Peso na perna da frente. Mantenha o equilíbrio.', 
            media: {
              type: 'video',
              url: 'https://image-tc.galaxy.tf/wijpeg-3z4q664j4hp77n464taxm3j3m/how-to-do-a-bulgarian-split-squat_standard.jpg?crop=182%2C0%2C837%2C628&width=928',
              thumbnail: 'Deadlift com barra'
            }
          },
          {
            name: 'Agachamento na barra fixa',
            description: 'Agachamento livre com barra nas costas.',
            tips: 'Desça até paralelo. Joelhos alinhados com os pés. Peito alto.', 
            media: {
              type: 'image',
              url: 'https://s2-ge.glbimg.com/Elfw2jgghetu5Bgo05Rsw3iWM6s=/0x0:1254x836/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2024/t/h/zsPtNAQDyvOxgTasxSVQ/istock-1391565792.jpg',
              thumbnail: 'Deadlift com barra'
            }
          }
        ]
      },
      {
        name: 'Cardio final (10 minutos)',
        exercises: [
          {
            name: 'Corrida leve ou elíptica',
            description: 'Finalização cardiovascular com intensidade leve a moderada.',
            tips: 'Ritmo confortável. Respire profundamente. Relaxe os músculos.'
          }
        ]
      }
    ]
  }
];
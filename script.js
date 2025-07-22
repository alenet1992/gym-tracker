// Dados dos planos de treino
const workoutPlans = {
    1: {
        name: "Plano 1 – Funcional + Full Body (Circuito)",
        sections: [
            {
                name: "Aquecimento",
                duration: "10 minutos",
                exercises: [
                    {
                        name: "Bicicleta + mobilidade articular",
                        details: "ombros, quadril, joelhos",
                        description: "Pedale numa bicicleta estática durante 5-7 minutos, seguido de exercícios de mobilidade para ombros, quadril e joelhos.",
                        tips: ["Mantenha um ritmo moderado na bicicleta", "Faça movimentos circulares com os ombros", "Realize agachamentos para mobilizar quadril e joelhos"]
                    }
                ]
            },
            {
                name: "Circuito 1",
                duration: "3 voltas - 45'' ON / 15'' OFF",
                exercises: [
                    {
                        name: "Kettlebell Swing",
                        details: "45 segundos",
                        description: "Movimento explosivo com kettlebell, iniciando com flexão de quadril e extensão poderosa.",
                        tips: ["Mantenha as costas retas", "Use a força dos quadris, não dos braços", "Olhe sempre em frente"],
                        media: {
                            type: "video",
                            url: "https://www.youtube.com/embed/YSxHifyI6s8",
                            thumbnail: "https://img.youtube.com/vi/YSxHifyI6s8/maxresdefault.jpg"
                        }
                    },
                    {
                        name: "Burpee com salto",
                        details: "45 segundos",
                        description: "Exercício completo que combina agachamento, prancha, flexão e salto vertical.",
                        tips: ["Mantenha o core contraído", "Aterrisse suavemente após o salto", "Mantenha um ritmo constante"],
                        media: {
                            type: "video",
                            url: "https://www.youtube.com/embed/TU8QYVW0gDU",
                            thumbnail: "https://img.youtube.com/vi/TU8QYVW0gDU/maxresdefault.jpg"
                        }
                    },
                    {
                        name: "Remo (cardio)",
                        details: "45 segundos",
                        description: "Exercício cardiovascular na máquina de remo, trabalhando todo o corpo.",
                        tips: ["Puxe com as costas, não só com os braços", "Mantenha as pernas firmes", "Respire de forma controlada"]
                    },
                    {
                        name: "Pull Up (com elástico)",
                        details: "45 segundos",
                        description: "Exercício de tração assistido com elástico para trabalhar costas e bíceps.",
                        tips: ["Desça controladamente", "Aperte as omoplatas", "Use o elástico apenas como assistência"]
                    },
                    {
                        name: "Prancha dinâmica (com toque no ombro)",
                        details: "45 segundos",
                        description: "Prancha com movimento alternado de tocar o ombro oposto, mantendo estabilidade do core.",
                        tips: ["Evite balançar os quadris", "Mantenha o core contraído", "Movimentos controlados"],
                        media: {
                            type: "image",
                            url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                            alt: "Demonstração de prancha com toque no ombro"
                        }
                    },
                    {
                        name: "Agachamento com salto",
                        details: "45 segundos",
                        description: "Agachamento explosivo seguido de salto vertical, trabalhando potência das pernas.",
                        tips: ["Desça até 90 graus", "Salte o mais alto possível", "Aterrisse suavemente"],
                        media: {
                            type: "video",
                            url: "https://www.youtube.com/embed/CVaEhXotL7M",
                            thumbnail: "https://img.youtube.com/vi/CVaEhXotL7M/maxresdefault.jpg"
                        }
                    },
                    {
                        name: "Shoulder Press com halteres",
                        details: "45 segundos",
                        description: "Pressão de ombros com halteres, trabalhando deltoides e tríceps.",
                        tips: ["Mantenha o core estável", "Não arqueie as costas", "Movimento controlado"]
                    }
                ]
            },
            {
                name: "Core",
                duration: "",
                exercises: [
                    {
                        name: "Abdominal bicicleta",
                        details: "3x 45 segundos",
                        description: "Movimento alternado simulando pedalada, trabalhando oblíquos e reto abdominal.",
                        tips: ["Toque o cotovelo no joelho oposto", "Mantenha as costas no chão", "Movimento controlado"]
                    },
                    {
                        name: "Prancha frontal",
                        details: "3x 30 segundos",
                        description: "Posição estática mantendo o corpo alinhado, fortalecendo todo o core.",
                        tips: ["Corpo em linha reta", "Não deixe os quadris caírem", "Respire normalmente"]
                    }
                ]
            }
        ]
    },
    2: {
        name: "Plano 2 – Musculação Superior (Carga Progressiva)",
        sections: [
            {
                name: "Aquecimento",
                duration: "10 minutos",
                exercises: [
                    {
                        name: "Elíptica ou corda + ativação com minibands",
                        details: "ombros e costas",
                        description: "Aquecimento cardiovascular seguido de ativação muscular com minibands.",
                        tips: ["5-7 minutos de cardio leve", "Ative ombros e costas com minibands", "Prepare as articulações"]
                    }
                ]
            },
            {
                name: "Força",
                duration: "3 séries de 15 reps",
                exercises: [
                    {
                        name: "Seated Row (costas)",
                        details: "3x15",
                        description: "Remada sentada trabalhando latíssimo do dorso e romboides.",
                        tips: ["Aperte as omoplatas", "Mantenha as costas retas", "Puxe até o abdômen"],
                        media: {
                            type: "image",
                            url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                            alt: "Demonstração de remada sentada"
                        }
                    },
                    {
                        name: "Lat Pulldown (costas)",
                        details: "3x15",
                        description: "Puxada alta trabalhando latíssimo do dorso e bíceps.",
                        tips: ["Puxe até o peito", "Incline ligeiramente o tronco", "Desça controladamente"]
                    },
                    {
                        name: "Supino inclinado com barra (peito)",
                        details: "3x15",
                        description: "Exercício para peito superior, deltoides anterior e tríceps.",
                        tips: ["Banco a 30-45 graus", "Desça até o peito", "Mantenha os pés no chão"]
                    },
                    {
                        name: "Aberturas com halteres (peito)",
                        details: "3x15",
                        description: "Isolamento do peitoral com movimento de abertura e fechamento.",
                        tips: ["Ligeira flexão nos cotovelos", "Desça até sentir alongamento", "Movimento controlado"]
                    },
                    {
                        name: "Bicep curl com barra",
                        details: "3x15",
                        description: "Flexão de cotovelo trabalhando bíceps braquial.",
                        tips: ["Cotovelos fixos ao corpo", "Movimento completo", "Desça controladamente"]
                    },
                    {
                        name: "Tricep na polia com corda",
                        details: "3x15",
                        description: "Extensão de cotovelo trabalhando tríceps braquial.",
                        tips: ["Cotovelos fixos", "Abra a corda no final", "Movimento controlado"]
                    }
                ]
            },
            {
                name: "Cardio final",
                duration: "10 minutos",
                exercises: [
                    {
                        name: "Bike: moderado/intenso",
                        details: "10 minutos",
                        description: "Finalização cardiovascular com intensidade moderada a intensa.",
                        tips: ["Varie a intensidade", "Mantenha boa postura", "Hidrate-se bem"]
                    }
                ]
            }
        ]
    },
    3: {
        name: "Plano 3 – Funcional + Pernas (Potência e Resistência)",
        sections: [
            {
                name: "Aquecimento",
                duration: "8-10 minutos",
                exercises: [
                    {
                        name: "Escadas + mobilidade dinâmica",
                        details: "8-10 minutos",
                        description: "Subida de escadas seguida de exercícios de mobilidade dinâmica.",
                        tips: ["Suba 2 degraus de cada vez", "Mobilize quadris e tornozelos", "Aqueça gradualmente"]
                    }
                ]
            },
            {
                name: "Circuito",
                duration: "2 a 3 voltas",
                exercises: [
                    {
                        name: "Walking Lunge com halteres",
                        details: "20 passos",
                        description: "Passadas alternadas com halteres, trabalhando quadríceps e glúteos.",
                        tips: ["Desça até 90 graus", "Mantenha o tronco ereto", "Passo amplo"],
                        media: {
                            type: "video",
                            url: "https://www.youtube.com/embed/L8fvypPrzzs",
                            thumbnail: "https://img.youtube.com/vi/L8fvypPrzzs/maxresdefault.jpg"
                        }
                    },
                    {
                        name: "Wall Ball",
                        details: "1 minuto",
                        description: "Agachamento com arremesso de bola medicinal na parede.",
                        tips: ["Agache profundo", "Arremesse acima da cabeça", "Movimento explosivo"]
                    },
                    {
                        name: "Corda naval",
                        details: "30 segundos",
                        description: "Ondulações com corda pesada, trabalhando todo o corpo.",
                        tips: ["Mantenha o core contraído", "Movimento alternado", "Intensidade alta"]
                    },
                    {
                        name: "Mountain Climbers",
                        details: "45 segundos",
                        description: "Simulação de escalada em posição de prancha.",
                        tips: ["Mantenha a prancha", "Movimento rápido", "Core sempre contraído"],
                        media: {
                            type: "image",
                            url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                            alt: "Demonstração de Mountain Climbers"
                        }
                    },
                    {
                        name: "Subida na caixa com salto",
                        details: "12 reps",
                        description: "Subida explosiva na caixa seguida de salto.",
                        tips: ["Aterrisse suavemente", "Use os braços para impulso", "Caixa na altura do joelho"]
                    },
                    {
                        name: "Agachamento com kettlebell",
                        details: "15 reps",
                        description: "Agachamento segurando kettlebell junto ao peito.",
                        tips: ["Desça até paralelo", "Mantenha o peito alto", "Peso nos calcanhares"]
                    },
                    {
                        name: "Tríceps na caixa",
                        details: "15 reps",
                        description: "Flexão de tríceps usando caixa ou banco como apoio.",
                        tips: ["Desça até 90 graus", "Mantenha o corpo próximo", "Movimento controlado"]
                    }
                ]
            },
            {
                name: "Core final",
                duration: "1 round",
                exercises: [
                    {
                        name: "Prancha lateral com elevação de perna",
                        details: "30 segundos por lado",
                        description: "Prancha lateral com movimento de elevação da perna superior.",
                        tips: ["Mantenha o corpo alinhado", "Eleve a perna controladamente", "Não deixe o quadril cair"]
                    },
                    {
                        name: "Abdominal V-up",
                        details: "15 reps",
                        description: "Flexão simultânea de tronco e pernas formando um V.",
                        tips: ["Toque os pés com as mãos", "Mantenha as pernas estendidas", "Movimento controlado"]
                    }
                ]
            }
        ]
    },
    4: {
        name: "Plano 4 – Musculação Inferior (Carga Progressiva)",
        sections: [
            {
                name: "Aquecimento",
                duration: "5-7 minutos",
                exercises: [
                    {
                        name: "Caminhada inclinada ou elíptica + mobilidade",
                        details: "quadril, tornozelos",
                        description: "Aquecimento cardiovascular seguido de mobilidade específica.",
                        tips: ["Inclinação moderada", "Mobilize quadris em todas as direções", "Circule os tornozelos"]
                    }
                ]
            },
            {
                name: "Força",
                duration: "3 séries, aumentar peso por série",
                exercises: [
                    {
                        name: "Leg Extension",
                        details: "3 séries progressivas",
                        description: "Extensão de joelhos trabalhando quadríceps.",
                        tips: ["Movimento controlado", "Pausa no topo", "Não trave os joelhos"]
                    },
                    {
                        name: "Leg Curl",
                        details: "3 séries progressivas",
                        description: "Flexão de joelhos trabalhando isquiotibiais.",
                        tips: ["Quadris fixos no banco", "Movimento completo", "Desça controladamente"]
                    },
                    {
                        name: "Leg Press",
                        details: "3 séries progressivas",
                        description: "Pressão de pernas trabalhando quadríceps e glúteos.",
                        tips: ["Desça até 90 graus", "Pés na largura dos ombros", "Não trave os joelhos"],
                        media: {
                            type: "video",
                            url: "https://www.youtube.com/embed/IZxyjW7MPJQ",
                            thumbnail: "https://img.youtube.com/vi/IZxyjW7MPJQ/maxresdefault.jpg"
                        }
                    },
                    {
                        name: "Gémeos na Leg Press",
                        details: "3 séries progressivas",
                        description: "Elevação de calcanhares na leg press trabalhando panturrilhas.",
                        tips: ["Movimento completo", "Pausa no topo", "Desça controladamente"]
                    },
                    {
                        name: "Deadlift com barra",
                        details: "3 séries progressivas",
                        description: "Levantamento terra trabalhando posterior da coxa e glúteos.",
                        tips: ["Mantenha as costas retas", "Barra próxima ao corpo", "Movimento dos quadris"],
                        media: {
                            type: "video",
                            url: "https://www.youtube.com/embed/ytGaGIn3SjE",
                            thumbnail: "https://img.youtube.com/vi/ytGaGIn3SjE/maxresdefault.jpg"
                        }
                    },
                    {
                        name: "Bulgarian Split Squat",
                        details: "3 séries progressivas",
                        description: "Agachamento unilateral com pé traseiro elevado.",
                        tips: ["Desça verticalmente", "Peso na perna da frente", "Mantenha o equilíbrio"]
                    },
                    {
                        name: "Agachamento na barra fixa",
                        details: "3 séries progressivas",
                        description: "Agachamento livre com barra nas costas.",
                        tips: ["Desça até paralelo", "Joelhos alinhados com os pés", "Peito alto"]
                    }
                ]
            },
            {
                name: "Cardio final",
                duration: "10 minutos",
                exercises: [
                    {
                        name: "Corrida leve ou elíptica",
                        details: "10 minutos",
                        description: "Finalização cardiovascular com intensidade leve a moderada.",
                        tips: ["Ritmo confortável", "Respire profundamente", "Relaxe os músculos"]
                    }
                ]
            }
        ]
    }
};

// Estado da aplicação
let currentView = 'plans';
let currentWorkout = null;
let workoutStartTime = null;
let timerInterval = null;
let completedExercises = new Set();

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    loadHistory();
    showView('plans');
}

function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            switchNavigation(view);
            showView(view);
        });
    });
}

function switchNavigation(activeView) {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === activeView) {
            btn.classList.add('active');
        }
    });
}

function showView(viewName) {
    const views = document.querySelectorAll('.view');
    views.forEach(view => view.classList.remove('active'));
    
    const targetView = document.getElementById(viewName + '-view');
    if (targetView) {
        targetView.classList.add('active');
        currentView = viewName;
    }
}

function viewPlan(planId) {
    const plan = workoutPlans[planId];
    if (!plan) return;
    
    const content = document.getElementById('plan-detail-content');
    content.innerHTML = `
        <h2>${plan.name}</h2>
        ${plan.sections.map(section => `
            <div class="exercise-section">
                <h3>${section.name} ${section.duration ? `(${section.duration})` : ''}</h3>
                <ul class="exercise-list">
                    ${section.exercises.map(exercise => `
                        <li class="exercise-item">
                            <span class="exercise-name" onclick="showExerciseDetail('${exercise.name}', ${planId}, '${section.name}')">
                                ${exercise.media ? `<i class="fas fa-${exercise.media.type === 'video' ? 'play-circle' : 'image'}" style="color: #667eea; margin-right: 0.5rem;"></i>` : ''}
                                ${exercise.name}
                            </span>
                            <span class="exercise-details">${exercise.details}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `).join('')}
    `;
    
    showView('plan-detail');
}

function showExerciseDetail(exerciseName, planId, sectionName) {
    const plan = workoutPlans[planId];
    const section = plan.sections.find(s => s.name === sectionName);
    const exercise = section.exercises.find(e => e.name === exerciseName);
    
    if (!exercise) return;
    
    const modal = document.getElementById('exercise-modal');
    const content = document.getElementById('exercise-detail');
    
    content.innerHTML = `
        <div class="exercise-modal-content">
            <h3>${exercise.name}</h3>
            <div class="exercise-description">
                <p><strong>Detalhes:</strong> ${exercise.details}</p>
                <p>${exercise.description}</p>
            </div>
            ${exercise.media ? `
                <div class="exercise-media">
                    ${exercise.media.type === 'video' ? `
                        <div class="video-container">
                            <iframe 
                                src="${exercise.media.url}" 
                                frameborder="0" 
                                allowfullscreen
                                title="Demonstração: ${exercise.name}"
                                loading="lazy">
                            </iframe>
                        </div>
                    ` : exercise.media.type === 'image' ? `
                        <img 
                            src="${exercise.media.url}" 
                            alt="${exercise.media.alt || exercise.name}"
                            loading="lazy"
                        />
                    ` : ''}
                </div>
            ` : ''}
            ${exercise.tips ? `
                <div class="exercise-tips">
                    <h4><i class="fas fa-lightbulb"></i> Dicas de Execução</h4>
                    <ul>
                        ${exercise.tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
         </div>
     `;
    
    modal.classList.add('active');
}

function closeExerciseModal() {
    const modal = document.getElementById('exercise-modal');
    modal.classList.remove('active');
}

function startWorkout(planId) {
    const plan = workoutPlans[planId];
    if (!plan) return;
    
    currentWorkout = {
        planId: planId,
        planName: plan.name,
        startTime: new Date(),
        exercises: []
    };
    
    // Flatten all exercises from all sections
    plan.sections.forEach(section => {
        section.exercises.forEach(exercise => {
            currentWorkout.exercises.push({
                name: exercise.name,
                section: section.name,
                details: exercise.details,
                completed: false
            });
        });
    });
    
    completedExercises.clear();
    workoutStartTime = Date.now();
    startTimer();
    
    renderWorkout();
    showView('workout');
}

function renderWorkout() {
    if (!currentWorkout) return;
    
    const title = document.getElementById('workout-title');
    title.textContent = currentWorkout.planName;
    
    const content = document.getElementById('workout-content');
    content.innerHTML = currentWorkout.exercises.map((exercise, index) => `
        <div class="workout-exercise ${exercise.completed ? 'completed' : ''}" data-exercise-index="${index}">
            <div class="exercise-header">
                <div>
                    <div class="exercise-title" onclick="showExerciseDetailInWorkout('${exercise.name}', ${currentWorkout.planId}, '${exercise.section}')">
                        <i class="fas fa-info-circle"></i> ${exercise.name}
                        ${getExerciseMediaIcon(exercise.name, currentWorkout.planId, exercise.section)}
                    </div>
                    <div class="exercise-details">${exercise.section} - ${exercise.details}</div>
                </div>
                <button class="complete-btn" onclick="toggleExerciseComplete(${index})" ${exercise.completed ? 'disabled' : ''}>
                    ${exercise.completed ? '<i class="fas fa-check"></i> Concluído' : '<i class="fas fa-check"></i> Marcar como Feito'}
                </button>
            </div>
        </div>
    `).join('');
}

function showExerciseDetailInWorkout(exerciseName, planId, sectionName) {
    showExerciseDetail(exerciseName, planId, sectionName);
}

function getExerciseMediaIcon(exerciseName, planId, sectionName) {
    const plan = workoutPlans[planId];
    const section = plan.sections.find(s => s.name === sectionName);
    const exercise = section.exercises.find(e => e.name === exerciseName);
    
    if (exercise && exercise.media) {
        const iconType = exercise.media.type === 'video' ? 'play-circle' : 'image';
        return `<i class="fas fa-${iconType}" style="color: #667eea; margin-left: 0.5rem; font-size: 0.9rem;"></i>`;
    }
    return '';
}

function toggleExerciseComplete(exerciseIndex) {
    if (!currentWorkout) return;
    
    currentWorkout.exercises[exerciseIndex].completed = true;
    completedExercises.add(exerciseIndex);
    
    renderWorkout();
    
    // Check if all exercises are completed
    const allCompleted = currentWorkout.exercises.every(ex => ex.completed);
    if (allCompleted) {
        setTimeout(() => {
            if (confirm('Parabéns! Completaste todos os exercícios. Queres terminar o treino?')) {
                endWorkout();
            }
        }, 500);
    }
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (!workoutStartTime) return;
    
    const elapsed = Date.now() - workoutStartTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    
    const timerElement = document.getElementById('timer');
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function endWorkout() {
    if (!currentWorkout) return;
    
    const endTime = new Date();
    const duration = Math.floor((endTime - currentWorkout.startTime) / 1000);
    
    // Save workout to history
    const workoutHistory = {
        id: Date.now(),
        planId: currentWorkout.planId,
        planName: currentWorkout.planName,
        date: currentWorkout.startTime,
        duration: duration,
        completedExercises: currentWorkout.exercises.filter(ex => ex.completed).length,
        totalExercises: currentWorkout.exercises.length,
        exercises: currentWorkout.exercises
    };
    
    saveWorkoutToHistory(workoutHistory);
    
    // Reset workout state
    currentWorkout = null;
    workoutStartTime = null;
    completedExercises.clear();
    
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Show success message
    alert(`Treino concluído! Duração: ${formatDuration(duration)}`);
    
    // Return to plans view
    switchNavigation('plans');
    showView('plans');
}

function saveWorkoutToHistory(workout) {
    let history = JSON.parse(localStorage.getItem('workoutHistory') || '[]');
    history.unshift(workout); // Add to beginning
    
    // Keep only last 50 workouts
    if (history.length > 50) {
        history = history.slice(0, 50);
    }
    
    localStorage.setItem('workoutHistory', JSON.stringify(history));
    loadHistory(); // Refresh history view
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem('workoutHistory') || '[]');
    const historyList = document.getElementById('history-list');
    
    if (history.length === 0) {
        historyList.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #666;">
                <i class="fas fa-history" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>Ainda não tens histórico de treinos.</p>
                <p>Inicia o teu primeiro treino para começar!</p>
            </div>
        `;
        return;
    }
    
    historyList.innerHTML = history.map(workout => `
        <div class="history-item">
            <div class="history-header">
                <div class="history-date">${formatDate(new Date(workout.date))}</div>
                <div class="history-duration">${formatDuration(workout.duration)}</div>
            </div>
            <div class="history-plan">${workout.planName}</div>
            <div class="history-exercises">
                ${workout.completedExercises}/${workout.totalExercises} exercícios concluídos
                ${workout.completedExercises === workout.totalExercises ? '<i class="fas fa-trophy" style="color: #ffd700; margin-left: 0.5rem;"></i>' : ''}
            </div>
        </div>
    `).join('');
}

function formatDate(date) {
    return date.toLocaleDateString('pt-PT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
        return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${secs}s`;
    } else {
        return `${secs}s`;
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('exercise-modal');
    if (event.target === modal) {
        closeExerciseModal();
    }
});

// Prevent accidental page refresh during workout
window.addEventListener('beforeunload', function(event) {
    if (currentWorkout) {
        event.preventDefault();
        event.returnValue = 'Tens um treino em andamento. Tens a certeza que queres sair?';
        return event.returnValue;
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // ESC to close modal
    if (event.key === 'Escape') {
        closeExerciseModal();
    }
    
    // Number keys to switch between plans (1-4)
    if (event.key >= '1' && event.key <= '4' && currentView === 'plans') {
        const planId = parseInt(event.key);
        if (workoutPlans[planId]) {
            viewPlan(planId);
        }
    }
});
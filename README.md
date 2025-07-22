# Meu Plano de Treino

Uma aplicação web simples e organizada para consultar e acompanhar os teus planos de treino.

## Funcionalidades

### 📋 Visualização de Planos
- **Plano 1**: Funcional + Full Body (Circuito)
- **Plano 2**: Musculação Superior (Carga Progressiva)
- **Plano 3**: Funcional + Pernas (Potência e Resistência)
- **Plano 4**: Musculação Inferior (Carga Progressiva)

### 🏋️ Gestão de Treinos
- **Ver Detalhes**: Consulta todos os exercícios de cada plano
- **Iniciar Treino**: Começa um treino com cronómetro
- **Marcar Exercícios**: Marca exercícios como concluídos durante o treino
- **Detalhes dos Exercícios**: Clica em qualquer exercício para ver instruções detalhadas, dicas e **vídeos/imagens demonstrativas**
- **Conteúdo Multimédia**: Vídeos do YouTube e imagens para demonstrar a execução correta dos exercícios
- **Indicadores Visuais**: Ícones mostram quais exercícios têm vídeo 🎥 ou imagem 📷 disponível

### 📊 Histórico
- **Registo Automático**: Todos os treinos são guardados automaticamente
- **Estatísticas**: Vê a duração e exercícios concluídos de cada treino
- **Armazenamento Local**: Os dados ficam guardados no teu navegador

## Como Usar

### 1. Iniciar o Servidor
```bash
cd "app de ginasio"
python3 -m http.server 8000
```

### 2. Abrir no Navegador
Vai para: `http://localhost:8000`

### 3. Navegar na Aplicação

#### Ver Planos
- Na página inicial, vês os 4 planos disponíveis
- Clica em "Ver Detalhes" para consultar todos os exercícios
- Clica em "Iniciar Treino" para começar um treino

#### Durante o Treino
- O cronómetro inicia automaticamente
- Clica no nome de qualquer exercício para ver as instruções
- Marca cada exercício como "Feito" quando completares
- Clica em "Terminar Treino" quando acabares

#### Consultar Histórico
- Clica em "Histórico" no menu superior
- Vê todos os teus treinos anteriores com estatísticas

## Estrutura dos Planos

### Plano 1 - Funcional + Full Body
- **Aquecimento**: 10 min (bicicleta + mobilidade)
- **Circuito**: 3 voltas, 45"ON/15"OFF
- **Core**: Abdominais e prancha

### Plano 2 - Musculação Superior
- **Aquecimento**: 10 min (elíptica + ativação)
- **Força**: 3x15 reps (costas, peito, braços)
- **Cardio**: 10 min bike

### Plano 3 - Funcional + Pernas
- **Aquecimento**: 8-10 min (escadas + mobilidade)
- **Circuito**: 2-3 voltas (exercícios funcionais)
- **Core**: Prancha lateral + V-ups

### Plano 4 - Musculação Inferior
- **Aquecimento**: 5-7 min (caminhada + mobilidade)
- **Força**: 3 séries progressivas (pernas completas)
- **Cardio**: 10 min corrida leve

## Tecnologias Utilizadas

- **HTML5**: Estrutura da aplicação
- **CSS3**: Design responsivo e moderno
- **JavaScript**: Lógica da aplicação e interatividade
- **LocalStorage**: Armazenamento do histórico de treinos
- **Font Awesome**: Ícones

## Funcionalidades Técnicas

### Conteúdo Multimédia
- **Vídeos**: Integração com YouTube para demonstrações dos exercícios
- **Imagens**: Fotos ilustrativas da execução correta
- **Indicadores**: Ícones visuais para identificar exercícios com conteúdo multimédia
- **Responsivo**: Vídeos e imagens adaptam-se a todos os tamanhos de ecrã

### Armazenamento Local
- Os treinos são guardados no `localStorage` do navegador
- Mantém histórico dos últimos 50 treinos
- Dados persistem entre sessões

### Interface Responsiva
- Adaptada para desktop, tablet e mobile
- Design moderno com gradientes e sombras
- Animações suaves e feedback visual
- Vídeos com aspect ratio 16:9 responsivo

### Atalhos de Teclado
- **ESC**: Fechar modal de detalhes
- **1-4**: Acesso rápido aos planos (na vista principal)

## Personalização

Podes facilmente personalizar:

1. **Adicionar Novos Exercícios**: Edita o objeto `workoutPlans` em `script.js`
2. **Modificar Cores**: Altera as variáveis CSS em `styles.css`
3. **Adicionar Vídeos/Imagens**: Inclui URLs nos dados dos exercícios usando a estrutura:
   ```javascript
   media: {
       type: "video", // ou "image"
       url: "https://www.youtube.com/embed/VIDEO_ID", // ou URL da imagem
       thumbnail: "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg", // para vídeos
       alt: "Descrição da imagem" // para imagens
   }
   ```

## Suporte

A aplicação funciona em todos os navegadores modernos:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

---

**Bons treinos! 💪**
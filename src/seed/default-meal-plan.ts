import type { MealPlan } from '../common/types/meal-plan.types';

const breakfastOptions = {
  eggs: {
    id: 'breakfast-eggs',
    name: 'Ovos + Pão + Fruta',
    description: 'Proteína rápida para começar o dia.',
    items: [
      '3 ovos inteiros (mexidos ou cozidos)',
      '1 fatia de pão de mistura/integral',
      '1 peça de fruta (maçã ou kiwi)',
    ],
  },
  oats: {
    id: 'breakfast-oats',
    name: 'Papas de Aveia + Whey',
    description: 'Hidratos de absorção lenta com proteína extra.',
    items: [
      '40g de aveia com água ou bebida vegetal',
      '1 scoop de Whey Protein (misturada no fim)',
      'Um punhado de frutos vermelhos',
    ],
    tips: 'Frutos vermelhos têm pouquíssimas calorias e muita fibra.',
  },
  skyr: {
    id: 'breakfast-skyr',
    name: 'Iogurte Skyr + Cereais',
    description: 'Opção fresca e rica em proteína.',
    items: [
      '200g de Iogurte Skyr ou Grego Ligeiro (0% gordura)',
      '30g de cereais integrais',
      'Canela a gosto',
    ],
  },
};

const lunchOptions = {
  chicken: {
    id: 'lunch-chicken',
    name: 'Frango + Batata Doce + Vegetais',
    description: 'Volume e energia com proteína magra.',
    items: [
      '150–200g de peito de frango grelhado com sumo de limão',
      '100g de batata doce assada ou cozida',
      'Brócolos e cenouras cozidas (metade do prato)',
    ],
    tips: 'Máximo 1 colher de sobremesa de azeite por refeição.',
  },
  salmon: {
    id: 'lunch-salmon',
    name: 'Salmão + Quinoa + Espinafres',
    description: 'Ómega-3 e hidratos complexos.',
    items: [
      '150–200g de lombo de salmão (ou pescada) no forno',
      '100g de quinoa cozinhada',
      'Espinafres salteados com um fio mínimo de azeite',
    ],
    tips: 'Evita molhos calóricos — tempera com ervas e limão.',
  },
  turkey: {
    id: 'lunch-turkey',
    name: 'Peru + Arroz + Salada',
    description: 'Refeição equilibrada com muito volume.',
    items: [
      '150–200g de peito de peru grelhado',
      '100g de arroz integral cozinhado',
      'Salada variada (alface, pepino, tomate) — metade do prato',
    ],
    tips: 'Máximo 1 colher de sobremesa de azeite por refeição.',
  },
};

const snackOptions = {
  skyrFruit: {
    id: 'snack-skyr-fruit',
    name: 'Iogurte + Fruta',
    description: 'Engana a fome com proteína e fibra.',
    items: ['200g de Iogurte Grego 0%', '1 fruta (maçã, kiwi ou laranja)'],
  },
  wheyCucumber: {
    id: 'snack-whey-cucumber',
    name: 'Whey + Pepino',
    description: 'Proteína rápida com volume de vegetais.',
    items: [
      '1 scoop de Whey com água',
      'Pepino às rodelas ou palitos (à discrição)',
    ],
  },
  veggies: {
    id: 'snack-veggies',
    name: 'Vegetais Crus',
    description: 'Volume máximo, calorias mínimas.',
    items: [
      'Pepino, aipo e tomate cherry à discrição',
      'Temperar com limão, sal e ervas',
    ],
  },
  cottage: {
    id: 'snack-cottage',
    name: 'Cottage Cheese + Canela',
    description: 'Proteína caseína para saciedade prolongada.',
    items: ['150g de Cottage cheese light', 'Canela a gosto'],
  },
  appleAlmonds: {
    id: 'snack-apple-almonds',
    name: 'Maçã + Amêndoas',
    description: 'Fibra e gorduras saudáveis em dose controlada.',
    items: ['1 maçã', '15g de amêndoas (punhado pequeno)'],
  },
  gelatinShake: {
    id: 'snack-gelatin-shake',
    name: 'Shake de Volume',
    description: 'Truque de volume para matar a fome.',
    items: [
      '1 scoop de Whey + gelatina zero dissolvida em água gelada',
      'Bater bem para ficar espesso',
    ],
  },
};

const dinnerOptions = {
  fishVeggies: {
    id: 'dinner-fish-veggies',
    name: 'Peixe Branco + Legumes',
    description: 'Jantar leve com proteína magra.',
    items: [
      '150–200g de pescada ou bacalhau grelhado',
      '100g de batata ou arroz cozinhado',
      'Legumes variados (couve-flor, brócolos) — metade do prato',
    ],
    tips: 'Máximo 1 colher de sobremesa de azeite.',
  },
  leanMeat: {
    id: 'dinner-lean-meat',
    name: 'Carne Magra + Massa Integral',
    description: 'Fecho do dia com energia controlada.',
    items: [
      '150–200g de vaca magra ou frango',
      '100g de massa integral cozinhada',
      'Salada ou vegetais salteados — metade do prato',
    ],
    tips: 'Evita molhos cremosos — usa ervas e limão.',
  },
  omelette: {
    id: 'dinner-omelette',
    name: 'Omelete + Salada',
    description: 'Opção rápida e rica em proteína.',
    items: [
      '3 ovos em omelete com vegetais (espinafres, cogumelos)',
      'Salada grande à discrição',
      '1 fatia de pão integral (opcional)',
    ],
  },
};

const dayRotation: {
  dayOfWeek: MealPlan['days'][number]['dayOfWeek'];
  label: string;
  breakfast: keyof typeof breakfastOptions;
  lunch: keyof typeof lunchOptions;
  snack: keyof typeof snackOptions;
  dinner: keyof typeof dinnerOptions;
}[] = [
  {
    dayOfWeek: 'monday',
    label: 'Segunda-feira',
    breakfast: 'eggs',
    lunch: 'chicken',
    snack: 'skyrFruit',
    dinner: 'fishVeggies',
  },
  {
    dayOfWeek: 'tuesday',
    label: 'Terça-feira',
    breakfast: 'oats',
    lunch: 'salmon',
    snack: 'wheyCucumber',
    dinner: 'leanMeat',
  },
  {
    dayOfWeek: 'wednesday',
    label: 'Quarta-feira',
    breakfast: 'skyr',
    lunch: 'turkey',
    snack: 'veggies',
    dinner: 'omelette',
  },
  {
    dayOfWeek: 'thursday',
    label: 'Quinta-feira',
    breakfast: 'eggs',
    lunch: 'salmon',
    snack: 'cottage',
    dinner: 'fishVeggies',
  },
  {
    dayOfWeek: 'friday',
    label: 'Sexta-feira',
    breakfast: 'oats',
    lunch: 'chicken',
    snack: 'appleAlmonds',
    dinner: 'leanMeat',
  },
  {
    dayOfWeek: 'saturday',
    label: 'Sábado',
    breakfast: 'skyr',
    lunch: 'turkey',
    snack: 'gelatinShake',
    dinner: 'omelette',
  },
];

export const defaultMealPlan: MealPlan = {
  id: 'deficit-76kg',
  name: 'Plano de Definição — 76kg',
  description:
    'Plano alimentar em défice calórico focado em volume e proteína (~150g/dia) para preservar massa muscular enquanto revelas o músculo já construído.',
  targetProteinG: 150,
  profile: { heightM: 1.65, weightKg: 76 },
  guidelines: [
    'Objetivo: ~150g de proteína por dia para manter massa muscular em défice.',
    'Prioriza alimentos com muito volume e poucas calorias para não passares fome.',
    'Regra do prato: metade vegetais, ¼ proteína magra, ¼ hidratos cozinhados.',
    'Máximo 1 colher de sobremesa de azeite por refeição principal.',
    'Evita molhos calóricos — tempera com ervas, limão e especiarias.',
  ],
  plateRule:
    '150–200g de carne magra/peixe + 100g de hidratos cozinhados (arroz, massa, batata) + vegetais à discrição (enche metade do prato).',
  days: dayRotation.map((day) => ({
    dayOfWeek: day.dayOfWeek,
    label: day.label,
    meals: {
      breakfast: breakfastOptions[day.breakfast],
      lunch: lunchOptions[day.lunch],
      snack: snackOptions[day.snack],
      dinner: dinnerOptions[day.dinner],
    },
  })),
};
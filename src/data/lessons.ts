export type LessonAsset = {
  kind: 'planned' | 'video'
  expectedPath: string
  poster?: string
  src?: string
}

export type Lesson = {
  id: string
  shortLabel: string
  title: string
  summary: string
  goal: string
  outcome: string
  duration: string
  sample: string
  asset: LessonAsset
  steps: string[]
  checkpoints: string[]
  cues: string[]
}

export const lessons: Lesson[] = [
  {
    id: 'mmc',
    shortLabel: 'MMC',
    title: 'MMC por divisoes sucessivas',
    summary:
      'A cena apresenta os numeros em coluna, testa divisores primos na lateral e mantem cada termo descendo no mesmo alinhamento ate chegar a 1.',
    goal: 'Encontrar o menor multiplo comum sem listar varios multiplos.',
    outcome: 'O resultado aparece como produto dos divisores realmente usados.',
    duration: '75-90s',
    sample: '12 | 18 | 30',
    asset: {
      kind: 'planned',
      expectedPath: 'public/manim/mmc/scene.mp4',
    },
    steps: [
      'Escrever os numeros em coluna e reservar a lateral para os primos.',
      'Testar o menor divisor primo possivel em cada rodada.',
      'Dividir apenas quem aceita e fazer descer intacto quem nao aceita.',
      'Parar quando todos os numeros virarem 1.',
      'Multiplicar os divisores usados para fechar o MMC.',
    ],
    checkpoints: [
      'Divisor atual sempre destacado na lateral.',
      'Numeros que nao dividem descem sem trocar de coluna.',
      'Produto final reaparece com foco no resultado.',
    ],
    cues: ['divisor em foco', 'descida sincronizada', 'produto final'],
  },
  {
    id: 'mdc',
    shortLabel: 'MDC',
    title: 'MDC por fatores comuns',
    summary:
      'A animacao compara a fatoracao de dois numeros, marca apenas os fatores comuns e resume o MDC como produto da intersecao.',
    goal: 'Explicar de forma visual por que apenas fatores comuns entram no MDC.',
    outcome:
      'As coincidencias viram grupos comuns antes da multiplicacao final.',
    duration: '70-85s',
    sample: '84 e 126',
    asset: {
      kind: 'planned',
      expectedPath: 'public/manim/mdc/scene.mp4',
    },
    steps: [
      'Fatorar cada numero com a mesma hierarquia visual.',
      'Circular os fatores que aparecem nos dois lados.',
      'Separar os fatores exclusivos para mostrar o que fica de fora.',
      'Agrupar os fatores comuns em uma faixa unica.',
      'Multiplicar apenas a intersecao para obter o MDC.',
    ],
    checkpoints: [
      'Cores diferentes para fator comum e fator exclusivo.',
      'Agrupamento final evidencia a intersecao.',
      'Resultado final retoma os fatores escolhidos.',
    ],
    cues: ['intersecao visual', 'fatores exclusivos', 'produto comum'],
  },
  {
    id: 'divisao',
    shortLabel: 'Divisao',
    title: 'Divisao longa com descida guiada',
    summary:
      'A aula acompanha cada tentativa de divisao, explicita quando descer o proximo algarismo, quando completar com zero e onde a virgula entra no quociente.',
    goal: 'Eliminar o salto mental entre conta armada e leitura passo a passo.',
    outcome: 'Alinhamento de casas e decisao de descer o proximo algarismo.',
    duration: '95-110s',
    sample: '845,6 / 4',
    asset: {
      kind: 'planned',
      expectedPath: 'public/manim/divisao/scene.mp4',
    },
    steps: [
      'Montar a conta com dividendo, divisor e espaco do quociente.',
      'Escolher o primeiro trecho do dividendo que permite dividir.',
      'Escrever o digito do quociente alinhado com a casa correta.',
      'Multiplicar, subtrair e decidir se e hora de descer o proximo algarismo.',
      'Quando faltar parte inteira, marcar a virgula e continuar com zeros.',
      'Encerrar quando o resto estiver zerado ou quando a precisao desejada for atingida.',
    ],
    checkpoints: [
      'Seta mostra exatamente qual algarismo desce em cada rodada.',
      'Virgula entra no quociente no mesmo instante em que o dividendo vira decimal.',
      'Cada subtracao fica visivel antes da proxima descida.',
    ],
    cues: ['desce algarismo', 'virgula no tempo certo', 'subtracao visivel'],
  },
  {
    id: 'divisores',
    shortLabel: 'Divisores',
    title: 'Numero de divisores pelo produto dos expoentes',
    summary:
      'O modulo fatora o numero, soma 1 a cada expoente e transforma essas escolhas independentes no produto que conta todos os divisores possiveis.',
    goal: 'Mostrar por que a formula dos expoentes funciona em vez de parecer magica.',
    outcome:
      'Cada expoente vira quantidade de escolhas antes do produto final.',
    duration: '80-95s',
    sample: '360 = 2^3 . 3^2 . 5^1',
    asset: {
      kind: 'planned',
      expectedPath: 'public/manim/divisores/scene.mp4',
    },
    steps: [
      'Fatorar o numero e organizar as potencias por base.',
      'Trocar cada expoente n por n + 1 para contar escolhas de 0 ate n.',
      'Mostrar as escolhas independentes de cada fator primo.',
      'Montar o produto entre as quantidades de escolhas.',
      'Apresentar o total de divisores e relacionar com exemplos concretos.',
    ],
    checkpoints: [
      'Cada expoente recebe sua soma de 1 antes do produto.',
      'As escolhas aparecem como pequenas colunas combinatorias.',
      'O total final e reconciliado com divisores exemplares.',
    ],
    cues: ['expoente + 1', 'escolhas independentes', 'produto combinatorio'],
  },
  {
    id: 'fracoes',
    shortLabel: 'Fracoes',
    title: 'Soma de fracoes com denominador comum',
    summary:
      'A cena parte de fracoes diferentes, calcula o denominador comum via MMC, amplia cada parcela e so entao soma numeradores de forma coerente.',
    goal: 'Ligar o MMC ao motivo real da soma de fracoes.',
    outcome: 'O denominador comum nasce antes da soma e organiza todo o resto.',
    duration: '70-85s',
    sample: '3/4 + 5/6',
    asset: {
      kind: 'planned',
      expectedPath: 'public/manim/fracoes/scene.mp4',
    },
    steps: [
      'Identificar os denominadores e chamar o MMC para a cena.',
      'Transformar cada fracao em equivalente com o novo denominador.',
      'Destacar o fator de ampliacao aplicado em cada numerador.',
      'Somar apenas os numeradores mantendo o denominador comum.',
      'Simplificar a resposta final quando houver reducao possivel.',
    ],
    checkpoints: [
      'As fracoes equivalentes aparecem alinhadas lado a lado.',
      'O denominador comum permanece fixo durante a soma.',
      'Simplificacao final destaca o cancelamento do fator comum.',
    ],
    cues: ['MMC em cena', 'fracoes equivalentes', 'simplificacao final'],
  },
]

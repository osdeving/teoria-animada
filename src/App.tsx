import { useState } from 'react'
import './App.css'
import { AnimationStage } from './components/AnimationStage'
import { LessonTabs } from './components/LessonTabs'
import { lessons } from './data/lessons'

function App() {
  const [selectedId, setSelectedId] = useState(lessons[0]!.id)
  const selectedLesson =
    lessons.find((lesson) => lesson.id === selectedId) ?? lessons[0]!
  const totalSteps = lessons.reduce(
    (sum, lesson) => sum + lesson.steps.length,
    0,
  )
  const pendingAssets = lessons.filter(
    (lesson) => lesson.asset.kind !== 'video',
  ).length

  return (
    <div className="app-shell">
      <div className="ambient ambient--left" aria-hidden="true" />
      <div className="ambient ambient--right" aria-hidden="true" />

      <header className="hero-panel">
        <div className="hero-panel__copy">
          <p className="eyebrow">Teoria Animada</p>
          <h1>
            Algoritmos de matematica ganhando ritmo, escrita e narracao visual.
          </h1>
          <p className="lead">
            O app nasce para hospedar cenas Manim que mostram o passo a passo
            completo: desce algarismo, testa divisor, coloca virgula e fecha o
            raciocinio com calma.
          </p>

          <div className="hero-panel__metrics">
            <article>
              <span>{lessons.length}</span>
              <p>trilhas prioritarias</p>
            </article>
            <article>
              <span>{totalSteps}</span>
              <p>etapas roteirizadas</p>
            </article>
            <article>
              <span>{pendingAssets}</span>
              <p>renders a conectar</p>
            </article>
          </div>
        </div>

        <div className="hero-panel__board">
          <p className="hero-panel__board-label">Sequencia inicial</p>
          <ol>
            {lessons.map((lesson) => (
              <li key={lesson.id}>
                <strong>{lesson.shortLabel}</strong>
                <span>{lesson.outcome}</span>
              </li>
            ))}
          </ol>
        </div>
      </header>

      <main className="workspace">
        <section className="workspace__intro">
          <p>
            Repositorio pronto para Pages, CI e evolucao incremental dos
            modulos.
          </p>
          <a className="workspace__cta" href="#lesson-studio">
            Abrir estudio de modulos
          </a>
        </section>

        <section className="studio-panel" id="lesson-studio">
          <div className="studio-panel__header">
            <div>
              <p className="eyebrow eyebrow--dark">Studio</p>
              <h2>Abas didaticas ligadas a assets do Manim</h2>
            </div>
            <p>
              Cada modulo combina roteiro, checkpoints visuais e um palco pronto
              para receber o render final da cena.
            </p>
          </div>

          <LessonTabs
            lessons={lessons}
            onSelect={setSelectedId}
            selectedId={selectedId}
          />

          <div
            aria-labelledby={`tab-${selectedLesson.id}`}
            className="studio-grid"
            id={`panel-${selectedLesson.id}`}
            role="tabpanel"
          >
            <article className="lesson-sheet">
              <div className="lesson-sheet__header">
                <div>
                  <p className="lesson-sheet__kicker">
                    {selectedLesson.shortLabel}
                  </p>
                  <h3>{selectedLesson.title}</h3>
                </div>
                <span className="lesson-sheet__duration">
                  {selectedLesson.duration}
                </span>
              </div>

              <p className="lesson-sheet__summary">{selectedLesson.summary}</p>

              <div className="lesson-sheet__meta">
                <span>{selectedLesson.goal}</span>
                <span>{selectedLesson.outcome}</span>
              </div>

              <div className="lesson-sheet__columns">
                <section>
                  <h4>Passo a passo</h4>
                  <ol>
                    {selectedLesson.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </section>

                <section>
                  <h4>Checkpoints visuais</h4>
                  <ul>
                    {selectedLesson.checkpoints.map((checkpoint) => (
                      <li key={checkpoint}>{checkpoint}</li>
                    ))}
                  </ul>
                </section>
              </div>
            </article>

            <AnimationStage key={selectedLesson.id} lesson={selectedLesson} />
          </div>
        </section>

        <section className="pipeline-panel">
          <article>
            <p className="pipeline-panel__eyebrow">1. Manim</p>
            <h3>Receitas reaproveitaveis</h3>
            <p>
              As tecnicas em <code>recipes/</code> servem como biblioteca de
              movimento, destaque e transformacao.
            </p>
          </article>

          <article>
            <p className="pipeline-panel__eyebrow">2. Conteudo</p>
            <h3>Manifesto das aulas</h3>
            <p>
              Cada aba nasce em <code>src/data/lessons.ts</code> com sample,
              roteiro, checkpoints e caminho esperado do asset.
            </p>
          </article>

          <article>
            <p className="pipeline-panel__eyebrow">3. Publish</p>
            <h3>CI e GitHub Pages</h3>
            <p>
              Push em <code>main</code> valida frontend e receitas Python,
              depois publica a build estatica no Pages.
            </p>
          </article>
        </section>
      </main>
    </div>
  )
}

export default App

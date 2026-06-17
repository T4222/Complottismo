import { useState } from "react";

const questions = [
  // STORIA
  {
    id: 1, category: "Storia",
    text: "Nel luglio 1969, tre astronauti americani raggiunsero la Luna, due di loro scesero sulla superficie e tutti tornarono sani e salvi sulla Terra.",
    reverse: true
  },
  {
    id: 2, category: "Storia",
    text: "L'attacco giapponese a Pearl Harbor colse completamente di sorpresa l'esercito americano, senza che nessuno nei vertici avesse avuto alcun segnale o preavviso.",
    reverse: true
  },
  {
    id: 3, category: "Storia",
    text: "I grandi stermini di massa del Novecento, incluso l'Olocausto, sono stati spesso esagerati o strumentalizzati per scopi politici.",
    reverse: false
  },
  // ISTITUZIONI
  {
    id: 4, category: "Istituzioni",
    text: "L'immigrazione di massa verso l'Europa è pianificata e orchestrata da élite politiche e finanziarie con l'obiettivo di sostituire progressivamente le popolazioni locali.",
    reverse: false
  },
  {
    id: 5, category: "Istituzioni",
    text: "L'introduzione di una moneta digitale centralizzata è una misura per modernizzare il sistema finanziario e rendere i pagamenti più sicuri ed efficienti.",
    reverse: true
  },
  {
    id: 6, category: "Istituzioni",
    text: "Le città dei 15 minuti sono un progetto urbanistico pensato per migliorare la qualità della vita, riducendo traffico e inquinamento.",
    reverse: true
  },
  {
    id: 7, category: "Istituzioni",
    text: "È legittimo che il governo installi telecamere e sistemi di sorveglianza negli spazi pubblici per garantire la sicurezza dei cittadini.",
    reverse: true
  },
  // ESOTERISMO
  {
    id: 8, category: "Esoterismo",
    text: "Le élite politiche e finanziarie mondiali sono guidate da società segrete con rituali occulti che influenzano le decisioni globali.",
    reverse: false
  },
  {
    id: 9, category: "Esoterismo",
    text: "L'agenda ecologista è principalmente uno strumento delle élite per limitare le libertà individuali e controllare i comportamenti della popolazione.",
    reverse: false
  },
  {
    id: 10, category: "Esoterismo",
    text: "I governi nazionali e le organizzazioni sovranazionali rispondono in realtà a élite di potere occulte che dettano le vere agende politiche.",
    reverse: false
  },
  {
    id: 11, category: "Esoterismo",
    text: "Le grandi organizzazioni internazionali come l'ONU o il WEF operano in modo trasparente nell'interesse collettivo dell'umanità.",
    reverse: true
  },
  // SCIENZA
  {
    id: 12, category: "Scienza",
    text: "Le scie lasciate dagli aerei nel cielo non sono semplici condense di vapore acqueo, ma sostanze chimiche diffuse intenzionalmente per influenzare il clima o la popolazione.",
    reverse: false
  },
  {
    id: 13, category: "Scienza",
    text: "I vaccini contro il Covid-19 sono stati sviluppati non per proteggere la salute pubblica, ma per generare profitti e ridurre la popolazione.",
    reverse: false
  },
  {
    id: 14, category: "Scienza",
    text: "Il Covid-19 è un patogeno di origine naturale e le misure di contenimento adottate dai governi erano solamente nell'interesse della salute pubblica.",
    reverse: true
  },
  {
    id: 15, category: "Scienza",
    text: "La Terra ha una forma sferica.",
    reverse: true
  },
  {
    id: 16, category: "Scienza",
    text: "Le grandi compagnie petrolifere hanno deliberatamente sabotato lo sviluppo delle energie rinnovabili corrompendo governi e scienziati.",
    reverse: false
  },
  {
    id: 17, category: "Scienza",
    text: "Le case farmaceutiche nascondono cure efficaci per malattie croniche per mantenere i pazienti dipendenti dai loro farmaci.",
    reverse: false
  },
  // POLITICA
  {
    id: 18, category: "Politica",
    text: "L'attentato dell'11 settembre 2001 fu un attacco terroristico imprevisto, di cui nessuno nei vertici americani era a conoscenza in anticipo.",
    reverse: true
  },
  {
    id: 19, category: "Politica",
    text: "Il crollo delle Torri Gemelle fu causato esclusivamente dall'impatto degli aerei e dai conseguenti incendi.",
    reverse: true
  },
  {
    id: 20, category: "Politica",
    text: "Le critical gender theories sono state promosse deliberatamente per frammentare la società, indebolire la famiglia tradizionale e rendere le persone più facilmente controllabili.",
    reverse: false
  },
  {
    id: 21, category: "Politica",
    text: "Il movimento femminista è stato promosso dalle élite principalmente per raddoppiare il gettito fiscale, immettendo le donne nel mercato del lavoro.",
    reverse: false
  },
  {
    id: 22, category: "Scienza",
    text: "Siamo soli in questo universo.",
    reverse: false
  },
];

const LABELS = [
  { value: 1, label: "Per niente d'accordo" },
  { value: 2, label: "Poco d'accordo" },
  { value: 3, label: "Abbastanza d'accordo" },
  { value: 4, label: "Completamente d'accordo" },
];

const CATEGORY_COLORS = {
  "Storia": "#C0392B",
  "Istituzioni": "#2471A3",
  "Esoterismo": "#6C3483",
  "Scienza": "#148F77",
  "Politica": "#B7950B",
};

function getScore(answers) {
  let total = 0;
  let count = 0;
  questions.forEach(q => {
    const val = answers[q.id];
    if (val === null || val === undefined) return;
    let score = q.reverse ? (5 - val) : val;
    total += score;
    count++;
  });
  if (count === 0) return 0;
  // Normalize to 0-100
  const minPossible = count * 1;
  const maxPossible = count * 4;
  return Math.round(((total - minPossible) / (maxPossible - minPossible)) * 100);
}

function getLevel(score) {
  if (score <= 25) return 1;
  if (score <= 50) return 2;
  if (score <= 75) return 3;
  return 4;
}

const LEVELS = {
  1: {
    title: "Cittadino Modello",
    subtitle: "0–25 punti",
    color: "#2471A3",
    icon: "🏛️",
    text: "Sei una persona razionale, informata e fiduciosa nelle istituzioni. Credi che il governo faccia del suo meglio, che gli esperti vadano ascoltati e che il dibattito pubblico sia sostanzialmente onesto. Probabilmente hai anche rispettato tutte le restrizioni Covid senza fare troppe domande — anzi, hai scaricato l'app. La realtà ufficiale è la tua zona di comfort, e ci stai benissimo."
  },
  2: {
    title: "Lo Scettico Confortevole",
    subtitle: "26–50 punti",
    color: "#148F77",
    icon: "🤔",
    text: "Hai qualche dubbio, ogni tanto googli cose che non tornano, ma poi chiudi il tab e vai avanti. Sei sveglio quanto basta per fare domande, non abbastanza da perdere il sonno. La maggior parte delle persone sta qui — nel dubbio confortante. Non ti fidi ciecamente, ma nemmeno vai fino in fondo. Il sistema ti sembra sospetto, ma alla fine paghi le tasse e aspetti il TG delle 20."
  },
  3: {
    title: "Il Risvegliato",
    subtitle: "51–75 punti",
    color: "#B7950B",
    icon: "👁️",
    text: "Hai approfondito. Sai cos'è il WEF, hai opinioni sui vaccini che non condividi al cenone di Natale, e guardi i contrail con un certo sospetto. Hai canali Telegram che i tuoi amici non conoscono. Non sei ancora fuori dal sistema, ma ci stai lavorando. Le coincidenze ti sembrano troppe per essere casuali — e probabilmente hai ragione su almeno qualcuna."
  },
  4: {
    title: "Alex Jones ti sembra moderato",
    subtitle: "76–100 punti",
    color: "#C0392B",
    icon: "🎩",
    text: "Alex Jones ti sembra un po' naïf. Hai un canale Telegram preferito, sai cos'è il deep state, e il cappello di alluminio è solo il primo strato di protezione. i Rothschild comandano il mondo e il fluoro nell'acqua rende le rane gay. Il bello è che su qualcosa potresti avere ragione. Il problema è capire su cosa."
  }
};

function CategoryBadge({ category }) {
  return (
    <span style={{
      background: CATEGORY_COLORS[category] + "22",
      color: CATEGORY_COLORS[category],
      border: `1px solid ${CATEGORY_COLORS[category]}44`,
      borderRadius: "4px",
      padding: "2px 8px",
      fontSize: "11px",
      fontWeight: "700",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    }}>{category}</span>
  );
}

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ marginBottom: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#888", marginBottom: "6px" }}>
        <span>{current} di {total} domande</span>
        <span>{pct}%</span>
      </div>
      <div style={{ height: "3px", background: "#222", borderRadius: "2px" }}>
        <div style={{ height: "3px", background: "#E8C840", borderRadius: "2px", width: `${pct}%`, transition: "width 0.3s" }} />
      </div>
    </div>
  );
}

export default function App() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [current, setCurrent] = useState(0);

  const q = questions[current];
  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;

  function handleAnswer(val) {
    setAnswers(prev => ({ ...prev, [q.id]: val }));
  }

  function handleSkip() {
    setAnswers(prev => {
      const next = { ...prev };
      delete next[q.id];
      return next;
    });
    if (current < questions.length - 1) setCurrent(c => c + 1);
  }

  function handleNext() {
    if (current < questions.length - 1) setCurrent(c => c + 1);
  }

  function handlePrev() {
    if (current > 0) setCurrent(c => c - 1);
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  function handleRestart() {
    setAnswers({});
    setSubmitted(false);
    setCurrent(0);
  }

  const score = getScore(answers);
  const level = getLevel(score);
  const levelData = LEVELS[level];

  // Category scores
  const categories = [...new Set(questions.map(q => q.category))];
  function getCategoryScore(cat) {
    const qs = questions.filter(q => q.category === cat);
    let total = 0, count = 0;
    qs.forEach(q => {
      const val = answers[q.id];
      if (val === null || val === undefined) return;
      let s = q.reverse ? (5 - val) : val;
      total += s;
      count++;
    });
    if (count === 0) return null;
    return Math.round(((total - count) / (count * 3)) * 100);
  }

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "#0A0A0A", color: "#F0EDE6", fontFamily: "'Inter', system-ui, sans-serif", padding: "24px 16px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ fontSize: "48px", marginBottom: "8px" }}>{levelData.icon}</div>
            <div style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#888", textTransform: "uppercase", marginBottom: "8px" }}>Il tuo profilo</div>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: levelData.color, margin: "0 0 4px" }}>{levelData.title}</h1>
            <div style={{ fontSize: "13px", color: "#666" }}>{levelData.subtitle}</div>
          </div>

          {/* Score */}
          <div style={{ background: "#141414", border: "1px solid #222", borderRadius: "12px", padding: "24px", marginBottom: "20px", textAlign: "center" }}>
            <div style={{ fontSize: "64px", fontWeight: "900", color: levelData.color, lineHeight: 1 }}>{score}</div>
            <div style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>punti su 100</div>
            <div style={{ margin: "16px 0 0", height: "6px", background: "#222", borderRadius: "3px" }}>
              <div style={{ height: "6px", borderRadius: "3px", background: `linear-gradient(90deg, #2471A3, ${levelData.color})`, width: `${score}%`, transition: "width 1s" }} />
            </div>
          </div>

          {/* Description */}
          <div style={{ background: "#141414", border: `1px solid ${levelData.color}33`, borderRadius: "12px", padding: "20px", marginBottom: "20px" }}>
            <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.7", color: "#D0CCC4" }}>{levelData.text}</p>
          </div>

          {/* Category breakdown */}
          <div style={{ background: "#141414", border: "1px solid #222", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
            <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#666", textTransform: "uppercase", marginBottom: "16px" }}>Per categoria</div>
            {categories.map(cat => {
              const cs = getCategoryScore(cat);
              return (
                <div key={cat} style={{ marginBottom: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontSize: "13px", color: CATEGORY_COLORS[cat], fontWeight: "600" }}>{cat}</span>
                    <span style={{ fontSize: "13px", color: "#888" }}>{cs !== null ? `${cs}/100` : "—"}</span>
                  </div>
                  <div style={{ height: "4px", background: "#222", borderRadius: "2px" }}>
                    {cs !== null && <div style={{ height: "4px", borderRadius: "2px", background: CATEGORY_COLORS[cat], width: `${cs}%` }} />}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ fontSize: "11px", color: "#444", textAlign: "center", marginBottom: "20px" }}>
            Risposte date: {Object.keys(answers).length} su {questions.length}
          </div>

          <button onClick={handleRestart} style={{
            width: "100%", padding: "14px", background: "#E8C840", color: "#0A0A0A",
            border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: "700",
            cursor: "pointer", letterSpacing: "0.05em"
          }}>
            Rifai il test
          </button>
        </div>
      </div>
    );
  }

  const currentAnswer = answers[q.id];

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", color: "#F0EDE6", fontFamily: "'Inter', system-ui, sans-serif", padding: "24px 16px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>

        {/* Title */}
        {current === 0 && (
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ fontSize: "11px", letterSpacing: "0.25em", color: "#666", textTransform: "uppercase", marginBottom: "12px" }}>Test</div>
            <h1 style={{ fontSize: "26px", fontWeight: "900", margin: "0 0 8px", letterSpacing: "-0.02em" }}>Quanto sei complottista?</h1>
            <p style={{ fontSize: "14px", color: "#888", margin: 0, lineHeight: "1.5" }}>22 affermazioni. Nessuna risposta giusta o sbagliata.<br />Solo la tua opinione.</p>
          </div>
        )}

        {/* Progress */}
        <ProgressBar current={current + 1} total={questions.length} />

        {/* Question card */}
        <div style={{
          background: "#141414", border: "1px solid #222", borderRadius: "12px",
          padding: "24px", marginBottom: "16px", minHeight: "180px"
        }}>
          <div style={{ marginBottom: "12px" }}>
            <CategoryBadge category={q.category} />
          </div>
          <p style={{ fontSize: "17px", lineHeight: "1.6", margin: 0, fontWeight: "500" }}>
            {q.text}
          </p>
        </div>

        {/* Answer options */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
          {LABELS.map(({ value, label }) => {
            const selected = currentAnswer === value;
            return (
              <button key={value} onClick={() => handleAnswer(value)} style={{
                padding: "14px 16px", background: selected ? "#E8C840" : "#141414",
                color: selected ? "#0A0A0A" : "#D0CCC4",
                border: selected ? "1px solid #E8C840" : "1px solid #2A2A2A",
                borderRadius: "8px", fontSize: "14px", fontWeight: selected ? "700" : "400",
                cursor: "pointer", textAlign: "left", transition: "all 0.15s",
                display: "flex", alignItems: "center", gap: "12px"
              }}>
                <span style={{
                  width: "22px", height: "22px", borderRadius: "50%",
                  border: selected ? "2px solid #0A0A0A" : "2px solid #444",
                  background: selected ? "#0A0A0A" : "transparent",
                  flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  {selected && <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E8C840", display: "block" }} />}
                </span>
                {label}
              </button>
            );
          })}

          {/* Non so */}
          <button onClick={handleSkip} style={{
            padding: "12px 16px", background: "transparent",
            color: currentAnswer === undefined ? "#888" : "#555",
            border: "1px dashed #2A2A2A",
            borderRadius: "8px", fontSize: "13px", fontWeight: "400",
            cursor: "pointer", textAlign: "left", transition: "all 0.15s",
            display: "flex", alignItems: "center", gap: "12px"
          }}>
            <span style={{ fontSize: "16px" }}>?</span>
            Non ho abbastanza informazioni per rispondere
          </button>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", gap: "8px" }}>
          {current > 0 && (
            <button onClick={handlePrev} style={{
              flex: 1, padding: "13px", background: "#141414", color: "#888",
              border: "1px solid #222", borderRadius: "8px", fontSize: "14px",
              cursor: "pointer", fontWeight: "500"
            }}>← Indietro</button>
          )}

          {current < questions.length - 1 ? (
            <button onClick={handleNext} disabled={currentAnswer === undefined && !(q.id in answers)} style={{
              flex: 2, padding: "13px",
              background: currentAnswer !== undefined || (q.id in answers) ? "#E8C840" : "#1A1A1A",
              color: currentAnswer !== undefined || (q.id in answers) ? "#0A0A0A" : "#444",
              border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "700",
              cursor: currentAnswer !== undefined || (q.id in answers) ? "pointer" : "default",
              transition: "all 0.15s"
            }}>Avanti →</button>
          ) : (
            <button onClick={handleSubmit} style={{
              flex: 2, padding: "13px", background: "#E8C840", color: "#0A0A0A",
              border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "700",
              cursor: "pointer"
            }}>Scopri il tuo profilo →</button>
          )}
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginTop: "20px", flexWrap: "wrap" }}>
          {questions.map((qq, i) => {
            const isAnswered = qq.id in answers;
            const isCurrent = i === current;
            return (
              <div key={qq.id} onClick={() => setCurrent(i)} style={{
                width: isCurrent ? "18px" : "6px", height: "6px",
                borderRadius: "3px",
                background: isCurrent ? "#E8C840" : isAnswered ? CATEGORY_COLORS[qq.category] : "#222",
                cursor: "pointer", transition: "all 0.2s"
              }} />
            );
          })}
        </div>

      </div>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";

const COLORS = {
  primary: "#6C3FE8",
  primaryLight: "#8B5CF6",
  primaryDark: "#4C1D95",
  secondary: "#F59E0B",
  accent: "#10B981",
  accentBlue: "#3B82F6",
  bg: "#0F0A1E",
  bgCard: "#1A1030",
  bgCardLight: "#241847",
  text: "#F8F7FF",
  textMuted: "#9CA3AF",
  textSecondary: "#C4B5FD",
  danger: "#EF4444",
  success: "#10B981",
  border: "#2D1F5E",
};

const lessons = [
  {
    id: 1,
    title: "Saludos básicos",
    level: "Principiante",
    icon: "👋",
    xp: 50,
    duration: "5 min",
    completed: true,
    category: "Vocabulario",
    color: "#10B981",
    exercises: [
      { type: "vocab", word: "Hello", translation: "Hola", example: "Hello, how are you?" },
      { type: "vocab", word: "Good morning", translation: "Buenos días", example: "Good morning! Have a great day." },
      { type: "vocab", word: "Goodbye", translation: "Adiós", example: "Goodbye! See you tomorrow." },
      { type: "vocab", word: "Please", translation: "Por favor", example: "Can you help me, please?" },
      { type: "vocab", word: "Thank you", translation: "Gracias", example: "Thank you very much!" },
    ],
  },
  {
    id: 2,
    title: "Números y colores",
    level: "Principiante",
    icon: "🔢",
    xp: 60,
    duration: "7 min",
    completed: true,
    category: "Vocabulario",
    color: "#3B82F6",
    exercises: [
      { type: "vocab", word: "One", translation: "Uno", example: "I have one apple." },
      { type: "vocab", word: "Two", translation: "Dos", example: "There are two cats." },
      { type: "vocab", word: "Red", translation: "Rojo", example: "The apple is red." },
      { type: "vocab", word: "Blue", translation: "Azul", example: "The sky is blue." },
      { type: "vocab", word: "Green", translation: "Verde", example: "The grass is green." },
    ],
  },
  {
    id: 3,
    title: "Presente simple",
    level: "Intermedio",
    icon: "📝",
    xp: 80,
    duration: "10 min",
    completed: false,
    category: "Gramática",
    color: "#F59E0B",
    exercises: [
      { type: "vocab", word: "I work", translation: "Yo trabajo", example: "I work every day." },
      { type: "vocab", word: "She reads", translation: "Ella lee", example: "She reads books at night." },
      { type: "vocab", word: "They play", translation: "Ellos juegan", example: "They play football on weekends." },
    ],
  },
  {
    id: 4,
    title: "En el restaurante",
    level: "Intermedio",
    icon: "🍽️",
    xp: 90,
    duration: "12 min",
    completed: false,
    category: "Conversación",
    color: "#EC4899",
    exercises: [
      { type: "vocab", word: "Menu", translation: "Menú / Carta", example: "Can I see the menu, please?" },
      { type: "vocab", word: "Order", translation: "Ordenar", example: "I'd like to order a coffee." },
      { type: "vocab", word: "Bill", translation: "Cuenta", example: "Can I have the bill, please?" },
    ],
  },
  {
    id: 5,
    title: "Pasado simple",
    level: "Intermedio",
    icon: "⏰",
    xp: 100,
    duration: "15 min",
    completed: false,
    category: "Gramática",
    color: "#6C3FE8",
    exercises: [
      { type: "vocab", word: "I went", translation: "Yo fui", example: "I went to school yesterday." },
      { type: "vocab", word: "She said", translation: "Ella dijo", example: "She said goodbye." },
      { type: "vocab", word: "We saw", translation: "Nosotros vimos", example: "We saw a movie last night." },
    ],
  },
  {
    id: 6,
    title: "Viajes y aeropuerto",
    level: "Avanzado",
    icon: "✈️",
    xp: 120,
    duration: "18 min",
    completed: false,
    category: "Conversación",
    color: "#14B8A6",
    exercises: [
      { type: "vocab", word: "Boarding pass", translation: "Tarjeta de embarque", example: "Please show your boarding pass." },
      { type: "vocab", word: "Luggage", translation: "Equipaje", example: "My luggage is too heavy." },
      { type: "vocab", word: "Departure", translation: "Salida", example: "The departure is at 10 AM." },
    ],
  },
];

const pronunciationWords = [
  { word: "Beautiful", ipa: "/ˈbjuːtɪfʊl/", difficulty: "Fácil", tip: "Enfócate en la sílaba 'BEW'" },
  { word: "Comfortable", ipa: "/ˈkʌmftəbəl/", difficulty: "Medio", tip: "3 sílabas: COM-fta-ble" },
  { word: "Particularly", ipa: "/pəˈtɪkjʊləli/", difficulty: "Difícil", tip: "5 sílabas: par-TIC-u-lar-ly" },
  { word: "Entrepreneur", ipa: "/ˌɒntrəprəˈnɜː/", difficulty: "Difícil", tip: "Origen francés, énfasis al final" },
  { word: "Wednesday", ipa: "/ˈwenzdeɪ/", difficulty: "Medio", tip: "La 'd' central es silenciosa" },
  { word: "Throughout", ipa: "/θruːˈaʊt/", difficulty: "Fácil", tip: "Dos sílabas: through-OUT" },
];

const initialMessages = [
  {
    id: 1,
    role: "ai",
    text: "¡Hola! Soy Learna AI 🤖 Tu asistente de inglés. Puedo ayudarte a practicar conversación, corregir tu gramática o enseñarte vocabulario nuevo. ¿Por dónde empezamos?",
    time: "Ahora",
  },
];

const quickReplies = [
  "Quiero practicar conversación",
  "Corrígeme mi gramática",
  "Enséñame vocabulario nuevo",
  "Practica conmigo una entrevista de trabajo",
];

// TODO: Reemplazar con respuestas reales de API de IA (ej. OpenAI GPT)
const aiResponses = [
  "¡Excelente! Let's practice. Tell me about your day in English. Don't worry about mistakes! 😊",
  "Great choice! Write me a sentence in English and I'll help you correct it. For example: 'Yesterday I go to the store' — I'll show you the correction!",
  "Sure! Here's a new word: **Serendipity** — It means finding something good by accident. Example: 'Meeting my best friend was pure serendipity!' Can you use it in a sentence? 🌟",
  "Perfect! Let's simulate a job interview. I'll be the interviewer. Ready? \n\n**Interviewer:** 'Tell me about yourself.' \n\nYour turn! Answer in English 💼",
  "That's interesting! Let me give you some feedback on your English. I noticed a small grammar point — try using 'am/is/are' + verb+ing for ongoing actions. Example: 'I **am learning** English right now.' 📝",
  "¡Muy bien! You're making great progress! Keep practicing and you'll be fluent in no time. 🚀 Is there anything specific you'd like to work on?",
];

export default function App() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [userXP, setUserXP] = useState(340);
  const [streak, setStreak] = useState(7);
  const [level, setLevel] = useState(3);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessonStep, setLessonStep] = useState(0);
  const [lessonDone, setLessonDone] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingResult, setRecordingResult] = useState(null);
  const [filterLevel, setFilterLevel] = useState("Todos");
  const [completedLessons, setCompletedLessons] = useState([1, 2]);
  const [toast, setToast] = useState(null);
  const [lessonChoices, setLessonChoices] = useState([]);
  const [choiceResult, setChoiceResult] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const getLevelName = (lvl) => {
    if (lvl <= 2) return "Principiante";
    if (lvl <= 5) return "Intermedio";
    if (lvl <= 8) return "Avanzado";
    return "Experto";
  };

  const xpForNextLevel = level * 200;
  const xpProgress = (userXP % xpForNextLevel) / xpForNextLevel;

  const startLesson = (lesson) => {
    setSelectedLesson(lesson);
    setLessonStep(0);
    setLessonDone(false);
    setChoiceResult(null);
    // Generate choices for the first step
    generateChoices(lesson, 0);
  };

  const generateChoices = (lesson, step) => {
    const correct = lesson.exercises[step].translation;
    const others = ["Hola", "Gracias", "Por favor", "Sí", "No", "Quizás", "Bien", "Mal", "Aquí", "Allá"]
      .filter((w) => w !== correct)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const all = [...others, correct].sort(() => Math.random() - 0.5);
    setLessonChoices(all);
    setChoiceResult(null);
  };

  const handleChoice = (choice) => {
    const correct = selectedLesson.exercises[lessonStep].translation;
    if (choice === correct) {
      setChoiceResult("correct");
      showToast("¡Correcto! 🎉", "success");
    } else {
      setChoiceResult("wrong");
      showToast(`Respuesta correcta: "${correct}"`, "error");
    }
  };

  const nextStep = () => {
    if (choiceResult === null) return;
    if (lessonStep + 1 >= selectedLesson.exercises.length) {
      setLessonDone(true);
      if (!completedLessons.includes(selectedLesson.id)) {
        setCompletedLessons([...completedLessons, selectedLesson.id]);
        setUserXP((prev) => prev + selectedLesson.xp);
        showToast(`+${selectedLesson.xp} XP ganados! 🌟`, "success");
        if (userXP + selectedLesson.xp >= xpForNextLevel) {
          setLevel((prev) => prev + 1);
        }
      }
    } else {
      const nextS = lessonStep + 1;
      setLessonStep(nextS);
      generateChoices(selectedLesson, nextS);
    }
  };

  const sendMessage = (text) => {
    const msg = text || inputText.trim();
    if (!msg) return;
    const newMsg = { id: Date.now(), role: "user", text: msg, time: "Ahora" };
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
    setIsTyping(true);
    // TODO: Enviar a API real de IA para respuesta contextual
    setTimeout(() => {
      setIsTyping(false);
      const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "ai", text: response, time: "Ahora" },
      ]);
    }, 1500 + Math.random() * 1000);
  };

  const handlePronunciation = (word) => {
    setSelectedWord(word);
    setRecordingResult(null);
  };

  const simulateRecording = () => {
    setIsRecording(true);
    setRecordingResult(null);
    // TODO: Integrar Web Speech API o servicio externo de reconocimiento de voz
    setTimeout(() => {
      setIsRecording(false);
      const score = Math.floor(Math.random() * 40) + 60;
      setRecordingResult({
        score,
        feedback:
          score >= 85
            ? "¡Excelente pronunciación! 🌟"
            : score >= 70
            ? "¡Muy bien! Practica un poco más 💪"
            : "Sigue practicando, vas mejorando 📈",
      });
    }, 2500);
  };

  const styles = {
    app: {
      fontFamily: "'Segoe UI', 'Inter', system-ui, sans-serif",
      background: COLORS.bg,
      color: COLORS.text,
      minHeight: "100vh",
      maxWidth: "430px",
      margin: "0 auto",
      position: "relative",
      overflow: "hidden",
    },
    screen: {
      paddingBottom: "80px",
      minHeight: "100vh",
      overflowY: "auto",
    },
    header: {
      background: `linear-gradient(135deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 100%)`,
      padding: "50px 20px 24px",
      position: "relative",
      overflow: "hidden",
    },
    headerDecor: {
      position: "absolute",
      top: "-30px",
      right: "-30px",
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.05)",
    },
    headerDecor2: {
      position: "absolute",
      bottom: "-50px",
      left: "-20px",
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.04)",
    },
    bottomNav: {
      position: "fixed",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: "430px",
      background: COLORS.bgCard,
      borderTop: `1px solid ${COLORS.border}`,
      display: "flex",
      justifyContent: "space-around",
      padding: "8px 0 16px",
      zIndex: 100,
    },
    navItem: (active) => ({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "4px",
      cursor: "pointer",
      padding: "4px 12px",
      borderRadius: "12px",
      transition: "all 0.2s",
      background: active ? `${COLORS.primary}22` : "transparent",
    }),
    navIcon: (active) => ({
      fontSize: "22px",
      filter: active ? "none" : "grayscale(0.5) opacity(0.6)",
    }),
    navLabel: (active) => ({
      fontSize: "10px",
      color: active ? COLORS.primaryLight : COLORS.textMuted,
      fontWeight: active ? "700" : "400",
    }),
    card: {
      background: COLORS.bgCard,
      borderRadius: "20px",
      padding: "20px",
      border: `1px solid ${COLORS.border}`,
      marginBottom: "16px",
    },
    btn: (color = COLORS.primary, full = false) => ({
      background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
      color: "#fff",
      border: "none",
      borderRadius: "14px",
      padding: "14px 28px",
      fontSize: "15px",
      fontWeight: "700",
      cursor: "pointer",
      width: full ? "100%" : "auto",
      transition: "all 0.2s",
      boxShadow: `0 4px 15px ${color}44`,
    }),
    btnOutline: {
      background: "transparent",
      color: COLORS.primaryLight,
      border: `2px solid ${COLORS.primary}`,
      borderRadius: "14px",
      padding: "12px 24px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    badge: (color = COLORS.primary) => ({
      background: `${color}22`,
      color: color,
      borderRadius: "8px",
      padding: "4px 10px",
      fontSize: "11px",
      fontWeight: "700",
      display: "inline-block",
    }),
    progressBar: (pct, color = COLORS.primary) => ({
      height: "8px",
      borderRadius: "4px",
      background: COLORS.border,
      overflow: "hidden",
      position: "relative",
    }),
    progressFill: (pct, color = COLORS.primary) => ({
      width: `${Math.min(pct * 100, 100)}%`,
      height: "100%",
      borderRadius: "4px",
      background: `linear-gradient(90deg, ${color}, ${color}AA)`,
      transition: "width 0.8s ease",
    }),
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "800",
      color: COLORS.text,
      marginBottom: "14px",
    },
    input: {
      background: COLORS.bgCardLight,
      border: `1.5px solid ${COLORS.border}`,
      borderRadius: "14px",
      padding: "14px 16px",
      color: COLORS.text,
      fontSize: "15px",
      outline: "none",
      width: "100%",
      boxSizing: "border-box",
    },
    lessonCard: (completed, color) => ({
      background: COLORS.bgCard,
      borderRadius: "18px",
      padding: "18px",
      border: `1.5px solid ${completed ? color + "44" : COLORS.border}`,
      display: "flex",
      alignItems: "center",
      gap: "14px",
      cursor: "pointer",
      transition: "all 0.2s",
      marginBottom: "12px",
      opacity: 1,
    }),
  };

  // ===== SCREENS =====

  const renderInicio = () => (
    <div style={styles.screen}>
      <div style={styles.header}>
        <div style={styles.headerDecor} />
        <div style={styles.headerDecor2} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 1 }}>
          <div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", marginBottom: "4px" }}>¡Bienvenido de vuelta! 👋</div>
            <div style={{ fontSize: "26px", fontWeight: "800", color: "#fff" }}>Let's Speak</div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", marginTop: "4px" }}>
              🔥 {streak} días de racha
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "56px", height: "56px", borderRadius: "50%",
              background: `linear-gradient(135deg, ${COLORS.secondary}, #F97316)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "20px", fontWeight: "800", color: "#fff",
              boxShadow: "0 4px 12px rgba(245,158,11,0.4)"
            }}>
              {level}
            </div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.7)", marginTop: "4px" }}>{getLevelName(level)}</div>
          </div>
        </div>
        <div style={{ marginTop: "20px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>Nivel {level} → {level + 1}</span>
            <span style={{ fontSize: "12px", color: COLORS.secondary, fontWeight: "700" }}>{userXP} / {xpForNextLevel} XP</span>
          </div>
          <div style={{ ...styles.progressBar(xpProgress), background: "rgba(255,255,255,0.15)" }}>
            <div style={styles.progressFill(xpProgress, COLORS.secondary)} />
          </div>
        </div>
      </div>

      <div style={{ padding: "20px" }}>
        {/* Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "24px" }}>
          {[
            { icon: "🔥", label: "Racha", value: `${streak}d` },
            { icon: "⭐", label: "XP Total", value: userXP },
            { icon: "📚", label: "Lecciones", value: completedLessons.length },
          ].map((stat, i) => (
            <div key={i} style={{
              background: COLORS.bgCard, borderRadius: "16px", padding: "14px",
              border: `1px solid ${COLORS.border}`, textAlign: "center"
            }}>
              <div style={{ fontSize: "22px", marginBottom: "4px" }}>{stat.icon}</div>
              <div style={{ fontSize: "18px", fontWeight: "800", color: COLORS.text }}>{stat.value}</div>
              <div style={{ fontSize: "10px", color: COLORS.textMuted }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Daily Goal */}
        <div style={{ ...styles.card, background: `linear-gradient(135deg, ${COLORS.primary}22, ${COLORS.accentBlue}11)` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <div>
              <div style={{ fontWeight: "800", fontSize: "16px" }}>Meta diaria 🎯</div>
              <div style={{ fontSize: "13px", color: COLORS.textMuted, marginTop: "2px" }}>3 de 5 lecciones completadas</div>
            </div>
            <div style={{ fontSize: "28px" }}>60%</div>
          </div>
          <div style={styles.progressBar(0.6)}>
            <div style={styles.progressFill(0.6, COLORS.accent)} />
          </div>
        </div>

        {/* Continue */}
        <div style={styles.sectionTitle}>Continuar aprendiendo</div>
        {lessons.filter(l => !completedLessons.includes(l.id)).slice(0, 2).map(lesson => (
          <div key={lesson.id} style={styles.lessonCard(false, lesson.color)} onClick={() => { setSelectedLesson(lesson); startLesson(lesson); setActiveTab("lecciones"); }}>
            <div style={{
              width: "52px", height: "52px", borderRadius: "14px",
              background: `${lesson.color}22`, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "26px", flexShrink: 0,
              border: `1.5px solid ${lesson.color}44`
            }}>{lesson.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: "700", fontSize: "15px", marginBottom: "4px" }}>{lesson.title}</div>
              <div style={{ fontSize: "12px", color: COLORS.textMuted }}>
                {lesson.level} • {lesson.duration} • +{lesson.xp} XP
              </div>
              <div style={{ marginTop: "8px", ...styles.progressBar(0), height: "4px" }}>
                <div style={{ ...styles.progressFill(0, lesson.color), height: "4px" }} />
              </div>
            </div>
            <div style={{ fontSize: "20px" }}>▶️</div>
          </div>
        ))}

        {/* Quick Actions */}
        <div style={styles.sectionTitle}>Practica ahora</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {[
            { icon: "🤖", title: "Chat con IA", desc: "Practica conversación", tab: "chat", color: COLORS.primary },
            { icon: "🎙️", title: "Pronunciación", desc: "Mejora tu acento", tab: "pronunciacion", color: COLORS.accentBlue },
            { icon: "📖", title: "Lecciones", desc: "Aprende con ejercicios", tab: "lecciones", color: COLORS.accent },
            { icon: "👤", title: "Mi Perfil", desc: "Ve tu progreso", tab: "perfil", color: COLORS.secondary },
          ].map((item, i) => (
            <div key={i} style={{
              background: COLORS.bgCard, borderRadius: "18px", padding: "18px",
              border: `1px solid ${item.color}33`, cursor: "pointer", transition: "all 0.2s"
            }} onClick={() => setActiveTab(item.tab)}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>{item.icon}</div>
              <div style={{ fontWeight: "700", fontSize: "14px", color: COLORS.text }}>{item.title}</div>
              <div style={{ fontSize: "11px", color: COLORS.textMuted, marginTop: "2px" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLecciones = () => {
    if (selectedLesson && !lessonDone) {
      const exercise = selectedLesson.exercises[lessonStep];
      const progress = lessonStep / selectedLesson.exercises.length;
      return (
        <div style={styles.screen}>
          <div style={{
            background: `linear-gradient(135deg, ${selectedLesson.color}33, ${selectedLesson.color}11)`,
            padding: "50px 20px 24px",
            borderBottom: `1px solid ${selectedLesson.color}33`
          }}>
            <button onClick={() => setSelectedLesson(null)} style={{
              background: "rgba(255,255,255,0.1)", border: "none", color: COLORS.text,
              borderRadius: "10px", padding: "8px 14px", cursor: "pointer", fontSize: "14px", marginBottom: "16px"
            }}>← Volver</button>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <div>
                <div style={{ ...styles.badge(selectedLesson.color), marginBottom: "8px" }}>{selectedLesson.category}</div>
                <div style={{ fontSize: "20px", fontWeight: "800" }}>{selectedLesson.title}</div>
              </div>
              <div style={{ fontSize: "32px" }}>{selectedLesson.icon}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "12px", color: COLORS.textMuted }}>Ejercicio {lessonStep + 1} de {selectedLesson.exercises.length}</span>
              <span style={{ fontSize: "12px", color: selectedLesson.color, fontWeight: "700" }}>+{selectedLesson.xp} XP</span>
            </div>
            <div style={styles.progressBar(progress, selectedLesson.color)}>
              <div style={styles.progressFill(progress, selectedLesson.color)} />
            </div>
          </div>

          <div style={{ padding: "24px 20px" }}>
            {/* Question */}
            <div style={{ ...styles.card, textAlign: "center", marginBottom: "24px" }}>
              <div style={{ fontSize: "13px", color: COLORS.textMuted, marginBottom: "8px" }}>¿Cómo se traduce?</div>
              <div style={{
                fontSize: "36px", fontWeight: "900", color: COLORS.text,
                letterSpacing: "-1px", marginBottom: "8px"
              }}>{exercise.word}</div>
              <div style={{ fontSize: "13px", color: COLORS.textMuted, fontStyle: "italic" }}>"{exercise.example}"</div>
            </div>

            {/* Choices */}
            <div style={styles.sectionTitle}>Selecciona la traducción correcta</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
              {lessonChoices.map((choice, i) => {
                const isCorrect = choice === exercise.translation;
                const isSelected = choiceResult !== null;
                let bg = COLORS.bgCard;
                let border = COLORS.border;
                let textColor = COLORS.text;
                if (isSelected && isCorrect) { bg = `${COLORS.success}22`; border = COLORS.success; textColor = COLORS.success; }
                else if (isSelected && choiceResult === "wrong" && choice !== exercise.translation) { bg = COLORS.bgCard; border = COLORS.border; textColor = COLORS.textMuted; }
                return (
                  <div key={i} onClick={() => !choiceResult && handleChoice(choice)} style={{
                    background: bg, border: `2px solid ${border}`, borderRadius: "14px",
                    padding: "16px", textAlign: "center", cursor: choiceResult ? "default" : "pointer",
                    transition: "all 0.2s", fontWeight: "600", fontSize: "15px", color: textColor,
                  }}>{choice}</div>
                );
              })}
            </div>

            {choiceResult && (
              <div style={{
                background: choiceResult === "correct" ? `${COLORS.success}22` : `${COLORS.danger}22`,
                border: `1.5px solid ${choiceResult === "correct" ? COLORS.success : COLORS.danger}`,
                borderRadius: "14px", padding: "16px", marginBottom: "16px",
                display: "flex", alignItems: "center", gap: "12px"
              }}>
                <div style={{ fontSize: "24px" }}>{choiceResult === "correct" ? "✅" : "❌"}</div>
                <div>
                  <div style={{ fontWeight: "700", color: choiceResult === "correct" ? COLORS.success : COLORS.danger }}>
                    {choiceResult === "correct" ? "¡Correcto!" : "Incorrecto"}
                  </div>
                  <div style={{ fontSize: "13px", color: COLORS.textMuted, marginTop: "2px" }}>
                    {exercise.word} = {exercise.translation}
                  </div>
                </div>
              </div>
            )}

            <button style={styles.btn(selectedLesson.color, true)} onClick={nextStep} disabled={!choiceResult}>
              {lessonStep + 1 >= selectedLesson.exercises.length ? "Finalizar lección 🎉" : "Siguiente →"}
            </button>
          </div>
        </div>
      );
    }

    if (selectedLesson && lessonDone) {
      return (
        <div style={{ ...styles.screen, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", textAlign: "center" }}>
          <div style={{ fontSize: "80px", marginBottom: "20px" }}>🏆</div>
          <div style={{ fontSize: "28px", fontWeight: "900", marginBottom: "8px" }}>¡Lección completada!</div>
          <div style={{ fontSize: "16px", color: COLORS.textMuted, marginBottom: "28px" }}>
            Ganaste <span style={{ color: COLORS.secondary, fontWeight: "800" }}>+{selectedLesson.xp} XP</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", width: "100%", maxWidth: "320px", marginBottom: "32px" }}>
            {[
              { icon: "⭐", label: "XP Ganados", value: `+${selectedLesson.xp}` },
              { icon: "✅", label: "Correctas", value: `${selectedLesson.exercises.length}/${selectedLesson.exercises.length}` },
              { icon: "🔥", label: "Racha", value: `${streak}d` },
            ].map((s, i) => (
              <div key={i} style={{ background: COLORS.bgCard, borderRadius: "14px", padding: "14px", border: `1px solid ${COLORS.border}` }}>
                <div style={{ fontSize: "20px" }}>{s.icon}</div>
                <div style={{ fontWeight: "800", fontSize: "16px", marginTop: "4px" }}>{s.value}</div>
                <div style={{ fontSize: "10px", color: COLORS.textMuted }}>{s.label}</div>
              </div>
            ))}
          </div>
          <button style={{ ...styles.btn(COLORS.primary, true), maxWidth: "320px" }} onClick={() => setSelectedLesson(null)}>
            Ver más lecciones
          </button>
          <button style={{ ...styles.btnOutline, marginTop: "12px", width: "100%", maxWidth: "320px" }} onClick={() => startLesson(selectedLesson)}>
            Repetir lección
          </button>
        </div>
      );
    }

    return (
      <div style={styles.screen}>
        <div style={{ ...styles.header, padding: "50px 20px 24px" }}>
          <div style={{ fontSize: "24px", fontWeight: "800" }}>Lecciones 📚</div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", marginTop: "4px" }}>
            {completedLessons.length} de {lessons.length} completadas
          </div>
        </div>
        <div style={{ padding: "20px" }}>
          {/* Filter */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px", overflowX: "auto", paddingBottom: "4px" }}>
            {["Todos", "Principiante", "Intermedio", "Avanzado"].map(f => (
              <button key={f} onClick={() => setFilterLevel(f)} style={{
                background: filterLevel === f ? COLORS.primary : COLORS.bgCard,
                color: filterLevel === f ? "#fff" : COLORS.textMuted,
                border: `1.5px solid ${filterLevel === f ? COLORS.primary : COLORS.border}`,
                borderRadius: "20px", padding: "8px 16px", fontSize: "12px",
                fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
              }}>{f}</button>
            ))}
          </div>

          {lessons
            .filter(l => filterLevel === "Todos" || l.level === filterLevel)
            .map((lesson, idx) => {
              const done = completedLessons.includes(lesson.id);
              return (
                <div key={lesson.id} style={styles.lessonCard(done, lesson.color)} onClick={() => startLesson(lesson)}>
                  <div style={{
                    width: "54px", height: "54px", borderRadius: "14px",
                    background: `${lesson.color}22`, display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "28px", flexShrink: 0,
                    border: `1.5px solid ${lesson.color}44`
                  }}>{lesson.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span style={{ fontWeight: "700", fontSize: "15px" }}>{lesson.title}</span>
                      {done && <span style={{ fontSize: "14px" }}>✅</span>}
                    </div>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <span style={styles.badge(lesson.color)}>{lesson.level}</span>
                      <span style={styles.badge(COLORS.textMuted)}>{lesson.duration}</span>
                      <span style={styles.badge(COLORS.secondary)}>+{lesson.xp} XP</span>
                    </div>
                  </div>
                  <div style={{ fontSize: "18px", color: done ? COLORS.success : COLORS.textMuted }}>
                    {done ? "🔁" : "▶️"}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  const renderChat = () => (
    <div style={{ ...styles.screen, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.primaryDark}, ${COLORS.primary})`,
        padding: "50px 20px 20px",
        display: "flex", alignItems: "center", gap: "14px", flexShrink: 0
      }}>
        <div style={{
          width: "48px", height: "48px", borderRadius: "50%",
          background: `linear-gradient(135deg, ${COLORS.secondary}, #F97316)`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px"
        }}>🤖</div>
        <div>
          <div style={{ fontWeight: "800", fontSize: "17px" }}>Learna AI</div>
          <div style={{ fontSize: "12px", color: COLORS.accent, display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: COLORS.accent, display: "inline-block" }} />
            En línea • Listo para practicar
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, padding: "16px 16px 0", overflowY: "auto",
        display: "flex", flexDirection: "column", gap: "12px"
      }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{
            display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            gap: "8px", alignItems: "flex-end"
          }}>
            {msg.role === "ai" && (
              <div style={{
                width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0,
                background: `linear-gradient(135deg, ${COLORS.secondary}, #F97316)`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px"
              }}>🤖</div>
            )}
            <div style={{
              maxWidth: "75%",
              background: msg.role === "user"
                ? `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`
                : COLORS.bgCard,
              borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              padding: "12px 16px",
              border: msg.role === "ai" ? `1px solid ${COLORS.border}` : "none",
            }}>
              <div style={{
                fontSize: "14px", lineHeight: "1.5", color: COLORS.text,
                whiteSpace: "pre-wrap"
              }}>{msg.text}</div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", marginTop: "4px", textAlign: "right" }}>{msg.time}</div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "50%",
              background: `linear-gradient(135deg, ${COLORS.secondary}, #F97316)`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0
            }}>🤖</div>
            <div style={{
              background: COLORS.bgCard, borderRadius: "18px 18px 18px 4px",
              padding: "14px 18px", border: `1px solid ${COLORS.border}`,
              display: "flex", gap: "5px", alignItems: "center"
            }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: "7px", height: "7px", borderRadius: "50%",
                  background: COLORS.primary, opacity: 0.7,
                  animation: `bounce 1.2s ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Replies */}
      <div style={{ padding: "12px 16px 0", overflowX: "auto", display: "flex", gap: "8px", flexShrink: 0 }}>
        {quickReplies.map((r, i) => (
          <button key={i} onClick={() => sendMessage(r)} style={{
            background: `${COLORS.primary}22`, border: `1.5px solid ${COLORS.primary}44`,
            borderRadius: "20px", padding: "8px 14px", color: COLORS.primaryLight,
            fontSize: "12px", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, fontWeight: "600"
          }}>{r}</button>
        ))}
      </div>

      {/* Input */}
      <div style={{
        padding: "12px 16px 16px", display: "flex", gap: "10px", alignItems: "center",
        background: COLORS.bgCard, borderTop: `1px solid ${COLORS.border}`, flexShrink: 0
      }}>
        <input
          style={{ ...styles.input, flex: 1, padding: "12px 16px" }}
          placeholder="Escribe en inglés o español..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button onClick={() => sendMessage()} style={{
          width: "46px", height: "46px", borderRadius: "14px",
          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
          border: "none", cursor: "pointer", fontSize: "18px", flexShrink: 0,
          boxShadow: `0 4px 12px ${COLORS.primary}44`
        }}>➤</button>
      </div>
    </div>
  );

  const renderPronunciacion = () => (
    <div style={styles.screen}>
      <div style={{ ...styles.header, padding: "50px 20px 24px" }}>
        <div style={{ fontSize: "24px", fontWeight: "800" }}>Pronunciación 🎙️</div>
        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", marginTop: "4px" }}>
          Practica y mejora tu acento inglés
        </div>
      </div>
      <div style={{ padding: "20px" }}>
        {selectedWord ? (
          <div>
            <button onClick={() => { setSelectedWord(null); setRecordingResult(null); }} style={{
              background: COLORS.bgCard, border: `1px solid ${COLORS.border}`,
              color: COLORS.text, borderRadius: "10px", padding: "8px 14px",
              cursor: "pointer", fontSize: "14px", marginBottom: "20px"
            }}>← Volver</button>

            <div style={{ ...styles.card, textAlign: "center", marginBottom: "20px" }}>
              <div style={{ fontSize: "42px", fontWeight: "900", marginBottom: "8px" }}>{selectedWord.word}</div>
              <div style={{ fontSize: "18px", color: COLORS.primary, marginBottom: "4px", fontFamily: "monospace" }}>
                {selectedWord.ipa}
              </div>
              <div style={styles.badge(COLORS.accentBlue)}>{selectedWord.difficulty}</div>
              <div style={{
                marginTop: "16px", background: `${COLORS.accentBlue}11`, borderRadius: "12px",
                padding: "12px", border: `1px solid ${COLORS.accentBlue}33`
              }}>
                <div style={{ fontSize: "12px", color: COLORS.textMuted, marginBottom: "4px" }}>💡 Consejo</div>
                <div style={{ fontSize: "14px", color: COLORS.text }}>{selectedWord.tip}</div>
              </div>
            </div>

            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div style={{ fontSize: "14px", color: COLORS.textMuted, marginBottom: "20px" }}>
                Presiona el botón y pronuncia la palabra
              </div>
              <button
                onClick={simulateRecording}
                disabled={isRecording}
                style={{
                  width: "100px", height: "100px", borderRadius: "50%",
                  background: isRecording
                    ? `linear-gradient(135deg, ${COLORS.danger}, #EF4444CC)`
                    : `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                  border: "none", cursor: isRecording ? "default" : "pointer",
                  fontSize: "36px", transition: "all 0.3s",
                  boxShadow: isRecording
                    ? `0 0 0 12px ${COLORS.danger}22, 0 0 0 24px ${COLORS.danger}11`
                    : `0 8px 24px ${COLORS.primary}44`,
                }}
              >
                {isRecording ? "🔴" : "🎤"}
              </button>
              {isRecording && (
                <div style={{ fontSize: "13px", color: COLORS.danger, marginTop: "12px", fontWeight: "600" }}>
                  Grabando... habla ahora
                </div>
              )}
            </div>

            {recordingResult && (
              <div style={{
                ...styles.card,
                background: recordingResult.score >= 85 ? `${COLORS.success}15` : recordingResult.score >= 70 ? `${COLORS.secondary}15` : `${COLORS.danger}15`,
                border: `1.5px solid ${recordingResult.score >= 85 ? COLORS.success : recordingResult.score >= 70 ? COLORS.secondary : COLORS.danger}`
              }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "48px", fontWeight: "900", color: recordingResult.score >= 85 ? COLORS.success : recordingResult.score >= 70 ? COLORS.secondary : COLORS.danger }}>
                    {recordingResult.score}%
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: "700", color: COLORS.text, marginTop: "8px" }}>
                    {recordingResult.feedback}
                  </div>
                  <div style={{ marginTop: "16px", ...styles.progressBar(recordingResult.score / 100) }}>
                    <div style={styles.progressFill(recordingResult.score / 100, recordingResult.score >= 85 ? COLORS.success : recordingResult.score >= 70 ? COLORS.secondary : COLORS.danger)} />
                  </div>
                </div>
                <button style={{ ...styles.btn(COLORS.primary, true), marginTop: "16px" }} onClick={simulateRecording}>
                  Intentar de nuevo 🔄
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <div style={{ ...styles.card, background: `linear-gradient(135deg, ${COLORS.accentBlue}22, ${COLORS.primary}11)`, marginBottom: "24px" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <div style={{ fontSize: "36px" }}>🎯</div>
                <div>
                  <div style={{ fontWeight: "800", fontSize: "16px" }}>Tip del día</div>
                  <div style={{ fontSize: "13px", color: COLORS.textMuted, marginTop: "4px" }}>
                    Practica 10 minutos diarios de pronunciación para mejorar rápidamente tu acento inglés.
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.sectionTitle}>Palabras para practicar</div>
            {pronunciationWords.map((word, i) => (
              <div key={i} style={{
                ...styles.card, display: "flex", alignItems: "center",
                gap: "14px", cursor: "pointer"
              }} onClick={() => handlePronunciation(word)}>
                <div style={{
                  width: "46px", height: "46px", borderRadius: "12px",
                  background: `${COLORS.accentBlue}22`, display: "flex",
                  alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0
                }}>🔊</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "700", fontSize: "16px" }}>{word.word}</div>
                  <div style={{ fontSize: "13px", color: COLORS.primary, fontFamily: "monospace" }}>{word.ipa}</div>
                </div>
                <span style={styles.badge(
                  word.difficulty === "Fácil" ? COLORS.success :
                  word.difficulty === "Medio" ? COLORS.secondary : COLORS.danger
                )}>{word.difficulty}</span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );

  const renderPerfil = () => {
    const achievements = [
      { icon: "🔥", title: "Racha de 7 días", desc: "Practica 7 días seguidos", done: true },
      { icon: "📚", title: "Primeras lecciones", desc: "Completa 2 lecciones", done: true },
      { icon: "🌟", title: "100 XP", desc: "Gana tus primeros 100 XP", done: true },
      { icon: "🏆", title: "Nivel 5", desc: "Alcanza el nivel 5", done: false },
      { icon: "💬", title: "Conversador", desc: "Envía 20 mensajes al chat", done: false },
      { icon: "🎙️", title: "Experto vocal", desc: "Practica 10 palabras", done: false },
    ];

    return (
      <div style={styles.screen}>
        <div style={{ ...styles.header, padding: "50px 20px 32px", textAlign: "center" }}>
          <div style={{
            width: "80px", height: "80px", borderRadius: "50%", margin: "0 auto 12px",
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "36px", boxShadow: `0 8px 24px ${COLORS.primary}55`
          }}>👤</div>
          <div style={{ fontSize: "22px", fontWeight: "800" }}>Mi Perfil</div>
          <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", marginTop: "4px" }}>
            {getLevelName(level)} • Nivel {level}
          </div>
          <div style={{ marginTop: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>Progreso de nivel</span>
              <span style={{ fontSize: "12px", color: COLORS.secondary, fontWeight: "700" }}>{userXP} XP</span>
            </div>
            <div style={{ ...styles.progressBar(xpProgress), background: "rgba(255,255,255,0.15)" }}>
              <div style={styles.progressFill(xpProgress, COLORS.secondary)} />
            </div>
          </div>
        </div>

        <div style={{ padding: "20px" }}>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
            {[
              { icon: "🔥", label: "Racha actual", value: `${streak} días` },
              { icon: "⭐", label: "XP Total", value: userXP },
              { icon: "📚", label: "Lecciones", value: `${completedLessons.length}/${lessons.length}` },
              { icon: "🎯", label: "Nivel", value: getLevelName(level) },
            ].map((s, i) => (
              <div key={i} style={{ ...styles.card, textAlign: "center" }}>
                <div style={{ fontSize: "26px", marginBottom: "6px" }}>{s.icon}</div>
                <div style={{ fontSize: "20px", fontWeight: "800" }}>{s.value}</div>
                <div style={{ fontSize: "11px", color: COLORS.textMuted, marginTop: "2px" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div style={styles.sectionTitle}>Logros 🏆</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "24px" }}>
            {achievements.map((a, i) => (
              <div key={i} style={{
                background: COLORS.bgCard, borderRadius: "14px", padding: "14px 10px",
                textAlign: "center", border: `1.5px solid ${a.done ? COLORS.secondary + "44" : COLORS.border}`,
                opacity: a.done ? 1 : 0.5,
              }}>
                <div style={{ fontSize: "26px", marginBottom: "6px" }}>{a.icon}</div>
                <div style={{ fontSize: "11px", fontWeight: "700", color: COLORS.text, marginBottom: "2px" }}>{a.title}</div>
                <div style={{ fontSize: "9px", color: COLORS.textMuted }}>{a.desc}</div>
                {a.done && <div style={{ fontSize: "14px", marginTop: "6px" }}>✅</div>}
              </div>
            ))}
          </div>

          {/* Weekly Activity */}
          <div style={styles.sectionTitle}>Actividad semanal 📊</div>
          <div style={{ ...styles.card }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "flex-end", justifyContent: "space-between" }}>
              {["L", "M", "X", "J", "V", "S", "D"].map((day, i) => {
                const heights = [60, 80, 40, 90, 70, 100, 50];
                const active = i < 5;
                return (
                  <div key={i} style={{ flex: 1, textAlign: "center" }}>
                    <div style={{
                      height: `${heights[i]}px`, borderRadius: "6px",
                      background: active
                        ? `linear-gradient(180deg, ${COLORS.primary}, ${COLORS.primaryLight})`
                        : COLORS.bgCardLight,
                      marginBottom: "6px", transition: "all 0.3s"
                    }} />
                    <div style={{ fontSize: "10px", color: active ? COLORS.text : COLORS.textMuted, fontWeight: active ? "700" : "400" }}>{day}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Settings */}
          <div style={styles.sectionTitle}>Configuración ⚙️</div>
          {[
            { icon: "🔔", label: "Notificaciones" },
            { icon: "🌍", label: "Idioma de interfaz" },
            { icon: "🎯", label: "Meta diaria" },
            { icon: "🔒", label: "Privacidad" },
          ].map((item, i) => (
            <div key={i} style={{
              ...styles.card, display: "flex", alignItems: "center",
              gap: "14px", cursor: "pointer", marginBottom: "8px"
            }}>
              <span style={{ fontSize: "20px" }}>{item.icon}</span>
              <span style={{ flex: 1, fontWeight: "600" }}>{item.label}</span>
              <span style={{ color: COLORS.textMuted, fontSize: "16px" }}>›</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const tabs = [
    { id: "inicio", icon: "🏠", label: "Inicio" },
    { id: "lecciones", icon: "📚", label: "Lecciones" },
    { id: "chat", icon: "🤖", label: "Chat IA" },
    { id: "pronunciacion", icon: "🎙️", label: "Hablar" },
    { id: "perfil", icon: "👤", label: "Perfil" },
  ];

  return (
    <div style={styles.app}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 0; height: 0; }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: "20px", left: "50%", transform: "translateX(-50%)",
          background: toast.type === "success" ? COLORS.success : COLORS.danger,
          color: "#fff", borderRadius: "12px", padding: "12px 20px",
          fontSize: "14px", fontWeight: "700", zIndex: 999,
          animation: "fadeIn 0.3s ease",
          boxShadow: `0 4px 20px ${toast.type === "success" ? COLORS.success : COLORS.danger}55`,
          whiteSpace: "nowrap"
        }}>{toast.msg}</div>
      )}

      {/* Main Content */}
      {activeTab === "inicio" && renderInicio()}
      {activeTab === "lecciones" && renderLecciones()}
      {activeTab === "chat" && renderChat()}
      {activeTab === "pronunciacion" && renderPronunciacion()}
      {activeTab === "perfil" && renderPerfil()}

      {/* Bottom Navigation */}
      <nav style={styles.bottomNav}>
        {tabs.map(tab => (
          <div key={tab.id} style={styles.navItem(activeTab === tab.id)} onClick={() => setActiveTab(tab.id)}>
            <span style={styles.navIcon(activeTab === tab.id)}>{tab.icon}</span>
            <span style={styles.navLabel(activeTab === tab.id)}>{tab.label}</span>
            {activeTab === tab.id && (
              <div style={{
                width: "4px", height: "4px", borderRadius: "50%",
                background: COLORS.primary, marginTop: "2px"
              }} />
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
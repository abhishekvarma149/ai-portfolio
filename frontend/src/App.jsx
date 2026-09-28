import { useEffect, useRef, useState } from "react";
import "./App.css";
import profile from "./assets/profile.png";
import MarkdownRenderer from "./components/MarkdownRenderer";
import ProjectCards from "./components/ProjectCards";

import { SiLeetcode } from "react-icons/si";
import {
  FaMoon,
  FaSun,
  FaTrash,
  FaGithub,
  FaLinkedin,
  FaFilePdf,
  FaUser,
  FaCode,
  FaLaptopCode,
  FaGraduationCap,
  FaAward,
  FaEnvelope,
  FaCopy,
  FaTimes,
  FaLightbulb,
} from "react-icons/fa";

const API = import.meta.env.VITE_API_URL;
function App() {
  const [theme, setTheme] = useState("light");
  const [showMobileProfile, setShowMobileProfile] = useState(false);

  const [chatId, setChatId] = useState("");

  const [question, setQuestion] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: `Hi, I'm Abhishek's AI assistant.

Ask me anything about:

• **About** Abhishek's background
• **Skills** & Technical Stack
• **Projects** & Architecture
• **Education** & Degrees
• **Experience** & Internships
• **Problem Solving** & LeetCode`,
      showProjects: false,
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    createChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

    inputRef.current?.focus();
  }, [messages]);

  async function createChat() {
    const response = await fetch(`${API}/new-chat`);

    const data = await response.json();

    setChatId(data.chat_id);
  }

  async function clearChat() {
    await createChat();

    setMessages([
      {
        role: "ai",
        text: `Hi, I'm Abhishek's AI assistant.

Ask me anything about:

• **About** Abhishek's background
• **Skills** & Technical Stack
• **Projects** & Architecture
• **Education** & Degrees
• **Experience** & Internships
• **Problem Solving** & LeetCode`,
        showProjects: false,
      },
    ]);

    setQuestion("");
  }
  async function sendMessage(customQuestion) {
    const userQuestion = customQuestion || question;

    if (!userQuestion.trim()) return;

    if (loading) return;

    setLoading(true);

    const qLower = userQuestion.toLowerCase();
    const isProjectQuery =
      qLower.includes("project") ||
      qLower.includes("nexoraai") ||
      qLower.includes("commercepilot") ||
      qLower.includes("pageintel");


    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userQuestion,
      },
      {
        role: "ai",
        text: "",
        loading: true,
        userQuery: userQuestion,
        showProjects: isProjectQuery,
      },
    ]);

    setQuestion("");

    const response = await fetch(
      `${API}/chat?chat_id=${chatId}&question=${encodeURIComponent(userQuestion)}`,
    );

    const reader = response.body.getReader();

    const decoder = new TextDecoder();

    let answer = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      answer += decoder.decode(value);

      setMessages((prev) => {
        const temp = [...prev];
        const lastIdx = temp.length - 1;

        temp[lastIdx] = {
          ...temp[lastIdx],
          role: "ai",
          text: answer,
          loading: false,
        };

        return temp;
      });
    }

    setLoading(false);
  }

  function quickAsk(question) {
    sendMessage(question);
  }

  function copyText(text) {
    navigator.clipboard.writeText(text);
  }

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  function getFollowUpChips(aiMsg) {
    const q = (aiMsg.userQuery || "").toLowerCase();
    const t = (aiMsg.text || "").toLowerCase();

    if (q.includes("project") || aiMsg.showProjects || t.includes("nexoraai")) {
      return [
        "What are Abhishek's technical skills?",
        "Tell me about his experience",
        "How can I contact Abhishek?",
      ];
    }
    if (q.includes("skill") || t.includes("python") || t.includes("react")) {
      return [
        "Tell me about his projects",
        "Where did Abhishek study?",
        "Tell me about his hackathon awards",
      ];
    }
    if (q.includes("education") || t.includes("college") || t.includes("bachelor")) {
      return [
        "Tell me about his hackathon awards",
        "What projects did he build?",
        "How can I contact Abhishek?",
      ];
    }
    if (q.includes("contact") || t.includes("email") || t.includes("linkedin")) {
      return [
        "Show Abhishek's projects",
        "What are his technical skills?",
        "Tell me about his experience",
      ];
    }

    return [
      "Tell me about his projects",
      "What are Abhishek's skills?",
      "How can I contact Abhishek?",
    ];
  }

  return (
    <div className={`app ${theme}`}>
      <div className="portfolio-layout">
        {/* ---------- LEFT SIDEBAR ---------- */}

        <aside className={`sidebar ${showMobileProfile ? "mobile-open" : ""}`}>
          <div className="mobile-header">
            <div
              className="mobile-profile-summary"
              onClick={() => setShowMobileProfile(!showMobileProfile)}
            >
              <img src={profile} alt="Abhishek" className="mobile-avatar" />
              <div className="mobile-profile-info">
                <h3 className="mobile-name">Abhishek Varma</h3>
                <p className="mobile-role">Software Engineer</p>
              </div>
            </div>

            <div className="mobile-actions">
              <button
                className="mobile-profile-toggle"
                onClick={() => setShowMobileProfile(!showMobileProfile)}
                title="View Profile Details"
                aria-label="Toggle profile details"
              >
                {showMobileProfile ? <FaTimes /> : <FaUser />}
              </button>

              <button
                className="theme-btn"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === "light" ? <FaMoon /> : <FaSun />}
              </button>

              <button
                className="clear-btn"
                onClick={clearChat}
                aria-label="Clear chat"
              >
                <FaTrash />
              </button>
            </div>
          </div>

          <div className="sidebar-content">
            <div className="logo">
              <h1>AI Portfolio</h1>

              <p>Abhishek Varma</p>
            </div>

            <img src={profile} alt="Abhishek" className="profile-photo" />

            <h2 className="name">Abhishek Varma</h2>

            <p className="role">Software Engineer</p>

            <p className="stack">React • Node.js • Java • Python • FastAPI • PostgreSQL</p>

            <div className="socials">
              <button
                className="resume-btn"
                onClick={() =>
                  window.open("/Abhishek_Varma_Resume.pdf", "_blank")
                }
                title="Resume"
              >
                <FaFilePdf />
              </button>

              <a
                href="https://github.com/abhishekvarma149"
                target="_blank"
                rel="noreferrer"
                className="github-btn"
              >
                <FaGithub />
              </a>

              <a
                href="https://leetcode.com/u/Abhishek261/"
                target="_blank"
                rel="noreferrer"
                className="leetcode-btn"
              >
                <SiLeetcode />
              </a>

              <a
                href="https://www.linkedin.com/in/abhishek-varma261/"
                target="_blank"
                rel="noreferrer"
                className="linkedin-btn"
              >
                <FaLinkedin />
              </a>
            </div>

            <div className="theme-buttons">
              <button className="theme-btn" onClick={toggleTheme}>
                {theme === "light" ? <FaMoon /> : <FaSun />}
              </button>

              <button className="clear-btn" onClick={clearChat}>
                <FaTrash />
              </button>
            </div>
          </div>
        </aside>

        {showMobileProfile && (
          <div
            className="mobile-backdrop"
            onClick={() => setShowMobileProfile(false)}
          />
        )}

        {/* ---------- MAIN ---------- */}

        <main className="main">
          <section className="hero-card">
            <div>
              <h2>Hello 👋</h2>

              <p>
                I'm Abhishek's AI Assistant. Ask me anything about my education,
                skills, projects, achievements or experience.
              </p>
            </div>
          </section>

          <section className="quick-actions">
            <button onClick={() => quickAsk("Tell me about Abhishek")}>
              <FaUser />
              <span>About</span>
            </button>

            <button onClick={() => quickAsk("Tell me about his skills")}>
              <FaCode />
              <span>Skills</span>
            </button>

            <button onClick={() => quickAsk("Tell me about his projects")}>
              <FaLaptopCode />
              <span>Projects</span>
            </button>

            <button onClick={() => quickAsk("Tell me about his education")}>
              <FaGraduationCap />
              <span>Education</span>
            </button>

            <button onClick={() => quickAsk("Tell me about his problem solving")}>
              <FaAward />
              <span>Problem Solving</span>
            </button>

            <button onClick={() => quickAsk("How can I contact Abhishek")}>
              <FaEnvelope />
              <span>Contact</span>
            </button>
          </section>

          <section className="messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.role}`}>
                <div className="bubble">
                  <div className="bubble-header">
                    <strong>
                      {message.role === "ai" ? "AI Assistant" : "You"}
                    </strong>

                    {message.role === "ai" &&
                      message.text !== "Thinking..." &&
                      message.text && (
                        <button
                          className="copy-btn"
                          onClick={() => copyText(message.text)}
                          title="Copy text"
                        >
                          <FaCopy />
                        </button>
                      )}
                  </div>

                  {message.loading ? (
                    <div className="typing">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  ) : (
                    <div className="bubble-body">
                      {message.role === "ai" ? (
                        <MarkdownRenderer content={message.text} />
                      ) : (
                        <p>{message.text}</p>
                      )}

                      {message.showProjects && <ProjectCards />}


                      {loading &&
                        index === messages.length - 1 &&
                        message.role === "ai" && (
                          <span className="cursor">|</span>
                        )}
                    </div>
                  )}

                  {/* Smart Follow-up Chips for AI Messages */}
                  {message.role === "ai" &&
                    !message.loading &&
                    index === messages.length - 1 && (
                      <div className="follow-up-section">
                        <div className="follow-up-label">
                          <FaLightbulb style={{ color: "#eab308", marginRight: 5 }} />
                          <span>Suggested follow-ups:</span>
                        </div>
                        <div className="follow-up-chips">
                          {getFollowUpChips(message).map((chip, cIdx) => (
                            <button
                              key={cIdx}
                              className="follow-up-chip"
                              onClick={() => quickAsk(chip)}
                            >
                              {chip}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef}></div>
          </section>


          <section className="input-area">
            <input
              ref={inputRef}
              type="text"
              value={question}
              placeholder="Ask anything about Abhishek..."
              disabled={loading}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button
              style={{
                background: "grey",
                color: "white",
                text: "white",
              }}
              onClick={sendMessage}
              disabled={loading}
            >
              {loading ? (
                <div className="typing ">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : (
                "Send"
              )}
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;

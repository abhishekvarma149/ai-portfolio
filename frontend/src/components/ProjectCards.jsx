import { FaGithub, FaExternalLinkAlt, FaRocket, FaRobot, FaShoppingCart, FaChrome } from "react-icons/fa";

const projectsData = [
  {
    id: "nexoraai",
    name: "NexoraAI",
    icon: <FaRobot style={{ color: "#8b5cf6" }} />,
    tagline: "Multi-Agent AI Platform",
    description: "Building a multi-agent AI platform using MERN stack and a scalable microservices architecture. Integrated RAG, Qdrant vector search, and Redis-based memory.",
    tech: ["MERN Stack", "LangChain", "LangGraph", "Qdrant", "Redis", "Docker"],
    github: "https://github.com/abhishekvarma149/ai-multi-agent-chat-platform",
    demo: null,
    badge: "AI Platform",
  },
  {
    id: "commercepilot",
    name: "CommercePilot",
    icon: <FaShoppingCart style={{ color: "#3b82f6" }} />,
    tagline: "AI-Driven Agentic Commerce Platform",
    description: "Engineered an autonomous AI buyer agent that parses queries, evaluates product specs, and proposes checkout carts using a PostgreSQL pgvector RAG-based search.",
    tech: ["Node.js", "Express", "PostgreSQL", "React", "OpenAI", "LangGraph"],
    github: "https://github.com/abhishekvarma149/commerce-pilot",
    demo: null,
    badge: "AI Agent",
  },
  {
    id: "pageintel",
    name: "PageIntel",
    icon: <FaChrome style={{ color: "#10b981" }} />,
    tagline: "AI Web Assistant Chrome Extension",
    description: "Developed a Chrome extension and FastAPI backend enabling users to chat with the content of any webpage using 10 different LLMs and RAG pipelines.",
    tech: ["Python", "FastAPI", "Qdrant", "Redis", "JavaScript"],
    github: "https://github.com/abhishekvarma149/PageIntel-Extension",
    demo: null,
    badge: "Web Extension",
  },
];

export default function ProjectCards() {
  return (
    <div className="project-cards-wrapper">
      <div className="project-cards-header">
        <FaRocket style={{ color: "#ec4899", marginRight: 8 }} />
        <span>Featured Engineering Projects</span>
      </div>
      <div className="project-cards-grid">
        {projectsData.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-card-top">
              <div className="project-title-group">
                <span className="project-icon">{project.icon}</span>
                <div>
                  <h4 className="project-name">{project.name}</h4>
                  <p className="project-tagline">{project.tagline}</p>
                </div>
              </div>
              <span className="project-badge">{project.badge}</span>
            </div>

            <p className="project-description">{project.description}</p>

            <div className="project-tech-pills">
              {project.tech.map((t, idx) => (
                <span key={idx} className="tech-pill">
                  {t}
                </span>
              ))}
            </div>

            <div className="project-actions">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="proj-btn proj-github"
              >
                <FaGithub /> GitHub
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="proj-btn proj-demo"
                >
                  <FaExternalLinkAlt /> Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

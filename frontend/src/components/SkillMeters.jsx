import { FaCode, FaLayerGroup, FaBrain } from "react-icons/fa";

const skillCategories = [
  {
    category: "Languages & Core",
    icon: <FaCode style={{ color: "#3b82f6" }} />,
    skills: [
      { name: "Java", level: 90, color: "#f8981d" },
      { name: "Python", level: 90, color: "#3776ab" },
      { name: "C++", level: 85, color: "#00599c" },
      { name: "JavaScript", level: 88, color: "#f7df1e" },
      { name: "SQL", level: 85, color: "#336791" },
    ],
  },
  {
    category: "Frameworks & Databases",
    icon: <FaLayerGroup style={{ color: "#10b981" }} />,
    skills: [
      { name: "React.js / Next.js", level: 92, color: "#61dafb" },
      { name: "FastAPI / Node.js", level: 88, color: "#009688" },
      { name: "MongoDB / PostgreSQL", level: 85, color: "#47a248" },
      { name: "Tailwind CSS", level: 88, color: "#38bdf8" },
    ],
  },
  {
    category: "AI, RAG & DevOps",
    icon: <FaBrain style={{ color: "#8b5cf6" }} />,
    skills: [
      { name: "RAG & LangChain", level: 88, color: "#a855f7" },
      { name: "LangGraph / Agents", level: 85, color: "#ec4899" },
      { name: "Docker & Linux", level: 82, color: "#2496ed" },
      { name: "Git & Postman", level: 90, color: "#f05032" },
    ],
  },
];

export default function SkillMeters() {
  return (
    <div className="skill-meters-container">
      <div className="skill-meters-title">
        <span>Abhishek's Technical Proficiency</span>
      </div>

      <div className="skill-categories-grid">
        {skillCategories.map((cat, idx) => (
          <div key={idx} className="skill-category-card">
            <div className="skill-category-header">
              {cat.icon}
              <h5>{cat.category}</h5>
            </div>

            <div className="skill-bars-list">
              {cat.skills.map((skill, sIdx) => (
                <div key={sIdx} className="skill-bar-item">
                  <div className="skill-bar-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-track">
                    <div
                      className="skill-fill"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: skill.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

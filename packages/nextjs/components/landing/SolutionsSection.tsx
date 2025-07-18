import { Card } from "../ui/card";

export const SolutionsSection: React.FC = () => (
  <section id="solutions" className="py-20">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Perfect for Every Industry</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          From education to healthcare, our platform serves diverse industries with tailored certification
          solutions.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: "Education",
            description: "Academic credentials, diplomas, and course completions",
            icon: "🎓",
          },
          {
            title: "Healthcare",
            description: "Medical licenses, certifications, and training records",
            icon: "🏥",
          },
          {
            title: "Technology",
            description: "IT certifications, training completions, and skill badges",
            icon: "💻",
          },
          {
            title: "Finance",
            description: "Professional licenses, compliance training, and certifications",
            icon: "🏦",
          },
          {
            title: "Manufacturing",
            description: "Quality certifications, safety training, and compliance",
            icon: "🏭",
          },
          {
            title: "Government",
            description: "Official documents, licenses, and public certifications",
            icon: "🏛️",
          },
        ].map((solution, index) => (
          <Card key={index} className="text-center">
            <div className="text-4xl mb-4">{solution.icon}</div>
            <div className="text-white font-bold text-lg mb-2">{solution.title}</div>
            <div className="text-slate-400 text-center">{solution.description}</div>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default SolutionsSection; 
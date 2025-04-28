import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Calendar, X } from 'lucide-react';

const Careers: React.FC = () => {
  const resumeRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', coverLetter: '' });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleScrollToResume = () => {
    resumeRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setResumeFile(e.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !resumeFile) {
      alert('Please fill out all required fields and attach a resume.');
      return;
    }

    // Simulate successful submission
    setShowModal(true);
    setFormData({ name: '', email: '', coverLetter: '' });
    setResumeFile(null);

    // Clear file input manually
    const fileInput = document.getElementById('resume-file') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="font-[Orbitron] bg-[#0a0a17] text-white relative">
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-[#1f1f2e] border border-purple-700 rounded-xl p-8 max-w-md mx-auto text-center shadow-xl relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-purple-400 hover:text-cyan-400">
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold text-purple-400 mb-4">🎉 Resume Submitted!</h3>
            <p className="text-gray-300 text-sm">
              Thanks for reaching out. We’ll keep your details and contact you if there's a fit!
            </p>
          </div>
        </div>
      )}

      {/* Hero */}
      <header className="relative flex items-center justify-center h-screen overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
        >
          <source src="/YouTube - YouTube (1080p, h264) (online-video-cutter.com).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-20 text-center px-4">
          <motion.h1
            className="text-5xl sm:text-6xl font-extrabold mb-4 text-white drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Join Our Team
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl mb-6 text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            We're looking for passionate and talented individuals to shape the future of game development.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <button
              onClick={handleScrollToResume}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-lg text-white font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              🚀 Send Your Resume
            </button>
          </motion.div>
        </div>
      </header>

      {/* Why Work With Us */}
      <section className="py-20 bg-gradient-to-br from-[#0f0f1c] to-[#1a1a2e]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 className="text-4xl font-bold text-center text-purple-400 mb-12">
            Why Work With Us?
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[{
              icon: <Users size={50} className="text-purple-500 mb-4 mx-auto" />,
              title: "Collaborative Culture",
              desc: "Work in a team-oriented environment where your ideas are heard and valued.",
            }, {
              icon: <Briefcase size={50} className="text-purple-500 mb-4 mx-auto" />,
              title: "Career Growth",
              desc: "We offer opportunities for you to grow and advance within your field.",
            }, {
              icon: <Calendar size={50} className="text-purple-500 mb-4 mx-auto" />,
              title: "Work-Life Balance",
              desc: "Enjoy a healthy balance between work and personal life with flexible schedules.",
            }].map((item, i) => (
              <motion.div
                key={i}
                className="text-center bg-[#1f1f2e] p-8 rounded-lg border border-purple-900 hover:border-cyan-500 shadow-lg"
              >
                {item.icon}
                <h3 className="text-2xl font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Submission */}
      <section ref={resumeRef} id="resume-submission" className="py-20 bg-[#0e0e1c] text-white">
        <div className="max-w-3xl mx-auto px-4">
          <motion.h2 className="text-4xl font-bold text-center text-purple-400 mb-12">
            Send Us Your Resume
          </motion.h2>
          <p className="text-center text-lg text-gray-300 mb-10">
            No open roles? No problem. We’re always scouting passionate creators. Drop us your resume below!
          </p>
          <form
            onSubmit={handleSubmit}
            className="bg-[#1f1f2e] p-8 rounded-lg shadow-lg border border-purple-900"
          >
            <div className="mb-6">
              <label className="block text-white text-lg mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-[#2c2c3c] text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-white text-lg mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-[#2c2c3c] text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-white text-lg mb-2">Attach Resume *</label>
              <input
                id="resume-file"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full p-3 bg-[#2c2c3c] text-white rounded-lg border border-gray-700"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-white text-lg mb-2">Cover Letter (Optional)</label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 bg-[#2c2c3c] text-white rounded-lg border border-gray-700"
                placeholder="Tell us why you'd be a great fit!"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-lg text-white font-semibold text-lg transition-transform transform hover:scale-105"
              >
                Submit Resume
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-700 to-indigo-900 text-white text-center">
        <motion.h2 className="text-3xl font-bold mb-4">
          Ready to Join Us?
        </motion.h2>
        <p className="text-xl mb-10 text-gray-300">
          Even if there aren't current openings, send us your resume and let’s connect for future opportunities!
        </p>
      </section>
    </div>
  );
};

export default Careers;

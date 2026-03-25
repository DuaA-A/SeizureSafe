import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { TeamMemberCard } from './TeamMemberCard';
import '../../styles/about.css';

// Using the team members defined in your project
const teamMembers = [
    { id: 1, name: "Zeinab Hamdy Hassab tayeeb", role: "Team Leader", isLeader: true, bio: "Coordinates clinical integration and leads the pharmacy presentation board structure." },
    { id: 2, name: "Ahmed Ezzat Osman Tantawy", role: "Clinical Pharmacist", isLeader: false, bio: "Specializes in antiepileptic drug interactions and metabolic profiling." },
    { id: 3, name: "Diana Yasser AbdAlazim Mohamed Salama", role: "Clinical Pharmacist", isLeader: false, bio: "Focuses on patient compliance and seizure trigger correlation data." },
    { id: 4, name: "Mina Talat Shaker Wassef", role: "Clinical Pharmacist", isLeader: false, bio: "Ensures the accuracy of the Interaction Checker API integration." },
    { id: 5, name: "Moustafa Khalid Mohamed Taha Bahr", role: "Clinical Pharmacist", isLeader: false, bio: "Develops the seizure pattern algorithms used in the Seizure Check tool." },
    { id: 6, name: "Nada Mohammed Kamal Abieah", role: "Clinical Pharmacist", isLeader: false, bio: "Curates the medical terminology and user instructions for clarity." },
    { id: 7, name: "Seveen Mohamed Ahmed Fouad Elsayoufy", role: "Clinical Pharmacist", isLeader: false, bio: "Evaluates application usability against pharmacy standards." },
    { id: 8, name: "Abdalla Abouelscoud Hassan Hassoub Soliman", role: "Clinical Pharmacist", isLeader: false, bio: "Researches up-to-date medication interactions and contraindications." },
    { id: 9, name: "Yassein Mohamed Mohamed Ali Almaghrabi", role: "Clinical Pharmacist", isLeader: false, bio: "Structures the medical history tracking and compliance database logic." },
    { id: 10, name: "Ahmed Mohamed Ahmed Elgashy", role: "Clinical Pharmacist", isLeader: false, bio: "Validates final clinical safety recommendations for the graduation board." }
];

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const leader = teamMembers.find((m) => m.isLeader);
    const members = teamMembers.filter((m) => !m.isLeader);

    const values = [
        {
            title: "Evidence-Based",
            description: "All our diagnostic tools and interaction verifications are grounded in active pharmacological research and medical databases.",
        },
        {
            title: "Transparent",
            description: "We provide clear, un-biased interpretations of medical interactions without hidden agendas.",
        },
        {
            title: "Patient Centric",
            description: "The interface respects that tracking seizures and medications can be stressful, focusing on a calm and reassuring design.",
        },
        {
            title: "Safety First",
            description: "The primary outcome of every feature in SeizureSafe is to prevent dangerous contraindications.",
        },
    ];

    return (
        <div className="about-page container">

            {/* ── Header ─────────────────────────────────────────────────── */}
            <div className="about-header animate-fade-in">
                <span style={{ color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '1rem' }}>The Clinical Team</span>
                <h2>Meet the Pharmacists Behind SeizureSafe</h2>
                <p>We are a dedicated group of pharmacy students committed to improving epilepsy care through technological intervention.</p>
            </div>

            {/* ── MTI College Section ─────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '6rem' }}
            >
                <div style={{ position: 'relative', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div
                        style={{
                            position: 'absolute', borderRadius: '50%', width: '220px', height: '220px',
                            background: 'radial-gradient(circle, transparent 38%, rgba(157, 141, 241, 0.4) 46%, transparent 75%)',
                            animation: 'logo-aura 2.8s ease-in-out infinite',
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute', borderRadius: '50%', width: '190px', height: '190px',
                            background: 'radial-gradient(circle, transparent 38%, rgba(169, 204, 227, 0.5) 47%, transparent 80%)',
                            animation: 'logo-aura 2.8s ease-in-out infinite 0.5s',
                        }}
                    />
                    <div
                        style={{
                            position: 'relative', zIndex: 10, width: '160px', height: '160px', borderRadius: '50%',
                            overflow: 'hidden', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 0 0 3px rgba(157, 141, 241, 0.6), 0 0 24px rgba(100, 100, 200, 0.2)',
                            animation: 'border-glow 2.8s ease-in-out infinite',
                        }}
                    >
                        {/* Optionally replace with a real MTI logo path */}
                        <GraduationCap style={{ width: '80px', height: '80px', color: 'var(--primary)' }} />
                    </div>
                </div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>MTI University</h3>
                <p style={{ maxWidth: '500px', color: 'var(--text-muted)' }}>Faculty of Pharmacy Medical Graduation Project 2026</p>
            </motion.div>

            {/* ── Leader Section ─────────────────────────────────────────── */}
            {leader && (
                <div style={{ marginBottom: '4rem' }}>
                    <TeamMemberCard member={leader} />
                </div>
            )}

            {/* ── Team Grid ──────────────────────────────────────────────── */}
            <div className="team-grid-about">
                {members.map((member, i) => (
                    <TeamMemberCard key={member.id} member={member} index={i} />
                ))}
            </div>

            {/* ── Mission Statement ───────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mission-box"
            >
                <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: 'rgba(157, 141, 241, 0.1)', filter: 'blur(100px)', borderRadius: '50%', transform: 'translate(30%, -30%)' }} />

                <div style={{ position: 'relative', zIndex: 10 }}>
                    <span className="mission-label">Our Mission</span>
                    <h2 className="mission-title">Bridging Pharmacy & Technology</h2>
                    <div className="mission-divider" />
                    <p className="mission-text">
                        We noticed that navigating the complexities of epilepsy treatment—from recognizing seizure patterns to tracking potential drug interactions—can be overwhelming for patients without constant professional supervision.
                    </p>
                    <p className="mission-text">
                        That is why we created SeizureSafe. An accessible tool that empowers patients with immediate, reliable pharmacological checks and symptom logging, functioning as your personal clinical pharmacist counterpart.
                    </p>
                </div>
            </motion.div>

            {/* ── Values ─────────────────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ marginBottom: '6rem' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--primary)', fontWeight: 800 }}>Core Foundations</span>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)' }}>Our Clinical Values</h2>
                </div>

                <div className="values-grid">
                    {values.map((value, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="glass-card"
                            style={{ padding: '2.5rem 2rem', textAlign: 'center' }}
                        >
                            <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: 'rgba(157, 141, 241, 0.15)', color: 'var(--primary)', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 800 }}>
                                ✦
                            </div>
                            <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>{value.title}</h4>
                            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* ── Action CTA ─────────────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="survey-box"
            >
                <div style={{ position: 'relative', zIndex: 10 }}>
                    <span className="survey-label">Take Action</span>
                    <h3 className="survey-title">Try the Seizure Check</h3>
                    <p className="survey-text">
                        Access our expert system designed to help identify the patterns of epileptic episodes to prepare comprehensive reports for your doctor.
                    </p>
                    <a href="/questionnaire" className="btn-white-solid">
                        Start the Diagnostic Tools
                    </a>
                </div>
            </motion.div>

        </div>
    );
};

export default About;

import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import '../../styles/about.css';

const PlaceholderAvatar = ({ isLeader }) => (
    <div
        style={{
            width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: isLeader ? 'linear-gradient(135deg, var(--text-main), #1a252f)' : 'linear-gradient(135deg, #f5f1ea, #e8e2d4)'
        }}
    >
        <User size={isLeader ? 80 : 56} color={isLeader ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'} />
    </div>
);

export const TeamMemberCard = ({ member, index = 0 }) => {
    if (member.isLeader) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="group"
            >
                <div className="leader-card">
                    <div className="leader-photo-area group">
                        
                        {/* Aura Animations */}
                        <div className="absolute inset-0" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                            <motion.div 
                                className="aura-1"
                                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.9, 0.6] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div 
                                className="aura-2"
                                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            />
                        </div>
                        
                        {member.image ? (
                            <img
                                src={member.image}
                                alt={member.name}
                                className="member-image"
                            />
                        ) : (
                            <PlaceholderAvatar isLeader />
                        )}

                        <div className="leader-gradient-overlay" />

                        <div className="leader-badge-wrapper">
                            <span className="leader-badge">Project Leader</span>
                        </div>

                        <div className="leader-name-overlay">
                            <h3 className="leader-name">{member.name}</h3>
                            <p className="leader-role">{member.role}</p>
                        </div>
                    </div>

                    <div className="leader-info-bg">
                        <p className="leader-bio">{member.bio}</p>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="group"
        >
            <div className="luxury-card">
                <div className="member-photo-area group-photo">
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
                        <motion.div 
                            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '150px', height: '150px', filter: 'blur(40px)', background: 'rgba(157, 141, 241, 0.2)', borderRadius: '50%' }}
                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>

                    {member.image ? (
                        <img
                            src={member.image}
                            alt={member.name}
                            className="member-image"
                            style={{ filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.1))" }}
                        />
                    ) : (
                        <PlaceholderAvatar />
                    )}
                </div>

                <div className="member-info-area">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-role">{member.role}</p>
                    <p className="member-bio">{member.bio}</p>
                </div>
            </div>
        </motion.div>
    );
};

import React, { useState } from 'react';

const MoodSelector = () => {
    const [selectedMood, setSelectedMood] = useState(null);

    const handleMoodSelect = async (mood) => {
        setSelectedMood(mood);
        try {
            await fetch('http://localhost:5000/api/mood', { // TODO: Use env variable in prod
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mood })
            });
        } catch (error) {
            console.error("Failed to save mood:", error);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-700">How are you feeling today?</h3>
            <div className="flex flex-wrap justify-center gap-3">
                {[
                    { label: 'happy', emoji: '😊', text: 'Happy' },
                    { label: 'neutral', emoji: '😐', text: 'Neutral' },
                    { label: 'sad', emoji: '😔', text: 'Sad' },
                    { label: 'angry', emoji: '😡', text: 'Angry' },
                    { label: 'anxious', emoji: '😰', text: 'Anxious' }
                ].map((moodItem) => (
                    <button
                        key={moodItem.label}
                        onClick={() => handleMoodSelect(moodItem.label)}
                        className={`flex flex-col items-center gap-1 px-4 py-3 rounded-2xl transition-all duration-200 border ${selectedMood === moodItem.label
                            ? 'bg-slate-800 text-white border-slate-800 transform scale-105 shadow-md'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                            }`}
                    >
                        <span className="text-2xl" role="img" aria-label={moodItem.label}>{moodItem.emoji}</span>
                        <span className="text-xs font-medium capitalize">{moodItem.text}</span>
                    </button>
                ))}
            </div>
            {selectedMood && <p className="text-sm text-teal-600 font-medium">Mood tracked! 📝</p>}
        </div>
    );
};

export default MoodSelector;

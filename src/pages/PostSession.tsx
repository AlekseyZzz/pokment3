import React, { useState } from 'react';
import { Bell, User, Search, Brain, Check, AlertTriangle, Plus, X, Heart, Info, Dumbbell, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import HandAnalysis from '../components/session/HandAnalysis';
import GradeSystem from '../components/session/GradeSystem';
import AutoResizeTextArea from '../components/common/AutoResizeTextArea';

const PostSession: React.FC = () => {
  const [minutesPlayed, setMinutesPlayed] = useState('');
  const [tableCount, setTableCount] = useState('1');
  const [energyLevel, setEnergyLevel] = useState('');
  const [performanceGrade, setPerformanceGrade] = useState('B');
  const [mentalState, setMentalState] = useState('');
  const [tiltTriggers, setTiltTriggers] = useState('');
  const [learnings, setLearnings] = useState('');
  const [expandedHands, setExpandedHands] = useState<number[]>([0]);
  const [hands, setHands] = useState([0]);
  const [didPreSession, setDidPreSession] = useState(true);
  const [skipReason, setSkipReason] = useState('');
  const [preSessionFeeling, setPreSessionFeeling] = useState('');
  const [hadStrongEmotions, setHadStrongEmotions] = useState<boolean | null>(null);
  const [emotion, setEmotion] = useState('');
  const [emotionTrigger, setEmotionTrigger] = useState('');
  const [emotionThoughts, setEmotionThoughts] = useState('');
  const [validReaction, setValidReaction] = useState('');
  const [exaggeratedReaction, setExaggeratedReaction] = useState('');
  const [futureResponse, setFutureResponse] = useState('');
  const [resetChecklist, setResetChecklist] = useState({
    breathingDone: false,
    visualizationDone: false,
    selfWorthReminder: false
  });
  const [resetMessage, setResetMessage] = useState('');
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [dominantProfile, setDominantProfile] = useState<string | null>(null);

  const energyLevels = [
    { value: 'energized', label: 'Energized', color: 'text-green-600' },
    { value: 'neutral', label: 'Neutral / Okay', color: 'text-yellow-600' },
    { value: 'fatigued', label: 'Mentally Fatigued', color: 'text-orange-600' },
    { value: 'exhausted', label: 'Exhausted / Burnt Out', color: 'text-red-600' }
  ];

  const mentalProfiles = [
    {
      id: 'A-Game',
      emoji: '💚',
      label: 'A-Game',
      description: 'Focused, confident, present, strong decision-making',
      color: 'bg-green-50 hover:bg-green-100',
      activeColor: 'bg-green-100 ring-2 ring-green-500'
    },
    {
      id: 'B-Game',
      emoji: '💛',
      label: 'B-Game',
      description: 'Decent focus, some mistakes or autopilot moments',
      color: 'bg-yellow-50 hover:bg-yellow-100',
      activeColor: 'bg-yellow-100 ring-2 ring-yellow-500'
    },
    {
      id: 'C-Game',
      emoji: '🟠',
      label: 'C-Game',
      description: 'Emotionally reactive, distracted, unsure',
      color: 'bg-orange-50 hover:bg-orange-100',
      activeColor: 'bg-orange-100 ring-2 ring-orange-500'
    },
    {
      id: 'D-Game',
      emoji: '🔴',
      label: 'D-Game',
      description: 'Tilt, frustration, mentally checked out',
      color: 'bg-red-50 hover:bg-red-100',
      activeColor: 'bg-red-100 ring-2 ring-red-500'
    }
  ];

  const toggleProfile = (profileId: string) => {
    setSelectedProfiles(prev => 
      prev.includes(profileId)
        ? prev.filter(id => id !== profileId)
        : [...prev, profileId]
    );

    if (dominantProfile === profileId) {
      setDominantProfile(null);
    }
  };

  const setAsDominant = (profileId: string) => {
    if (!selectedProfiles.includes(profileId)) {
      setSelectedProfiles(prev => [...prev, profileId]);
    }
    setDominantProfile(profileId);
  };

  const toggleHand = (index: number) => {
    if (expandedHands.includes(index)) {
      setExpandedHands(expandedHands.filter(i => i !== index));
    } else {
      setExpandedHands([...expandedHands, index]);
    }
  };

  const addHand = () => {
    setHands([...hands, hands.length]);
    setExpandedHands([...expandedHands, hands.length]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sessionData = {
      date: new Date().toISOString(),
      minutesPlayed,
      tableCount,
      energyLevel,
      performanceGrade,
      mentalState,
      tiltTriggers,
      learnings,
      preSessionData: {
        completed: didPreSession,
        skipReason: !didPreSession ? skipReason : undefined,
        feeling: !didPreSession ? preSessionFeeling : undefined
      },
      emotionalData: hadStrongEmotions ? {
        emotion,
        trigger: emotionTrigger,
        thoughts: emotionThoughts,
        validReaction,
        exaggeratedReaction,
        futureResponse
      } : undefined,
      resetData: {
        checklist: resetChecklist,
        message: resetMessage
      },
      mentalProfiles: {
        selected: selectedProfiles,
        dominant: dominantProfile
      }
    };

    const existingSessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    localStorage.setItem('sessions', JSON.stringify([...existingSessions, sessionData]));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="text-sm text-gray-600 mb-6 flex items-center bg-blue-50 p-4 rounded-lg">
          <Info className="flex-shrink-0 mr-3 text-blue-600" size={20} />
          <p>
            This reflection space is for growth — not judgment.
            Even one honest observation today can improve your future sessions.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Post-Session Reflection</h2>
          <p className="text-gray-600">
            Analyze your session performance, mental state, and key moments to improve future decision-making.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Session Stats Block */}
          <div className="mb-6 bg-gray-50 rounded-lg p-4">
            <h3 className="text-md font-medium mb-4 flex items-center">
              <Clock className="mr-2 text-blue-600" size={18} />
              Session Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Minutes Played
                </label>
                <input
                  type="number"
                  value={minutesPlayed}
                  onChange={(e) => setMinutesPlayed(e.target.value)}
                  placeholder="180"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Tables Played
                </label>
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={tableCount}
                  onChange={(e) => setTableCount(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
                {parseInt(tableCount) > 8 && energyLevel === 'exhausted' && (
                  <p className="mt-1 text-xs text-orange-600">
                    Consider reducing table count when energy is low for better focus.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Energy Level Section */}
          <div className="mb-6 bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Energy Level After Session
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {energyLevels.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => setEnergyLevel(level.value)}
                      className={`px-3 py-2 rounded-md text-sm ${
                        energyLevel === level.value 
                          ? level.color
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mental Game Profile Section */}
          <div className="mb-6 bg-gray-50 rounded-lg p-4">
            <h3 className="text-md font-medium mb-3 flex items-center">
              <Brain className="mr-2 text-blue-600" size={18} />
              Mental Game Profile
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Which mindset profiles were present in your session?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mentalProfiles.map(profile => (
                <div key={profile.id} className="flex items-center">
                  <label className="flex-1 relative flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200">
                    <input
                      type="checkbox"
                      checked={selectedProfiles.includes(profile.id)}
                      onChange={() => toggleProfile(profile.id)}
                      className="sr-only"
                    />
                    <div className={`absolute inset-0 rounded-lg transition-colors duration-200 ${
                      selectedProfiles.includes(profile.id) ? profile.activeColor : profile.color
                    }`} />
                    <div className="relative flex items-center">
                      <span className="text-xl mr-2">{profile.emoji}</span>
                      <div>
                        <span className="font-medium text-sm">{profile.label}</span>
                        <span className="text-xs text-gray-600 block">{profile.description}</span>
                      </div>
                    </div>
                  </label>

                  {selectedProfiles.includes(profile.id) && (
                    <button
                      type="button"
                      onClick={() => setAsDominant(profile.id)}
                      className={`ml-2 px-2 py-1 rounded-full text-xs transition-colors ${
                        dominantProfile === profile.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {dominantProfile === profile.id ? 'Primary ✓' : 'Set Primary'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6 border-b border-gray-200 pb-6">
            <div className="flex items-center mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={didPreSession}
                  onChange={(e) => setDidPreSession(e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Did you complete your pre-session protocol today?
                </span>
              </label>
            </div>

            {!didPreSession && (
              <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Why was pre-session preparation skipped?
                  </label>
                  <AutoResizeTextArea
                    value={skipReason}
                    onChange={(e) => setSkipReason(e.target.value)}
                    placeholder="e.g., Was in a rush, Didn't feel like it, Forgot"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    How did you feel going into the session?
                  </label>
                  <AutoResizeTextArea
                    value={preSessionFeeling}
                    onChange={(e) => setPreSessionFeeling(e.target.value)}
                    placeholder="e.g., Distracted, Unprepared, Anxious"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2 border"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Heart size={20} className="mr-2 text-blue-600" />
              Emotional Review
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Did you experience any strong emotions during the session?
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setHadStrongEmotions(true)}
                  className={`px-4 py-2 rounded-md ${
                    hadStrongEmotions === true
                      ? 'bg-blue-100 text-blue-800 ring-2 ring-blue-500'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setHadStrongEmotions(false)}
                  className={`px-4 py-2 rounded-md ${
                    hadStrongEmotions === false
                      ? 'bg-blue-100 text-blue-800 ring-2 ring-blue-500'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {hadStrongEmotions && (
              <div className="space-y-4 bg-gray-50 rounded-lg p-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    What was the specific emotion you felt?
                  </label>
                  <AutoResizeTextArea
                    value={emotion}
                    onChange={(e) => setEmotion(e.target.value)}
                    placeholder="e.g., anger, frustration, fear, anxiety, sadness, shame, helplessness, excitement, disappointment"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    What was the situation that triggered this emotion?
                  </label>
                  <AutoResizeTextArea
                    value={emotionTrigger}
                    onChange={(e) => setEmotionTrigger(e.target.value)}
                    placeholder="Describe the hand, moment, or pattern that triggered the emotion"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2 border"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    What were your thoughts in that moment?
                  </label>
                  <AutoResizeTextArea
                    value={emotionThoughts}
                    onChange={(e) => setEmotionThoughts(e.target.value)}
                    placeholder="What was your automatic internal dialogue?"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2 border"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Why might this reaction be valid or understandable?
                  </label>
                  <AutoResizeTextArea
                    value={validReaction}
                    onChange={(e) => setValidReaction(e.target.value)}
                    placeholder="Explore context or realistic expectations"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2 border"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Why might this reaction be exaggerated or unhelpful?
                  </label>
                  <AutoResizeTextArea
                    value={exaggeratedReaction}
                    onChange={(e) => setExaggeratedReaction(e.target.value)}
                    placeholder="Challenge distortions or misjudgments"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2 border"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    What can you say to yourself next time in a similar situation?
                  </label>
                  <AutoResizeTextArea
                    value={futureResponse}
                    onChange={(e) => setFutureResponse(e.target.value)}
                    placeholder="A prepared mental response or reminder"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2 border"
                    rows={2}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mb-6 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Dumbbell className="mr-2 text-blue-600" size={20} />
              Post-Session Reset
            </h3>
            
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={resetChecklist.breathingDone}
                  onChange={(e) => setResetChecklist({...resetChecklist, breathingDone: e.target.checked})}
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">
                  I took a few deep breaths and mentally closed the session
                </span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={resetChecklist.visualizationDone}
                  onChange={(e) => setResetChecklist({...resetChecklist, visualizationDone: e.target.checked})}
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">
                  I visualized myself playing with full focus next time
                </span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={resetChecklist.selfWorthReminder}
                  onChange={(e) => setResetChecklist({...resetChecklist, selfWorthReminder: e.target.checked})}
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">
                  I reminded myself: my worth is not tied to one session's outcome
                </span>
              </label>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What could you say to yourself now to stay grounded and confident?
                </label>
                <AutoResizeTextArea
                  value={resetMessage}
                  onChange={(e) => setResetMessage(e.target.value)}
                  placeholder="e.g., I'm committed to learning and growing from every session..."
                  className="w-full bg-white rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  rows={2}
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Check size={16} className="mr-2 text-blue-600" />
                Hand Analysis
              </label>
              <button
                type="button"
                onClick={addHand}
                className="px-2 py-1 text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center"
              >
                <Plus size={16} className="mr-1" />
                Add Hand
              </button>
            </div>
            {hands.map((index) => (
              <HandAnalysis
                key={index}
                index={index}
                expanded={expandedHands.includes(index)}
                onToggle={() => toggleHand(index)}
              />
            ))}
          </div>

          <div className="flex justify-between">
            <Link to="/" className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Cancel
            </Link>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Complete Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostSession;
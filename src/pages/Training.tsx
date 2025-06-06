import React, { useState } from 'react';
import { Shuffle, Brain, ArrowRight } from 'lucide-react';
import TrainingCard from '../components/training/TrainingCard';

// Mock data - replace with actual data from HandAnalysis entries
const mockTrainingData = [
  {
    id: 1,
    spotType: "River Call Decision",
    initialThought: "Villain's line seems strong, but I have top pair top kicker. Should I call?",
    adaptiveThought: "Consider position, previous action, and villain's range. TPTK is often a bluff catcher in this spot. Focus on range advantage rather than absolute hand strength.",
    screenshot: "https://images.pexels.com/photos/1452/playing-cards-casino-poker.jpg"
  },
  {
    id: 2,
    spotType: "3-Bet Pot OOP",
    initialThought: "I have AK but missed the flop. Should I c-bet or give up?",
    adaptiveThought: "With high card + backdoors, this is a good spot for a small c-bet. Consider board texture and opponent's continuing range.",
    screenshot: "https://images.pexels.com/photos/6863196/pexels-photo-6863196.jpeg"
  },
  {
    id: 3,
    spotType: "Multiway Pot Decision",
    initialThought: "Middle pair in a 3-way pot. Should I bet for protection?",
    adaptiveThought: "In multiway pots, betting for protection is often a mistake. Consider checking and playing defensively unless you have a significant range advantage.",
    screenshot: "https://images.pexels.com/photos/7345435/pexels-photo-7345435.jpeg"
  }
];

const Training: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cards, setCards] = useState(mockTrainingData);
  const [completedCards, setCompletedCards] = useState<number[]>([]);

  const handleShuffle = () => {
    setCards([...cards].sort(() => Math.random() - 0.5));
    setCurrentCardIndex(0);
    setCompletedCards([]);
  };

  const handleMarkCard = (remembered: boolean) => {
    if (remembered) {
      setCompletedCards([...completedCards, cards[currentCardIndex].id]);
    }
    
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <Brain className="mr-2 text-blue-600" size={24} />
            Train Your Weak Spots
          </h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleShuffle}
              className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              <Shuffle size={16} className="mr-2" />
              Shuffle Cards
            </button>
            <span className="text-gray-600">
              {completedCards.length} / {cards.length} Completed
            </span>
          </div>
        </div>

        {currentCardIndex < cards.length ? (
          <TrainingCard
            spotType={cards[currentCardIndex].spotType}
            initialThought={cards[currentCardIndex].initialThought}
            adaptiveThought={cards[currentCardIndex].adaptiveThought}
            screenshot={cards[currentCardIndex].screenshot}
            onMark={handleMarkCard}
          />
        ) : (
          <div className="text-center py-12">
            <Brain size={48} className="mx-auto text-blue-600 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Training Complete!
            </h3>
            <p className="text-gray-600 mb-6">
              You've reviewed all the cards in this session.
            </p>
            <button
              onClick={handleShuffle}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <ArrowRight size={16} className="mr-2" />
              Start New Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Training;
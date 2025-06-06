import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Zap, Brain, Target, LineChart, Calendar } from 'lucide-react';
import SessionCard from '../components/dashboard/SessionCard';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import FocusAreaCard from '../components/dashboard/FocusAreaCard';
import UpcomingGoal from '../components/dashboard/UpcomingGoal';
import GameQualityAnalytics from '../components/dashboard/GameQualityAnalytics';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <GameQualityAnalytics />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Zap className="mr-2 text-blue-600" size={20} />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/pre-session" className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <ArrowRight className="text-blue-600 mr-3" size={20} />
              <span className="font-medium">Start Session</span>
            </Link>
            <Link to="/post-session" className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <ArrowLeft className="text-blue-600 mr-3" size={20} />
              <span className="font-medium">End Session</span>
            </Link>
            <Link to="/analysis" className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <Brain className="text-blue-600 mr-3" size={20} />
              <span className="font-medium">Analyze Hand</span>
            </Link>
            <Link to="/progress" className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <Target className="text-blue-600 mr-3" size={20} />
              <span className="font-medium">Set New Goal</span>
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Target className="mr-2 text-blue-600" size={20} />
            Top 3 Focus Areas
          </h2>
          <div className="space-y-4">
            <FocusAreaCard 
              title="Control Tilt in Multi-Way Pots" 
              progress={65} 
              category="Mental Game" 
            />
            <FocusAreaCard 
              title="Improve 3-Bet Range Construction" 
              progress={40} 
              category="Strategy" 
            />
            <FocusAreaCard 
              title="Decision Making When Tired" 
              progress={25} 
              category="Physical Game" 
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold flex items-center">
            <LineChart className="mr-2 text-blue-600" size={20} />
            Performance Metrics
          </h2>
          <select className="border border-gray-300 rounded-md text-sm p-2">
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last 6 months</option>
            <option>This year</option>
          </select>
        </div>
        <PerformanceChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Calendar className="mr-2 text-blue-600" size={20} />
            Recent Sessions
          </h2>
          <div className="space-y-4">
            <SessionCard 
              date="Yesterday" 
              duration="3h 45m" 
              gameType="NL Hold'em $2/$5" 
              performance="B+"
              mentalState="Focused"
              profit={340}
            />
            <SessionCard 
              date="March 28, 2025" 
              duration="2h 15m" 
              gameType="NL Hold'em $2/$5" 
              performance="A-"
              mentalState="Energetic"
              profit={125}
            />
            <SessionCard 
              date="March 26, 2025" 
              duration="4h 30m" 
              gameType="NL Hold'em $2/$5" 
              performance="C"
              mentalState="Tired, Distracted"
              profit={-210}
            />
          </div>
          <div className="mt-4 text-center">
            <Link to="/progress" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View all sessions →
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Target className="mr-2 text-blue-600" size={20} />
            Upcoming Goals
          </h2>
          <div className="space-y-4">
            <UpcomingGoal 
              title="Complete 50 hours of play" 
              deadline="April 15, 2025"
              progress={62}
            />
            <UpcomingGoal 
              title="Study 3-bet/4-bet dynamics" 
              deadline="April 10, 2025"
              progress={30}
            />
            <UpcomingGoal 
              title="Mental Game Journal 15 days" 
              deadline="April 30, 2025"
              progress={45}
            />
          </div>
          <div className="mt-4 text-center">
            <Link to="/progress" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Manage goals →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
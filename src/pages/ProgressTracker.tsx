import React, { useState } from 'react';
import { LineChart, Calendar, Target, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProgressTracker: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [expandedGoals, setExpandedGoals] = useState<number[]>([0]);

  const toggleGoal = (index: number) => {
    if (expandedGoals.includes(index)) {
      setExpandedGoals(expandedGoals.filter(i => i !== index));
    } else {
      setExpandedGoals([...expandedGoals, index]);
    }
  };

  // Chart data
  const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'];
  
  const mentalGameData = {
    labels,
    datasets: [
      {
        label: 'Focus Rating',
        data: [65, 68, 72, 71, 75, 78, 82, 84],
        borderColor: 'rgb(30, 64, 175)',
        backgroundColor: 'rgba(30, 64, 175, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Tilt Control',
        data: [40, 42, 48, 53, 60, 65, 70, 75],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const skillProgressData = {
    labels,
    datasets: [
      {
        label: 'Hand Reading',
        data: [50, 53, 58, 64, 67, 72, 76, 78],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Bet Sizing',
        data: [60, 63, 65, 68, 70, 75, 78, 82],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Positional Play',
        data: [70, 72, 74, 75, 77, 80, 83, 85],
        borderColor: 'rgb(124, 58, 237)',
        backgroundColor: 'rgba(124, 58, 237, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          }
        }
      },
    },
  };

  // Mock goals data
  const goals = [
    {
      title: "Complete 100 hours of focused play",
      description: "Play with maximum focus and concentration for 100 hours this quarter.",
      deadline: "May 31, 2025",
      progress: 42,
      tasks: [
        { title: "Track session focus ratings", completed: true },
        { title: "Maintain 2-hour minimum sessions", completed: true },
        { title: "Practice focus exercises before each session", completed: false },
        { title: "Log distractions during play", completed: true },
      ],
    },
    {
      title: "Master 3-bet/4-bet dynamics",
      description: "Develop a solid theoretical understanding and practical application of 3-bet/4-bet spots.",
      deadline: "April 30, 2025",
      progress: 65,
      tasks: [
        { title: "Study GTO 3-bet ranges", completed: true },
        { title: "Review 20 hands involving 3-bet pots", completed: true },
        { title: "Practice identifying 4-bet bluffing opportunities", completed: false },
        { title: "Analyze opponents' 3-bet frequencies", completed: false },
      ],
    },
    {
      title: "Develop advanced tilt control",
      description: "Create and implement a comprehensive tilt management system.",
      deadline: "June 15, 2025",
      progress: 28,
      tasks: [
        { title: "Complete daily emotional awareness journal", completed: true },
        { title: "Implement 5-minute cooling off periods", completed: true },
        { title: "Create personal tilt triggers inventory", completed: false },
        { title: "Practice meditation before sessions", completed: false },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h2 className="text-lg font-semibold flex items-center">
            <LineChart className="mr-2 text-blue-600" size={20} />
            Skill Development Tracker
          </h2>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setTimeRange('month')}
              className={`px-3 py-1 text-sm rounded-md ${
                timeRange === 'month' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Month
            </button>
            <button 
              onClick={() => setTimeRange('quarter')}
              className={`px-3 py-1 text-sm rounded-md ${
                timeRange === 'quarter' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Quarter
            </button>
            <button 
              onClick={() => setTimeRange('year')}
              className={`px-3 py-1 text-sm rounded-md ${
                timeRange === 'year' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Year
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-md font-medium mb-3">Mental Game Progress</h3>
            <Line options={chartOptions} data={mentalGameData} height={null} />
          </div>
          <div>
            <h3 className="text-md font-medium mb-3">Skill Domain Progress</h3>
            <Line options={chartOptions} data={skillProgressData} height={null} />
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Sessions This Month</h4>
            <p className="text-2xl font-semibold">14</p>
            <p className="text-xs text-green-600 mt-1">↑ 3 from last month</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Total Hours</h4>
            <p className="text-2xl font-semibold">42.5</p>
            <p className="text-xs text-green-600 mt-1">↑ 8.5 from last month</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Focus Rating</h4>
            <p className="text-2xl font-semibold">84%</p>
            <p className="text-xs text-green-600 mt-1">↑ 6% from last month</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold flex items-center">
            <Target className="mr-2 text-blue-600" size={20} />
            Goals & Objectives
          </h2>
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium flex items-center hover:bg-blue-700">
            <Plus size={16} className="mr-1" />
            New Goal
          </button>
        </div>
        
        <div className="space-y-4">
          {goals.map((goal, index) => (
            <div key={index} className="border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
              <div 
                className="p-4 flex justify-between items-center cursor-pointer"
                onClick={() => toggleGoal(index)}
              >
                <div>
                  <h3 className="font-medium">{goal.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">Due {goal.deadline} • {goal.progress}% Complete</p>
                </div>
                <button className="p-1 rounded-full hover:bg-gray-100">
                  {expandedGoals.includes(index) ? (
                    <ChevronUp size={18} className="text-gray-600" />
                  ) : (
                    <ChevronDown size={18} className="text-gray-600" />
                  )}
                </button>
              </div>
              
              {expandedGoals.includes(index) && (
                <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                  <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                  
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-500">Progress</span>
                      <span className="text-xs font-medium">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-blue-600" 
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <h4 className="text-sm font-medium mb-2">Tasks</h4>
                  <ul className="space-y-2">
                    {goal.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-start">
                        <input 
                          type="checkbox" 
                          checked={task.completed}
                          readOnly
                          className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className={`ml-2 text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                          {task.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold flex items-center">
            <Calendar className="mr-2 text-blue-600" size={20} />
            Session Calendar
          </h2>
          <select className="border border-gray-300 rounded-md text-sm p-2">
            <option>March 2025</option>
            <option>April 2025</option>
            <option>May 2025</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Game Type
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Focus
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Result
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { date: "Mar 30, 2025", type: "NL Hold'em $2/$5", duration: "3h 45m", performance: "B+", focus: "85%", result: "+$340" },
                { date: "Mar 28, 2025", type: "NL Hold'em $2/$5", duration: "2h 15m", performance: "A-", focus: "90%", result: "+$125" },
                { date: "Mar 26, 2025", type: "NL Hold'em $2/$5", duration: "4h 30m", performance: "C", focus: "60%", result: "-$210" },
                { date: "Mar 24, 2025", type: "NL Hold'em $2/$5", duration: "3h 00m", performance: "B", focus: "75%", result: "+$90" },
                { date: "Mar 21, 2025", type: "NL Hold'em $2/$5", duration: "5h 15m", performance: "A", focus: "95%", result: "+$480" },
              ].map((session, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{session.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{session.type}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{session.duration}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      session.performance.startsWith('A') ? 'bg-green-100 text-green-800' :
                      session.performance.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                      session.performance.startsWith('C') ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {session.performance}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{session.focus}</td>
                  <td className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${
                    session.result.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {session.result}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
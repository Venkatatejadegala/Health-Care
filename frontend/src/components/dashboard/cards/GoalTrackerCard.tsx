import * as React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  category: 'fitness' | 'nutrition' | 'wellness' | 'lifestyle';
  priority: 'high' | 'medium' | 'low';
  icon: string;
  color: string;
}

const GoalTrackerCard: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Lose Weight',
      description: 'Reach target weight of 65kg',
      target: 65,
      current: 70,
      unit: 'kg',
      deadline: '2024-03-15',
      category: 'fitness',
      priority: 'high',
      icon: '🎯',
      color: '#ef4444'
    },
    {
      id: '2',
      title: 'Daily Steps',
      description: 'Walk 10,000 steps daily',
      target: 10000,
      current: 8432,
      unit: 'steps',
      deadline: '2024-02-29',
      category: 'fitness',
      priority: 'medium',
      icon: '👟',
      color: '#3b82f6'
    },
    {
      id: '3',
      title: 'Water Intake',
      description: 'Drink 8 glasses of water daily',
      target: 8,
      current: 6,
      unit: 'glasses',
      deadline: '2024-02-29',
      category: 'wellness',
      priority: 'high',
      icon: '💧',
      color: '#06b6d4'
    },
    {
      id: '4',
      title: 'Sleep Schedule',
      description: 'Sleep 8 hours every night',
      target: 8,
      current: 7.5,
      unit: 'hours',
      deadline: '2024-03-01',
      category: 'wellness',
      priority: 'medium',
      icon: '😴',
      color: '#8b5cf6'
    }
  ]);

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    target: '',
    unit: '',
    category: 'fitness' as Goal['category'],
    priority: 'medium' as Goal['priority']
  });

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'fitness': return '💪';
      case 'nutrition': return '🍎';
      case 'wellness': return '🧘';
      case 'lifestyle': return '🌟';
      default: return '🎯';
    }
  };

  const addGoal = () => {
    if (!newGoal.title || !newGoal.target) return;

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      target: parseFloat(newGoal.target),
      current: 0,
      unit: newGoal.unit,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: newGoal.category,
      priority: newGoal.priority,
      icon: getCategoryIcon(newGoal.category),
      color: getPriorityColor(newGoal.priority)
    };

    setGoals([...goals, goal]);
    setNewGoal({
      title: '',
      description: '',
      target: '',
      unit: '',
      category: 'fitness',
      priority: 'medium'
    });
    setShowAddGoal(false);
  };

  const updateGoalProgress = (goalId: string, increment: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const newCurrent = Math.max(0, goal.current + increment);
        return { ...goal, current: newCurrent };
      }
      return goal;
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-panel p-6 h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-extrabold text-gray-800 m-0 flex items-center gap-2">
          🎯 Goal Tracker
        </h3>
        <button
          onClick={() => setShowAddGoal(!showAddGoal)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 shadow-sm"
        >
          + Add Goal
        </button>
      </div>

      {showAddGoal && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white bg-opacity-70 backdrop-blur rounded-xl p-4 mb-4 border border-gray-100 shadow-sm overflow-hidden"
        >
          <h4 className="text-gray-800 font-bold mb-4">
            Add New Goal
          </h4>
          <div className="grid gap-3">
            <input
              type="text"
              placeholder="Goal title"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              className="w-full p-2.5 bg-white bg-opacity-80 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            />
            <input
              type="text"
              placeholder="Description"
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              className="w-full p-2.5 bg-white bg-opacity-80 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Target"
                value={newGoal.target}
                onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                className="w-full p-2.5 bg-white bg-opacity-80 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              />
              <input
                type="text"
                placeholder="Unit"
                value={newGoal.unit}
                onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                className="w-full p-2.5 bg-white bg-opacity-80 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={newGoal.category}
                onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as Goal['category'] })}
                className="flex-1 p-2.5 bg-white bg-opacity-80 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              >
                <option value="fitness">Fitness</option>
                <option value="nutrition">Nutrition</option>
                <option value="wellness">Wellness</option>
                <option value="lifestyle">Lifestyle</option>
              </select>
              <select
                value={newGoal.priority}
                onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value as Goal['priority'] })}
                className="flex-1 p-2.5 bg-white bg-opacity-80 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={addGoal}
                className="flex-[2] bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-colors"
              >
                Save Goal
              </button>
              <button
                onClick={() => setShowAddGoal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex flex-col gap-4 overflow-y-auto pr-1 flex-grow" style={{ maxHeight: '400px' }}>
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white bg-opacity-60 backdrop-blur-sm rounded-xl p-5 border border-white border-opacity-40 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl bg-white p-2 rounded-lg shadow-sm">{goal.icon}</div>
                <div>
                  <h4 className="text-gray-900 font-bold text-base mb-0.5">
                    {goal.title}
                  </h4>
                  <p className="text-sm text-gray-500 m-0 leading-tight">
                    {goal.description}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-sm"
                  style={{ backgroundColor: getPriorityColor(goal.priority) }}
                >
                  {goal.priority}
                </div>
                <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
                  {getDaysRemaining(goal.deadline)}d left
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-baseline gap-1">
                <span
                  className="text-xl font-black"
                  style={{ color: goal.color }}
                >
                  {goal.current.toFixed(goal.unit === 'kg' ? 1 : 0)}
                </span>
                <span className="text-gray-500 font-medium text-sm">
                  / {goal.target} {goal.unit}
                </span>
              </div>
              <span className="text-sm font-bold text-gray-700">
                {getProgressPercentage(goal.current, goal.target).toFixed(0)}%
              </span>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4 shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getProgressPercentage(goal.current, goal.target)}%` }}
                transition={{ duration: 1, delay: index * 0.1, type: "spring" }}
                className="h-full rounded-full"
                style={{ backgroundColor: goal.color }}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => updateGoalProgress(goal.id, -1)}
                className="flex-1 py-1.5 bg-white bg-opacity-80 border border-gray-200 rounded-md text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm active:scale-95"
              >
                -1
              </button>
              <button
                onClick={() => updateGoalProgress(goal.id, 1)}
                className="flex-1 py-1.5 text-white rounded-md text-xs font-bold transition-all shadow-sm active:scale-95 hover:brightness-110"
                style={{ backgroundColor: goal.color }}
              >
                +1
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {goals.length === 0 && (
        <div className="text-center p-8 text-gray-500 bg-gray-50 bg-opacity-50 rounded-xl border border-dashed border-gray-300">
          <div className="text-5xl mb-4 opacity-50">🎯</div>
          <p className="m-0 text-base font-medium">
            No goals set yet. Start by adding your first goal!
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default GoalTrackerCard;

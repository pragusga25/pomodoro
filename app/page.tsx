'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Timer } from '@/components/pomodoro/timer';
import { TaskList } from '@/components/pomodoro/task-list';
import { TaskChart } from '@/components/pomodoro/task-chart';
import { CollapsibleCard } from '@/components/pomodoro/collapsible-card';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const nanoId = (length = 4) => {
  let id = '';
  while (id.length < length) {
    id += Math.random().toString(36).substr(2);
  }
  return id.substr(0, length);
};

const POMODORO_TIME = 25 * 60;
const SHORT_BREAK = 5 * 60;
// const LONG_BREAK = 15 * 60;

type Task = {
  id: string;
  text: string;
  completed: boolean;
  time: number;
};

type CompletedTask = {
  date: string;
  count: number;
};

export default function Home() {
  const today = new Date();
  const todayString = today.toLocaleDateString();

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const tmr = new Date();
  tmr.setDate(tmr.getDate() + 1);

  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(POMODORO_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [tasks, setTasks] = useLocalStorage<Task[]>(
    'pomodoro_tasks',
    [],
    (value) => {
      if (!Array.isArray(value)) return false;
      if (
        value.some((task) => {
          return (
            typeof task.id !== 'string' ||
            typeof task.text !== 'string' ||
            typeof task.completed !== 'boolean' ||
            typeof task.time !== 'number' ||
            task.time <= 0 ||
            new Date(task.time).toLocaleDateString() !== todayString ||
            new Date(task.time).getTime() < oneWeekAgo.getTime() ||
            new Date(task.time).getTime() > tmr.getTime()
          );
        })
      )
        return false;
      return true;
    }
  );
  const [newTask, setNewTask] = useState('');
  const [completedTasks, setCompletedTasks] = useLocalStorage<CompletedTask[]>(
    'pomodoro_completed_tasks',
    [],
    (value) => {
      if (!Array.isArray(value)) return false;
      if (
        value.some(
          (task) =>
            typeof task.date !== 'string' || typeof task.count !== 'number'
        )
      )
        return false;
      return true;
    }
  );

  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      new Audio('/notif.wav').play().catch(() => {});
      if (mode === 'work') {
        setMode('break');
        setTimeLeft(SHORT_BREAK);
      } else {
        setMode('work');
        setTimeLeft(POMODORO_TIME);
      }
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: nanoId(),
          text: newTask.trim(),
          completed: false,
          time: new Date().getTime(),
        },
      ]);
      setNewTask('');
    }
  };

  const handleToggleTask = (id: string) => {
    const toggledTask = tasks.find((t) => t.id === id);

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

    if (!toggledTask) return;

    const today = format(new Date(), 'MMM dd');
    const updatedTasks = [...completedTasks];
    const todayIndex = updatedTasks.findIndex((t) => t.date === today);

    const { completed } = toggledTask;
    const newCompleted = !completed;

    if (todayIndex >= 0) {
      updatedTasks[todayIndex].count += newCompleted ? 1 : -1;
    } else {
      updatedTasks.push({ date: today, count: 1 });
    }

    setCompletedTasks(updatedTasks);
  };

  const filteredTasks = useMemo(() => {
    const ftasks = tasks.filter((task) =>
      showCompleted ? true : !task.completed
    );
    ftasks.sort((a, b) => {
      if (a.completed && !b.completed) return 1;
      if (!a.completed && b.completed) return -1;
      return a.time - b.time;
    });

    return ftasks;
  }, [showCompleted, tasks]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Pomodoro Focus</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="max-w-2xl mx-auto w-full">
            <Timer
              timeLeft={timeLeft}
              isRunning={isRunning}
              mode={mode}
              totalTime={mode === 'work' ? POMODORO_TIME : SHORT_BREAK}
              onToggle={() => setIsRunning(!isRunning)}
              onReset={() => {
                setTimeLeft(POMODORO_TIME);
                setIsRunning(false);
                setMode('work');
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CollapsibleCard title="Task Manager">
              <TaskList
                tasks={filteredTasks}
                newTask={newTask}
                onNewTaskChange={setNewTask}
                onAddTask={handleAddTask}
                onToggleTask={handleToggleTask}
                onDeleteTask={(id) =>
                  setTasks(tasks.filter((t) => t.id !== id))
                }
                showCompleted={showCompleted}
                onShowCompletedChange={setShowCompleted}
              />
            </CollapsibleCard>

            <CollapsibleCard title="Progress Overview">
              <TaskChart data={completedTasks} />
            </CollapsibleCard>
          </div>
        </div>
      </div>
    </div>
  );
}

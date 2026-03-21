import { useState, useEffect } from 'react';
import { getDailyMissions } from '../data/missions.js';

const TODAY = (() => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
})();

function load(key, fallback) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function save(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

export function useGameState() {
  const [points,    setPointsState]    = useState(0);
  const [streak,    setStreakState]     = useState(0);
  const [completed, setCompletedState] = useState([]);
  const [missions,  setMissions]       = useState([]);
  const [ready,     setReady]          = useState(false);

  useEffect(() => {
    setPointsState(load('3bq_points', 0));
    setStreakState(load('3bq_streak', 0));
    setCompletedState(load(`3bq_done_${TODAY}`, []));
    setMissions(getDailyMissions());
    setReady(true);
  }, []);

  function completeMission(mission) {
    if (completed.includes(mission.id)) return;
    const newCompleted = [...completed, mission.id];
    const newPoints    = points + mission.pts;

    setCompletedState(newCompleted);
    setPointsState(newPoints);
    save(`3bq_done_${TODAY}`, newCompleted);
    save('3bq_points', newPoints);

    // streak logic
    const lastDate = load('3bq_last_date', null);
    const yesterday = (() => {
      const d = new Date(); d.setDate(d.getDate() - 1);
      return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    })();
    if (lastDate !== TODAY) {
      const newStreak = lastDate === yesterday ? streak + 1 : 1;
      setStreakState(newStreak);
      save('3bq_streak', newStreak);
      save('3bq_last_date', TODAY);
    }
  }

  function isCompleted(id) { return completed.includes(id); }

  function getLevel() {
    if (points < 200)  return { name:'Explorador', emoji:'🌱', next:200 };
    if (points < 500)  return { name:'Cazador',    emoji:'🔥', next:500 };
    if (points < 1000) return { name:'Maestro',    emoji:'⚡', next:1000 };
    return                    { name:'Leyenda 3B', emoji:'👑', next:2000 };
  }

  return { points, streak, completed, missions, ready, completeMission, isCompleted, getLevel };
}

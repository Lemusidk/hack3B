import { useState, useEffect } from 'react';
import { getDailyMissions, getLevelByXp } from '../data/missions.js';

function getToday() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function getYesterday() {
  const d = new Date(); d.setDate(d.getDate()-1);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function load(key, fallback) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function save(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

export function useGameState() {
  const [points,    setPoints]    = useState(0);
  const [xp,        setXp]        = useState(0);
  const [streak,    setStreak]    = useState(0);
  const [completed, setCompleted] = useState([]);
  const [missions,  setMissions]  = useState([]);
  const [history,   setHistory]   = useState([]);
  const [ready,     setReady]     = useState(false);

  useEffect(() => {
    const today = getToday();
    setPoints(load('3bq_points', 0));
    setXp(load('3bq_xp', 0));
    setStreak(load('3bq_streak', 0));
    setHistory(load('3bq_history', []));
    const savedDate = load('3bq_last_completed_date', null);
    if (savedDate === today) {
      setCompleted(load('3bq_done_today', []));
    } else {
      setCompleted([]);
      save('3bq_done_today', []);
    }
    setMissions(getDailyMissions());
    setReady(true);
  }, []);

  function completeMission(mission) {
    const today = getToday();
    const current = load('3bq_done_today', []);
    if (current.includes(mission.id)) return;
    const newCompleted = [...current, mission.id];
    const newPoints = load('3bq_points', 0) + mission.pts;
    const newXp     = load('3bq_xp', 0) + (mission.xp || 50);
    const entry = { id: mission.id, title: mission.title, pts: mission.pts, xp: mission.xp || 50, date: new Date().toISOString() };
    const newHistory = [entry, ...load('3bq_history', [])].slice(0, 50);
    setCompleted(newCompleted); setPoints(newPoints); setXp(newXp); setHistory(newHistory);
    save('3bq_done_today', newCompleted);
    save('3bq_last_completed_date', today);
    save('3bq_points', newPoints);
    save('3bq_xp', newXp);
    save('3bq_history', newHistory);
    const lastDate = load('3bq_last_mission_date', null);
    if (lastDate !== today) {
      const ns = lastDate === getYesterday() ? load('3bq_streak',0) + 1 : 1;
      setStreak(ns); save('3bq_streak', ns); save('3bq_last_mission_date', today);
    }
  }

  function isCompleted(id) { return completed.includes(id); }
  function getLevel()      { return getLevelByXp(xp); }

  return { points, xp, streak, completed, missions, history, ready, completeMission, isCompleted, getLevel };
}

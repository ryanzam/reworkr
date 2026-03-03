import { useState, useEffect } from 'react';

export function useJobGeofence(jobLat: number, jobLng: number, radius: number) {
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [isInside, setIsInside] = useState(false);
  const [simOffset, setSimOffset] = useState(200); // simulate being 200m away initially

  const haversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371000;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  useEffect(() => {
    if (!jobLat || !jobLng) return;
    // Simulate position relative to job with current offset
    const offsetDeg = simOffset / 111000;
    const simLat = jobLat + offsetDeg;
    const simLng = jobLng;
    const d = Math.round(haversine(simLat, simLng, jobLat, jobLng));
    setUserPos({ lat: simLat, lng: simLng });
    setDistance(d);
    setIsInside(d <= radius);
  }, [jobLat, jobLng, radius, simOffset]);

  const simulateApproach = () => setSimOffset(prev => Math.max(0, prev - 50));
  const simulateLeave = () => setSimOffset(prev => prev + 50);

  return { userPos, distance, isInside, simulateApproach, simulateLeave };
}
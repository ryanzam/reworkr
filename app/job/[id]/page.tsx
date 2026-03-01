"use client";

import { useActionState, useOptimistic, useTransition } from "react";
import { useJobGeofence } from "@/hooks/useJobGeofence";
import { LockedActionButton } from "./../../../components/LockedActionBtn";
import { GeofenceMap } from "./../../../components/GeoFenceMap";
import { MapPin, Camera, CheckCircle, Clipboard } from "lucide-react";
import { toast } from "sonner";

// Mock Data for Demo
const MOCK_JOB = {
    id: "772",
    customerName: "Jon Doe Corp",
    lat: 40.7128, lng: -74.0060, radiusMeter: 100,
    status: 'pending'
};

export default function JobPage({ params }: { params: { id: string } }) {
    const { isInside, distance, userLocation } = useJobGeofence(MOCK_JOB.lat, MOCK_JOB.lng, MOCK_JOB.radiusMeter);
    const [isPending, startTransition] = useTransition();

    // React 19: Action state for "Starting Job"
    const [state, startJobAction] = useActionState(async (prevState: any, formData: FormData) => {
        // Simulate API call
        await new Promise(res => setTimeout(res, 1000));
        toast.success("Job started successfully");
        return { status: 'in-progress' };
    }, { status: MOCK_JOB.status });

    const [optimisticStatus, setOptimisticStatus] = useOptimistic(state.status);

    const handleStart = () => {
        startTransition(async () => {
            setOptimisticStatus('in-progress');
            const formData = new FormData();
            await startJobAction(formData);
        });
    };

    return (
        <main className="max-w-md mx-auto p-4 space-y-6 pb-24">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight">{MOCK_JOB.customerName}</h1>
                <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 ${isInside ? "bg-inside/20 text-inside pulse-inside" : "bg-outside/20 text-outside"
                    }`}>
                    <div className={`w-2 h-2 rounded-full ${isInside ? "bg-inside" : "bg-outside"}`} />
                    {isInside ? "Inside Zone" : `${Math.round(distance)}m Away`}
                </div>
            </div>

            <div className="h-64 rounded-xl overflow-hidden border shadow-inner">
                <GeofenceMap
                    center={[MOCK_JOB.lat, MOCK_JOB.lng]}
                    radius={MOCK_JOB.radiusMeter}
                    userPos={userLocation}
                />
            </div>

            <section className="space-y-4">
                {/* Step 1: Start Job */}
                <LockedActionButton
                    isLocked={isInside}
                    onClick={handleStart}
                    disabled={optimisticStatus !== 'pending'}
                    icon={<MapPin className="w-5 h-5" />}
                    label={optimisticStatus === 'pending' ? "Start Job" : "Job Started"}
                />

                {/* Step 2: Photos */}
                <div className={`glass-card p-4 transition-opacity ${!isInside ? "opacity-50 grayscale" : ""}`}>
                    <div className="flex items-center gap-3 mb-4">
                        <Camera className="text-primary" />
                        <h3 className="font-semibold">Before Photos</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <button className="aspect-square bg-zinc-100 rounded-lg flex items-center justify-center border-2 border-dashed" disabled={!isInside}>
                            +
                        </button>
                    </div>
                </div>

                {/* Step 3: Completion */}
                <LockedActionButton
                    isLocked={isInside && optimisticStatus === 'in-progress'}
                    disabled={optimisticStatus !== 'in-progress'}
                    icon={<CheckCircle className="w-5 h-5" />}
                    label="Complete & Generate AI Report"
                    onClick={() => { }}
                />
            </section>
        </main>
    );
}
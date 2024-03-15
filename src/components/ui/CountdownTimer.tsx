'use client'

import { useState, useEffect } from 'react';

export function CountdownTimer({ targetDate }: any) {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft: any = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    return (
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max mb-10 sm:mb-0">

            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="font-mono text-5xl">
                    <span>{timeLeft.days}</span>
                </span>
                Días
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="font-mono text-5xl">
                    <span>{timeLeft.hours}</span>
                </span>
                horas
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="font-mono text-5xl">
                    <span>{timeLeft.minutes}</span>
                </span>

                min
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="font-mono text-5xl">
                    <span>{timeLeft.seconds}</span>
                </span>
                sec
            </div>
        </div>
    );
}
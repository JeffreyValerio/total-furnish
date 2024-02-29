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
    });

    return (
        <div className="flex justify-between mt-8 font-bold uppercase w-full sm:w-3/4">
            <div>
                <span className='text-gray-600'>Días</span>
                {timeLeft.days && <div className="text-4xl">{timeLeft.days} </div>}
            </div>

            <div>
                <span className='text-gray-600'>Horas</span>
                {timeLeft.hours && <div className="text-4xl">{timeLeft.hours}</div>}
            </div>
            <div>
                <span className='text-gray-600'>Minutos</span>
                {timeLeft.minutes && <div className="text-4xl">{timeLeft.minutes}</div>}
            </div>
            <div>
                <span className='text-gray-600'>Segundos</span>
                {timeLeft.seconds && <div className="text-4xl">{timeLeft.seconds}</div>}
            </div>
        </div>
    );
}
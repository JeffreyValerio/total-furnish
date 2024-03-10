import Image from "next/image"
import { CountdownTimer } from '@/components/ui/CountdownTimer'

export const Offert = () => {
    // const targetDate = '2024-12-31T23:59:59'; // Aquí define tu fecha objetivo

    const currentDate = new Date();
    const targetDate = new Date(currentDate.setDate(currentDate.getDate() + 6));

    return (
        <div className="bg-blue-100 sm:h-screen flex">

            <div className="grid grid-cols-1 lg:grid-cols-2 max-width items-center">
                <div className="flex justify-center">
                    <Image src={'/images/offer_img.png'} width={500} height={500} alt="" />
                </div>

                <div className="flex flex-col items-center justify-center px-10 pt-0 sm:pt-20">
                    <h3 className="font-bold text-6xl leading-tight">Oferta especial <br/> por tiempo limitado</h3>
                    <div className="w-full flex justify-start">
                        <CountdownTimer targetDate={targetDate} />
                    </div>
                </div>
            </div>
        </div>
    )
}
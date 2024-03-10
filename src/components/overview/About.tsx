import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

export const About = () => {
    return (
        <div className='bg-white xl:h-screen shadow-2xl'>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div
                    className='h-screen bg-cover bg-fixed bg-center bg-no-repeat mb-16 lg:mb-0'
                    style={{ backgroundImage: "url('/images/about.jpg')" }}>
                </div>

                <div className='md:px-12 flex items-center max-width'>
                    <div>
                        <h2 className='mb-10'>Nosotros</h2>
                        <p className='mb-6'>Nuestra misión va más allá de simplemente proporcionar muebles; se trata de crear ambientes que inspiren, donde cada pieza cuente una historia de estilo y funcionalidad.</p>
                        <p>Nos esforzamos por entender las necesidades y gustos de nuestros clientes para ofrecer soluciones que no solo satisfagan, sino que también superen sus expectativas. Desde el diseño inicial hasta la entrega final, nos comprometemos a brindar un servicio excepcional y productos que añadan valor y distinción a cada espacio.</p>
 
                        <Link href={'/about'} className='btn-primary-outline my-10 group flex gap-x-2 items-center justify-center w-fit'>
                            <span className='group-hover:-translate-x-2 transition-all ease-in-out duration-300 uppercase text-xl font-extralight'>Contactar</span>
                            <ArrowRightIcon
                                strokeWidth={1}
                                size={24}
                                className='group-hover:translate-x-2 transition-all ease-in-out duration-300' />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

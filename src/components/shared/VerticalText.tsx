
interface Props {
    textLeft: string
    textRight?: string
}
export const VerticalText = ({ textLeft, textRight }: Props) => {
    return (
        <>
            <div className='border bg-slateGray text-white py-4 hidden sm:block absolute top-1/2 -translate-y-1/2 left-0 font-extralight tracking-widest md:text-3xl xl:text-4xl uppercase rounded text-center'
                style={{ writingMode: 'vertical-lr', textOrientation: 'upright' }}>{textLeft}</div>

            <div className='border bg-slateGray text-white py-4 hidden sm:block absolute top-1/2 -translate-y-1/2 right-0 font-extralight tracking-widest md:text-3xl xl:text-4xl uppercase rounded text-center'
                style={{ writingMode: 'vertical-lr', textOrientation: 'upright' }}>{textRight}</div>
        </>
    )
}
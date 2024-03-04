import Link from "next/link"

export const Logo = () => {
    return (
        <div className='font-bold text-2xl uppercase'>
            <Link href={'/'} className="text-oxfordBlue hover:text-oxfordBlue">
                Total Furnish
            </Link>
        </div>
    )
}

import clsx from "clsx"

interface Props {
    heading: string,
    subheading?: string
}
export const Heading = ({ heading, subheading }: Props) => {
    return (
        <div className='heading-section uppercase'>
            <span className={
                clsx("subheading", {
                    'subheading-with-line': subheading
                })}>
                <small className="pr-2 bg-white">{subheading}</small>
            </span>
            <h2 className="mb-4 font-bold">{heading}</h2>
        </div>
    )
}  
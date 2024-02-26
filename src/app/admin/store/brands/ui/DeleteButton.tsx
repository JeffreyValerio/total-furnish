'use client'

import { deleteBrand } from '@/actions'
import { useToaster } from '@/components/providers/ToastifyContext'
import clsx from 'clsx'
import { TrashIcon } from 'lucide-react'

interface Props {
    brandId: string,
    text?: boolean
}
export const DeleteBrandButton = ({ brandId: id, text }: Props) => {

    const { showToast } = useToaster()

    return (
        <button
            title={`Eliminar marca`}
            onClick={async () => {
                const confirmed = window.confirm(
                    `¿Desea eliminar la marca y su imagen?`
                )
                if (confirmed) {
                    const { ok, message } = await deleteBrand(id)
                    showToast(message, {
                        type: ok ? 'success' : 'error',
                        autoClose: true
                    })
                } else {
                    showToast(`La eliminación de la marca fue cancelada`, {
                        type: 'warning',
                        autoClose: true
                    })
                }
            }}
            className={clsx("text-sm text-gray-900 whitespace-nowrap", {
                'btn-delete text-center': text
            })}>
            <span className={clsx("", { 'hidden': !text })} >
                Eliminar
            </span>
            <TrashIcon color="red" strokeWidth={1} size={18}
                className={clsx("", { 'hidden': text })} />
        </button>
    )
}  
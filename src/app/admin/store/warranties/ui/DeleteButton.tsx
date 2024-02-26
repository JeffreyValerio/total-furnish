'use client'

import { deleteWarranty } from '@/actions'
import { useToaster } from '@/components/providers/ToastifyContext'
import clsx from 'clsx'
import { TrashIcon } from 'lucide-react'
import React from 'react'

interface Props {
    warrantyId: string,
    text?: boolean
}
export const DeleteWarrantyButton = ({ warrantyId: id, text = false }: Props) => {

    const { showToast } = useToaster()

    return (
        <button
            title={`Eliminar garantía`}
            onClick={async () => {
                const confirmed = window.confirm(
                    `¿Desea eliminar la garantía?`
                )
                if (confirmed) {
                    const { ok, message } = await deleteWarranty(id);
                    showToast(message, {
                        type: ok ? 'success' : 'error',
                        autoClose: true
                    })
                } else {
                    showToast(`La eliminación de la garantía fue cancelada`, {
                        type: 'warning',
                        autoClose: true
                    })
                }
            }}
            className={clsx("text-sm text-gray-900 font-bold whitespace-nowrap", {
                'btn-delete text-center mt-2': text
            })}>
            <span className={clsx("", { 'hidden': !text })} >
                Eliminar garantía
            </span>
            <TrashIcon color="red" strokeWidth={1} size={18}
                className={clsx("", { 'hidden': text })} />
        </button> 
    )
}
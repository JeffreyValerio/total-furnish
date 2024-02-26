'use client'

import { deleteSupplier } from '@/actions'
import { useToaster } from '@/components/providers/ToastifyContext'
import clsx from 'clsx'
import { TrashIcon } from 'lucide-react'

interface Props {
    supplierId: string,
    text?: boolean
}
export const DeleteSupplierButton = ({ supplierId: id, text = false }: Props) => {

    const { showToast } = useToaster()

    return (
        <button
            title={`Eliminar proveedor`}
            onClick={async () => {
                const confirmed = window.confirm(
                    `¿Desea eliminar el proveedor?`
                )
                if (confirmed) {
                    const { ok, message } = await deleteSupplier(id);
                    showToast(message, {
                        type: ok ? 'success' : 'error',
                        autoClose: true
                    })
                } else {
                    showToast(`La eliminación del proveedor fue cancelada`, {
                        type: 'warning',
                        autoClose: true
                    })
                }
            }}
            className={clsx("text-sm text-gray-900 font-bold whitespace-nowrap", {
                'btn-delete text-center mt-2': text
            })}>
            <span className={clsx("", { 'hidden': !text })} >
                Eliminar proveedor
            </span>
            <TrashIcon color="red" strokeWidth={1} size={18}
                className={clsx("", { 'hidden': text })} />
        </button> 
    )
}
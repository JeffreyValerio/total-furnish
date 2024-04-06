'use client'

import { deleteBrand, deleteProduct } from '@/actions'
import { useToaster } from '@/components/providers/ToastifyContext'
import clsx from 'clsx'
import { TrashIcon } from 'lucide-react'
import React from 'react'

interface Props {
    productId: string,
    text?: boolean,
}
export const DeleteProductButton = ({ productId: id, text }: Props) => {

    const { showToast } = useToaster()

    return (
        <button
            title={`Eliminar producto`}
            onClick={() => {
                const confirmed = window.confirm(
                    `¿Desea eliminar el productos y sus imágenes?`
                )
                if (confirmed) {
                    showToast(`El producto fue eliminado con éxito`, {
                        type: 'success',
                        autoClose: true
                    })
                    deleteProduct(id)
                } else {
                    showToast(`La eliminación del producto fue cancelada`, {
                        type: 'warning',
                        autoClose: true
                    })
                }
            }}
            className={clsx("text-sm text-gray-900 whitespace-nowrap rounded", {
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
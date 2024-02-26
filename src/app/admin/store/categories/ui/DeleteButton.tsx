'use client'

import { deleteCategory } from '@/actions'
import { useToaster } from '@/components/providers/ToastifyContext'
import { TrashIcon } from 'lucide-react'

interface Props {
    categoryId: string
}
export const DeleteCategoryButton = ({ categoryId: id }: Props) => {

    const { showToast } = useToaster()

    return (
        <button
            title={`Eliminar categoría`}
            onClick={async () => {
                const confirmed = window.confirm(
                    `¿Desea eliminar la categoría y su imagen?`
                )
                if (confirmed) {
                    const { ok, message } = await deleteCategory(id);
                    showToast(message, {
                        type: ok ? 'success' : 'error',
                        autoClose: true
                    }) 
                } else {
                    showToast(`La eliminación de la categoría fue cancelada`, {
                        type: 'warning',
                        autoClose: true
                    })
                }
            }}
            className="text-sm text-gray-900 font-bold whitespace-nowrap">
            <TrashIcon color="red" strokeWidth={1} size={18} />
        </button>
    ) 
}
'use client'
import React, { createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastContext = createContext<{
    showToast: (message: string, options?: any) => void
}>({
    showToast: async (message: string, options?: any) => { }
});

export const useToaster = () => {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('UseToaster must be used within a ToastProvider')
    }
    return context
}

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const showToast = (message: string, options?: any) => {
        toast(message, options);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </ToastContext.Provider>
    );
};

import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

type ToastProps = {
   message: string;
   type: "SUCCESS" | "ERROR";
   onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const styles = `fixed top-4 right-4 z-50 p-4 rounded-lg text-white max-w-md flex items-center gap-3 shadow-md animate-fade-in-out ${
        type === "SUCCESS" ? "bg-green-600" : "bg-red-600"
    }`;

    return (
        <div className={styles} role="alert">
            <span className="text-lg font-semibold flex-1">{message}</span>
            <button onClick={onClose} className="text-white hover:text-gray-200">
                <IoClose size={20} />
            </button>
        </div>
    );
};

export default Toast;

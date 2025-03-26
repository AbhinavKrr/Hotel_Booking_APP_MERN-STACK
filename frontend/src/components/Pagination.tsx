export type Props = {
    page: number;
    pages: number;
    onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: Props) => {
    if (pages <= 1) return null; // Hide pagination if only one page

    return (
        <div className="flex justify-center mt-5">
            <ul className="flex border border-slate-300 rounded-md overflow-hidden">
                {Array.from({ length: pages }, (_, i) => i + 1).map((number) => (
                    <li key={number} className="flex">
                        <button
                            onClick={() => onPageChange(number)}
                            className={`px-3 py-2 text-sm font-semibold transition-colors ${
                                page === number 
                                    ? "bg-blue-600 text-white" 
                                    : "bg-white text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;

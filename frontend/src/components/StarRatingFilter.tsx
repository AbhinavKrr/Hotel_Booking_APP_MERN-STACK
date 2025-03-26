type Props = {
    selectedStars: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
    return (
        <div className="border-b border-slate-300 pb-5">
            <h4 className="text-md font-semibold mb-3">Property Rating</h4>
            {['5', '4', '3', '2', '1'].map((star) => (
                <label key={star} htmlFor={`star-${star}`} className="flex items-center gap-2">
                    <input 
                        id={`star-${star}`}
                        type="checkbox" 
                        className="rounded cursor-pointer"
                        value={star} 
                        checked={selectedStars.includes(star)}
                        onChange={onChange} 
                    />
                    <span className="text-sm">{star} Stars</span>
                </label>
            ))}
        </div>
    );
};

export default StarRatingFilter;

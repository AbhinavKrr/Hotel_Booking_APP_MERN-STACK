const Footer = () => {
    return (
        <div className="bg-blue-800 py-8">
            <div className="container mx-auto flex flex-wrap justify-between items-center px-4 gap-6">
                <span className="text-2xl text-white font-bold tracking-tight">
                    MernHolidays.com
                </span>
                <span className="text-white font-semibold tracking-tight flex flex-wrap gap-6 text-lg">
                    <p className="cursor-pointer hover:underline">Privacy Policy</p>
                    <p className="cursor-pointer hover:underline">Terms of Service</p>
                </span>
            </div>
        </div>
    );
};

export default Footer;

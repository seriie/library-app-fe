import { FaBookmark, FaCheckCircle } from "react-icons/fa";

export default function Library({ books, myLoans, setConfirmState }) {
    const onBorrow = (bookId) => {
      setConfirmState({ open: true, bookId });
    };

    return (
        <>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900 uppercase tracking-tight">
                            Available Collection
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {books.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="h-12 w-12 bg-gray-900 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md">
                                            {book.title.charAt(0)}
                                        </div>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-bold ${book.stock > 0
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {book.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-lg text-gray-900 mb-1 leading-tight group-hover:text-indigo-600 transition-colors">
                                        {book.title}
                                    </h4>
                                    <p className="text-sm text-gray-500 font-medium mb-4">
                                        {book.author}
                                    </p>
                                    <p className="text-xs text-gray-400 line-clamp-2 mb-4">
                                        {book.description || "No description available."}
                                    </p>
                                </div>

                                <button
                                    onClick={() => onBorrow(book.id)}
                                    disabled={book.stock <= 0}
                                    className={`w-full cursor-pointer py-3 rounded-xl font-bold text-sm transition-all ${book.stock > 0
                                        ? "bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl active:transform active:scale-95"
                                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    {book.stock > 0 ? "BORROW NOW" : "UNAVAILABLE"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>


                {/* My Loans Sidebar (1/3 width) */}
                <div className="xl:col-span-1">
                    <h3 className="text-xl font-bold text-gray-900 uppercase tracking-tight mb-6">
                        My Recent Activity
                    </h3>
                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg space-y-4">
                        {myLoans.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">
                                No loan history found.
                            </p>
                        ) : (
                            myLoans.slice(0, 5).map((loan) => (
                                <div
                                    key={loan.id}
                                    className="flex items-center p-4 rounded-2xl bg-gray-50 border border-gray-100"
                                >
                                    <div
                                        className={`h-10 w-10 rounded-full flex items-center justify-center text-white mr-4 ${loan.status === "borrowed"
                                            ? "bg-indigo-600"
                                            : "bg-gray-400"
                                            }`}
                                    >
                                        {loan.status === "borrowed" ? (
                                            <FaBookmark />
                                        ) : (
                                            <FaCheckCircle />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-gray-900 text-sm truncate">
                                            {loan.book?.title || "Unknown Book"}
                                        </p>
                                        <p className="text-xs text-gray-500 font-medium uppercase">
                                            {loan.status}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {/* Quick Info Card */}
                    <div className="bg-gray-900 rounded-3xl p-6 text-white shadow-lg mt-8 relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="font-bold text-lg mb-2">LIBRARY RULES</h4>
                            <ul className="text-sm text-gray-400 space-y-2 list-disc pl-4">
                                <li>No stealing books.</li>
                                <li>No late returning books.</li>
                                <li>No damaging books.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
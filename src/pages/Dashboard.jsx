import { useContext, useState, useEffect, useCallback } from "react";
import { ProfileContext } from "../contexts/profile-context/ProfileContext";
import axios from "axios";
import {
  FaUser,
  FaBook,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaWallet,
  FaBell,
  FaSearch,
  FaArrowUp,
  FaBookmark,
  FaCheckCircle,
} from "react-icons/fa";
import Alert from "../components/Alert";

export default function Dashboard() {
  const { user } = useContext(ProfileContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Data State
  const [books, setBooks] = useState([]);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("LIBRARY");

  // Alert State
  const [alert, setAlert] = useState({ open: false, message: "", type: "success" });
  const [confirmState, setConfirmState] = useState({ open: false, bookId: null });

  const URL = import.meta.env.VITE_BACKEND_URL;

  const fetchData = useCallback(async () => {
    try {
      const [booksRes, loansRes] = await Promise.all([
        axios.get(`${URL}/api/books`),
        axios.get(`${URL}/api/loans`)
      ]);
      
      setBooks(booksRes.data.data);
      setLoans(loansRes.data.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, [URL]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, fetchData]);

  const handleBorrow = async (bookId) => {
    // Deprecated
  };
  
  const onBorrow = (bookId) => {
    setConfirmState({ open: true, bookId });
  };

  const processBorrow = async () => {
    setConfirmState({ open: false, bookId: null }); // Close confirm dialog

    try {
      await axios.post(`${URL}/api/loans`, {
        userId: user.id,
        bookId: confirmState.bookId
      });
      
      setAlert({
        open: true,
        message: "Book borrowed successfully!",
        type: "success"
      });
      fetchData(); 
    } catch (error) {
      setAlert({
        open: true,
        message: error.response?.data?.message || "Failed to borrow book",
        type: "error"
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold text-lg tracking-wider">ACCESSING ARCHIVES...</p>
        </div>
      </div>
    );
  }

  // Derived Stats
  const myLoans = loans.filter(loan => loan.userId === user.id);
  const activeLoans = myLoans.filter(loan => loan.status === 'borrowed').length;
  const returnedLoans = myLoans.filter(loan => loan.status === 'returned').length;
  const totalBooks = books.length;

  const menuItems = [
    { icon: FaBook, label: "LIBRARY", id: "LIBRARY" },
    { icon: FaBookmark, label: "MY LOANS", id: "MY LOANS" },
    { icon: FaUser, label: "PROFILE", id: "PROFILE" },
    { icon: FaCog, label: "SETTINGS", id: "SETTINGS" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans text-gray-900">
      {/* Toast Alert */}
      <Alert 
        open={alert.open} 
        message={alert.message} 
        type={alert.type} 
        onClose={() => setAlert({ ...alert, open: false })} 
      />

      {/* Confirmation Alert */}
      <Alert
        open={confirmState.open}
        message="Are you sure you want to borrow this book?"
        type="confirm"
        onClose={() => setConfirmState({ open: false, bookId: null })}
        onConfirm={processBorrow}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-gray-900 text-white transform transition-transform duration-300 ease-out lg:translate-x-0 lg:static shadow-2xl ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="h-24 flex items-center px-8 border-b border-gray-800">
            <h1 className="text-3xl font-black tracking-tighter italic">
              ATLAS<span className="text-gray-500">_</span>LIB
            </h1>
          </div>

          <nav className="flex-1 px-6 py-8 space-y-3">
            {menuItems.map((item, index) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={index}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false); // Close mobile sidebar on click
                  }}
                  className={`flex items-center w-full px-6 py-4 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-white text-gray-900 shadow-lg shadow-white/10 font-bold"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <item.icon className={`mr-4 text-xl ${isActive ? "text-gray-900" : "text-gray-500 group-hover:text-white"}`} />
                  <span className="tracking-wide text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-6 border-t border-gray-800">
             <div className="flex items-center gap-4 mb-6 px-4">
               <div className="h-10 w-10 rounded-lg bg-gray-700 flex items-center justify-center font-bold text-white border border-gray-600">
                 {user.name.charAt(0).toUpperCase()}
               </div>
               <div className="min-w-0">
                 <p className="font-bold text-sm truncate">{user.name}</p>
                 <p className="text-xs text-gray-500 truncate">{user.email}</p>
               </div>
            </div>
            <button onClick={handleLogout} className="flex cursor-pointer items-center justify-center w-full px-4 py-3 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white rounded-xl transition-all font-bold text-sm tracking-wide border border-red-600/20 hover:border-red-600">
              <FaSignOutAlt className="mr-2" />
              LOGOUT
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-gray-100">
        {/* Header */}
        <header className="h-24 px-8 lg:px-12 flex items-center justify-between sticky top-0 z-30 bg-gray-100/90 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-900 hover:bg-gray-200 rounded-lg"
            >
              <FaBars className="text-2xl" />
            </button>
            <div className="hidden md:block">
              <p className="text-gray-500 text-sm font-medium tracking-wide">LIBRARY SYSTEM</p>
              <h2 className="text-2xl font-bold text-gray-900">{activeTab} VIEW</h2>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block group">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-900" />
              <input 
                type="text" 
                placeholder="Search collection..." 
                className="pl-12 pr-4 py-3 bg-white border-2 border-transparent focus:border-gray-900 rounded-xl text-sm font-medium w-64 transition-all shadow-sm outline-none"
              />
            </div>
            <button className="relative p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 text-gray-600 hover:text-gray-900">
              <FaBell className="text-lg" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-8 lg:px-12 py-4 overflow-y-auto">
          {/* Hero Banner */}
          <div className="w-full bg-gray-900 rounded-3xl p-10 text-white mb-10 relative overflow-hidden shadow-2xl shadow-gray-900/20 group">
             <div className="relative z-10 max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
                DIGITAL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">ARCHIVE</span>
              </h1>
              <p className="text-gray-400 text-lg mb-8 font-medium">
                You have {activeLoans} active loans. Explore our collection of {totalBooks} books.
              </p>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-gray-800 to-transparent opacity-50 transform skew-x-12 translate-x-20 group-hover:translate-x-10 transition-transform duration-700 ease-out"></div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1">
               <p className="text-gray-500 text-xs font-bold tracking-widest mb-2">TOTAL BOOKS</p>
               <h3 className="text-4xl font-black text-gray-900">{totalBooks}</h3>
            </div>
             <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1">
               <p className="text-gray-500 text-xs font-bold tracking-widest mb-2">ACTIVE LOANS</p>
               <h3 className="text-4xl font-black text-gray-900">{activeLoans}</h3>
            </div>
             <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1">
               <p className="text-gray-500 text-xs font-bold tracking-widest mb-2">RETURNED</p>
               <h3 className="text-4xl font-black text-gray-900">{returnedLoans}</h3>
            </div>
          </div>

          {activeTab === "LIBRARY" && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Book Collection (2/3 width) */}
              <div className="xl:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 uppercase tracking-tight">Available Collection</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {books.map((book) => (
                    <div key={book.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between group">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                           <div className="h-12 w-12 bg-gray-900 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md">
                             {book.title.charAt(0)}
                           </div>
                           <span className={`px-3 py-1 rounded-full text-xs font-bold ${book.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                             {book.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
                           </span>
                        </div>
                        <h4 className="font-bold text-lg text-gray-900 mb-1 leading-tight group-hover:text-indigo-600 transition-colors">{book.title}</h4>
                        <p className="text-sm text-gray-500 font-medium mb-4">{book.author}</p>
                        <p className="text-xs text-gray-400 line-clamp-2 mb-4">{book.description || "No description available."}</p>
                      </div>
                      
                      <button 
                        onClick={() => onBorrow(book.id)}
                        disabled={book.stock <= 0}
                        className={`w-full cursor-pointer py-3 rounded-xl font-bold text-sm transition-all ${
                          book.stock > 0 
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
                 <h3 className="text-xl font-bold text-gray-900 uppercase tracking-tight mb-6">My Recent Activity</h3>
                 <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg space-y-4">
                   {myLoans.length === 0 ? (
                     <p className="text-gray-500 text-center py-8">No loan history found.</p>
                   ) : (
                     myLoans.slice(0, 5).map((loan) => (
                       <div key={loan.id} className="flex items-center p-4 rounded-2xl bg-gray-50 border border-gray-100">
                         <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white mr-4 ${loan.status === 'borrowed' ? 'bg-indigo-600' : 'bg-gray-400'}`}>
                           {loan.status === 'borrowed' ? <FaBookmark /> : <FaCheckCircle />}
                         </div>
                         <div className="flex-1 min-w-0">
                           <p className="font-bold text-gray-900 text-sm truncate">{loan.book?.title || "Unknown Book"}</p>
                           <p className="text-xs text-gray-500 font-medium uppercase">{loan.status}</p>
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
          )}

          {activeTab === "MY LOANS" && (
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Full Loan History</h3>
                <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full">
                  {myLoans.length} Records
                </span>
              </div>
              
              {myLoans.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-gray-100">
                        <th className="pb-4 font-bold text-gray-400 text-xs tracking-wider">BOOK TITLE</th>
                        <th className="pb-4 font-bold text-gray-400 text-xs tracking-wider">BORROWED</th>
                        <th className="pb-4 font-bold text-gray-400 text-xs tracking-wider">RETURNED</th>
                        <th className="pb-4 font-bold text-gray-400 text-xs tracking-wider">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {myLoans.map((loan) => (
                        <tr key={loan.id} className="group hover:bg-gray-50 transition-colors">
                          <td className="py-4 pr-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-600 mr-3">
                                {loan.book?.title?.charAt(0) || "?"}
                              </div>
                              <span className="font-bold text-gray-900">{loan.book?.title || "Unknown"}</span>
                            </div>
                          </td>
                          <td className="py-4 text-sm font-medium text-gray-500">
                            {new Date(loan.loanDate).toLocaleDateString()}
                          </td>
                          <td className="py-4 text-sm font-medium text-gray-500">
                            {loan.returnDate ? new Date(loan.returnDate).toLocaleDateString() : "-"}
                          </td>
                          <td className="py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase ${
                              loan.status === 'borrowed' 
                                ? "bg-indigo-100 text-indigo-700" 
                                : "bg-green-100 text-green-700"
                            }`}>
                              {loan.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <FaBookmark className="text-4xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-bold">You haven't borrowed any books yet.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
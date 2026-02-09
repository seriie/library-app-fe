import { useContext, useState, useEffect, useCallback } from "react";
import { ProfileContext } from "../contexts/profile-context/ProfileContext";
import axios from "axios";
import { FaBars, FaSearch, FaBookmark } from "react-icons/fa";

// Components
import Alert from "../components/Alert";
import Aside from "../components/pages/dashboard/Aside";
import Stats from "../components/pages/dashboard/Stats";
import Loading from "../components/Loading";

// Tabs
import Library from "../components/pages/dashboard/tabs/Library";
import Profile from "../components/pages/dashboard/tabs/Profile";

export default function Dashboard() {
  const { user } = useContext(ProfileContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [books, setBooks] = useState([]);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("LIBRARY");

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const [confirmState, setConfirmState] = useState({
    open: false,
    bookId: null,
  });

  const URL = import.meta.env.VITE_BACKEND_URL;

  const fetchData = useCallback(async () => {
    try {
      const [booksRes, loansRes] = await Promise.all([
        axios.get(`${URL}/api/books`),
        axios.get(`${URL}/api/loans`),
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

  const processBorrow = async () => {
    setConfirmState({ open: false, bookId: null });

    try {
      await axios.post(`${URL}/api/loans`, {
        userId: user.id,
        bookId: confirmState.bookId,
      });

      setAlert({
        open: true,
        message: "Book borrowed successfully!",
        type: "success",
      });
      fetchData();
    } catch (error) {
      setAlert({
        open: true,
        message: error.response?.data?.message || "Failed to borrow book",
        type: "error",
      });
    }
  };

    // return (
    //   <div className="absolute inset-0 overflow-hidden justify-center flex items-center z-200 bg-gray-100">
    //     <div className="flex flex-col items-center gap-4">
    //       <div className="h-16 w-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
    //       <p className="font-bold text-lg tracking-wider">
    //         ACCESSING ARCHIVES...
    //       </p>
    //     </div>
    //   </div>
    // );

  const myLoans = loans.filter((loan) => loan.userId === user.id);
  const activeLoans = myLoans.filter(
    (loan) => loan.status === "borrowed"
  ).length;
  const returnedLoans = myLoans.filter(
    (loan) => loan.status === "returned"
  ).length;
  const totalBooks = books.length;

  return (
    <>
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
      <Aside
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

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
              className="lg:hidden cursor-pointer p-2 text-gray-900 hover:bg-gray-200 rounded-lg"
            >
              <FaBars className="text-2xl" />
            </button>
            <div className="hidden md:block">
              <p className="text-gray-500 text-sm font-medium tracking-wide">
                LIBRARY SYSTEM
              </p>
              <h2 className="text-2xl font-bold text-gray-900">
                {activeTab} VIEW
              </h2>
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
            {/* <button className="relative p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 text-gray-600 hover:text-gray-900">
              <FaBell className="text-lg" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
            </button> */}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-8 lg:px-12 py-4 overflow-y-auto">
          {/* Banner */}
          <div className="w-full bg-gray-900 rounded-3xl p-10 text-white mb-10 relative overflow-hidden shadow-2xl shadow-gray-900/20 group">
            <div className="relative z-10 max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
                DIGITAL <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-200 to-gray-500">
                  ARCHIVE
                </span>
              </h1>
              <p className="text-gray-400 text-lg mb-8 font-medium">
                You have {activeLoans} active loans. Explore our collection of{" "}
                {totalBooks} books.
              </p>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-gray-800 to-transparent opacity-50 transform skew-x-12 translate-x-20 group-hover:translate-x-10 transition-transform duration-700 ease-out"></div>
          </div>

          {/* Stats Grid */}
          <Stats activeLoans={activeLoans} returnedLoans={returnedLoans} totalBooks={totalBooks} />

          {activeTab === "LIBRARY" && (
            <Library books={books} myLoans={myLoans} setConfirmState={setConfirmState} />
          )}

          {activeTab === "PROFILE" && (
            <Profile />
          )}

          {activeTab === "MY LOANS" && (
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                  Full Loan History
                </h3>
                <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full">
                  {myLoans.length} Records
                </span>
              </div>

              {myLoans.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-gray-100">
                        <th className="pb-4 font-bold text-gray-400 text-xs tracking-wider">
                          BOOK TITLE
                        </th>
                        <th className="pb-4 font-bold text-gray-400 text-xs tracking-wider">
                          BORROWED
                        </th>
                        <th className="pb-4 font-bold text-gray-400 text-xs tracking-wider">
                          RETURNED
                        </th>
                        <th className="pb-4 font-bold text-gray-400 text-xs tracking-wider">
                          STATUS
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {myLoans.map((loan) => (
                        <tr
                          key={loan.id}
                          className="group hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 pr-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-600 mr-3">
                                {loan.book?.title?.charAt(0) || "?"}
                              </div>
                              <span className="font-bold text-gray-900">
                                {loan.book?.title || "Unknown"}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 text-sm font-medium text-gray-500">
                            {new Date(loan.loanDate).toLocaleDateString()}
                          </td>
                          <td className="py-4 text-sm font-medium text-gray-500">
                            {loan.returnDate
                              ? new Date(loan.returnDate).toLocaleDateString()
                              : "-"}
                          </td>
                          <td className="py-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                loan.status === "borrowed"
                                  ? "bg-indigo-100 text-indigo-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
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
                  <p className="text-gray-500 font-bold">
                    You haven't borrowed any books yet.
                  </p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}

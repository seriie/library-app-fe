import { useEffect, useState } from "react";

export default function BooksTab() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    description: "",
    stock: "",
    status: "available",
  });

  const fetchBooks = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/books`,
      );
      const data = await res.json();
      setBooks(data.data);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });
      const data = await res.json();
      if (res.ok) {
        setBooks([...books, data]);
        setShowModal(false);
        setNewBook({
          title: "",
          author: "",
          description: "",
          stock: "",
          status: "available",
        });
      } else {
        console.error("Gagal tambah buku:", data);
      }
    } catch (err) {
      console.error(err);
    } finally {
        fetchBooks();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Books Management
          </h2>
          <p className="text-sm text-slate-500">Manage book data</p>
        </div>

        <button
          className="rounded-lg cursor-pointer bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition"
          onClick={() => setShowModal(true)}
        >
          + Add Book
        </button>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Title</th>
              <th className="px-4 py-3 text-left font-medium">Author</th>
              <th className="px-4 py-3 text-left font-medium">Stock</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-10 text-center text-slate-500"
                >
                  Loading...
                </td>
              </tr>
            ) : books.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-10 text-center text-slate-500"
                >
                  No books data📭
                </td>
              </tr>
            ) : (
              books.map((book, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition">
                  <td className="px-4 py-3 text-slate-700 cursor-pointer hover:underline">
                    {book.title}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{book.author}</td>
                  <td className="px-4 py-3 text-slate-700">{book.stock}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        book.status === "available"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {book.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button className="rounded-md cursor-pointer px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 transition">
                      Edit
                    </button>
                    <button className="rounded-md cursor-pointer px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-slate-800">
                Add New Book
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 cursor-pointer hover:text-slate-600 transition rounded-full p-1"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={newBook.title}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                required
              />
              <input
                type="text"
                name="author"
                placeholder="Author"
                value={newBook.author}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={newBook.description}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition resize-none"
                rows={4}
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={newBook.stock}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                required
              />

              <div className="flex justify-end space-x-3 mt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 cursor-pointer rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 cursor-pointer rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                >
                  
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import { GiOpenBook } from "react-icons/gi";
import { useProfile } from "../contexts/profile-context/ProfileContext";
import { useNavigate } from "react-router-dom";
import { useRole } from "../contexts/role-context/RoleContext";
import { useLocation } from "react-router-dom";

export default function Header() {
  const { user } = useProfile();
  const navigate = useNavigate();
  const { isMember } = useRole();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-100 bg-indigo-950/90 backdrop-blur border-b border-indigo-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-6">
        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <GiOpenBook className="text-yellow-400 text-2xl" />
          <h1 className="text-white font-semibold tracking-wide">
            Atlas<span className="text-yellow-400">App</span>
          </h1>
        </div>

        {user && (
          <div className="flex items-center gap-2">
            <p className="text-sm text-indigo-200">
              Halo,{" "}
              <span className="font-medium cursor-pointer hover:underline">
                {user.name}
              </span>{" "}
              👋
            </p>
            {!isMember && (
                <button onClick={!location.pathname.startsWith("/admin") ? () => navigate("/admin") : () => navigate("/dashboard")} className="px-2 py-1 cursor-pointer hover:text-slate-700 hover:bg-slate-200 transition-all duration-200 text-md text-slate-200 border rounded-lg" type="button">{location.pathname.startsWith("/admin") ? "Dashboard" : "Panel"}</button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
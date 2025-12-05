import { Link, Outlet } from "react-router";

import { useAuth } from "@/hooks/useAuth";
import { useSession } from "@/hooks/useSession";
import { toast } from "react-toastify";
import DashboardLogin from "../auth/DashboardLogin";
import LanguageSwitcher from "../language-switcher/LanguageSwitcher";
import LoadingSpinner from "../ui/LoadingSpinner";

const Dashboard = () => {
	const { session, sessionLoading } = useSession();
	const { logout } = useAuth();

	const handleLogout = () => {
		logout.mutate(undefined, {
			onSuccess: () => toast.success("Logged out successfully"),
			onError: (error) => toast.error(`Logout failed: ${error.message}`),
		});
	};

	if (sessionLoading) return <LoadingSpinner />;

	if (!session) return <DashboardLogin />;

	return (
		<div className="flex h-screen w-full flex-row">
			<aside className="bg-amber-400">
				<nav>
					<ul>
						<li>
							<Link to="/dashboard">Home Editor</Link>
						</li>
						<li>
							<Link to="/dashboard/catalog">Catalog Manager</Link>
						</li>
					</ul>
					<button onClick={handleLogout}>Logout</button>
				</nav>
			</aside>
			<div className="flex flex-1 flex-col">
				<header className="bg-emerald-400">
					<h2>Dashboard</h2>
					<LanguageSwitcher />
				</header>
				<main className="h-full w-full bg-teal-400">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default Dashboard;

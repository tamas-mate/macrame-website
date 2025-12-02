import { Link, Outlet } from "react-router";

import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useSession } from "@/hooks/useSession";
import { toastConfig } from "@/utils/utils";
import { toast } from "react-toastify";
import DashboardLogin from "../auth/DashboardLogin";
import LanguageSwitcher from "../language-switcher/LanguageSwitcher";
import LoadingSpinner from "../ui/LoadingSpinner";

const Dashboard = () => {
	const { session, sessionLoading } = useSession();
	const { isAdmin, isAdminLoading, isAdminError } = useIsAdmin(session?.user.id);
	const { logout } = useAuth();

	const handleLogout = () => {
		logout.mutate(undefined, {
			onSuccess: () => toast.success("Logged out successfully", toastConfig),
			onError: (error) => toast.error(`Logout failed: ${error.message}`, toastConfig),
		});
	};

	if (sessionLoading) return <LoadingSpinner />;

	if (!session) return <DashboardLogin />;

	if (isAdminLoading) return <LoadingSpinner />;

	if (isAdminError)
		return <div className="flex h-screen items-center justify-center text-2xl">Error loading admin status.</div>;

	if (!isAdmin)
		return (
			<div className="flex h-screen items-center justify-center text-2xl">
				Access Denied: You do not have admin privileges.
			</div>
		);

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
				<main className="bg-teal-400">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default Dashboard;

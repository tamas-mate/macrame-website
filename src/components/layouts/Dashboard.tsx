import { Link, Outlet } from "react-router";

import { useAuth } from "@/hooks/useAuth";
import { useSession } from "@/hooks/useSession";
import DashboardLogin from "../auth/DashboardLogin";
import LanguageSwitcher from "../language-switcher/LanguageSwitcher";

const Dashboard = () => {
	const session = useSession();
	const { logout } = useAuth();

	if (!session) return <DashboardLogin />;

	return (
		<>
			<aside>
				<nav>
					<ul>
						<li>
							<Link to="/dashboard">Home Editor</Link>
						</li>
						<li>
							<Link to="/dashboard/catalog">Catalog Manager</Link>
						</li>
					</ul>
					<Link to="#" onClick={logout}>
						Log out
					</Link>
				</nav>
			</aside>
			<header>
				<h2>Dashboard</h2>
				<LanguageSwitcher />
			</header>
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default Dashboard;

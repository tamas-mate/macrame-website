import { useTranslation } from "react-i18next";
import { Link, Outlet, useLocation } from "react-router";

import { dashboardNavlinks } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { useSession } from "@/hooks/useSession";
import { cl, customToast } from "@/utils/utils";
import DashboardLogin from "../dashboard/auth/DashboardLogin";
import LanguageSwitcher from "../language-switcher/LanguageSwitcher";
import LoadingSpinner from "../ui/LoadingSpinner";

const Dashboard = () => {
	const { session, sessionLoading } = useSession();
	const { logout } = useAuth();
	const { pathname } = useLocation();
	const { t } = useTranslation("backend");

	const handleLogout = () => {
		logout.mutate(undefined, {
			onSuccess: () => customToast(t("dashboard.auth.logout_success"), "success"),
			onError: (error) => customToast(t("dashboard.auth.logout_error", { error: error.message }), "error"),
		});
	};

	const isCurrentLink = (href: string) => {
		return href === pathname;
	};

	if (sessionLoading) return <LoadingSpinner isFullscreen />;

	if (!session) return <DashboardLogin />;

	return (
		<div className="flex h-screen w-full flex-row text-white">
			<aside className="h-full w-[15%] bg-[#570b1b]">
				<nav className="col-items-center gap-y-5">
					<ul className="col-items-center gap-y-5 pt-6">
						{dashboardNavlinks.map((link) => (
							<li key={link.href}>
								<Link
									to={link.href}
									className={cl(
										"hover:font-bold hover:underline hover:underline-offset-4",
										isCurrentLink(link.href) && "font-bold underline underline-offset-4",
									)}
								>
									{t(link.name)}
								</Link>
							</li>
						))}
					</ul>
					<button
						onClick={handleLogout}
						className="hover:cursor-pointer hover:font-bold hover:underline hover:underline-offset-4"
					>
						{t("dashboard.nav.logout")}
					</button>
				</nav>
			</aside>
			<div className="flex h-full w-full flex-col">
				<header className="bg-primary-dark flex items-center justify-between p-5">
					<h2 className="self-start text-2xl font-bold">{t("dashboard.header.title")}</h2>
					<LanguageSwitcher bgColor="bg-primary-dark" />
				</header>
				<main className="flex-1 overflow-hidden">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default Dashboard;

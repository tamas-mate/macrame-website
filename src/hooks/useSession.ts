import supabase from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const useSession = () => {
	const [session, setSession] = useState<Session | null>(null);
	const [sessionLoading, setSessionLoading] = useState(true);

	useEffect(() => {
		const ac = new AbortController();

		const getSession = async () => {
			try {
				const {
					data: { session },
					error,
				} = await supabase.auth.getSession();

				if (ac.signal.aborted) return;

				if (error) throw error;

				setSession(session);
			} catch (error) {
				console.error("Error in getSession:", error);
			} finally {
				if (!ac.signal.aborted) setSessionLoading(false);
			}
		};

		getSession();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			// TODO: Remove console.log later
			console.log("Session changed:", session);
			setSession(session);
		});

		return () => {
			ac.abort();
			subscription.unsubscribe();
		};
	}, []);

	return { session, sessionLoading };
};

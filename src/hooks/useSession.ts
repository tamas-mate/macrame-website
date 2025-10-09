import supabase from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const useSession = () => {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		const getSession = async () => {
			try {
				const {
					data: { session },
					error,
				} = await supabase.auth.getSession();

				if (error) {
					throw error;
				}

				if (session) {
					setSession(session);
				}
			} catch (error) {
				console.error("Error in getSession:", error);
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

		return () => subscription.unsubscribe();
	}, []);

	return session;
};

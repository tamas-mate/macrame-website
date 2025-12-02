import supabase from "@/lib/supabase";
import type { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export const useIsAdmin = (userId?: string) => {
	const { isPending, isError, data, error } = useQuery<boolean, PostgrestError>({
		queryKey: ["isAdmin", userId],
		enabled: !!userId,
		staleTime: 5 * 60 * 1000,
		queryFn: async () => {
			const { data, error } = await supabase
				.from("user_profiles")
				.select("is_admin")
				.eq("id", userId as string)
				.maybeSingle();

			if (error) throw error;

			return data?.is_admin ?? false;
		},
	});

	if (isError) {
		console.error("Error fetching admin status:", error);
	}

	return { isAdmin: data, isAdminLoading: isPending, isAdminError: error };
};

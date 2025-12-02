import supabase from "@/lib/supabase";
import { useMutation } from "@tanstack/react-query";

export const useAuth = () => {
	const login = useMutation({
		mutationFn: async ({ email, password }: { email: string; password: string }) => {
			const { error } = await supabase.auth.signInWithPassword({ email, password });
			if (error) throw error;
		},
	});

	const logout = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.auth.signOut();
			if (error) throw error;
		},
	});

	return { login, logout };
};

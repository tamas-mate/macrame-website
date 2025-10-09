import supabase from "@/lib/supabase";

export const useAuth = () => {
	const login = async (email: string, password: string) => {
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) throw error;

			return data;
		} catch (error) {
			console.error("Error logging in:", error);
		}
	};

	const logout = async () => {
		try {
			const { error } = await supabase.auth.signOut();

			if (error) throw error;
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};

	return { login, logout };
};

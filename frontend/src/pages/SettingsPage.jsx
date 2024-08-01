import { Button, Text } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";

export const SettingsPage = () => {
	const showToast = useShowToast();
	const logout = useLogout();

	const freezeAccount = async () => {
		if (!window.confirm("Are you sure you want to freeze your account?")) return;

		try {
			const res = await fetch("/api/users/freeze", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();

			if (data.error) {
				return showToast("Error", data.error, "error");
			}
			if (data.success) {
				await logout();
				showToast("Success", "Your account has been frozen", "success");
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return (
		<>
			<Text my={1} fontWeight={"bold"}>
Inicia sesión en tu cuenta.			</Text>
			<Text my={1}>Puedes iniciar sesión en cualquier momento.</Text>
			<Button size={"sm"} colorScheme='red' onClick={freezeAccount}>
				Congela
			</Button>
		</>
	);
};

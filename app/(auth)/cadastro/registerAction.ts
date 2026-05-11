"use server";

import db from "@/lib/db";
import { hashSync } from "bcrypt-ts";

export default async function registerAction(
	_prevState: any,
	formData: FormData,
) {
	try {
		const entries = Array.from(formData.entries());
		const data = Object.fromEntries(entries) as {
			name: string;
			email: string;
			password: string;
		};

		if (!data.email || !data.name || !data.password) {
			return {
				message: "Preencha todos os campos",
				success: false,
			};
		}

		const user = await db.user.findUnique({
			where: {
				email: data.email,
			},
		});

		if (user) {
			return {
				message: "Este usuário já existe",
				success: false,
			};
		}

		await db.user.create({
			data: {
				email: data.email,
				name: data.name,
				password: hashSync(data.password),
			},
		});

		return { success: true, message: "Conta criada com sucesso!" };
	} catch (e) {
		return {
			message: "Erro ao criar usuário. Tente novamente.",
			success: false,
		};
	}
}

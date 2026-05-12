import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "LivroSaas",
	description:
		"Deixe que nós fazermos a curadoria para você. Assine nossa plataforma e receba todos os meses um ebook novo de programação.",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return children;
}

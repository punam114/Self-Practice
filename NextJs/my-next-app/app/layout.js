export const metadata = {
  title: "My Next App",
  description: "A sample Next.js app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Promtopia",
  description: "Discover the latestAI prompt",
};
const RootLayout = async ({ children }) => {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          <div className={"main"}>
            <div className={"gradient"}></div>
          </div>
          <main className={"app"}>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;

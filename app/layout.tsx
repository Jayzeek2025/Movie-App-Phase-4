"use client";

import "antd/dist/reset.css";
import { Layout } from "antd";
import type { ReactNode } from "react";
import { GenreProvider } from "@/context/GenreContext";

const { Header, Content } = Layout;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout>
          <Header
            style={{
              background: "#001529",
              color: "#fff",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            Movie Explorer
          </Header>

          <GenreProvider>
            <Content style={{ padding: "40px 80px" }}>
              {children}
            </Content>
          </GenreProvider>

        </Layout>
      </body>
    </html>
  );
}
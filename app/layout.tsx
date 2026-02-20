"use client";

import "antd/dist/reset.css";
import { Layout } from "antd";
import type { ReactNode } from "react";

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

          <Content style={{ padding: "40px 80px" }}>{children}</Content>
        </Layout>
      </body>
    </html>
  );
}

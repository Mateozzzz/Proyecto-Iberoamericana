import React from "react";

function Home() {
  return (
    <main style={{ padding: "1.5rem", fontFamily: "sans-serif" }}>
      <h1>Dashboard Asesores Comerciales</h1>
      <section style={{ marginTop: "1rem" }}>
        <h2>KPIs principales</h2>
        <ul>
          <li>Total reservas hoy: (placeholder)</li>
          <li>Productos más reservados: (placeholder)</li>
        </ul>
      </section>
      <section style={{ marginTop: "1.5rem" }}>
        <h2>Reporte Power BI</h2>
        <div
          style={{
            width: "100%",
            height: "400px",
            border: "1px dashed #888",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <span>Aquí se embebe el reporte de Power BI</span>
        </div>
      </section>
    </main>
  );
}

export default Home;


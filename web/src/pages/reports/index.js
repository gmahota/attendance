import React from "react";
import styles from "../../styles/Home.module.css";

export default function ReportIndividual() {
  const handlerCreateReport = async () => {
    console.log("Ola mundo");
    const res = await fetch(`http://localhost:5000/api/reports/individuals`)
      .then((response) => response.body)
      .then((rb) => {
        const reader = rb.getReader();

        return new ReadableStream({
          start(controller) {
            // The following function handles each data chunk
            function push() {
              // "done" is a Boolean and value a "Uint8Array"
              reader.read().then(({ done, value }) => {
                // If there is no more data to read
                if (done) {
                  console.log("done", done);
                  controller.close();
                  return;
                }
                // Get the data and send it to the browser via the controller
                controller.enqueue(value);
                // Check chunks by logging to the console
                console.log(done, value);
                push();
              });
            }

            push();
          },
        });
      })
      .then((stream) => {
        // Respond with our stream
        return new Response(stream, {
          headers: { "Content-Type": "text/html" },
        }).text();
      })
      .then((result) => {
        // Do things with result
        console.log(result);
      });

    console.log(res);
  };

  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Gerar Relatorios</h1>
          <div className={styles.grid}>
            <a
              className={styles.card}
              href="http://localhost:5000/api/reports/individuals"
            >
              <h3>Report 1</h3>
              <p>Report Individual</p>
            </a>
            <a
              className={styles.card}
              href="http://localhost:5000/api/reports/simplerep"
            >
              <h3>Report 2</h3>
              <p>Report Simple Report</p>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

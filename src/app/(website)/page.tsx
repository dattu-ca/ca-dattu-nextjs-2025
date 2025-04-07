export default function Page() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="text-center">
        <h1 className="text-5xl">Coming Soon</h1>
        <p>
          Code is at{" "}
          <a
            href="https://github.com/dattu-ca/ca-dattu-nextjs-2025"
            target="_blank"
          >
            https://github.com/dattu-ca/ca-dattu-nextjs-2025
          </a>
        </p>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}

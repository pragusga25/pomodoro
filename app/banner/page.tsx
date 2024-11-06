export default function Banner() {
  return (
    <div className="mx-auto my-auto flex h-screen w-[1200px] items-center justify-center bg-white p-20">
      <div className="grid w-full grid-cols-2 gap-12">
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-6xl font-bold tracking-tighter">
            Pomodoro Focus
          </h1>
          <p className="text-2xl text-muted-foreground">
            Boost your productivity with our minimalist Pomodoro timer. Stay
            focused, manage tasks, and track your progress.
          </p>
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-primary px-6 py-3 text-lg font-medium text-primary-foreground">
              25:00
            </div>
            <span className="text-lg text-muted-foreground">Focus Time</span>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl" />
          <div className="relative space-y-8 rounded-2xl border bg-card p-8 shadow-lg">
            <div className="space-y-2 text-center">
              <h2 className="text-4xl font-bold">Focus Time</h2>
              <div className="text-7xl font-bold tracking-tighter">25:00</div>
            </div>
            <div className="flex justify-center space-x-4">
              <button className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow">
                Start
              </button>
              <button className="inline-flex items-center justify-center rounded-md border px-8 py-3 text-sm font-medium shadow-sm">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

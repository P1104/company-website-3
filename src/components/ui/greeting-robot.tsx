import Spline from "@splinetool/react-spline/next";

export default function Home() {
  return (
    <main className="bg-transparent h-screen w-screen">
      <Spline scene="/models/greeting-robot.splinecode" />
    </main>
  );
}

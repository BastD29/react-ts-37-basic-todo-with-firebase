import ErrorBoundary1 from "./components/ErrorBoundary1";
import Example1 from "./components/Example1";
import Example2 from "./components/Example2";

export default function App() {
  return (
    <>
      <ErrorBoundary1 fallback={<h1>Something went wrong.</h1>}>
        <Example1 />
      </ErrorBoundary1>
      <ErrorBoundary1 fallback={<h1>User data could not be loaded.</h1>}>
        <Example2 />
      </ErrorBoundary1>
    </>
  );
}

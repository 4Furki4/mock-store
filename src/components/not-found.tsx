import { Link, useNavigate, useRouteError } from "react-router-dom";
import { Button } from "./ui/button";
const errorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  else if (error && typeof error === 'object' && 'statusText' in error) {
    return error.statusText as string;
  }
  else if (typeof error === 'string') {
    return error;
  }
  else {
    return 'Unknown error';
  }
}
export default function NotFound() {
  const error = useRouteError();
  console.error(error);
  const navigate = useNavigate();
  return (
    <main className="w-full h-[calc(100vh-60px)] flex flex-col items-center justify-center pb-12 text-center">
      <div className="text-destructive-foreground p-6 space-y-4">
        <h1>Oops!</h1>
        <p className="">Sorry, an unexpected error has occurred.</p>
        <p>
          <i>
            {errorMessage(error)}
          </i>
        </p>
      </div>
      <div className="flex">
        <Button asChild variant={'link'}>
          <Link to={'/'}>Go Home</Link>
        </Button>
        <Button variant={'link'} onClick={(e) => {
          e.preventDefault();
          navigate(-1)
        }}>
          Go Back
        </Button>
      </div>
    </main>
  );
}

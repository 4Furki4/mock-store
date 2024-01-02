import { Link, useNavigate, useRouteError } from "react-router-dom";
import { Button } from "./ui/button";

export default function NotFound() {
  const error = useRouteError();
  console.error(error);
  const navigate = useNavigate();
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center pb-12">
      <div className="text-destructive-foreground">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          {/* <i>{error.statusText || error.message}</i> */}
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

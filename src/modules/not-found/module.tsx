import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div className="row">
        <div className="text-white text-center">
          <img
            src="/img/404.svg"
            alt="Not-Found"
            width={400}
            className="d-block"
          />
          <Button
            asChild
            className="bg-black text-white border border-white hover:bg-slate-900 px-6"
          >
            <Link to="/">Back</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;

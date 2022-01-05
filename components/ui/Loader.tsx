import cn from 'classnames';
import { Spinner } from './Spinner';

interface IProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
}

export function Loader({ className = 'h-full', ...props }: IProps) {
  return (
    <div className={cn('w-full flex items-center justify-center', className)} {...props}>
      <Spinner className="h-8 w-8 text-current" />
    </div>
  );
}

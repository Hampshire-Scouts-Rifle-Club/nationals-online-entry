import {
    useEffect,
    useState
} from 'react'
import { Observable } from 'rxjs'

function useObservable<T>(observable:Observable<T>, emptyValue: T): T {
  const [state, setState] = useState(emptyValue);
  
  useEffect(() => {
    const sub = observable.subscribe(setState);
    return () => sub.unsubscribe();
  }, [observable]);

  return state;
}

export default useObservable;
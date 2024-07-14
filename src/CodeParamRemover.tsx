import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export function CodeParamRemover(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // remove the code parameter if it is present in the URL.
    if (searchParams.has("code")) {
      setSearchParams({});
      navigate({}, { replace: true });
    }
  }, [navigate, searchParams, setSearchParams]);

  return <div />;
}

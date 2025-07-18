
import {HashLoader} from 'react-spinners';

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Spinner({loader}) {
  return (
    <HashLoader
        color="#1769aa"
        loading={loader}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  )
}

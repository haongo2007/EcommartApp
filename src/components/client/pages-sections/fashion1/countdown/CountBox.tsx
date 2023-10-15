import { H3, Span } from "components/client/Typography";
import React from "react"; // component props interface

const CountBox = ({ digit=365, title='DAYS' }) => {
  return (
    <H3>
      {digit}{" "}
      <Span color="grey.600" fontSize="14px" fontWeight="600">
        {title}
      </Span>
    </H3>
  );
};

export default CountBox;

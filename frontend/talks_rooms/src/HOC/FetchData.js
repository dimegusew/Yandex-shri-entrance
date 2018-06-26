import React from "react";
import { Query } from "react-apollo";

const WithData =(WrapedComponent,query)=> ({ ...props }) => (
  <Query
    query={query}
  >
    {({ loading, error, data }) => {
      if (loading){ return(
        <div>Loading </div>
      )}
      if (props.error) return <p>Error :(</p>;
      return (
        <WrapedComponent
          data={data}
           {...props} />
      );
    }}
  </Query>
);

export default WithData;

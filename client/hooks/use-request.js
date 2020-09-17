import axios from 'axios';
import { useState } from 'react';

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const response = await axios[method](url, { ...body, ...props });
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      if (err.response) {
        setErrors(
          <div>
            {err.response.data.errors.map((err) => {
              console.log(err);
              return (
                <div className="error-red" key={err.message}>
                  {err.message}
                </div>
              );
            })}
          </div>
        );
      }
    }
  };

  return { doRequest, errors };
};

export default useRequest;

import axios from 'axios';
import { useState } from 'react';

const useRequest = ({ url, method, body }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      return response.data;
    } catch (err) {
      setErrors(
        <div>
          {err.response.data.errors.map((err) => {
            return (
              <div className="error-red" key={err.message}>
                {err.message}
              </div>
            );
          })}
        </div>
      );
    }
  };

  return { doRequest, errors };
};

export default useRequest;

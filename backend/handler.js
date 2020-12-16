export const hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      event,
    }),
  };
};

const message = ({ time, ...rest }) => new Promise((resolve, reject) =>
  setTimeout(() => {
    resolve(`${rest.copy} (with a delay)`);
  }, time * 1000)
);

//Middle ware || simply next function:-
//in middle ware functions we get two extra things: 1)next 2)err
const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  const defaultErrors = {
    statusCode: 500,
    message: err,
  };
  // res.status(500).send({
  //   success: false,
  //   messgae: "Something Went Wrong",
  //   err,
  // });
  //code missing field error:-
  if (err.name === "ValidationError") {
    defaultErrors.statusCode = 400;
    defaultErrors.message = object
      .values(err.errors)
      .map((item) => item.message)
      .join(",");
  }

  //duplicate error: already registered one:-
  if (err.code && err.code === 11000) {
    defaultErrors.statusCode = 400;
    defaultErrors.message = `${Object.keys(
      err.keyValue
    )} Field has to  be uinque`;
  }

  res.status(defaultErrors.statusCode).json({ message: defaultErrors.message });
};

export default errorMiddleware;

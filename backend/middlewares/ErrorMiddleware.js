const errorHandler = (err, req, res, next) => {
  console.error(" Erreur :", err.stack);

  let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message;

  
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors).map(e => e.message).join(", ");
  }
  if (err.name === "CastError") {
    statusCode = 400;
    message = `ID invalide pour ${err.path}: ${err.value}`;
  }

  res.status(statusCode).json({
    succes: false,
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;

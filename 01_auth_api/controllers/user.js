import httpStatusCodes from 'http-status-codes';

const { StatusCodes } = httpStatusCodes;

const getUser = async (req, res) => {
  const { userId, email } = req.user;
  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      id: userId,
      email,
    },
  });
};

export { getUser };

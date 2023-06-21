import db from '../db/supabaseClient.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  BadRequestError,
  UnauthenticatedError,
  ConflictError,
  NotFoundError,
} from '../errors/index.js';
import httpStatusCodes from 'http-status-codes';

const { StatusCodes } = httpStatusCodes;

const register = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    throw new ConflictError('Please provide email and password');
  }
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  const newUser = await db.query(
    `INSERT INTO "Users" (email, password) values ($1, $2) RETURNING *`,
    [email, password]
  );
  const accessToken = jwt.sign(
    { userId: newUser.rows[0].id, email: newUser.rows[0].email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME_ACCESS,
    }
  );
  const refreshToken = jwt.sign(
    { userId: newUser.rows[0].id, email: newUser.rows[0].email },
    process.env.JWT_REFRESH
  );
  res.status(StatusCodes.CREATED).json({
    success: true,
    data: {
      id: newUser.rows[0].id,
      accessToken,
      refreshToken,
    },
  });
};

const login = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }
  const user = await db.query(`SELECT * FROM "Users" WHERE email = $1`, [
    email,
  ]);
  if (user.rowCount < 1) {
    throw new NotFoundError('No user found with such credentials');
  }
  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.rows[0].password
  );
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const accessToken = jwt.sign(
    { userId: user.rows[0].id, email: user.rows[0].email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME_REFRESH,
    }
  );
  const refreshToken = jwt.sign(
    { userId: user.rows[0].id, email: user.rows[0].email },
    process.env.JWT_REFRESH
  );

  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      id: user.rows[0].id,
      accessToken,
      refreshToken,
    },
  });
};

export { register, login };

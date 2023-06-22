import { BadRequestError, NotFoundError } from '../errors/index.js';
import httpStatusCodes from 'http-status-codes';
import { nanoid } from 'nanoid';
import Link from '../models/Link.js';
import dotenv from 'dotenv';
dotenv.config();

const { StatusCodes } = httpStatusCodes;

const shortener = async (req, res) => {
  const { link } = req.body;
  const isMatching =
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      link
    );
  if (!isMatching) {
    throw new BadRequestError('Please provide valid link');
  }
  let url = await Link.findOne({ ogUrl: link });
  if (url) {
    res.status(StatusCodes.OK).json({ shortUrl: url.shortUrl });
  } else {
    const urlId = nanoid(8);
    const shortUrl = `${process.env.BASE_URL}/${urlId}`;
    url = await Link.create({ urlId, ogUrl: link, shortUrl });
    res.status(StatusCodes.OK).json({ shortUrl });
  }
};

const redirection = async (req, res) => {
  const url = await Link.findOne({ urlId: req.params.urlId });
  if (url) {
    res.redirect(url.ogUrl);
  } else {
    throw new NotFoundError('No short link found');
  }
};

export { shortener, redirection };

import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../config/jwt';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Get the JWT token from the Authorization header
  // const token = req.headers['authorization'];
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Bạn không được cấp quyền!' });
  }
  // Verify the token
  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    return res
      .status(401)
      .json({ rs: false, message: 'Bạn không được cấp quyền!' });
  }
  req.body.user = decodedToken;

  next();
};

export const authorization = (validRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRoles = req.body.user.roles.split(',');
    console.log(userRoles.some((role: string) => validRoles.includes(role)));

    if (!userRoles.some((role: string) => validRoles.includes(role))) {
      return res
        .status(403)
        .json({ rs: false, message: 'Bạn không được cấp quyền!' });
    }
    next();
  };
};

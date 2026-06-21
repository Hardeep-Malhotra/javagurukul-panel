// 📄 Backend/middlewares/authorizeRoles.js

/**
 * Role-Based Access Control (RBAC) Middleware
 * @param {...String} allowedRoles - List of authorized roles (e.g., 'ADMIN', 'SUPER_ADMIN')
 */
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // 1. Extract user details attached to the request object
      // (Note: req.user is populated by the verifyJWT middleware after successful token authentication)
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required. Please log in first.",
        });
      }

      // 2. Validate if the user's role exists within the list of allowed roles
      // If the user's role is not included in the allowed list, restrict access and return a 403 Forbidden response
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: `Access Denied! Your role (${user.role}) is not authorized to access this resource.`,
        });
      }

      // 3. If authorized, proceed to the next middleware or controller function
      next();
    } catch (error) {
      // Forward any unexpected runtime errors to the central global error handling middleware
      next(error);
    }
  };
};

module.exports = authorizeRoles;

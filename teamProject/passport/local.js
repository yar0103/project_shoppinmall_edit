require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local");

const db = require("../models");
const { User } = db;

module.exports = () => {
  // 로그인검증
  passport.use(
    new LocalStrategy(async (userId, password, done) => {

      try {
        let result = await User.findOne({ where: { userId } });
      
        if (!result) {
          return done(null, false, { message: "ID가 일치하지 않습니다" });
        }
        if (result.password != password) {
          return done(null, false, { message: "PW가 일치하지 않습니다" });
        }
        if (result.isDeleted) {
          return done(null, false, { message: "휴면 계정입니다" });
        } else {
          return done(null, result);
        }
      } catch (error) {
        console.error(error);
        return done(error, false, { message: "500에러 입니다"});
      }

    })
  );
};

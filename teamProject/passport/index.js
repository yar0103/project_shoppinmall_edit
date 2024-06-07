const passport = require("passport");
const local = require("./local");

const db = require("../models");
const kakao = require("./kakao");
const { User } = db;

module.exports = () => {
  local();
  kakao();

  // 세션생성
  passport.serializeUser((user, done) => {
    process.nextTick(() => {
      done(null, { id: user.id, userId: user.userId });
    });
    // done(null,{id:user.id});
  });

  // 세션검사
  passport.deserializeUser(async (user, done) => {
    let result = await User.findOne({ where: { id: user.id } });

    if (result) {
      const loginUserInfo = {
        id: result.id,
        userId: result.userId,
      };
      process.nextTick(() => {
        return done(null, loginUserInfo);
      });
    }
  });
};

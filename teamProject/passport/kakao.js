require("dotenv").config();
const passport = require('passport');
const KakaoStategy = require('passport-kakao').Strategy;


const db = require("../models");
const { User } = db;

module.exports = () => {
  passport.use(new KakaoStategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: '/auth/kakao/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('profile', profile)
    try {
      const exUser = await User.findOne({
        where: {snsId: profile.id, provider: 'kakao'},
      });
      if (exUser) {
        done(null, exUser); // 로그인 성공
      }else {
        const newUser = await User.create({
          userName: profile.displayName,
          snsId: profile.id,
          provider: 'kakao',
          userId: Math.floor(Math.random()*1000000),
          password: Math.floor(Math.random()*1000000),
          email: `test1@naver.com`,
        });
        done(null, newUser);
      }
    } catch (error) {
      console.log(error)
      done(error)
    }
  }));
}
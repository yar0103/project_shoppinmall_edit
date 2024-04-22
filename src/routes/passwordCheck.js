
import "../css/passwordCheck.css";

export const PasswordCheck = () => {
  return (
    <div className="passwordCheck">
      <div className="div">
        <div className="textWrapper">비밀번호 확인</div>
        <form className="loginBox">
          <div className="inputBox">
            <div className="inputUserpassword">
              <input type="password" className="textWrapper4" placeholder="사용자 비밀번호 입력"></input>
            </div>
            <div className="divWrapper">
              <input type="password" className="textWrapper4" placeholder="사용자 비밀번호 재입력"></input>
            </div>
          </div>
          <div className="buttonBox">
            <button className="submitButton">제출</button>
            <button className="cancelButton">취소</button>
          </div>
        </form>
      </div>
    </div>
  );
};
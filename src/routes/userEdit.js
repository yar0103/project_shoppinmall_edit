import { useNavigate } from "react-router-dom";
import "../css/userEdit.css";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const UserEdit = () => {
  const navigate = useNavigate();
  const goback = () => {
    navigate(-1);
  };
  const [getUser, setGetUser] = useState({});
  const [id, setId] = useState();
  const [editUser, setEditUser] = useState({});
  const [checkToggle, setCheckToggle] = useState("false");

  // 해당유저 정보받아오는 패치
  const getUserFetch = async () => {
    const response = await fetch(`http://localhost:5000/userEdit/${id}`);
    const body = await response.json();
    return body;
  };
  // 받아온패치 실행해서 getUser에 담기
  const getUserTry = async () => {
    const get = await getUserFetch();
    setGetUser(get);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      const decodeToken = jwtDecode(token);
      setId(decodeToken.id);
      getUserTry();
    }
  }, [id]);

  useEffect(() => {
    const editDefault = {
      profileImg : getUser.profileImg,
      password: "",
      passwordCheck: "",
      email: getUser.email,
      phoneNumber: getUser.phoneNumber,
      address: getUser.address,
      gender: getUser.gender,
    };
    setEditUser(editDefault);
  }, [getUser]);

  const checkClick = (e) => {
    const { value } = e.target;
    if (value == "false") {
      setCheckToggle("true");
      setEditUser(pre=>({
        ...pre,
        password: getUser.password,
        passwordCheck: getUser.password,
        gender: getUser.gender,
      }));
    } else {
      setCheckToggle("false");
      setEditUser(pre=>({
        ...pre,
        password: "",
        passwordCheck: "",
        gender: getUser.gender,
      }));
    }
  };

  const valueChange = (e) => {
    const { name, value } = e.target;
    setEditUser(pre => ({...pre, [name]: value }));
  };

  const imageChange = (e)=>{
    const selectFile = e.target.files[0]
    console.log(e.target)
    if(selectFile){
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditUser(pre => ({...pre, profileImg : reader.result}))
      }
      reader.readAsDataURL(selectFile)
    }
  }

  const buttonClick = async (e) => {
    e.preventDefault();
    if (!editUser.password) {
      alert("변경할 비밀번호를 입력하시오");
    } else if (!editUser.passwordCheck) {
      alert("비밀번호 재확인을 입력하시오");
    } else if (editUser.password !== editUser.passwordCheck) {
      alert("비밀번호 재확인이 일치하지 않습니다");
    } else {
      try {
        const response = await fetch(`http://localhost:5000/userEdit/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editUser),
        });
        

        if (!response.ok) {
          throw new Error("서버에서 응답을 받을 수 없습니다");
        } else {
          alert("유저수정 완료");
          navigate("/userProfile");
        }
      } catch (error) {
        alert("유저 수정중 오류가 발생했습니다");
        console.log(error);
      }
    }
  };

  

  

  return (
    <div className="userEdit">
      <form className="formBox">
        <input className="iuputImage" type="file" onChange={imageChange}></input>
        <img
          className="profileImage"
          src={editUser.profileImg}
          onError={() => {if(!getUser.profileImg){setGetUser({...getUser, profileImg : '../img/userDefaultImg.png'})}}}
          alt="프로필 이미지"
        />
        <div className="userEditBox">
          <div className="boxPassword">
            <div className="checkBox">
              <label htmlFor="passwordCheck" className="txt">
                비밀번호 변경하지않음
              </label>
              <input
                type="checkbox"
                id="passwordCheck"
                className="checkPass"
                onClick={checkClick}
                value={checkToggle}
              ></input>
            </div>
            <label htmlFor="password" className="txt">
              변경할 비밀번호
            </label>
            {checkToggle == "true" ? (
              <input
                id="password"
                type="password"
                className="input"
                name="password"
                value={getUser.password}
              />
            ) : (
              <input
                id="password"
                type="password"
                className="input"
                name="password"
                onChange={valueChange}
                value={editUser.password}
              />
            )}
          </div>
          <div className="boxPasswordCheck">
            <label htmlFor="passwordCheck" className="txt">
              비밀번호 재확인
            </label>
            {checkToggle == "true" ? (
              <input
                id="passwordCheck"
                type="password"
                className="input"
                name="passwordCheck"
                value={getUser.password}
              />
            ) : (
              <input
                id="passwordCheck"
                type="password"
                className="input"
                name="passwordCheck"
                onChange={valueChange}
                value={editUser.passwordCheck}
              />
            )}
          </div>
          <div className="boxEmail">
            <label htmlFor="email" className="txt">
              이메일을 입력해주세요
            </label>
            <input
              id="email"
              type="email"
              className="input"
              name="email"
              onChange={valueChange}
              value={editUser.email}
            />
          </div>
          <div className="boxPhone">
            <label htmlFor="phone" className="txt">
              전화번호를 입력해주세요
            </label>
            <input
              id="phone"
              className="input"
              name="phoneNumber"
              onChange={valueChange}
              value={editUser.phoneNumber}
            />
          </div>
          <div className="boxAddress">
            <label htmlFor="address" className="txt">
              주소를 입력해주세요
            </label>
            <input
              id="address"
              className="input"
              name="address"
              onChange={valueChange}
              value={editUser.address}
            />
          </div>
          <div className="selectGender">
            <div className="txt">성별을 선택해주세요</div>
            <div className="inputRadio">
              <label htmlFor="male" className="textWrapper2">
                남
              </label>
              <input
                type="radio"
                name="gender"
                className="radioMale"
                value="M"
                onChange={valueChange}
                checked={editUser.gender === "M"}
              />
              <label htmlFor="female" className="textWrapper">
                여
              </label>
              <input
                type="radio"
                name="gender"
                className="radioFemale"
                value="F"
                onChange={valueChange}
                checked={editUser.gender === "F"}
              />
            </div>
          </div>
          <div className="editForm">
            <button className="submitButton" onClick={buttonClick}>
              제출
            </button>
            <button type="button" onClick={goback} className="cancelButton">
              취소
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

$(".register_button").click(function () {
  // 1) 회원가입 버튼을 눌렀을 때 입력했는지 안했는지 확인

  const userid = $("#inputID").val()
  const password = $("#inputPassword").val()
  const passwordRe = $("#inputPassword_re").val()
  const userName = $("#inputName").val()
  const userLive_Y = $("#inputLive_Y").val()
  const userLive_M = $("#select_live_M option:selected").val()
  const userLive_D = $("#inputLive_D").val()
  const userGender = $("#select_gender option:selected").val()
  const userEmail = $("#inputEmail").val()
  const userPhoneNumber = $("#inputPhoneNumber").val()

  console.log(
    userid,
    password,
    passwordRe,
    userName,
    userLive_Y,
    userLive_M,
    userLive_D,
    userGender,
    userEmail,
    userPhoneNumber
  )

  // 2) 비밀번호, 이메일 양식이 맞지 않으면 알려주기
  // null, undefind, ''(빈 문자열), 0 => false
  if (!userid) {
    alert("아이디를 입력해주세요!")
    return
  }

  if (!password) {
    alert("비밀번호를 입력해주세요!")
    return
  } else {
    if (!pwdCheck(password)) {
      alert(
        "비밀번호 규칙에 맞게 설정해주세요! 특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호"
      )
      return
    }
  }
  if (!passwordRe) {
    alert("비밀번호 확인을 입력해주세요!")
  } else {
    if (!(password == passwordRe)) {
      alert("비밀번호가 다릅니다.")
      return
    }
  }
  if (!userName) {
    alert("이름을 입력해주세요!")
    return
  }
  if (!userLive_Y) {
    alert("출생년을 입력해주세요!")
    return
  }
  if (userLive_M == "월") {
    alert("출생월을 입력해주세요!")
    return
  }
  if (!userLive_D) {
    alert("출생일을 입력해주세요!")
  } else {
    if (userLive_D > 31 || userLive_D < 1) {
      alert("1~31까지의 숫자를 입력해주세요!")
      return
    }
  }
  if (userEmail) {
    if (!emailCheck(userEmail)) {
      alert("이메일 형식에 맞게 입력해주세요!")
      return
    }
  }
  if (userGender == "성별") {
    alert("성별을 선택하여 주세요!")
    return
  }

  if (!userPhoneNumber) {
    alert("전화번호를 입력해주세요!")
    return
  } else {
    if (!telCheck(userPhoneNumber)) {
      alert("전화번호 양식에 맞게 입력해주세요")
      return
    }
  }

  alert("회원가입이 완료되었습니다.")
  location.href = "./register.html"
})

// 정규식
function pwdCheck(pwd) {
  //특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호 정규식 ( 3 가지 조합)
  const reg = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/
  return reg.test(pwd) // 정규표현식에 부합하면 true 아니면 flase
}

function emailCheck(userEmail) {
  const reg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
  return reg.test(userEmail) // 정규표현식에 부합하면 true 아니면 flase
}

//전화번호 정규식
function telCheck(userPhoneNumber) {
  const reg = /^\d{2,3}-\d{3,4}-\d{4}$/
  return reg.test(userPhoneNumber)
}

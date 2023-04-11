// 2) 비밀번호, 이메일 양식이 맞지 않으면 알려주기

$('.register').click(function() {
    // 1) 회원가입 버튼을 눌렀을 때 입력했는지 안했는지 확인

    const email = $('#inputEmail3').val();
    const password = $('#inputPassword3').val();
    const gender = $('#gender').val();

    console.log(email, password, gender);
});
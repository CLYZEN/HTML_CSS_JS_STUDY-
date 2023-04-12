
$('.register').click(function() {
    // 1) 회원가입 버튼을 눌렀을 때 입력했는지 안했는지 확인

    const email = $('#inputEmail3').val();
    const password = $('#inputPassword3').val();
    const gender = $('#gender').val();
    let like = '';

    // 라디오 버튼 value 가져오기 -> 여러개 한꺼번에 가져오기 떄문에 each 사용
    $('input[name=gridRadios]').each(function() {
        var value = $(this).val(); // $(this) = 선택자가 현재 가르키는 요소 (element)
        
        // 사용자가 체크한 값만 가져오기
        var checked = $(this).prop('checked'); // 체크한 상태인지 아닌지 확인
        
        if(checked) {
            like = value;
            return; // 함수 끝내기 (return)
        }
    });
    
    // 2) 비밀번호, 이메일 양식이 맞지 않으면 알려주기
    // null, undefind, ''(빈 문자열), 0 => false
    if (!email) {
        alert('이메일을 입력해주세요!');
        return;
    } else {
        if (!emailCheck(email)) {
            alert('이메일 형식에 맞게 입력해주세요!');
            return;
        }
    }

    if (!password) {
        alert('패스워드를 입력해주세요!');
        return;
    } else {
        if (!pwdCheck(password)) {
            alert('비밀번호 규칙에 맞게 설정해주세요! 특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호');
            return;
        }
    }

    if (!gender) {
        alert('성별을 선택하여 주세요!');
        return;
    } 

    alert ('회원가입이 완료되었습니다.');
    location.href = './index.html';

    
});

// 정규식
function pwdCheck(pwd) {
    //특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호 정규식 ( 3 가지 조합)
    const reg = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    return reg.test(pwd); // 정규표현식에 부합하면 true 아니면 flase
}

function emailCheck(email) {
    const reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return reg.test(email); // 정규표현식에 부합하면 true 아니면 flase
}
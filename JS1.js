$(document).ready(function(){

    function TINHLUONG(Luong,HeSoLuong) {
        let LuongThang=Luong*HeSoLuong;
        return LuongThang;
    }

    function CheckDauVao() {
        let $Luong =$('#Luong').val();
        let $HeSoLuong = $('#HeSoLuong').val();
        if ($Luong.trim()==="" || parseInt($Luong)<0 || isNaN($Luong) ) {
            alert("Vui lòng nhập lương cơ bản của bạn");
            return;
        }

        if ($HeSoLuong==1.0) alert("Bạn muốn giữ nguyên hệ số lương là 1.0?")
        
        $('#Chot').html(TINHLUONG(parseInt($Luong),$HeSoLuong));
    }

    $('#ButtonTinhLuong').on('click',CheckDauVao);

})